"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Check, Edit2, Trash2, Bell, FileSpreadsheet, Send, Users, UserCheck, UserX, Clock, Download } from "lucide-react"

export default function AdminDashboard() {
  const [tenants] = useState([
    { id: "T-10045", name: "John Doe", flat: "A-402", type: "2 BHK", status: "Active", phone: "+91 9876543210", joined: "Jan 2026" },
    { id: "T-10046", name: "Sarah Smith", flat: "B-201", type: "3 BHK", status: "Pending Approval", phone: "+91 9876543211", joined: "Sep 2026" },
    { id: "T-10047", name: "Michael Raj", flat: "C-105", type: "1 BHK", status: "Active", phone: "+91 9876543212", joined: "Mar 2026" },
    { id: "T-10048", name: "Priya Sharma", flat: "A-501", type: "Villa", status: "Notice Period", phone: "+91 9876543213", joined: "Feb 2025" },
    { id: "T-10049", name: "David Chen", flat: "B-602", type: "2 BHK", status: "Active", phone: "+91 9876543214", joined: "Jun 2026" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tenant Management</h1>
          <p className="text-sm text-gray-500">Manage all society tenants, approvals, and records.</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" className="bg-white rounded-xl font-medium border-gray-200" />}>
              <Bell className="w-4 h-4 mr-2" /> Send Notice
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send Broadcast Notification</DialogTitle>
                <DialogDescription>
                  Send an SMS, Email, or WhatsApp message to selected tenants.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Recipient group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Active Tenants</SelectItem>
                      <SelectItem value="block_a">Block A Only</SelectItem>
                      <SelectItem value="pending">Pending Approvals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Input placeholder="Message Subject" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Type your message here..." className="min-h-[100px] rounded-xl" />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-primary" /> Email
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-primary" /> SMS
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded accent-primary" /> WhatsApp
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-gradient-to-r from-primary to-[#D4894A] text-white w-full rounded-xl font-medium shadow-lg shadow-primary/20">
                  <Send className="w-4 h-4 mr-2" /> Send Notification
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-600/20">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Tenants", value: "142", icon: Users, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
          { title: "Active Leases", value: "138", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { title: "Pending Approvals", value: "4", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          { title: "Notice Period", value: "6", icon: UserX, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
        ].map((stat) => (
          <Card key={stat.title} className={`card-hover shadow-sm border ${stat.border} bg-white`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tenant Table */}
      <Card className="shadow-sm border-gray-100 bg-white rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-50 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Tenant Directory</CardTitle>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Search name or flat..." className="pl-9 h-10 rounded-xl bg-gray-50/80 border-gray-200" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-36 h-10 rounded-xl bg-gray-50/80 border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className="w-[250px] font-semibold text-gray-500 text-xs uppercase tracking-wider">Tenant</TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">ID</TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Flat</TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Contact</TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Joined</TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-gray-100">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${tenant.name}`} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">{tenant.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-gray-900 text-sm">{tenant.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 font-medium text-sm">{tenant.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 text-sm">{tenant.flat}</span>
                      <span className="text-xs text-gray-400">{tenant.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">{tenant.phone}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{tenant.joined}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-medium rounded-lg border ${
                        tenant.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        tenant.status === "Pending Approval" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 rounded-lg" />}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {tenant.status === "Pending Approval" && (
                          <DropdownMenuItem className="text-emerald-600 font-medium">
                            <Check className="mr-2 h-4 w-4" /> Approve
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <FileSpreadsheet className="mr-2 h-4 w-4" /> View History
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
