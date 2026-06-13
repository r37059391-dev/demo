import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()
  const { data: meetings } = await supabase.from('meetings').select('*, meeting_rsvps(*)')
  
  if (session.role === "tenant") {
    const meetingsWithStatus = (meetings || []).map((m: any) => ({
      ...m,
      createdBy: m.created_by,
      rsvpCount: (m.meeting_rsvps || []).length,
      tenantStatus: (m.meeting_rsvps || []).find((r: any) => r.user_id === session.userId)?.status || "pending",
    }))
    return NextResponse.json({ meetings: meetingsWithStatus })
  }

  // Admin gets full RSVP data
  const meetingsWithCounts = (meetings || []).map((m: any) => ({
    ...m,
    createdBy: m.created_by,
    rsvpCount: (m.meeting_rsvps || []).filter((r: any) => r.status === "attending").length,
  }))
  return NextResponse.json({ meetings: meetingsWithCounts })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const supabase = await createClient()
  
  const { data: meeting, error } = await supabase.from('meetings').insert({
    title: body.title,
    date: body.date,
    time: body.time,
    location: body.location,
    description: body.description,
    type: body.type,
    status: "upcoming",
    created_by: session.userId,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ meeting }, { status: 201 })
}
