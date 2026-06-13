import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()
  let query = supabase.from('complaints').select('*, users(name, unit, block)').order('created_at', { ascending: false })

  if (session.role !== "admin") {
    query = query.eq('user_id', session.userId)
  }

  const { data: complaints, error } = await query
  
  if (error) {
    console.error("Complaints GET error:", error)
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
  }

  const mapped = (complaints || []).map((c: any) => ({
    ...c,
    userId: c.user_id,
    userName: c.users ? c.users.name : c.user_name,
    unit: c.users ? `${c.users.block}-${c.users.unit}` : c.unit,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
  }))

  return NextResponse.json({ complaints: mapped })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const supabase = await createClient()
  
  // If admin provided a tenantId, use that. Otherwise use session.userId
  const targetUserId = (session.role === 'admin' && body.tenantId) ? body.tenantId : session.userId

  const { data: user } = await supabase.from('users').select('*').eq('id', targetUserId).single()
  
  const { data: complaint, error } = await supabase.from('complaints').insert({
    category: body.category,
    title: body.title,
    description: body.description,
    priority: body.priority || 'medium',
    status: 'open',
    unit: user ? `${user.block}-${user.unit}` : 'Unknown',
    user_id: targetUserId,
    user_name: user?.name || 'Unknown'
  }).select().single()

  if (error) {
    console.error("Complaints POST error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ complaint: {
    ...complaint,
    userId: complaint.user_id,
    createdAt: complaint.created_at,
    updatedAt: complaint.updated_at,
  } }, { status: 201 })
}
