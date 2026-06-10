"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package, Search, Plus, CheckCircle2, AlertCircle, Wrench,
  Zap, Droplets, Flame, Shield, Clock, ChevronRight,
  BarChart3, TrendingUp
} from "lucide-react"

const assets = [
  { id: "AST-001", name: "Fire Extinguisher", category: "Safety", location: "Block A, Floor 1-5", qty: 20, condition: "Good", lastChecked: "Aug 15, 2026", nextCheck: "Nov 15, 2026" },
  { id: "AST-002", name: "CCTV Camera", category: "Security", location: "All Blocks", qty: 48, condition: "Good", lastChecked: "Sep 01, 2026", nextCheck: "Dec 01, 2026" },
  { id: "AST-003", name: "Lift / Elevator", category: "Infrastructure", location: "All Blocks (8 units)", qty: 8, condition: "Good", lastChecked: "Aug 20, 2026", nextCheck: "Sep 20, 2026" },
  { id: "AST-004", name: "Water Pump Motor", category: "Plumbing", location: "Pump Room", qty: 4, condition: "Fair", lastChecked: "Jul 10, 2026", nextCheck: "Oct 10, 2026" },
  { id: "AST-005", name: "DG Set Generator", category: "Electrical", location: "Basement 1", qty: 2, condition: "Good", lastChecked: "Aug 01, 2026", nextCheck: "Nov 01, 2026" },
  { id: "AST-006", name: "Gym Equipment Set", category: "Amenity", location: "Club House", qty: 15, condition: "Good", lastChecked: "Sep 01, 2026", nextCheck: "Mar 01, 2027" },
  { id: "AST-007", name: "Swimming Pool Filter", category: "Amenity", location: "Pool Area", qty: 2, condition: "Needs Repair", lastChecked: "Aug 25, 2026", nextCheck: "Sep 10, 2026" },
  { id: "AST-008", name: "Garden Tools Set", category: "Maintenance", location: "Garden Store", qty: 12, condition: "Good", lastChecked: "Jul 20, 2026", nextCheck: "Oct 20, 2026" },
]

const categoryIcon: Record<string, { icon: React.ComponentType<{ className?: string }>, color: string, bg: string }> = {
  Safety: { icon: Shield, color: "text-red-500", bg: "bg-red-50" },
  Security: { icon: Shield, color: "text-blue-600", bg: "bg-blue-50" },
  Infrastructure: { icon: Package, color: "text-violet-600", bg: "bg-violet-50" },
  Plumbing: { icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-50" },
  Electrical: { icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
  Amenity: { icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50" },
  Maintenance: { icon: Wrench, color: "text-gray-600", bg: "bg-gray-50" },
}

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Asset & Inventory</h1>
          <p className="text-sm text-gray-500">Track and manage society assets, equipment, and inventory.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
          <Plus className="w-4 h-4 mr-2" /> Add Asset
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Assets", value: assets.length.toString(), icon: Package, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100" },
          { title: "Good Condition", value: assets.filter(a => a.condition === "Good").length.toString(), icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100" },
          { title: "Needs Attention", value: assets.filter(a => a.condition !== "Good").length.toString(), icon: AlertCircle, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100" },
          { title: "Categories", value: new Set(assets.map(a => a.category)).size.toString(), icon: BarChart3, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100" },
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

      {/* Asset Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assets.map(asset => {
          const cat = categoryIcon[asset.category] || categoryIcon.Maintenance
          const Icon = cat.icon
          return (
            <Card key={asset.id} className="card-hover shadow-sm bg-white border-gray-100 overflow-hidden">
              <div className={`h-1 ${asset.condition === "Good" ? "bg-emerald-500" : asset.condition === "Fair" ? "bg-amber-500" : "bg-red-500"}`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${cat.bg}`}>
                    <Icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${
                    asset.condition === "Good" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    asset.condition === "Fair" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {asset.condition}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{asset.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{asset.category} • Qty: {asset.qty}</p>
                <div className="space-y-1.5 mt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3 text-gray-400" />
                    <span>{asset.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span>Next check: {asset.nextCheck}</span>
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
