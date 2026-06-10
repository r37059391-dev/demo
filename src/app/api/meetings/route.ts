import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const meetings = db.meetings.getAll()
  
  // Add tenant-specific RSVP status if tenant
  if (session.role === "tenant") {
    const meetingsWithStatus = meetings.map((m) => ({
      ...m,
      rsvpCount: m.rsvps.length,
      tenantStatus: m.rsvps.find((r) => r.userId === session.userId)?.status || "pending",
    }))
    return NextResponse.json({ meetings: meetingsWithStatus })
  }

  // Admin gets full RSVP data
  const meetingsWithCounts = meetings.map((m) => ({
    ...m,
    rsvpCount: m.rsvps.filter((r) => r.status === "attending").length,
  }))
  return NextResponse.json({ meetings: meetingsWithCounts })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const meeting = db.meetings.create({
    ...body,
    status: "upcoming",
    createdBy: session.userId,
    rsvps: [],
  })
  return NextResponse.json({ meeting }, { status: 201 })
}
