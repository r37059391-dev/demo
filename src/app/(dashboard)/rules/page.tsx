"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ScrollText, Search, Plus, ChevronDown, ChevronRight, Clock, Shield,
  AlertCircle, CheckCircle2, Edit2, Trash2, Eye, Building, Car,
  Dog, Volume2, Cigarette, Flame, Users, Baby, Moon, Wrench,
  Megaphone, Download, Send, FileText, BookOpen, Scale, Home,
  Droplets, Zap, TreePine, PartyPopper, HelpCircle
} from "lucide-react"

// ─── Rule Categories ─────────────────────────────────────────
const ruleCategories = [
  {
    id: "general",
    name: "General Society Rules",
    icon: Building,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    rules: [
      { id: 1, title: "Quiet Hours Policy", desc: "Maintain silence between 10:00 PM to 7:00 AM. No loud music, parties, or construction noise during these hours. Weekend extensions: until 11:00 PM on Fridays and Saturdays.", priority: "High", status: "Active", updated: "Jan 15, 2026" },
      { id: 2, title: "Common Area Usage", desc: "Common areas like lobby, corridors, and staircases must be kept clean. No personal items to be placed in common areas. Shoes must be kept inside shoe racks only.", priority: "Medium", status: "Active", updated: "Jan 15, 2026" },
      { id: 3, title: "Waste Management", desc: "Segregate waste into wet, dry, and e-waste categories. Place garbage bags at designated collection points between 7:00 AM - 9:00 AM only. Composting facility available in Block D.", priority: "High", status: "Active", updated: "Mar 02, 2026" },
      { id: 4, title: "Guest Entry After Hours", desc: "All guests arriving after 10:00 PM must be registered with security. Overnight guests require prior intimation to the management office at least 24 hours in advance.", priority: "Medium", status: "Active", updated: "Jan 15, 2026" },
    ]
  },
  {
    id: "parking",
    name: "Parking & Vehicle Rules",
    icon: Car,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    rules: [
      { id: 5, title: "Assigned Parking Only", desc: "Vehicles must be parked in designated spots only. Each apartment is allotted one covered parking and one open parking spot. Additional parking is available on request (₹1,200/month).", priority: "High", status: "Active", updated: "Feb 10, 2026" },
      { id: 6, title: "Speed Limit Within Premises", desc: "Maximum speed limit within the society premises is 15 km/h. Speed breakers are installed at key intersections. Violators will be issued warnings.", priority: "High", status: "Active", updated: "Feb 10, 2026" },
      { id: 7, title: "Visitor Parking", desc: "Visitors must use designated visitor parking spots near the main gate. Maximum parking duration: 4 hours. Overnight visitor parking requires security approval.", priority: "Medium", status: "Active", updated: "Feb 10, 2026" },
      { id: 8, title: "EV Charging Policy", desc: "EV charging stations are available in Basement 2. Charging is billed at ₹12/unit. Personal charging setups require society committee approval.", priority: "Low", status: "Active", updated: "Apr 20, 2026" },
    ]
  },
  {
    id: "pets",
    name: "Pet Policy",
    icon: Dog,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    rules: [
      { id: 9, title: "Pet Registration", desc: "All pets must be registered with the management office with vaccination certificates. Annual re-registration is mandatory. Maximum 2 pets per apartment.", priority: "High", status: "Active", updated: "Mar 15, 2026" },
      { id: 10, title: "Leash & Common Area Rules", desc: "Pets must be on leash in all common areas. Pet owners are responsible for cleaning up after their pets. Pets are not allowed in the swimming pool area, gym, and children's play area.", priority: "High", status: "Active", updated: "Mar 15, 2026" },
      { id: 11, title: "Pet Walking Hours", desc: "Designated pet walking areas: Garden path near Block C and the rear garden. Walking hours: 6:00 AM - 9:00 AM and 5:00 PM - 8:00 PM.", priority: "Medium", status: "Active", updated: "Mar 15, 2026" },
    ]
  },
  {
    id: "safety",
    name: "Safety & Security",
    icon: Shield,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    rules: [
      { id: 12, title: "No Smoking Policy", desc: "Smoking is strictly prohibited in all common areas including corridors, lifts, parking areas, and club house. Designated smoking zone available near Block A entrance.", priority: "High", status: "Active", updated: "Jan 15, 2026" },
      { id: 13, title: "Fire Safety Compliance", desc: "Do not block fire exits or tamper with fire safety equipment. Fire drills are conducted quarterly — participation is mandatory. Report any fire hazards immediately to security.", priority: "High", status: "Active", updated: "Jan 15, 2026" },
      { id: 14, title: "CCTV & Surveillance", desc: "CCTV cameras are operational 24/7 in all common areas. Footage is retained for 90 days. Privacy in residential corridors is maintained with limited camera angles.", priority: "Medium", status: "Active", updated: "Jan 15, 2026" },
      { id: 15, title: "Emergency Protocols", desc: "Emergency assembly point: Main garden near Block B. Emergency contact: Security desk (ext. 100), Fire: 101, Ambulance: 102. First aid kits available at every floor reception.", priority: "High", status: "Active", updated: "Jun 01, 2026" },
    ]
  },
  {
    id: "amenity",
    name: "Amenity & Facility Rules",
    icon: TreePine,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    rules: [
      { id: 16, title: "Swimming Pool Rules", desc: "Pool hours: 6:00 AM - 9:00 AM and 4:00 PM - 8:00 PM. Swimming cap mandatory. Children under 12 must be accompanied by an adult. Pool closed on Mondays for maintenance.", priority: "Medium", status: "Active", updated: "Apr 01, 2026" },
      { id: 17, title: "Gym & Fitness Center", desc: "Gym hours: 5:30 AM - 10:00 PM. Proper workout attire required. Wipe down equipment after use. Personal trainers allowed only with management approval.", priority: "Medium", status: "Active", updated: "Apr 01, 2026" },
      { id: 18, title: "Club House Booking", desc: "Club house can be booked for private events up to 30 days in advance. Security deposit: ₹5,000. Noise must cease by 10:00 PM. Cleaning fee: ₹2,000.", priority: "Medium", status: "Active", updated: "Apr 01, 2026" },
    ]
  },
  {
    id: "lease",
    name: "Lease & Move-in/out",
    icon: Home,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    rules: [
      { id: 19, title: "Lease Terms & Rent", desc: "Minimum lease period: 11 months. Rent is due by the 5th of every month. Late payment fee: ₹500 after 5-day grace period. Rent escalation: 5% annually.", priority: "High", status: "Active", updated: "Jan 01, 2026" },
      { id: 20, title: "Move-in Requirements", desc: "Submit all KYC documents, signed rental agreement, and security deposit before move-in. Police verification must be completed within 15 days of moving in.", priority: "High", status: "Active", updated: "Jan 01, 2026" },
      { id: 21, title: "Move-out Process", desc: "Provide 30-day written notice before vacating. Apartment inspection by management required. Security deposit refunded within 45 days after deducting any damages.", priority: "High", status: "Active", updated: "Jan 01, 2026" },
      { id: 22, title: "Renovation & Interiors", desc: "Interior modifications require written approval from the management committee. Work hours for renovation: 9:00 AM - 6:00 PM (weekdays only). No structural changes allowed.", priority: "Medium", status: "Active", updated: "May 20, 2026" },
    ]
  },
]

// ─── FAQ Data ────────────────────────────────────────────────
const faqs = [
  { q: "How much is the rent?", a: "Rent varies by apartment type: 1 BHK (₹15,000-18,000), 2 BHK (₹22,000-28,000), 3 BHK (₹32,000-40,000), Villa (₹55,000-70,000). All rents are exclusive of maintenance charges (₹3,500/month)." },
  { q: "What are the lease terms?", a: "Minimum lease period is 11 months with an option to renew. Security deposit is equivalent to 2 months' rent. Rent is due by the 5th of every month with a 5-day grace period." },
  { q: "What's required to move in?", a: "You need: Aadhaar card, PAN card (optional), passport-size photos, signed rental agreement, security deposit payment, and police verification application. All documents can be uploaded through the SmartApt portal." },
  { q: "What's your pet policy?", a: "Pets are allowed with registration. Maximum 2 pets per apartment. All pets must have valid vaccination certificates. Pets must be leashed in common areas and are restricted from pool, gym, and playground." },
  { q: "What are the quiet hours?", a: "Quiet hours are from 10:00 PM to 7:00 AM on weekdays, extended to 11:00 PM on Fridays and Saturdays. No loud music, construction, or party noises during these hours." },
  { q: "How do I book amenities?", a: "Use the Services & Facility section in your SmartApt dashboard. You can book the club house, tennis court, or party hall up to 30 days in advance. A refundable security deposit is required for bookings." },
  { q: "What is the guest entry process?", a: "Guests during regular hours (7 AM - 10 PM) can walk in after verification. After 10 PM, guests must be pre-registered with security. Overnight guests require 24-hour prior intimation." },
  { q: "How do I report maintenance issues?", a: "Raise a complaint through the Complaints section in your dashboard. Select the category (plumbing, electrical, carpentry, etc.), describe the issue, and set priority. You'll receive updates via SMS and email." },
]

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState("rules")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["general"])
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([0])

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const filteredCategories = ruleCategories.map(cat => ({
    ...cat,
    rules: cat.rules.filter(r =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.rules.length > 0)

  const totalRules = ruleCategories.reduce((sum, c) => sum + c.rules.length, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Rules & Policies</h1>
          <p className="text-sm text-gray-500">Society rules, policies, and frequently asked questions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white rounded-xl font-medium border-gray-200">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Dialog>
            <DialogTrigger render={<Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium" />}>
              <Plus className="w-4 h-4 mr-2" /> Add Rule
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Add New Rule</DialogTitle>
                <DialogDescription>Create a new society rule or policy that will be visible to all tenants.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Category</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {ruleCategories.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Priority</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Priority" />
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
                  <Label className="text-sm font-semibold text-gray-700">Rule Title</Label>
                  <Input placeholder="Enter rule title..." className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Description</Label>
                  <Textarea placeholder="Describe the rule in detail..." className="min-h-[120px] rounded-xl" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <Checkbox defaultChecked />
                  <label className="text-xs text-blue-800 font-medium cursor-pointer">
                    Notify all tenants about this new rule
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium">
                  <Plus className="w-4 h-4 mr-2" /> Publish Rule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Rules", value: totalRules.toString(), icon: ScrollText, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100" },
          { title: "Categories", value: ruleCategories.length.toString(), icon: BookOpen, bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-100" },
          { title: "Active Rules", value: totalRules.toString(), icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-100" },
          { title: "FAQs", value: faqs.length.toString(), icon: HelpCircle, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100" },
        ].map(stat => (
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100/80 p-1 rounded-xl h-auto">
          <TabsTrigger value="rules" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium px-4 py-2 gap-2">
            <ScrollText className="h-4 w-4" /> Society Rules
          </TabsTrigger>
          <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium px-4 py-2 gap-2">
            <HelpCircle className="h-4 w-4" /> FAQs
          </TabsTrigger>
          <TabsTrigger value="announcements" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium px-4 py-2 gap-2">
            <Megaphone className="h-4 w-4" /> Announcements
          </TabsTrigger>
        </TabsList>

        {/* ═══════════ RULES TAB ═══════════ */}
        <TabsContent value="rules" className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search rules and policies..."
              className="pl-9 h-10 rounded-xl bg-white border-gray-200 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Rule Categories */}
          <div className="space-y-4">
            {filteredCategories.map(cat => {
              const isExpanded = expandedCategories.includes(cat.id)
              return (
                <Card key={cat.id} className="shadow-sm border-gray-100 bg-white overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${cat.bg}`}>
                        <cat.icon className={`h-5 w-5 ${cat.color}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-semibold text-gray-900">{cat.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{cat.rules.length} rules</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${cat.border} ${cat.bg} ${cat.color}`}>
                        {cat.rules.length} Active
                      </Badge>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-50">
                      {cat.rules.map((rule, i) => (
                        <div key={rule.id}>
                          {i > 0 && <Separator />}
                          <div className="p-5 hover:bg-gray-50/30 transition-colors group">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-sm font-semibold text-gray-900">{rule.title}</h4>
                                  <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${
                                    rule.priority === "High" ? "bg-red-50 text-red-600 border-red-100" :
                                    rule.priority === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                    "bg-gray-50 text-gray-500 border-gray-200"
                                  }`}>
                                    {rule.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{rule.desc}</p>
                                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Updated {rule.updated}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {rule.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                                  <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* ═══════════ FAQ TAB ═══════════ */}
        <TabsContent value="faq" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-sm text-gray-500 mt-0.5">Common questions from tenants and visitors</p>
            </div>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" className="rounded-xl border-gray-200 font-medium" />}>
                <Plus className="w-4 h-4 mr-2" /> Add FAQ
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add FAQ</DialogTitle>
                  <DialogDescription>Add a common question and its answer for tenants.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Question</Label>
                    <Input placeholder="Enter the question..." className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Answer</Label>
                    <Textarea placeholder="Provide a detailed answer..." className="min-h-[120px] rounded-xl" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium">
                    Add FAQ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = expandedFaqs.includes(i)
              return (
                <Card key={i} className="shadow-sm border-gray-100 bg-white overflow-hidden">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div className={`w-1 h-8 rounded-full shrink-0 ${isOpen ? "bg-blue-500" : "bg-gray-200"} transition-colors`} />
                    <div className="flex-1">
                      <h3 className={`text-sm font-semibold transition-colors ${isOpen ? "text-blue-700" : "text-gray-900"}`}>
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <div className="ml-5 pl-4 border-l-2 border-blue-100">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* ═══════════ ANNOUNCEMENTS TAB ═══════════ */}
        <TabsContent value="announcements" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Policy Announcements</h2>
              <p className="text-sm text-gray-500 mt-0.5">Updates and changes to society rules</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
              <Megaphone className="w-4 h-4 mr-2" /> New Announcement
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { title: "Updated Quiet Hours for Festival Season", date: "Sep 01, 2026", tag: "Policy Update", tagColor: "bg-blue-50 text-blue-600 border-blue-100", body: "During the upcoming festival season (Sep 15 - Oct 15), quiet hours will be relaxed to 11:00 PM on all days. However, firecrackers are strictly prohibited within society premises. Green celebration guidelines are attached.", author: "Management Committee" },
              { title: "New EV Charging Stations Installed", date: "Aug 25, 2026", tag: "Facility", tagColor: "bg-emerald-50 text-emerald-600 border-emerald-100", body: "4 new EV charging stations have been installed in Basement 2. Charging is available 24/7 at ₹12/unit. Please use the SmartApt app to book a charging slot. Each session is limited to 4 hours.", author: "Infrastructure Team" },
              { title: "Revised Parking Allocation Policy", date: "Aug 10, 2026", tag: "Policy Update", tagColor: "bg-blue-50 text-blue-600 border-blue-100", body: "Starting September 1, parking allocation will be revised. Each 2 BHK unit gets 1 covered + 1 open spot. Additional parking requests will be processed on a first-come-first-served basis at ₹1,500/month.", author: "Management Committee" },
              { title: "Swimming Pool Maintenance Notice", date: "Jul 28, 2026", tag: "Maintenance", tagColor: "bg-amber-50 text-amber-600 border-amber-100", body: "The swimming pool will be closed from August 1-7 for annual deep cleaning and maintenance. We apologize for the inconvenience. The pool will reopen on August 8 with extended hours.", author: "Facility Manager" },
            ].map((ann, i) => (
              <Card key={i} className="shadow-sm border-gray-100 bg-white card-hover overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${ann.tagColor}`}>
                          {ann.tag}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {ann.date}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">{ann.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{ann.body}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{ann.author}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
