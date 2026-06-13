"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquarePlus, Clock, AlertCircle, CheckCircle2, ChevronRight, Wrench, Zap, Droplets, Building, Loader2, UserCircle } from "lucide-react"

const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'plumbing': return Droplets
    case 'carpentry': return Wrench
    case 'electrical': return Zap
    case 'amenities': return Building
    default: return AlertCircle
  }
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [tenants, setTenants] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [selectedTenant, setSelectedTenant] = useState("")

  const fetchData = async () => {
    try {
      const [authRes, complaintsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/complaints")
      ])
      
      if (authRes.ok) {
        const auth = await authRes.json()
        setIsAdmin(auth.user?.role === 'admin')
        
        if (auth.user?.role === 'admin') {
          const usersRes = await fetch("/api/users")
          if (usersRes.ok) {
            const usersData = await usersRes.json()
            setTenants(usersData.users || [])
          }
        }
      }

      if (complaintsRes.ok) {
        const data = await complaintsRes.json()
        setComplaints(data.complaints || [])
      }
    } catch (error) {
      console.error("Failed to load complaints:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !title || !description || !priority) return
    if (isAdmin && !selectedTenant) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          title,
          description,
          priority,
          tenantId: isAdmin ? selectedTenant : undefined
        })
      })

      if (res.ok) {
        setIsDialogOpen(false)
        setCategory("")
        setTitle("")
        setDescription("")
        setPriority("")
        setSelectedTenant("")
        await fetchData()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to raise complaint")
      }
    } catch (error) {
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length,
    resolved: complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Complaint Management</h1>
          <p className="text-sm text-gray-500">Track and raise maintenance requests for your apartment.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              {isAdmin && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Tenant (Assign Complaint To)</Label>
                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select a tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      {tenants.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.block}-{t.unit} • {t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
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
                  <Label className="text-gray-700 font-medium">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
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
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Subject</Label>
                <Input 
                  placeholder="Brief description of the issue" 
                  className="h-11 rounded-xl"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Details</Label>
                <Textarea 
                  placeholder="Describe the issue in detail..." 
                  className="min-h-[80px] rounded-xl"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !category || !title || !description || !priority || (isAdmin && !selectedTenant)}
                  className="w-full bg-gradient-to-r from-primary to-[#D4894A] text-white rounded-xl font-medium"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-sm border-gray-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Raised</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-amber-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-emerald-100 bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-gray-900">No Complaints</h3>
            <p className="text-xs text-gray-500 mt-1">There are currently no maintenance complaints.</p>
          </div>
        ) : complaints.map((complaint) => {
          const Icon = getCategoryIcon(complaint.category)
          return (
            <Card key={complaint.id} className="card-hover shadow-sm border-gray-100 bg-white cursor-pointer group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className={`w-1.5 shrink-0 ${
                    complaint.status?.toLowerCase() === 'resolved' ? 'bg-emerald-500' : 
                    complaint.priority?.toLowerCase() === 'high' ? 'bg-red-500' : 'bg-primary/100'
                  }`} />
                  <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-1">
                    <div className="flex gap-4 items-start w-full">
                      <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${
                        complaint.status?.toLowerCase() === 'resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#D4894A] transition-colors">{complaint.title}</h3>
                          <Badge variant="outline" className="w-fit text-[10px] text-gray-500 bg-gray-50 border-gray-200 rounded-md font-medium uppercase tracking-wider">
                            {complaint.id.split('-').pop()?.substring(0, 8)}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md capitalize">{complaint.category}</span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 
                            {new Date(complaint.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className={`font-semibold capitalize ${
                            complaint.priority?.toLowerCase() === 'high' ? 'text-red-500' : 
                            complaint.priority?.toLowerCase() === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                          }`}>
                            {complaint.priority} Priority
                          </span>
                          {isAdmin && complaint.userName && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
                                <UserCircle className="w-3 h-3" /> {complaint.userName}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
                      <Badge variant="outline" 
                        className={`text-xs font-medium border rounded-lg capitalize ${
                          complaint.status?.toLowerCase() === "resolved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-primary/10 text-[#D4894A] border-primary/30"
                        }`}>
                        {complaint.status?.toLowerCase() === "resolved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {complaint.status?.toLowerCase() !== "resolved" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {complaint.status}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
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
