"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquarePlus, Clock, AlertCircle, CheckCircle2, ChevronRight, Wrench, Zap, Droplets, Building } from "lucide-react"

export default function ComplaintsPage() {
  const [complaints] = useState([
    { id: "CMP-004", title: "Water Leakage in Master Bathroom", category: "Plumbing", date: "Sep 05, 2026", status: "In Progress", priority: "High", icon: Droplets },
    { id: "CMP-003", title: "Main Door Lock Issue", category: "Carpentry", date: "Aug 12, 2026", status: "Resolved", priority: "Medium", icon: Wrench },
    { id: "CMP-002", title: "Gym AC not working", category: "Amenities", date: "Jul 22, 2026", status: "Resolved", priority: "Low", icon: Building },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Complaint Management</h1>
          <p className="text-sm text-gray-500">Track and raise maintenance requests for your apartment.</p>
        </div>
        
        <Dialog>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-primary to-[#D4894A] text-white shadow-lg shadow-primary/20 rounded-xl font-medium" />}>
            <MessageSquarePlus className="w-4 h-4 mr-2" /> Raise Complaint
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>New Complaint</DialogTitle>
              <DialogDescription>
                Fill in the details below to raise a new maintenance request.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Category</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="carpentry">Carpentry</SelectItem>
                    <SelectItem value="amenities">Amenities/Common Area</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Subject</Label>
                <Input placeholder="Brief description of the issue" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Details</Label>
                <Textarea placeholder="Describe the issue in detail..." className="min-h-[80px] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Priority</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-[#D4894A] text-white rounded-xl font-medium">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-sm border-gray-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Raised</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-amber-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">1</p>
            <p className="text-xs text-gray-500 font-medium mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-emerald-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">2</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id} className="card-hover shadow-sm border-gray-100 bg-white cursor-pointer group overflow-hidden">
            <CardContent className="p-0">
              {/* Left accent */}
              <div className="flex">
                <div className={`w-1.5 shrink-0 ${
                  complaint.status === 'Resolved' ? 'bg-emerald-500' : 
                  complaint.priority === 'High' ? 'bg-red-500' : 'bg-primary/100'
                }`} />
                <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-1">
                  <div className="flex gap-4 items-start w-full">
                    <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${
                      complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'
                    }`}>
                      <complaint.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#D4894A] transition-colors">{complaint.title}</h3>
                        <Badge variant="outline" className="w-fit text-[10px] text-gray-500 bg-gray-50 border-gray-200 rounded-md font-medium">
                          {complaint.id}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">{complaint.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {complaint.date}</span>
                        <span className="text-gray-300">•</span>
                        <span className={`font-semibold ${
                          complaint.priority === 'High' ? 'text-red-500' : 
                          complaint.priority === 'Medium' ? 'text-amber-500' : 'text-gray-500'
                        }`}>
                          {complaint.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <Badge variant="outline" 
                      className={`text-xs font-medium border rounded-lg ${
                        complaint.status === "Resolved" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-primary/10 text-[#D4894A] border-primary/30"
                      }`}>
                      {complaint.status === "Resolved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {complaint.status === "In Progress" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {complaint.status}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
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
