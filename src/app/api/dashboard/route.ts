import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payments = db.payments.getByUser(session.userId)
  const complaints = db.complaints.getByUser(session.userId)
  const visitors = db.visitors.getByUser(session.userId)
  const notifications = db.notifications.getByUser(session.userId)
  const announcements = db.announcements.getAll()
  const user = db.users.findById(session.userId)

  const pendingPayment = payments.find((p) => p.status === "pending")
  const activeComplaints = complaints.filter((c) => c.status !== "resolved" && c.status !== "closed")
  const todayVisitors = visitors.filter((v) => v.status === "expected" || v.status === "checked_in")
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return NextResponse.json({
    user: {
      name: user?.name,
      unit: user?.unit,
      block: user?.block,
      leaseEnd: user?.leaseEnd,
    },
    stats: {
      currentDue: pendingPayment ? { amount: pendingPayment.amount, dueDate: pendingPayment.dueDate } : null,
      activeComplaints: activeComplaints.length,
      activeComplaintDetail: activeComplaints[0] ? `${activeComplaints[0].category} • ${activeComplaints[0].status === "in_progress" ? "In Progress" : "Open"}` : null,
      leaseStatus: user?.leaseEnd ? "Active" : "N/A",
      leaseEnd: user?.leaseEnd,
      visitorsToday: todayVisitors.length,
      unreadNotifications,
    },
    recentPayments: payments.slice(0, 4),
    announcements: announcements.slice(0, 4),
  })
}
