import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()

  const [
    { data: payments },
    { data: complaints },
    { data: visitors },
    { data: users },
    { data: meetings }
  ] = await Promise.all([
    supabase.from('payments').select('*').order('created_at', { ascending: false }),
    supabase.from('complaints').select('*').order('created_at', { ascending: false }),
    supabase.from('visitors').select('*').order('created_at', { ascending: false }),
    supabase.from('users').select('*'),
    supabase.from('meetings').select('*')
  ])

  const tenants = (users || []).filter((u: any) => u.role === "tenant")
  const totalRevenue = (payments || []).filter((p: any) => p.status === "paid").reduce((sum: number, p: any) => sum + Number(p.amount), 0)
  const pendingAmount = (payments || []).filter((p: any) => p.status === "pending").reduce((sum: number, p: any) => sum + Number(p.amount), 0)
  const openComplaints = (complaints || []).filter((c: any) => c.status === "open" || c.status === "in_progress")
  const todayVisitors = (visitors || []).filter((v: any) => v.status === "expected" || v.status === "checked_in")

  return NextResponse.json({
    stats: {
      totalTenants: tenants.length,
      totalRevenue,
      pendingAmount,
      occupancyRate: 87, // Mock
      openComplaints: openComplaints.length,
      todayVisitors: todayVisitors.length,
      upcomingMeetings: (meetings || []).filter((m: any) => m.status === "upcoming").length,
    },
    recentComplaints: (complaints || []).slice(0, 5).map((c: any) => ({
      ...c,
      userId: c.user_id,
      userName: c.user_name,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    })),
    recentPayments: (payments || []).slice(0, 5).map((p: any) => ({
      ...p,
      userId: p.user_id,
      dueDate: p.due_date,
      paidDate: p.paid_date,
    })),
    recentVisitors: (visitors || []).slice(0, 5).map((v: any) => ({
      ...v,
      userId: v.user_id,
      expectedAt: v.expected_at,
      checkedInAt: v.checked_in_at,
      checkedOutAt: v.checked_out_at,
    })),
  })
}
