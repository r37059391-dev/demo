"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bell, CheckCircle2, AlertCircle, Info, Megaphone, CreditCard,
  Wrench, Calendar, Clock, Users, Trash2, Check, MailOpen
} from "lucide-react"

const notifications = [
  { id: 1, type: "alert", title: "Water Supply Interruption", body: "Water supply will be disrupted on Sep 7 from 10 AM to 2 PM due to municipal maintenance. Please store water in advance.", time: "2 hours ago", read: false },
  { id: 2, type: "payment", title: "Maintenance Bill Generated", body: "Your September maintenance bill of ₹3,500 has been generated. Due date: September 10, 2026.", time: "5 hours ago", read: false },
  { id: 3, type: "announcement", title: "Upcoming Festival Celebration", body: "Ganesh Chaturthi celebrations are being organized on Sep 15 in the club house. Register your family for prasad and events.", time: "Yesterday", read: false },
  { id: 4, type: "maintenance", title: "Plumbing Complaint Update", body: "Your plumbing complaint (CMP-004) has been assigned to a technician. Expected resolution: Sep 8, 2026.", time: "Yesterday", read: true },
  { id: 5, type: "info", title: "Lift Maintenance Scheduled", body: "Lift #2 in Block A will be under maintenance on Sep 9, 9 AM - 5 PM. Please use Lift #1 or stairs.", time: "2 days ago", read: true },
  { id: 6, type: "visitor", title: "Visitor Pre-Approved", body: "Dr. Anand has been pre-approved for a visit on Sep 7 at 4:00 PM. Security has been notified.", time: "2 days ago", read: true },
  { id: 7, type: "payment", title: "Payment Received", body: "Your August maintenance payment of ₹3,500 via UPI has been confirmed. Receipt: INV-2026-008.", time: "4 days ago", read: true },
  { id: 8, type: "announcement", title: "New Parking Policy", body: "Updated parking allocation policy effective September 1. Please review the changes in Rules & Policies section.", time: "1 week ago", read: true },
]

const typeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>, color: string, bg: string }> = {
  alert: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  payment: { icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
  announcement: { icon: Megaphone, color: "text-violet-600", bg: "bg-violet-50" },
  maintenance: { icon: Wrench, color: "text-amber-600", bg: "bg-amber-50" },
  info: { icon: Info, color: "text-gray-500", bg: "bg-gray-50" },
  visitor: { icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
}

export default function NotificationsPage() {
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500">
            You have <span className="font-semibold text-blue-600">{unread} unread</span> notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-gray-200 font-medium text-sm">
            <Check className="w-4 h-4 mr-2" /> Mark All Read
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-sm border-blue-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{unread}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Unread</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{notifications.length}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Total</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-emerald-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{notifications.length - unread}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Read</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.map(n => {
          const config = typeConfig[n.type]
          const Icon = config.icon
          return (
            <Card key={n.id} className={`shadow-sm bg-white overflow-hidden group transition-all ${!n.read ? "border-blue-200 bg-blue-50/20" : "border-gray-100"}`}>
              <CardContent className="p-0">
                <div className="flex">
                  {!n.read && <div className="w-1 shrink-0 bg-blue-500" />}
                  <div className="flex-1 p-5 flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl shrink-0 ${config.bg}`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-sm font-semibold ${!n.read ? "text-gray-900" : "text-gray-700"}`}>{n.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {n.time}
                          </span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!n.read && (
                              <button className="p-1 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                                <MailOpen className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{n.body}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
