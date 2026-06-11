"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3, Download, TrendingUp, TrendingDown, IndianRupee,
  Users, Home, Car, MessageSquare, CreditCard, FileText,
  Calendar, ArrowUpRight, ArrowDownRight, PieChart
} from "lucide-react"

const monthlyRevenue = [
  { month: "Apr", revenue: 450000, expenses: 120000 },
  { month: "May", revenue: 465000, expenses: 115000 },
  { month: "Jun", revenue: 458000, expenses: 135000 },
  { month: "Jul", revenue: 478000, expenses: 110000 },
  { month: "Aug", revenue: 485200, expenses: 125000 },
  { month: "Sep", revenue: 310000, expenses: 95000 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Comprehensive insights across finances, occupancy, and operations.</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="sep2026">
            <SelectTrigger className="w-44 h-10 rounded-xl border-gray-200 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sep2026">September 2026</SelectItem>
              <SelectItem value="aug2026">August 2026</SelectItem>
              <SelectItem value="jul2026">July 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl border-gray-200 font-medium">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "₹4,85,200", change: "+8.5%", up: true, icon: IndianRupee, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100" },
          { title: "Occupancy Rate", value: "96.5%", change: "+1.2%", up: true, icon: Home, bg: "bg-primary/10", color: "text-primary", border: "border-primary/20" },
          { title: "Active Tenants", value: "142", change: "+3", up: true, icon: Users, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100" },
          { title: "Pending Issues", value: "12", change: "-5", up: true, icon: MessageSquare, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100" },
        ].map(stat => (
          <Card key={stat.title} className={`card-hover shadow-sm border ${stat.border} bg-white`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1.5 flex items-center gap-1 ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change} vs last month
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="shadow-sm border-gray-100 bg-white lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Revenue vs Expenses</CardTitle>
                <CardDescription className="text-gray-500">Monthly financial overview</CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border-emerald-200 rounded-md">
                <TrendingUp className="h-3 w-3 mr-1" /> Positive Trend
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {monthlyRevenue.map(d => {
                const maxVal = 500000
                return (
                  <div key={d.month} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-600 w-8">{d.month}</span>
                      <span className="text-gray-400">₹{(d.revenue / 1000).toFixed(0)}K rev / ₹{(d.expenses / 1000).toFixed(0)}K exp</span>
                    </div>
                    <div className="flex gap-1 h-5">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-md transition-all duration-700" style={{ width: `${(d.revenue / maxVal) * 100}%` }} />
                      <div className="bg-gradient-to-r from-red-400 to-red-300 rounded-md transition-all duration-700" style={{ width: `${(d.expenses / maxVal) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-gray-500 font-medium">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-xs text-gray-500 font-medium">Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card className="shadow-sm border-gray-100 bg-white lg:col-span-3">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Reports</CardTitle>
            <CardDescription className="text-gray-500">Generate downloadable reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Financial Summary", desc: "Revenue, expenses & P/L", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
              { name: "Occupancy Report", desc: "Unit status & vacancies", icon: Home, color: "text-primary", bg: "bg-primary/10" },
              { name: "Tenant Directory", desc: "Complete tenant listing", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
              { name: "Maintenance Log", desc: "All service requests", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
              { name: "Payment Collection", desc: "Dues & collection status", icon: CreditCard, color: "text-red-500", bg: "bg-red-50" },
              { name: "Parking Utilization", desc: "Slot usage & assignments", icon: Car, color: "text-cyan-600", bg: "bg-cyan-50" },
            ].map(r => (
              <div key={r.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${r.bg}`}>
                    <r.icon className={`h-4 w-4 ${r.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#D4894A] transition-colors">{r.name}</p>
                    <p className="text-[10px] text-gray-400">{r.desc}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Operational Snapshot */}
      <Card className="shadow-sm border-gray-100 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Operational Snapshot</CardTitle>
          <CardDescription className="text-gray-500">September 2026 summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Complaints Raised", value: "18", sub: "3 open" },
              { label: "Complaints Resolved", value: "15", sub: "83% rate" },
              { label: "Visitor Entries", value: "324", sub: "↑12% vs Aug" },
              { label: "Parking Utilization", value: "87%", sub: "6 available" },
              { label: "Amenity Bookings", value: "45", sub: "Club house: 12" },
              { label: "Notices Sent", value: "8", sub: "All blocks" },
            ].map(item => (
              <div key={item.label} className="text-center p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">{item.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
