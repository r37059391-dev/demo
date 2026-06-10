"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wrench, Dumbbell, Waves, Calendar, Clock, CheckCircle2, Users,
  Star, MapPin, Phone, ChevronRight, Sparkles, TreePine, Gamepad2,
  Baby, Coffee, BookOpen
} from "lucide-react"

const amenities = [
  { name: "Swimming Pool", icon: Waves, status: "Open", hours: "6 AM - 9 AM, 4 PM - 8 PM", nextAvail: "Now", color: "text-blue-600", bg: "bg-blue-50", capacity: "30 people", rating: "4.8" },
  { name: "Gym & Fitness", icon: Dumbbell, status: "Open", hours: "5:30 AM - 10 PM", nextAvail: "Now", color: "text-emerald-600", bg: "bg-emerald-50", capacity: "20 people", rating: "4.7" },
  { name: "Club House", icon: Coffee, status: "Available", hours: "8 AM - 10 PM", nextAvail: "Book now", color: "text-violet-600", bg: "bg-violet-50", capacity: "100 people", rating: "4.9" },
  { name: "Children's Play Area", icon: Baby, status: "Open", hours: "7 AM - 8 PM", nextAvail: "Now", color: "text-amber-600", bg: "bg-amber-50", capacity: "25 children", rating: "4.6" },
  { name: "Garden & Jogging Track", icon: TreePine, status: "Open", hours: "5 AM - 9 PM", nextAvail: "Now", color: "text-green-600", bg: "bg-green-50", capacity: "No limit", rating: "4.9" },
  { name: "Indoor Games Room", icon: Gamepad2, status: "Maintenance", hours: "9 AM - 9 PM", nextAvail: "Sep 10", color: "text-gray-400", bg: "bg-gray-50", capacity: "15 people", rating: "4.5" },
  { name: "Library & Reading Room", icon: BookOpen, status: "Open", hours: "8 AM - 9 PM", nextAvail: "Now", color: "text-indigo-600", bg: "bg-indigo-50", capacity: "12 people", rating: "4.8" },
]

const serviceRequests = [
  { id: "SR-201", service: "Plumber", desc: "Kitchen tap leaking", flat: "A-402", status: "In Progress", assigned: "Ramesh K.", eta: "Sep 7, 2 PM" },
  { id: "SR-200", service: "Electrician", desc: "MCB tripping in bedroom", flat: "B-201", status: "Scheduled", assigned: "Sunil P.", eta: "Sep 8, 10 AM" },
  { id: "SR-199", service: "Housekeeping", desc: "Deep cleaning - 2BHK", flat: "C-105", status: "Completed", assigned: "Kavita M.", eta: "Sep 4" },
  { id: "SR-198", service: "Carpenter", desc: "Wardrobe door repair", flat: "A-501", status: "Completed", assigned: "Ajay N.", eta: "Sep 3" },
  { id: "SR-197", service: "Pest Control", desc: "Quarterly pest control", flat: "B-602", status: "Scheduled", assigned: "PestFree Co.", eta: "Sep 10" },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("amenities")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Services & Facilities</h1>
          <p className="text-sm text-gray-500">Book amenities, request maintenance, and manage services.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
          <Wrench className="w-4 h-4 mr-2" /> Request Service
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100/80 p-1 rounded-xl h-auto">
          <TabsTrigger value="amenities" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium px-4 py-2 gap-2">
            <Sparkles className="h-4 w-4" /> Amenities
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium px-4 py-2 gap-2">
            <Wrench className="h-4 w-4" /> Service Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="amenities" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map(a => (
              <Card key={a.name} className={`card-hover shadow-sm bg-white overflow-hidden border-gray-100 ${a.status === "Maintenance" ? "opacity-70" : ""}`}>
                <div className={`h-1 ${a.status === "Open" || a.status === "Available" ? "bg-emerald-500" : "bg-gray-300"}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${a.bg}`}>
                      <a.icon className={`h-6 w-6 ${a.color}`} />
                    </div>
                    <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${
                      a.status === "Open" || a.status === "Available"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    }`}>
                      {a.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">{a.name}</h3>
                  <div className="space-y-2 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>{a.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-gray-400" />
                      <span>Capacity: {a.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-amber-400" />
                      <span>{a.rating} rating</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {a.status !== "Maintenance" ? (
                      <Button variant="outline" size="sm" className="w-full rounded-lg border-gray-200 text-xs font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                        <Calendar className="h-3 w-3 mr-1.5" /> Book Now
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full rounded-lg border-gray-200 text-xs font-medium" disabled>
                        Under Maintenance
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-6 space-y-3">
          {serviceRequests.map(sr => (
            <Card key={sr.id} className="card-hover shadow-sm border-gray-100 bg-white overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex">
                  <div className={`w-1.5 shrink-0 ${
                    sr.status === "Completed" ? "bg-emerald-500" :
                    sr.status === "In Progress" ? "bg-blue-500" : "bg-amber-500"
                  }`} />
                  <div className="flex-1 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl shrink-0 ${
                        sr.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                        sr.status === "In Progress" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-gray-900">{sr.service}</h3>
                          <Badge variant="outline" className="text-[10px] text-gray-500 bg-gray-50 border-gray-200 rounded-md font-medium">{sr.id}</Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{sr.desc} • Flat {sr.flat}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                          <span>Assigned: {sr.assigned}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {sr.eta}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs font-medium rounded-lg border ${
                      sr.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      sr.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {sr.status === "Completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {sr.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
