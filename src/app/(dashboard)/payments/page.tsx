"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Download, Search, IndianRupee, TrendingUp, Receipt, CalendarDays,
  Settings2, CreditCard, Building, Wallet, Bell, Shield, Zap,
  ChevronRight, ArrowUpRight, ArrowDownRight, BarChart3, PieChart,
  Clock, CheckCircle2, AlertCircle, XCircle, Send, FileText,
  Plus, ToggleLeft, Percent, Calculator, Banknote, QrCode,
  Smartphone, Globe, RefreshCw, Eye, Edit2, Trash2, Filter
} from "lucide-react"

// ─── Mock Data ────────────────────────────────────────────────
const payments = [
  { id: "INV-2026-009", tenant: "John Doe", flat: "A-402", type: "Maintenance", amount: "₹3,500", date: "Sep 05, 2026", due: "Sep 10, 2026", status: "Pending", method: "-" },
  { id: "INV-2026-008", tenant: "Sarah Smith", flat: "B-201", type: "Maintenance", amount: "₹3,500", date: "Aug 02, 2026", due: "Aug 05, 2026", status: "Paid", method: "UPI" },
  { id: "INV-2026-007", tenant: "Michael Raj", flat: "C-105", type: "Maintenance", amount: "₹3,500", date: "Jul 04, 2026", due: "Jul 05, 2026", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-006", tenant: "Priya Sharma", flat: "A-501", type: "Late Fee", amount: "₹500", date: "Jun 15, 2026", due: "Jun 10, 2026", status: "Overdue", method: "-" },
  { id: "INV-2026-005", tenant: "David Chen", flat: "B-602", type: "Maintenance", amount: "₹3,500", date: "Jun 02, 2026", due: "Jun 05, 2026", status: "Paid", method: "UPI" },
  { id: "INV-2026-004", tenant: "Anita Patel", flat: "C-304", type: "Security Deposit", amount: "₹50,000", date: "May 15, 2026", due: "May 15, 2026", status: "Paid", method: "Net Banking" },
  { id: "INV-2026-003", tenant: "Ravi Kumar", flat: "A-203", type: "Maintenance", amount: "₹3,500", date: "May 02, 2026", due: "May 05, 2026", status: "Paid", method: "UPI" },
  { id: "INV-2026-002", tenant: "Lisa Wang", flat: "B-104", type: "Parking Fee", amount: "₹1,200", date: "Apr 01, 2026", due: "Apr 05, 2026", status: "Paid", method: "Credit Card" },
]

const monthlyData = [
  { month: "Apr", collected: 82, pending: 18 },
  { month: "May", collected: 91, pending: 9 },
  { month: "Jun", collected: 87, pending: 13 },
  { month: "Jul", collected: 95, pending: 5 },
  { month: "Aug", collected: 93, pending: 7 },
  { month: "Sep", collected: 45, pending: 55 },
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [autoPayEnabled, setAutoPayEnabled] = useState(true)
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.flat.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payment Management</h1>
          <p className="text-sm text-gray-500">Advanced payment configuration, billing, and financial analytics.</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" className="bg-white rounded-xl font-medium border-gray-200" />}>
              <FileText className="w-4 h-4 mr-2" /> Generate Invoice
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Generate New Invoice</DialogTitle>
                <DialogDescription>Create a custom invoice for a tenant or broadcast billing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Tenant / Flat</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tenants</SelectItem>
                        <SelectItem value="a402">A-402 - John Doe</SelectItem>
                        <SelectItem value="b201">B-201 - Sarah Smith</SelectItem>
                        <SelectItem value="c105">C-105 - Michael Raj</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Invoice Type</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="parking">Parking Fee</SelectItem>
                        <SelectItem value="late_fee">Late Fee</SelectItem>
                        <SelectItem value="special">Special Assessment</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Amount (₹)</Label>
                    <Input placeholder="3,500" className="h-11 rounded-xl" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Due Date</Label>
                    <Input type="date" className="h-11 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Description</Label>
                  <Textarea placeholder="Optional notes for the invoice..." className="rounded-xl min-h-[80px]" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <Checkbox id="send-notify" defaultChecked />
                  <label htmlFor="send-notify" className="text-sm text-blue-800 font-medium cursor-pointer">
                    Send notification to tenant(s) upon generation
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium">
                  <FileText className="w-4 h-4 mr-2" /> Generate & Send Invoice
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
            <IndianRupee className="w-4 h-4 mr-1" /> Make Payment
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Collected", value: "₹4,85,200", change: "+12.5%", up: true, icon: IndianRupee, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-emerald-100" },
          { title: "Pending Amount", value: "₹24,500", change: "7 invoices", up: false, icon: Receipt, iconBg: "bg-red-50", iconColor: "text-red-500", border: "border-red-100" },
          { title: "Collection Rate", value: "94.2%", change: "+2.1%", up: true, icon: TrendingUp, iconBg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100" },
          { title: "Overdue", value: "₹4,000", change: "2 tenants", up: false, icon: AlertCircle, iconBg: "bg-amber-50", iconColor: "text-amber-500", border: "border-amber-100" },
        ].map((stat) => (
          <Card key={stat.title} className={`card-hover shadow-sm border ${stat.border} bg-white`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1.5 flex items-center gap-1 ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100/80 p-1 rounded-xl h-auto flex-wrap">
          {[
            { value: "overview", label: "Transactions", icon: Receipt },
            { value: "analytics", label: "Analytics", icon: BarChart3 },
            { value: "configuration", label: "Configuration", icon: Settings2 },
            { value: "gateway", label: "Payment Gateway", icon: CreditCard },
          ].map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium px-4 py-2 gap-2"
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ═══════════════════════ TRANSACTIONS TAB ═══════════════════════ */}
        <TabsContent value="overview" className="mt-6">
          <Card className="shadow-sm border-gray-100 bg-white rounded-xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold">All Transactions</CardTitle>
                  <CardDescription className="text-gray-500 mt-0.5">Complete payment history across all tenants</CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search tenant, invoice..."
                      className="pl-9 h-10 rounded-xl bg-gray-50/80 border-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
                    <SelectTrigger className="w-full sm:w-36 h-10 rounded-xl bg-gray-50/80 border-gray-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-600 h-10 px-3">
                    <Download className="h-4 w-4 mr-1.5" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Invoice</TableHead>
                    <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider w-[200px]">Tenant</TableHead>
                    <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Type</TableHead>
                    <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Due Date</TableHead>
                    <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Method</TableHead>
                    <TableHead className="text-right font-semibold text-gray-500 text-xs uppercase tracking-wider">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-right font-semibold text-gray-500 text-xs uppercase tracking-wider">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="font-semibold text-gray-900 text-sm">{payment.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-sm">{payment.tenant}</span>
                          <span className="text-xs text-gray-400">Flat {payment.flat}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${payment.type === "Late Fee" ? "text-red-600" : payment.type === "Security Deposit" ? "text-blue-600" : "text-gray-600"}`}>
                          {payment.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-gray-400" /> {payment.due}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">{payment.method}</TableCell>
                      <TableCell className="text-right font-bold text-gray-900 text-sm">{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs font-medium rounded-lg border ${
                          payment.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : payment.status === "Overdue"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {payment.status === "Paid" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {payment.status === "Overdue" && <XCircle className="w-3 h-3 mr-1" />}
                          {payment.status === "Pending" && <Clock className="w-3 h-3 mr-1" />}
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {payment.status !== "Paid" && (
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-xs font-medium">
                              <Send className="h-3.5 w-3.5 mr-1" /> Remind
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium px-2">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t border-gray-50 py-3 px-6 bg-gray-50/30">
              <div className="flex items-center justify-between w-full text-sm text-gray-500">
                <span>Showing {filteredPayments.length} of {payments.length} transactions</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-xs h-8 px-3" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-xs h-8 px-3 bg-blue-50 text-blue-700 border-blue-200">1</Button>
                  <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-xs h-8 px-3">Next</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ═══════════════════════ ANALYTICS TAB ═══════════════════════ */}
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-7">
            {/* Monthly Collection Chart */}
            <Card className="shadow-sm border-gray-100 bg-white lg:col-span-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Monthly Collection</CardTitle>
                    <CardDescription className="text-gray-500">Rent collection rate over the last 6 months</CardDescription>
                  </div>
                  <Select defaultValue="6m">
                    <SelectTrigger className="w-28 h-9 rounded-lg text-xs border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">Last 3 months</SelectItem>
                      <SelectItem value="6m">Last 6 months</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {/* Visual Bar Chart */}
                <div className="space-y-4">
                  {monthlyData.map((d) => (
                    <div key={d.month} className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-500 w-10">{d.month}</span>
                      <div className="flex-1 flex h-8 rounded-lg overflow-hidden bg-gray-100">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out flex items-center justify-end pr-2"
                          style={{ width: `${d.collected}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">{d.collected}%</span>
                        </div>
                        {d.pending > 10 && (
                          <div
                            className="bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center"
                            style={{ width: `${d.pending}%` }}
                          >
                            <span className="text-[10px] font-bold text-white">{d.pending}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-gray-500 font-medium">Collected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="text-xs text-gray-500 font-medium">Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Distribution */}
            <Card className="shadow-sm border-gray-100 bg-white lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Payment Breakdown</CardTitle>
                <CardDescription className="text-gray-500">Distribution by payment method</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {[
                  { method: "UPI", amount: "₹2,45,000", percent: 52, color: "bg-blue-500", bg: "bg-blue-50", icon: QrCode },
                  { method: "Credit Card", amount: "₹1,20,000", percent: 25, color: "bg-violet-500", bg: "bg-violet-50", icon: CreditCard },
                  { method: "Net Banking", amount: "₹85,200", percent: 18, color: "bg-emerald-500", bg: "bg-emerald-50", icon: Globe },
                  { method: "Cash/Cheque", amount: "₹35,000", percent: 5, color: "bg-amber-500", bg: "bg-amber-50", icon: Banknote },
                ].map(m => (
                  <div key={m.method} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${m.bg}`}>
                          <m.icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{m.method}</p>
                          <p className="text-xs text-gray-400">{m.amount}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{m.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full transition-all duration-700 ease-out`} style={{ width: `${m.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Top Defaulters */}
          <Card className="shadow-sm border-gray-100 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" /> Overdue Accounts
                  </CardTitle>
                  <CardDescription className="text-gray-500 mt-0.5">Tenants with outstanding payments past due date</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-xs font-medium">
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Send Bulk Reminder
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { name: "Priya Sharma", flat: "A-501", amount: "₹3,500", days: 25, type: "Maintenance" },
                  { name: "Amit Verma", flat: "D-102", amount: "₹500", days: 10, type: "Late Fee" },
                ].map((d) => (
                  <div key={d.flat} className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-gradient-to-r from-red-50/50 to-transparent hover:border-red-200 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                        {d.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{d.name}</p>
                        <p className="text-xs text-gray-400">Flat {d.flat} • {d.type}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-sm font-bold text-red-600">{d.amount}</p>
                        <p className="text-[10px] text-red-400 font-medium">{d.days} days overdue</p>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-lg text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ═══════════════════════ CONFIGURATION TAB ═══════════════════════ */}
        <TabsContent value="configuration" className="mt-6 space-y-6">
          {/* Billing Configuration */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50">
                    <Calculator className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">Billing Configuration</CardTitle>
                    <CardDescription className="text-gray-500 text-xs">Set up default billing amounts and cycles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Default Maintenance</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                      <Input defaultValue="3500" className="h-11 rounded-xl pl-7 border-gray-200 bg-gray-50/50 focus:bg-white" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Parking Fee</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                      <Input defaultValue="1200" className="h-11 rounded-xl pl-7 border-gray-200 bg-gray-50/50 focus:bg-white" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Billing Cycle</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Due Day of Month</Label>
                    <Select defaultValue="5">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st</SelectItem>
                        <SelectItem value="5">5th</SelectItem>
                        <SelectItem value="10">10th</SelectItem>
                        <SelectItem value="15">15th</SelectItem>
                        <SelectItem value="20">20th</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Tax / GST Rate</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <Input defaultValue="18" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white pr-8" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                    </div>
                    <Select defaultValue="inclusive">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inclusive">GST Inclusive</SelectItem>
                        <SelectItem value="exclusive">GST Exclusive</SelectItem>
                        <SelectItem value="none">No Tax</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Late Fee & Penalties */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-red-50">
                      <Percent className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">Late Fees & Penalties</CardTitle>
                      <CardDescription className="text-gray-500 text-xs">Configure overdue charges</CardDescription>
                    </div>
                  </div>
                  <button
                    onClick={() => setLateFeeEnabled(!lateFeeEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${lateFeeEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${lateFeeEnabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-5 transition-opacity duration-300 ${!lateFeeEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Grace Period</Label>
                    <Select defaultValue="5">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No grace period</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="10">10 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Fee Type</Label>
                    <Select defaultValue="fixed">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="daily">Daily Charge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Late Fee Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                      <Input defaultValue="500" className="h-11 rounded-xl pl-7 border-gray-200 bg-gray-50/50 focus:bg-white" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Max Late Fee Cap</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                      <Input defaultValue="2000" className="h-11 rounded-xl pl-7 border-gray-200 bg-gray-50/50 focus:bg-white" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">Late fee of ₹500 will be automatically applied after 5 days grace period. Maximum cap: ₹2,000 per invoice.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Auto-Pay & Reminders Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Auto-Pay Settings */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-50">
                      <Zap className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">Auto-Pay Settings</CardTitle>
                      <CardDescription className="text-gray-500 text-xs">Automated payment collection</CardDescription>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${autoPayEnabled ? 'bg-emerald-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${autoPayEnabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-4 transition-opacity duration-300 ${!autoPayEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Auto-debit Schedule</Label>
                  <Select defaultValue="due_date">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="due_date">On Due Date</SelectItem>
                      <SelectItem value="day_before">1 Day Before Due</SelectItem>
                      <SelectItem value="first">1st of Every Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Retry on Failure</Label>
                  <Select defaultValue="3">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No retry</SelectItem>
                      <SelectItem value="1">1 retry (24h gap)</SelectItem>
                      <SelectItem value="3">3 retries (24h gap)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <p className="text-xs text-emerald-700">32 tenants have auto-pay enabled</p>
                </div>
              </CardContent>
            </Card>

            {/* Reminder Configuration */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-50">
                      <Bell className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">Reminder Configuration</CardTitle>
                      <CardDescription className="text-gray-500 text-xs">Automated payment reminders</CardDescription>
                    </div>
                  </div>
                  <button
                    onClick={() => setReminderEnabled(!reminderEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${reminderEnabled ? 'bg-violet-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${reminderEnabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-4 transition-opacity duration-300 ${!reminderEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="space-y-3">
                  {[
                    { label: "3 days before due date", enabled: true, channels: "SMS, Email" },
                    { label: "On due date", enabled: true, channels: "SMS, Email, WhatsApp" },
                    { label: "3 days after due date", enabled: true, channels: "SMS, Email, WhatsApp" },
                    { label: "7 days after due date", enabled: false, channels: "SMS, WhatsApp, Call" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Checkbox defaultChecked={r.enabled} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{r.label}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{r.channels}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-700 rounded-lg h-8 w-8 p-0">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="rounded-xl border-gray-200 font-medium px-6">
              Reset to Defaults
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium px-8">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Save Configuration
            </Button>
          </div>
        </TabsContent>

        {/* ═══════════════════════ PAYMENT GATEWAY TAB ═══════════════════════ */}
        <TabsContent value="gateway" className="mt-6 space-y-6">
          {/* Gateway Status */}
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "UPI / QR Pay",
                icon: QrCode,
                status: "Active",
                statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                provider: "Razorpay",
                bg: "bg-blue-50",
                iconColor: "text-blue-600",
                desc: "Accept UPI payments via QR code or VPA"
              },
              {
                name: "Credit / Debit Card",
                icon: CreditCard,
                status: "Active",
                statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                provider: "Razorpay",
                bg: "bg-violet-50",
                iconColor: "text-violet-600",
                desc: "Visa, Mastercard, Rupay card processing"
              },
              {
                name: "Net Banking",
                icon: Globe,
                status: "Inactive",
                statusColor: "bg-gray-50 text-gray-500 border-gray-200",
                provider: "Not configured",
                bg: "bg-gray-50",
                iconColor: "text-gray-400",
                desc: "Direct bank transfer integration"
              },
            ].map((gw) => (
              <Card key={gw.name} className={`card-hover shadow-sm bg-white border-gray-100 overflow-hidden ${gw.status === "Inactive" ? "opacity-70" : ""}`}>
                <div className={`h-1 ${gw.status === "Active" ? "bg-emerald-500" : "bg-gray-300"}`} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${gw.bg}`}>
                      <gw.icon className={`h-6 w-6 ${gw.iconColor}`} />
                    </div>
                    <Badge variant="outline" className={`text-[10px] font-medium rounded-md border ${gw.statusColor}`}>
                      {gw.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{gw.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{gw.desc}</p>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Provider: {gw.provider}</span>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-xs font-medium h-7 px-2">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gateway Configuration */}
          <Card className="shadow-sm border-gray-100 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50">
                  <Shield className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Payment Gateway API Configuration</CardTitle>
                  <CardDescription className="text-gray-500 text-xs">Connect your payment processor credentials</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Payment Provider</Label>
                    <Select defaultValue="razorpay">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                        <SelectItem value="paytm">Paytm Payment Gateway</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="cashfree">Cashfree</SelectItem>
                        <SelectItem value="phonepe">PhonePe Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">API Key ID</Label>
                    <Input defaultValue="rzp_live_••••••••h7Kj" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white font-mono text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">API Secret Key</Label>
                    <Input type="password" defaultValue="secretkey123456" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white font-mono text-sm" />
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Environment</Label>
                    <Select defaultValue="live">
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test">Test / Sandbox</SelectItem>
                        <SelectItem value="live">Live / Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Webhook URL</Label>
                    <Input defaultValue="https://smartapt.in/api/webhook/payments" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white font-mono text-sm" readOnly />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Webhook Secret</Label>
                    <Input type="password" defaultValue="whsec_123456" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white font-mono text-sm" />
                  </div>
                </div>
              </div>

              {/* Settlement & Currency */}
              <Separator />
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Settlement Account</Label>
                  <Input defaultValue="HDFC •••• 4567" className="h-11 rounded-xl border-gray-200 bg-gray-50/50" readOnly />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Settlement Cycle</Label>
                  <Select defaultValue="t2">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t1">T+1 (Next Day)</SelectItem>
                      <SelectItem value="t2">T+2 (2 Days)</SelectItem>
                      <SelectItem value="t3">T+3 (3 Days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-gray-700">Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR (₹) Indian Rupee</SelectItem>
                      <SelectItem value="usd">USD ($) US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-800">Gateway Connected & Active</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Last tested: 2 hours ago • Webhook last received: 45 min ago</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-medium">
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* UPI Configuration */}
          <Card className="shadow-sm border-gray-100 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">UPI & QR Code Settings</CardTitle>
                  <CardDescription className="text-gray-500 text-xs">Configure UPI collection details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Society UPI ID</Label>
                    <Input defaultValue="smartapt.society@hdfcbank" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-gray-700">Display Name on UPI</Label>
                    <Input defaultValue="SmartApt Society Maintenance" className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <Checkbox defaultChecked />
                    <label className="text-xs text-blue-800 font-medium cursor-pointer">
                      Generate unique QR code for each invoice
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-inner">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-gray-300" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Society QR Preview</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="rounded-xl border-gray-200 font-medium px-6">
              Discard Changes
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium px-8">
              <Shield className="w-4 h-4 mr-2" /> Save Gateway Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
