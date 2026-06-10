"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  UserCheck, Search, Plus, Clock, CheckCircle2, LogIn, LogOut,
  Phone, Calendar, Shield, Users, AlertCircle
} from "lucide-react"

const visitors = [
  { id: "V-101", name: "Rahul Gupta", purpose: "Delivery", tenant: "John Doe", flat: "A-402", phone: "+91 98765 11111", time: "10:30 AM", date: "Today", status: "Checked In", photo: "RG" },
  { id: "V-102", name: "Meena Patel", purpose: "Guest", tenant: "Sarah Smith", flat: "B-201", phone: "+91 98765 22222", time: "11:15 AM", date: "Today", status: "Checked In", photo: "MP" },
  { id: "V-103", name: "Amit Technician", purpose: "Maintenance", tenant: "Michael Raj", flat: "C-105", phone: "+91 98765 33333", time: "02:00 PM", date: "Today", status: "Pre-Approved", photo: "AT" },
  { id: "V-104", name: "Sunita Verma", purpose: "Guest", tenant: "Priya Sharma", flat: "A-501", phone: "+91 98765 44444", time: "09:00 AM", date: "Today", status: "Checked Out", photo: "SV" },
  { id: "V-105", name: "FedEx Courier", purpose: "Delivery", tenant: "David Chen", flat: "B-602", phone: "+91 98765 55555", time: "08:30 AM", date: "Today", status: "Checked Out", photo: "FC" },
  { id: "V-106", name: "Dr. Anand", purpose: "Medical", tenant: "Anita Patel", flat: "C-304", phone: "+91 98765 66666", time: "04:00 PM", date: "Today", status: "Pre-Approved", photo: "DA" },
]

export default function VisitorsPage() {
  const [search, setSearch] = useState("")
  const filtered = visitors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.tenant.toLowerCase().includes(search.toLowerCase()) ||
    v.flat.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    today: visitors.length,
    checkedIn: visitors.filter(v => v.status === "Checked In").length,
    preApproved: visitors.filter(v => v.status === "Pre-Approved").length,
    checkedOut: visitors.filter(v => v.status === "Checked Out").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Visitor Management</h1>
          <p className="text-sm text-gray-500">Track, pre-approve, and manage visitor entries.</p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium" />}>
            <Plus className="w-4 h-4 mr-2" /> Pre-Approve Visitor
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pre-Approve Visitor</DialogTitle>
              <DialogDescription>Add visitor details for quick entry approval.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Visitor Name</Label>
                  <Input placeholder="Full name" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                  <Input placeholder="+91 98765 XXXXX" className="h-11 rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Purpose</Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Purpose" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest">Guest</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Expected Date</Label>
                  <Input type="date" className="h-11 rounded-xl" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium">
                <Shield className="w-4 h-4 mr-2" /> Pre-Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Today's Visitors", value: stats.today, icon: Users, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100" },
          { title: "Checked In", value: stats.checkedIn, icon: LogIn, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100" },
          { title: "Pre-Approved", value: stats.preApproved, icon: Shield, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100" },
          { title: "Checked Out", value: stats.checkedOut, icon: LogOut, bg: "bg-gray-50", color: "text-gray-500", border: "border-gray-200" },
        ].map(s => (
          <Card key={s.title} className={`card-hover shadow-sm border ${s.border} bg-white`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.title}</p>
                  <p className={`text-3xl font-bold mt-2 ${s.color}`}>{s.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input type="search" placeholder="Search visitor or flat..." className="pl-9 h-10 rounded-xl bg-white border-gray-200 shadow-sm" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Visitor Cards */}
      <div className="space-y-3">
        {filtered.map(v => (
          <Card key={v.id} className="card-hover shadow-sm border-gray-100 bg-white overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`w-1.5 shrink-0 ${
                  v.status === "Checked In" ? "bg-emerald-500" :
                  v.status === "Pre-Approved" ? "bg-violet-500" : "bg-gray-300"
                }`} />
                <div className="flex-1 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-11 w-11 border border-gray-100">
                      <AvatarFallback className={`font-bold text-sm ${
                        v.status === "Checked In" ? "bg-emerald-50 text-emerald-700" :
                        v.status === "Pre-Approved" ? "bg-violet-50 text-violet-700" : "bg-gray-50 text-gray-500"
                      }`}>
                        {v.photo}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{v.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                        <span className="font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{v.purpose}</span>
                        <span>•</span>
                        <span>Visiting {v.tenant} ({v.flat})</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {v.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`text-xs font-medium rounded-lg border ${
                      v.status === "Checked In" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      v.status === "Pre-Approved" ? "bg-violet-50 text-violet-700 border-violet-200" :
                      "bg-gray-50 text-gray-500 border-gray-200"
                    }`}>
                      {v.status === "Checked In" && <LogIn className="w-3 h-3 mr-1" />}
                      {v.status === "Pre-Approved" && <Shield className="w-3 h-3 mr-1" />}
                      {v.status === "Checked Out" && <LogOut className="w-3 h-3 mr-1" />}
                      {v.status}
                    </Badge>
                    {v.status === "Checked In" && (
                      <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <LogOut className="h-3 w-3 mr-1" /> Check Out
                      </Button>
                    )}
                    {v.status === "Pre-Approved" && (
                      <Button size="sm" className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <LogIn className="h-3 w-3 mr-1" /> Check In
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
