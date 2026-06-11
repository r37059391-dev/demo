// In-memory data store — acts as our database
// Can be swapped to Supabase/Postgres later

export type User = {
  id: string
  email: string
  password: string
  role: "tenant" | "admin"
  name: string
  avatar?: string
  unit?: string
  block?: string
  phone?: string
  leaseEnd?: string
}

export type Payment = {
  id: string
  userId: string
  month: string
  amount: number
  status: "paid" | "pending" | "overdue"
  dueDate: string
  paidDate?: string
}

export type Complaint = {
  id: string
  userId: string
  userName: string
  unit: string
  category: string
  title: string
  description: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

export type Visitor = {
  id: string
  userId: string
  name: string
  phone: string
  purpose: string
  unit: string
  status: "expected" | "checked_in" | "checked_out"
  expectedAt: string
  checkedInAt?: string
  checkedOutAt?: string
}

export type Meeting = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  status: "upcoming" | "past" | "cancelled"
  type: "AGM" | "Monthly" | "Emergency" | "Committee"
  createdBy: string
  rsvps: { userId: string; status: "attending" | "not_attending" }[]
}

export type Announcement = {
  id: string
  title: string
  content: string
  tag: "Alert" | "Event" | "Notice" | "Update"
  createdAt: string
  createdBy: string
}

export type Notification = {
  id: string
  userId: string
  title: string
  message: string
  type: "payment" | "complaint" | "visitor" | "meeting" | "general"
  read: boolean
  createdAt: string
}

export type Document = {
  id: string
  userId: string
  name: string
  type: "lease" | "kyc" | "noc" | "receipt" | "other"
  status: "verified" | "pending" | "rejected"
  uploadedAt: string
  fileUrl?: string
}

export type ServiceRequest = {
  id: string
  userId: string
  userName: string
  service: string
  description: string
  status: "pending" | "in_progress" | "completed"
  createdAt: string
}

export type Rule = {
  id: string
  category: string
  title: string
  description: string
  isActive: boolean
  createdAt: string
}

export type Asset = {
  id: string
  name: string
  category: string
  location: string
  status: "operational" | "maintenance" | "replaced"
  lastChecked: string
  nextCheck: string
}

// ─── Seed Data ───────────────────────────────────────────────

const users: User[] = [
  {
    id: "u1",
    email: "rajan@gmail.com",
    password: "12345",
    role: "tenant",
    name: "Rajan Kumar",
    unit: "402",
    block: "A",
    phone: "+91 98765 43210",
    leaseEnd: "2027-10-12",
  },
  {
    id: "u2",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    phone: "+91 98765 00000",
  },
  {
    id: "u3",
    email: "priya@gmail.com",
    password: "priya123",
    role: "tenant",
    name: "Priya Sharma",
    unit: "301",
    block: "B",
    phone: "+91 99887 65432",
    leaseEnd: "2027-06-15",
  },
]

const payments: Payment[] = [
  { id: "p1", userId: "u1", month: "September 2026", amount: 3500, status: "pending", dueDate: "2026-09-05" },
  { id: "p2", userId: "u1", month: "August 2026", amount: 3500, status: "paid", dueDate: "2026-08-05", paidDate: "2026-08-02" },
  { id: "p3", userId: "u1", month: "July 2026", amount: 3500, status: "paid", dueDate: "2026-07-05", paidDate: "2026-07-04" },
  { id: "p4", userId: "u1", month: "June 2026", amount: 3500, status: "paid", dueDate: "2026-06-05", paidDate: "2026-06-01" },
  { id: "p5", userId: "u3", month: "September 2026", amount: 3500, status: "pending", dueDate: "2026-09-05" },
  { id: "p6", userId: "u3", month: "August 2026", amount: 3500, status: "paid", dueDate: "2026-08-05", paidDate: "2026-08-03" },
]

const complaints: Complaint[] = [
  {
    id: "c1", userId: "u1", userName: "Rajan Kumar", unit: "A-402",
    category: "Plumbing", title: "Leaking kitchen faucet",
    description: "The kitchen faucet has been leaking steadily for 2 days. Water pressure is also low.",
    status: "in_progress", priority: "medium",
    createdAt: "2026-09-01T10:30:00Z", updatedAt: "2026-09-02T14:00:00Z",
  },
  {
    id: "c2", userId: "u3", userName: "Priya Sharma", unit: "B-301",
    category: "Electrical", title: "Power outage in bedroom",
    description: "Bedroom circuit breaker trips every time the AC is turned on.",
    status: "open", priority: "high",
    createdAt: "2026-09-03T08:15:00Z", updatedAt: "2026-09-03T08:15:00Z",
  },
  {
    id: "c3", userId: "u1", userName: "Rajan Kumar", unit: "A-402",
    category: "Pest Control", title: "Cockroach infestation",
    description: "Multiple cockroaches spotted in the kitchen area over the past week.",
    status: "resolved", priority: "low",
    createdAt: "2026-08-20T09:00:00Z", updatedAt: "2026-08-25T16:00:00Z",
  },
]

const visitors: Visitor[] = [
  {
    id: "v1", userId: "u1", name: "Amit Verma", phone: "+91 88776 54321",
    purpose: "Delivery - Amazon", unit: "A-402", status: "expected",
    expectedAt: "2026-09-05T14:00:00Z",
  },
  {
    id: "v2", userId: "u1", name: "Meena Devi", phone: "+91 77665 43210",
    purpose: "Family Visit", unit: "A-402", status: "expected",
    expectedAt: "2026-09-05T16:00:00Z",
  },
  {
    id: "v3", userId: "u3", name: "Rahul Singh", phone: "+91 66554 32109",
    purpose: "Plumber - Maintenance", unit: "B-301", status: "checked_in",
    expectedAt: "2026-09-05T10:00:00Z", checkedInAt: "2026-09-05T10:15:00Z",
  },
]

const meetings: Meeting[] = [
  {
    id: "m1", title: "Annual General Meeting 2026",
    date: "Oct 15, 2026", time: "10:00 AM - 1:00 PM",
    location: "Clubhouse Main Hall",
    description: "Annual review of finances, major maintenance updates, and election of new committee members. All residents are requested to attend.",
    status: "upcoming", type: "AGM", createdBy: "u2",
    rsvps: [{ userId: "u1", status: "attending" }, { userId: "u3", status: "attending" }],
  },
  {
    id: "m2", title: "Monthly Maintenance Committee Sync",
    date: "Oct 5, 2026", time: "6:00 PM - 7:30 PM",
    location: "Virtual (Zoom Link to be shared)",
    description: "Discussing the upcoming plumbing overhaul for Block C and the new security gate installation timeline.",
    status: "upcoming", type: "Committee", createdBy: "u2",
    rsvps: [{ userId: "u1", status: "not_attending" }],
  },
  {
    id: "m3", title: "Emergency Security Briefing",
    date: "Sep 28, 2026", time: "7:00 PM - 8:00 PM",
    location: "Central Courtyard",
    description: "Briefing regarding the new visitor management protocols and CCTV upgrades.",
    status: "past", type: "Emergency", createdBy: "u2",
    rsvps: [{ userId: "u1", status: "attending" }, { userId: "u3", status: "attending" }],
  },
]

const announcements: Announcement[] = [
  { id: "a1", title: "Water Supply Interruption", content: "Water supply will be interrupted on Sep 6 from 10 AM to 2 PM for tank cleaning.", tag: "Alert", createdAt: "2026-09-05T10:00:00Z", createdBy: "u2" },
  { id: "a2", title: "Upcoming Festival Celebration", content: "Join us for the community Navratri celebration on Oct 3rd at the clubhouse!", tag: "Event", createdAt: "2026-09-04T16:30:00Z", createdBy: "u2" },
  { id: "a3", title: "Lift Maintenance Schedule", content: "Lift B will be under maintenance on Sep 10-11. Please use Lift A.", tag: "Notice", createdAt: "2026-08-28T09:00:00Z", createdBy: "u2" },
  { id: "a4", title: "Parking Rules Update", content: "New visitor parking rules effective from Oct 1. Please read the updated policy.", tag: "Notice", createdAt: "2026-08-25T11:00:00Z", createdBy: "u2" },
]

const notifications: Notification[] = [
  { id: "n1", userId: "u1", title: "Payment Due", message: "Your September maintenance bill of ₹3,500 is due on Sep 5.", type: "payment", read: false, createdAt: "2026-09-01T08:00:00Z" },
  { id: "n2", userId: "u1", title: "Complaint Updated", message: "Your plumbing complaint has been assigned to a technician.", type: "complaint", read: false, createdAt: "2026-09-02T14:00:00Z" },
  { id: "n3", userId: "u1", title: "Visitor Arriving", message: "Amit Verma (Amazon Delivery) is expected today at 2 PM.", type: "visitor", read: false, createdAt: "2026-09-05T08:00:00Z" },
  { id: "n4", userId: "u1", title: "AGM Scheduled", message: "Annual General Meeting scheduled for Oct 15 at Clubhouse.", type: "meeting", read: true, createdAt: "2026-08-30T10:00:00Z" },
]

const documents: Document[] = [
  { id: "d1", userId: "u1", name: "Rental Agreement", type: "lease", status: "verified", uploadedAt: "2026-01-15T10:00:00Z" },
  { id: "d2", userId: "u1", name: "Aadhaar Card", type: "kyc", status: "verified", uploadedAt: "2026-01-15T10:05:00Z" },
  { id: "d3", userId: "u1", name: "NOC from Previous Society", type: "noc", status: "pending", uploadedAt: "2026-09-01T09:00:00Z" },
]

const serviceRequests: ServiceRequest[] = [
  { id: "sr1", userId: "u1", userName: "Rajan Kumar", service: "AC Maintenance", description: "Annual AC servicing for split AC in bedroom", status: "in_progress", createdAt: "2026-09-02T11:00:00Z" },
  { id: "sr2", userId: "u3", userName: "Priya Sharma", service: "Deep Cleaning", description: "Full apartment deep cleaning", status: "pending", createdAt: "2026-09-04T09:00:00Z" },
]

const rules: Rule[] = [
  { id: "r1", category: "General", title: "Quiet Hours", description: "Quiet hours are between 10 PM and 7 AM. Loud music or construction noises are not permitted.", isActive: true, createdAt: "2026-01-01T00:00:00Z" },
  { id: "r2", category: "Parking", title: "Visitor Parking", description: "Visitors must park in designated visitor slots only. Max 4 hours per visit.", isActive: true, createdAt: "2026-01-01T00:00:00Z" },
  { id: "r3", category: "Pets", title: "Pet Policy", description: "Pets must be leashed in common areas. Owners must clean up after their pets.", isActive: true, createdAt: "2026-01-01T00:00:00Z" },
  { id: "r4", category: "Maintenance", title: "Renovation Hours", description: "Renovation work is allowed only between 9 AM and 6 PM on weekdays.", isActive: true, createdAt: "2026-01-01T00:00:00Z" },
]

const assets: Asset[] = [
  { id: "as1", name: "Swimming Pool Pump", category: "Amenities", location: "Pool Area", status: "operational", lastChecked: "2026-08-15", nextCheck: "2026-09-15" },
  { id: "as2", name: "Lift A Motor", category: "Infrastructure", location: "Block A Basement", status: "operational", lastChecked: "2026-08-20", nextCheck: "2026-09-20" },
  { id: "as3", name: "Generator Set 1", category: "Power", location: "Utility Room", status: "maintenance", lastChecked: "2026-09-01", nextCheck: "2026-09-10" },
  { id: "as4", name: "CCTV System", category: "Security", location: "Server Room", status: "operational", lastChecked: "2026-09-02", nextCheck: "2026-10-02" },
]

// ─── Database API ─────────────────────────────────────────────

export const db = {
  // Users
  users: {
    findByEmail: (email: string) => users.find((u) => u.email === email),
    findById: (id: string) => users.find((u) => u.id === id),
    getAll: () => users,
  },

  // Payments
  payments: {
    getByUser: (userId: string) => payments.filter((p) => p.userId === userId),
    getAll: () => payments,
    create: (payment: Omit<Payment, "id">) => {
      const newPayment = { ...payment, id: `p${Date.now()}` }
      payments.push(newPayment)
      return newPayment
    },
    update: (id: string, data: Partial<Payment>) => {
      const idx = payments.findIndex((p) => p.id === id)
      if (idx !== -1) {
        const item = payments[idx]
        if (data.status !== undefined) item.status = data.status
        if (data.amount !== undefined) item.amount = data.amount
        if (data.dueDate !== undefined) item.dueDate = data.dueDate
        if (data.paidDate !== undefined) item.paidDate = data.paidDate
        if (data.month !== undefined) item.month = data.month
        return item
      }
      return null
    },
  },

  // Complaints
  complaints: {
    getByUser: (userId: string) => complaints.filter((c) => c.userId === userId),
    getAll: () => complaints,
    create: (complaint: Omit<Complaint, "id">) => {
      const newComplaint = { ...complaint, id: `c${Date.now()}` }
      complaints.push(newComplaint)
      return newComplaint
    },
    update: (id: string, data: Partial<Complaint>) => {
      const idx = complaints.findIndex((c) => c.id === id)
      if (idx !== -1) {
        const item = complaints[idx]
        if (data.status !== undefined) item.status = data.status
        if (data.priority !== undefined) item.priority = data.priority
        if (data.title !== undefined) item.title = data.title
        if (data.description !== undefined) item.description = data.description
        if (data.category !== undefined) item.category = data.category
        if (data.updatedAt !== undefined) item.updatedAt = data.updatedAt
        return item
      }
      return null
    },
  },

  // Visitors
  visitors: {
    getByUser: (userId: string) => visitors.filter((v) => v.userId === userId),
    getAll: () => visitors,
    create: (visitor: Omit<Visitor, "id">) => {
      const newVisitor = { ...visitor, id: `v${Date.now()}` }
      visitors.push(newVisitor)
      return newVisitor
    },
    update: (id: string, data: Partial<Visitor>) => {
      const idx = visitors.findIndex((v) => v.id === id)
      if (idx !== -1) {
        const item = visitors[idx]
        if (data.status !== undefined) item.status = data.status
        if (data.checkedInAt !== undefined) item.checkedInAt = data.checkedInAt
        if (data.checkedOutAt !== undefined) item.checkedOutAt = data.checkedOutAt
        if (data.expectedAt !== undefined) item.expectedAt = data.expectedAt
        if (data.name !== undefined) item.name = data.name
        if (data.phone !== undefined) item.phone = data.phone
        if (data.purpose !== undefined) item.purpose = data.purpose
        if (data.unit !== undefined) item.unit = data.unit
        return item
      }
      return null
    },
  },

  // Meetings
  meetings: {
    getAll: () => meetings,
    create: (meeting: Omit<Meeting, "id">) => {
      const newMeeting = { ...meeting, id: `m${Date.now()}` }
      meetings.push(newMeeting)
      return newMeeting
    },
    rsvp: (meetingId: string, userId: string, status: "attending" | "not_attending") => {
      const meeting = meetings.find((m) => m.id === meetingId)
      if (!meeting) return null
      const existingIdx = meeting.rsvps.findIndex((r) => r.userId === userId)
      if (existingIdx !== -1) { meeting.rsvps[existingIdx].status = status }
      else { meeting.rsvps.push({ userId, status }) }
      return meeting
    },
  },

  // Announcements
  announcements: {
    getAll: () => announcements,
    create: (announcement: Omit<Announcement, "id">) => {
      const newAnnouncement = { ...announcement, id: `a${Date.now()}` }
      announcements.push(newAnnouncement)
      return newAnnouncement
    },
  },

  // Notifications
  notifications: {
    getByUser: (userId: string) => notifications.filter((n) => n.userId === userId),
    markRead: (id: string) => {
      const notification = notifications.find((n) => n.id === id)
      if (notification) notification.read = true
      return notification
    },
    getUnreadCount: (userId: string) => notifications.filter((n) => n.userId === userId && !n.read).length,
  },

  // Documents
  documents: {
    getByUser: (userId: string) => documents.filter((d) => d.userId === userId),
    getAll: () => documents,
  },

  // Service Requests
  serviceRequests: {
    getByUser: (userId: string) => serviceRequests.filter((sr) => sr.userId === userId),
    getAll: () => serviceRequests,
    create: (sr: Omit<ServiceRequest, "id">) => {
      const newSR = { ...sr, id: `sr${Date.now()}` }
      serviceRequests.push(newSR)
      return newSR
    },
  },

  // Rules
  rules: {
    getAll: () => rules,
    create: (rule: Omit<Rule, "id">) => {
      const newRule = { ...rule, id: `r${Date.now()}` }
      rules.push(newRule)
      return newRule
    },
  },

  // Assets
  assets: {
    getAll: () => assets,
    create: (asset: Omit<Asset, "id">) => {
      const newAsset = { ...asset, id: `as${Date.now()}` }
      assets.push(newAsset)
      return newAsset
    },
  },
}
