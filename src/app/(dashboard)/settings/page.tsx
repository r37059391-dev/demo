"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Settings as SettingsIcon, Bell, Shield, Key, Moon, Sun, Monitor,
  Smartphone, Mail, Lock, CreditCard, User, Building, Save
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [theme, setTheme] = useState("system")

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-blue-600" : "text-gray-400"}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "general" && (
            <>
              <Card className="shadow-sm border-gray-100 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Appearance</CardTitle>
                  <CardDescription>Customize how SmartApt looks on your device.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        theme === "light" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-gray-100 hover:border-gray-200 text-gray-600"
                      }`}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        theme === "dark" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-gray-100 hover:border-gray-200 text-gray-600"
                      }`}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        theme === "system" ? "border-blue-600 bg-blue-50/50 text-blue-700" : "border-gray-100 hover:border-gray-200 text-gray-600"
                      }`}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-gray-100 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Language & Region</CardTitle>
                  <CardDescription>Set your preferred language and timezone.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="h-11 rounded-xl bg-white border-gray-200">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English (US)</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="mr">Marathi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Timezone</Label>
                      <Select defaultValue="ist">
                        <SelectTrigger className="h-11 rounded-xl bg-white border-gray-200">
                          <SelectValue placeholder="Select Timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                          <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "notifications" && (
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you want to receive and how.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: "Maintenance Alerts", desc: "Receive updates about maintenance requests", default: true },
                  { title: "Payment Reminders", desc: "Get notified before rent and maintenance due dates", default: true },
                  { title: "Visitor Approvals", desc: "Notifications when visitors arrive at the gate", default: true },
                  { title: "Society Announcements", desc: "Important notices from the management committee", default: true },
                  { title: "Promotional Offers", desc: "Special offers from partnered local vendors", default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </div>
                ))}

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Notification Channels</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 text-gray-500"><Mail className="h-4 w-4" /></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-500">Sent to john.doe@example.com</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 text-gray-500"><Smartphone className="h-4 w-4" /></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-xs text-gray-500">Sent to +91 98765 43210</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Confirm New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200">Update Password</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200">Enable</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Billing & Subscription</CardTitle>
                <CardDescription>Manage your payment methods and plans.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">Premium Resident Plan</span>
                    </div>
                    <p className="text-xs text-gray-500">Includes all standard amenities + priority support</p>
                  </div>
                  <Badge className="bg-blue-600">Active</Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900">Payment Methods</h4>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg"><CreditCard className="h-4 w-4 text-gray-600" /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">HDFC Bank Credit Card</p>
                        <p className="text-xs text-gray-500">Ending in •••• 4242</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-gray-200 border-dashed">
                    + Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
