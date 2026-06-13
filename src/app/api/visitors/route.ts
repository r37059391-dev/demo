import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()
  let query = supabase.from('visitors').select('*').order('created_at', { ascending: false })

  if (session.role !== "admin") {
    query = query.eq('user_id', session.userId)
  }

  const { data: visitors } = await query
  
  const mapped = (visitors || []).map((v: any) => ({
    ...v,
    userId: v.user_id,
    expectedAt: v.expected_at,
    checkedInAt: v.checked_in_at,
    checkedOutAt: v.checked_out_at,
  }))

  return NextResponse.json({ visitors: mapped })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const supabase = await createClient()
  
  const { data: user } = await supabase.from('users').select('*').eq('id', session.userId).single()
  
  const { data: visitor, error } = await supabase.from('visitors').insert({
    name: body.name,
    phone: body.phone,
    purpose: body.purpose,
    expected_at: body.expectedAt,
    status: 'expected',
    unit: user ? `${user.block}-${user.unit}` : 'Unknown',
    user_id: session.userId,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ visitor: {
    ...visitor,
    userId: visitor.user_id,
    expectedAt: visitor.expected_at,
    checkedInAt: visitor.checked_in_at,
    checkedOutAt: visitor.checked_out_at,
  } }, { status: 201 })
}
