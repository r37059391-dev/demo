"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, User, FileText, CreditCard, MessageSquare, Menu, X,
  LogOut, Settings, Users, Building2, ChevronRight, ChevronDown,
  Car, UserCheck, Bell, Wrench, Package, BarChart3, ScrollText, Home, CalendarDays
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: { name: string; href: string }[]
}

const tenantNav: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Residential Unit", href: "/residential", icon: Home },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Complaints", href: "/complaints", icon: MessageSquare, badge: "1" },
  { name: "Visitors", href: "/visitors", icon: UserCheck },
  { name: "Services & Facility", href: "/services", icon: Wrench },
  { name: "Association Meetings", href: "/meetings", icon: CalendarDays },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: "3" },
]

const adminMainNav: NavItem[] = [
  { name: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Residential Units", href: "/residential", icon: Home },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Complaints", href: "/complaints", icon: MessageSquare, badge: "5" },
]

const adminManagementNav: NavItem[] = [
  {
    name: "Parking", href: "/parking", icon: Car,
    children: [
      { name: "Parking Slots", href: "/parking" },
      { name: "Assign Parking", href: "/parking?tab=assign" },
      { name: "Visitor Parking", href: "/parking?tab=visitor" },
    ]
  },
  {
    name: "Visitors", href: "/visitors", icon: UserCheck,
    children: [
      { name: "Today's Visitors", href: "/visitors" },
      { name: "Pre-Approve", href: "/visitors?tab=preapprove" },
      { name: "Visitor Log", href: "/visitors?tab=log" },
    ]
  },
  { name: "Notifications", href: "/notifications", icon: Bell },
  {
    name: "Services & Facility", href: "/services", icon: Wrench,
    children: [
      { name: "Amenity Booking", href: "/services" },
      { name: "Maintenance Requests", href: "/services?tab=maintenance" },
      { name: "Housekeeping", href: "/services?tab=housekeeping" },
    ]
  },
]

const adminAdministrationNav: NavItem[] = [
  { name: "Rules & Policies", href: "/rules", icon: ScrollText },
  { name: "Asset & Inventory", href: "/assets", icon: Package },
  { name: "Association Meetings", href: "/meetings", icon: CalendarDays },
  { name: "Reports", href: "/reports", icon: BarChart3 },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [role, setRole] = useState<string>("tenant")
  const [userName, setUserName] = useState<string>("")
  const [userUnit, setUserUnit] = useState<string>("")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    
    fetch("/api/auth/me", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setRole(data.user.role)
          setUserName(data.user.name)
          setUserUnit(data.user.block ? `Block ${data.user.block}, Flat ${data.user.unit}` : "Management Office")
        } else {
          router.push("/login")
        }
      })
      .catch(() => {
        router.push("/login")
      })
      .finally(() => clearTimeout(timeoutId))
      
    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [])

  const toggleExpand = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.name)

    return (
      <li key={item.name}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpand(item.name)}
              className={`w-full group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm shadow-primary/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`p-1.5 rounded-lg ${active ? "bg-primary/20" : "bg-gray-100 group-hover:bg-gray-200"} transition-colors`}>
                <item.icon className={`h-4 w-4 ${active ? "text-primary" : "text-gray-500 group-hover:text-gray-700"}`} />
              </div>
              {item.name}
              {item.badge && (
                <span className="ml-auto mr-1 min-w-[20px] h-5 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-[10px] font-bold px-1.5">
                  {item.badge}
                </span>
              )}
              <ChevronDown className={`ml-auto h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
            {isExpanded && (
              <ul className="mt-1 ml-[42px] space-y-0.5 border-l-2 border-gray-100 pl-3">
                {item.children!.map(child => (
                  <li key={child.name}>
                    <Link
                      href={child.href}
                      className={`block text-xs font-medium py-1.5 px-2 rounded-lg transition-colors ${
                        pathname === child.href
                          ? "text-primary bg-primary/10"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm shadow-primary/20"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${active ? "bg-primary/20" : "bg-gray-100 group-hover:bg-gray-200"} transition-colors`}>
              <item.icon className={`h-4 w-4 ${active ? "text-primary" : "text-gray-500 group-hover:text-gray-700"}`} />
            </div>
            {item.name}
            {item.badge && (
              <span className="ml-auto min-w-[20px] h-5 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-[10px] font-bold px-1.5">
                {item.badge}
              </span>
            )}
            {active && !item.badge && <ChevronRight className="ml-auto h-4 w-4 text-primary/60" />}
          </Link>
        )}
      </li>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/80 flex">
      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:w-[280px] lg:flex-col shadow-xl lg:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex h-[72px] shrink-0 items-center px-6 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[#D4894A] flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Smart<span className="text-gradient">Apt</span></span>
          </Link>
          <button
            type="button"
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col px-4 py-5 overflow-y-auto scrollbar-thin">
          {role === 'admin' ? (
            <>
              <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Admin Menu</p>
              <ul className="space-y-0.5">
                {adminMainNav.map(renderNavItem)}
              </ul>

              <div className="mt-6">
                <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Management</p>
                <ul className="space-y-0.5">
                  {adminManagementNav.map(renderNavItem)}
                </ul>
              </div>

              <div className="mt-6">
                <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Administration</p>
                <ul className="space-y-0.5">
                  {adminAdministrationNav.map(renderNavItem)}
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Tenant Menu</p>
              <ul className="space-y-0.5">
                {tenantNav.map(renderNavItem)}
              </ul>
            </>
          )}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-100">
          <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button 
            onClick={async () => {
              try {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 5000)
                await fetch('/api/auth/logout', { method: 'POST', signal: controller.signal })
                clearTimeout(timeoutId)
              } catch (e) {}
              if (typeof window !== 'undefined') {
                localStorage.removeItem('userRole')
                localStorage.removeItem('userName')
                localStorage.removeItem('userId')
              }
              router.push('/login')
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-1"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col w-full overflow-hidden">
        {/* Top Header */}
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-lg px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400">
            <Building2 className="h-4 w-4" />
            <span>/</span>
            <span className="text-gray-700 font-medium capitalize">
              {pathname === "/dashboard" ? "Dashboard" : pathname.replace("/", "").replace(/-/g, " ")}
            </span>
          </div>

          <Link href="/profile" className="ml-auto flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{userName || (role === 'admin' ? 'Admin User' : 'User')}</p>
              <p className="text-xs text-gray-500">{userUnit || (role === 'admin' ? 'Management Office' : '')}</p>
            </div>
            <div className="relative">
              <Avatar className="border-2 border-primary/20 ring-2 ring-primary/5">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">JD</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
