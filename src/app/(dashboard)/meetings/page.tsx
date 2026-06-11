"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Clock, MapPin, Users, Plus, FileText, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Meeting = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  status: "upcoming" | "past" | "cancelled"
  type: "AGM" | "Monthly" | "Emergency" | "Committee"
  rsvpCount?: number
  tenantStatus?: "attending" | "not_attending" | "pending"
}

export default function MeetingsPage() {
  const [role, setRole] = useState<string>("tenant")
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get role
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => { if (data.user) setRole(data.user.role) })

    // Get meetings
    fetch("/api/meetings")
      .then((res) => res.json())
      .then((data) => { setMeetings(data.meetings || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const isAdmin = role === "admin"

  const handleRSVP = (id: string, status: "attending" | "not_attending") => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, tenantStatus: status } : m))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AGM": return "bg-purple-100 text-purple-700 border-purple-200"
      case "Emergency": return "bg-red-100 text-red-700 border-red-200"
      case "Committee": return "bg-primary/20 text-[#D4894A] border-primary/30"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Association Meetings</h1>
            <p className="text-gray-500 text-sm mt-1">
              {isAdmin ? "Schedule and manage association events and meetings." : "View upcoming agendas and RSVP to community meetings."}
            </p>
          </div>
        </div>

        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={<Button className="bg-primary hover:bg-[#D4894A] text-white shadow-md shadow-primary/20" />}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
                <DialogDescription>
                  Create a new meeting. A notification will be sent to all relevant residents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input id="title" placeholder="e.g. Annual General Meeting" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location / Link</Label>
                  <Input id="location" placeholder="Clubhouse or Zoom link" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Agenda & Details</Label>
                  <Textarea id="description" placeholder="What will be discussed?" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)} className="bg-primary text-white">Schedule Meeting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Meetings List */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className={`overflow-hidden transition-all duration-200 hover:shadow-md ${meeting.status === 'past' ? 'opacity-70 bg-gray-50/50' : 'bg-white'}`}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className={`${getTypeColor(meeting.type)} font-medium`}>
                  {meeting.type}
                </Badge>
                {meeting.status === "past" && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">Past</Badge>
                )}
                {meeting.status === "upcoming" && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none shadow-none">Upcoming</Badge>
                )}
              </div>
              <CardTitle className="text-xl font-bold leading-tight line-clamp-2">{meeting.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarDays className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  {meeting.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  {meeting.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span className="truncate">{meeting.location}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-start">
                  <FileText className="w-4 h-4 mr-3 mt-0.5 text-gray-400 shrink-0" />
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {meeting.description}
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50/50 pt-4 border-t border-gray-100">
              {isAdmin ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    {meeting.rsvpCount} RSVPs
                  </div>
                  {meeting.status === "upcoming" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8">Edit</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50">Cancel</Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full">
                  {meeting.status === "past" ? (
                    <div className="flex items-center text-sm text-gray-500 justify-center w-full py-1">
                      Meeting has ended
                    </div>
                  ) : meeting.tenantStatus === "pending" ? (
                    <div className="flex gap-3 w-full">
                      <Button 
                        onClick={() => handleRSVP(meeting.id, "attending")}
                        className="flex-1 bg-white text-primary border border-primary/30 hover:bg-primary/10 hover:border-blue-300 shadow-sm"
                      >
                        Yes, I'll attend
                      </Button>
                      <Button 
                        onClick={() => handleRSVP(meeting.id, "not_attending")}
                        variant="outline" 
                        className="flex-1 border-gray-200 hover:bg-gray-100"
                      >
                        Can't make it
                      </Button>
                    </div>
                  ) : meeting.tenantStatus === "attending" ? (
                    <div className="flex items-center text-sm font-medium text-emerald-600 justify-center w-full py-1.5 bg-emerald-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      You are attending
                    </div>
                  ) : (
                    <div className="flex items-center text-sm font-medium text-gray-500 justify-center w-full py-1.5 bg-gray-100 rounded-lg">
                      You are not attending
                    </div>
                  )}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
