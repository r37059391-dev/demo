"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, AlertCircle, BellRing, FileText, ArrowRight, ShieldCheck, Clock, TrendingUp, CalendarDays, ChevronRight, IndianRupee, Users, Megaphone, Loader2 } from "lucide-react"

type DashboardData = {
  user: { name: string; unit: string; block: string; leaseEnd: string }
  stats: {
    currentDue: { amount: number; dueDate: string } | null
    activeComplaints: number
    activeComplaintDetail: string | null
    leaseStatus: string
    leaseEnd: string
    visitorsToday: number
    unreadNotifications: number
  }
  recentPayments: { id: string; month: string; amount: number; status: string; dueDate: string; paidDate?: string }[]
  announcements: { id: string; title: string; content: string; tag: string; createdAt: string }[]
}

export default function TenantDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!data) {
    return <div className="text-center py-20 text-gray-500">Failed to load dashboard data.</div>
  }

  const statCards = [
    {
      title: "Current Due",
      value: data.stats.currentDue ? `₹${data.stats.currentDue.amount.toLocaleString()}` : "₹0",
      sub: data.stats.currentDue ? `Due in ${Math.ceil((new Date(data.stats.currentDue.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days` : "All clear!",
      subColor: data.stats.currentDue ? "text-red-500" : "text-emerald-600",
      icon: Wallet, iconBg: "bg-red-50", iconColor: "text-red-500", border: "border-red-100",
    },
    {
      title: "Active Complaints",
      value: String(data.stats.activeComplaints),
      sub: data.stats.activeComplaintDetail || "No active complaints",
      subColor: data.stats.activeComplaints > 0 ? "text-amber-600" : "text-emerald-600",
      icon: AlertCircle, iconBg: "bg-amber-50", iconColor: "text-amber-500", border: "border-amber-100",
    },
    {
      title: "Lease Status",
      value: data.stats.leaseStatus,
      sub: data.stats.leaseEnd ? `Expires ${new Date(data.stats.leaseEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "N/A",
      subColor: "text-emerald-600",
      icon: ShieldCheck, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", border: "border-emerald-100",
    },
    {
      title: "Visitors Today",
      value: String(data.stats.visitorsToday),
      sub: "Expected arrivals",
      subColor: "text-blue-600",
      icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-500", border: "border-blue-100",
    },
  ]

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Alert": return "bg-red-50 text-red-600 border-red-100"
      case "Event": return "bg-emerald-50 text-emerald-600 border-emerald-100"
      default: return "bg-blue-50 text-blue-600 border-blue-100"
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-xl shadow-blue-700/15 animate-gradient">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-sm" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-sm" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Good Evening</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, {data.user.name?.split(" ")[0]}! 👋</h1>
            <p className="text-blue-200 mt-2 text-sm">
              Block {data.user.block}, Flat {data.user.unit} • Lease active until {data.user.leaseEnd ? new Date(data.user.leaseEnd).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/25 text-white hover:bg-white/10 rounded-xl font-medium backdrop-blur-sm">
              Raise Complaint
            </Button>
            <Button className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-medium shadow-lg">
              <IndianRupee className="w-4 h-4 mr-1" /> Pay Now
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className={`card-hover shadow-sm border ${stat.border} bg-white`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1.5 flex items-center gap-1 ${stat.subColor}`}>{stat.sub}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Bills */}
        <Card className="shadow-sm border-gray-100 lg:col-span-4 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Maintenance Bills</CardTitle>
                <CardDescription className="text-gray-500 mt-0.5">Your latest billing history</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium rounded-lg">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentPayments.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{bill.month}</p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {bill.status === "paid" ? `Paid ${bill.paidDate ? new Date(bill.paidDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}` : `Due ${new Date(bill.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <p className="text-sm font-bold text-gray-900">₹{bill.amount.toLocaleString()}</p>
                    <Badge variant="outline" className={`text-xs font-medium border rounded-lg ${bill.status === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                      {bill.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Society Announcements */}
        <Card className="shadow-sm border-gray-100 lg:col-span-3 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold">Announcements</CardTitle>
            </div>
            <CardDescription className="text-gray-500">Latest from the community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.announcements.map((notice) => (
                <div key={notice.id} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="mt-1.5 shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${notice.tag === "Alert" ? "bg-red-500" : notice.tag === "Event" ? "bg-emerald-500" : "bg-blue-500"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">{notice.title}</p>
                      <Badge variant="outline" className={`text-[10px] shrink-0 font-medium border ${getTagColor(notice.tag)} rounded-md`}>{notice.tag}</Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(notice.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 px-6 pb-6">
            <Button variant="outline" className="w-full text-sm font-medium rounded-xl border-gray-200 hover:bg-gray-50">
              View All Announcements
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
