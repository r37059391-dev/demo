import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const supabase = await createClient()

    const [
      paymentsResult,
      complaintsResult,
      visitorsResult,
      notificationsResult,
      announcementsResult,
      userResult,
      parkingResult
    ] = await Promise.all([
      supabase.from('payments').select('*').eq('user_id', session.userId),
      supabase.from('complaints').select('*').eq('user_id', session.userId),
      supabase.from('visitors').select('*').eq('user_id', session.userId),
      supabase.from('notifications').select('*').eq('user_id', session.userId),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(4),
      supabase.from('users').select('*').eq('id', session.userId).single(),
      supabase.from('parking_slots').select('*').eq('tenant_id', session.userId).single()
    ])

    // Log any unexpected DB errors
    if (userResult.error && userResult.error.code !== 'PGRST116') console.error("User fetch error:", userResult.error)

    const payments = paymentsResult.data
    const complaints = complaintsResult.data
    const visitors = visitorsResult.data
    const notifications = notificationsResult.data
    const announcements = announcementsResult.data
    const user = userResult.data
    const parkingSlot = parkingResult.data

    const pendingPayment = (payments || []).find((p: any) => p.status === "pending")
    const activeComplaints = (complaints || []).filter((c: any) => c.status !== "resolved" && c.status !== "closed")
    const todayVisitors = (visitors || []).filter((v: any) => v.status === "expected" || v.status === "checked_in")
    const unreadNotifications = (notifications || []).filter((n: any) => !n.read).length

    return NextResponse.json({
      user: {
        name: user?.name,
        unit: user?.unit,
        block: user?.block,
        leaseEnd: user?.lease_end,
      },
      parking: parkingSlot ? {
        id: parkingSlot.id,
        block: parkingSlot.block,
        floor: parkingSlot.floor,
        type: parkingSlot.type,
        vehicleNumber: parkingSlot.vehicle_number
      } : null,
      stats: {
        currentDue: pendingPayment ? { amount: pendingPayment.amount, dueDate: pendingPayment.due_date } : null,
        activeComplaints: activeComplaints.length,
        activeComplaintDetail: activeComplaints[0] ? `${activeComplaints[0].category} • ${activeComplaints[0].status === "in_progress" ? "In Progress" : "Open"}` : null,
        leaseStatus: user?.lease_end ? "Active" : "N/A",
        leaseEnd: user?.lease_end,
        visitorsToday: todayVisitors.length,
        unreadNotifications,
      },
      recentPayments: (payments || []).slice(0, 4).map((p: any) => ({
        ...p,
        dueDate: p.due_date,
        paidDate: p.paid_date,
      })),
      announcements: (announcements || []).map((a: any) => ({
        ...a,
        createdAt: a.created_at,
      })),
    })
  } catch (error) {
    console.error("Dashboard API Crash:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
