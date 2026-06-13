"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Car, Search, Plus, CheckCircle2,
  XCircle, Zap, Loader2
} from "lucide-react"

export default function ParkingPage() {
  const [search, setSearch] = useState("")
  const [parkingSlots, setParkingSlots] = useState<any[]>([])
  const [tenants, setTenants] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAssigning, setIsAssigning] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Assignment Form State
  const [selectedTenant, setSelectedTenant] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const fetchData = async () => {
    try {
      const [parkingRes, usersRes] = await Promise.all([
        fetch("/api/parking"),
        fetch("/api/users")
      ])
      
      if (parkingRes.ok) {
        const parkingData = await parkingRes.json()
        setParkingSlots(parkingData.parkingSlots || [])
      }
      
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setTenants(usersData.users || [])
      }
    } catch (error) {
      console.error("Failed to fetch parking data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAssign = async () => {
    if (!selectedTenant || !selectedSlot) return

    setIsAssigning(true)
    try {
      const res = await fetch("/api/parking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: selectedSlot,
          tenantId: selectedTenant,
          vehicleNumber,
          vehicleType
        })
      })

      if (res.ok) {
        setIsDialogOpen(false)
        // Reset form
        setSelectedTenant("")
        setSelectedSlot("")
        setVehicleNumber("")
        setVehicleType("")
        // Refresh data
        await fetchData()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to assign parking")
      }
    } catch (error) {
      console.error("Assignment failed:", error)
    } finally {
      setIsAssigning(false)
    }
  }

  const filtered = parkingSlots.filter(s =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.tenant?.toLowerCase().includes(search.toLowerCase()) ||
    s.vehicle?.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: parkingSlots.length,
    occupied: parkingSlots.filter(s => s.status === "Occupied").length,
    available: parkingSlots.filter(s => s.status === "Available").length,
    ev: parkingSlots.filter(s => s.type === "EV Charging").length,
  }

  if (isLoading) {
    return <div className="flex h-[400px] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  const availableSlots = parkingSlots.filter(s => s.status === "Available")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Parking Management</h1>
          <p className="text-sm text-gray-500">Manage parking slots, assignments, and visitor parking.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-primary to-[#D4894A] text-white shadow-lg shadow-primary/20 rounded-xl font-medium" />}>
            <Plus className="w-4 h-4 mr-2" /> Assign Parking
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Parking Slot</DialogTitle>
              <DialogDescription>Assign an available parking slot to a tenant.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Tenant</Label>
                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select tenant" /></SelectTrigger>
                    <SelectContent>
                      {tenants.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.block}-{t.unit} • {t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Slot</Label>
                  <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Available slots" /></SelectTrigger>
                    <SelectContent>
                      {availableSlots.length === 0 && <SelectItem value="none" disabled>No slots available</SelectItem>}
                      {availableSlots.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.id} ({s.type}, {s.floor})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Vehicle Number</Label>
                  <Input 
                    placeholder="MH02-AB-1234" 
                    className="h-11 rounded-xl"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Vehicle Type</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="Bike">Bike</SelectItem>
                      <SelectItem value="EV Car">EV Car</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleAssign}
                disabled={isAssigning || !selectedTenant || !selectedSlot}
                className="w-full bg-gradient-to-r from-primary to-[#D4894A] text-white rounded-xl font-medium"
              >
                {isAssigning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Assign Slot
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Slots", value: stats.total, icon: Car, bg: "bg-primary/10", color: "text-primary", border: "border-primary/20" },
          { title: "Occupied", value: stats.occupied, icon: XCircle, bg: "bg-red-50", color: "text-red-500", border: "border-red-100" },
          { title: "Available", value: stats.available, icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100" },
          { title: "EV Charging", value: stats.ev, icon: Zap, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100" },
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
        <Input type="search" placeholder="Search slot, tenant, vehicle..." className="pl-9 h-10 rounded-xl bg-white border-gray-200 shadow-sm" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Parking Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(slot => (
          <Card key={slot.id} className={`card-hover shadow-sm bg-white overflow-hidden border-gray-100 ${slot.status === "Available" ? "border-emerald-200 border-dashed" : ""}`}>
            <div className={`h-1 ${
              slot.status === "Available" ? "bg-emerald-500" :
              slot.status === "Charging" ? "bg-amber-500" :
              slot.status === "Visitor" ? "bg-violet-500" : "bg-primary/100"
            }`} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  slot.status === "Available" ? "bg-emerald-50 text-emerald-700" :
                  slot.status === "Charging" ? "bg-amber-50 text-amber-700" :
                  slot.status === "Visitor" ? "bg-violet-50 text-violet-700" : "bg-primary/10 text-[#D4894A]"
                }`}>
                  {slot.id}
                </div>
                <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${
                  slot.status === "Available" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  slot.status === "Charging" ? "bg-amber-50 text-amber-700 border-amber-200" :
                  slot.status === "Visitor" ? "bg-violet-50 text-violet-700 border-violet-200" :
                  "bg-gray-50 text-gray-600 border-gray-200"
                }`}>
                  {slot.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Type</span>
                  <span className="font-medium text-gray-700 text-xs">{slot.type} • {slot.floor}</span>
                </div>
                {slot.tenant !== "-" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Tenant</span>
                      <span className="font-medium text-gray-900 text-xs">{slot.tenant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Vehicle</span>
                      <span className="font-mono text-gray-700 text-xs">{slot.vehicle}</span>
                    </div>
                  </>
                )}
                {slot.status === "Available" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2 rounded-lg border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs font-medium"
                    onClick={() => {
                      setSelectedSlot(slot.id)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Assign
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No parking slots found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
