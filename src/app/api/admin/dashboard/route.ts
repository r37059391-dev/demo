import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const allPayments = db.payments.getAll()
  const allComplaints = db.complaints.getAll()
  const allVisitors = db.visitors.getAll()
  const allUsers = db.users.getAll()
  const allMeetings = db.meetings.getAll()

  const tenants = allUsers.filter((u) => u.role === "tenant")
  const totalRevenue = allPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = allPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
  const openComplaints = allComplaints.filter((c) => c.status === "open" || c.status === "in_progress")
  const todayVisitors = allVisitors.filter((v) => v.status === "expected" || v.status === "checked_in")

  return NextResponse.json({
    stats: {
      totalTenants: tenants.length,
      totalRevenue,
      pendingAmount,
      occupancyRate: 87,
      openComplaints: openComplaints.length,
      todayVisitors: todayVisitors.length,
      upcomingMeetings: allMeetings.filter((m) => m.status === "upcoming").length,
    },
    recentComplaints: allComplaints.slice(0, 5),
    recentPayments: allPayments.slice(0, 5),
    recentVisitors: allVisitors.slice(0, 5),
  })
}
