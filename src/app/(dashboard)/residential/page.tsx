"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home, Search, Building, Users, CheckCircle2, XCircle, Clock,
  ChevronRight, MapPin, Layers
} from "lucide-react"

const units = [
  { id: "A-101", block: "A", floor: 1, type: "1 BHK", area: "650 sq.ft", tenant: "Vacant", status: "Available", rent: "₹15,000" },
  { id: "A-201", block: "A", floor: 2, type: "2 BHK", area: "1050 sq.ft", tenant: "Ravi Kumar", status: "Occupied", rent: "₹25,000" },
  { id: "A-301", block: "A", floor: 3, type: "2 BHK", area: "1050 sq.ft", tenant: "Vacant", status: "Available", rent: "₹25,000" },
  { id: "A-402", block: "A", floor: 4, type: "2 BHK", area: "1100 sq.ft", tenant: "John Doe", status: "Occupied", rent: "₹26,000" },
  { id: "A-501", block: "A", floor: 5, type: "3 BHK", area: "1450 sq.ft", tenant: "Priya Sharma", status: "Notice Period", rent: "₹35,000" },
  { id: "B-104", block: "B", floor: 1, type: "1 BHK", area: "650 sq.ft", tenant: "Lisa Wang", status: "Occupied", rent: "₹16,000" },
  { id: "B-201", block: "B", floor: 2, type: "3 BHK", area: "1500 sq.ft", tenant: "Sarah Smith", status: "Occupied", rent: "₹38,000" },
  { id: "B-602", block: "B", floor: 6, type: "2 BHK", area: "1100 sq.ft", tenant: "David Chen", status: "Occupied", rent: "₹27,000" },
  { id: "C-105", block: "C", floor: 1, type: "1 BHK", area: "600 sq.ft", tenant: "Michael Raj", status: "Occupied", rent: "₹14,000" },
  { id: "C-304", block: "C", floor: 3, type: "2 BHK", area: "1000 sq.ft", tenant: "Anita Patel", status: "Occupied", rent: "₹24,000" },
  { id: "D-101", block: "D", floor: 1, type: "Villa", area: "2200 sq.ft", tenant: "Vacant", status: "Under Maintenance", rent: "₹60,000" },
  { id: "D-102", block: "D", floor: 1, type: "Villa", area: "2400 sq.ft", tenant: "Amit Verma", status: "Occupied", rent: "₹65,000" },
]

export default function ResidentialPage() {
  const stats = {
    total: units.length,
    occupied: units.filter(u => u.status === "Occupied").length,
    available: units.filter(u => u.status === "Available").length,
    notice: units.filter(u => u.status === "Notice Period" || u.status === "Under Maintenance").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Residential Units</h1>
          <p className="text-sm text-gray-500">View and manage all apartment units across blocks.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
          <Home className="w-4 h-4 mr-2" /> Add Unit
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Units", value: stats.total, icon: Building, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100" },
          { title: "Occupied", value: stats.occupied, icon: Users, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100" },
          { title: "Available", value: stats.available, icon: CheckCircle2, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100" },
          { title: "Notice / Maintenance", value: stats.notice, icon: Clock, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100" },
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input type="search" placeholder="Search unit, tenant..." className="pl-9 h-10 rounded-xl bg-white border-gray-200 shadow-sm" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36 h-10 rounded-xl bg-white border-gray-200">
            <SelectValue placeholder="Block" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Blocks</SelectItem>
            <SelectItem value="a">Block A</SelectItem>
            <SelectItem value="b">Block B</SelectItem>
            <SelectItem value="c">Block C</SelectItem>
            <SelectItem value="d">Block D</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all_status">
          <SelectTrigger className="w-36 h-10 rounded-xl bg-white border-gray-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_status">All Status</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="notice">Notice Period</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Unit Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {units.map(unit => (
          <Card key={unit.id} className={`card-hover shadow-sm bg-white overflow-hidden border-gray-100 cursor-pointer group ${
            unit.status === "Available" ? "border-emerald-200 border-dashed" :
            unit.status === "Under Maintenance" ? "opacity-70" : ""
          }`}>
            <div className={`h-1 ${
              unit.status === "Occupied" ? "bg-blue-500" :
              unit.status === "Available" ? "bg-emerald-500" :
              unit.status === "Notice Period" ? "bg-amber-500" : "bg-gray-400"
            }`} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">{unit.id}</div>
                <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${
                  unit.status === "Occupied" ? "bg-blue-50 text-blue-700 border-blue-200" :
                  unit.status === "Available" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  unit.status === "Notice Period" ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-gray-50 text-gray-500 border-gray-200"
                }`}>
                  {unit.status}
                </Badge>
              </div>

              <h3 className="font-semibold text-gray-900 text-sm">{unit.type}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{unit.area} • Block {unit.block}, Floor {unit.floor}</p>

              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tenant</span>
                  <span className={`font-medium ${unit.tenant === "Vacant" ? "text-gray-400 italic" : "text-gray-900"}`}>{unit.tenant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rent</span>
                  <span className="font-bold text-gray-900">{unit.rent}/mo</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-medium h-7 px-2">
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
