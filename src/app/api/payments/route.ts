import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()

  let query = supabase.from('payments').select('*').order('created_at', { ascending: false })
  
  if (session.role !== "admin") {
    query = query.eq('user_id', session.userId)
  }

  const { data: payments } = await query
  
  const mapped = (payments || []).map((p: any) => ({
    ...p,
    userId: p.user_id,
    dueDate: p.due_date,
    paidDate: p.paid_date,
  }))

  return NextResponse.json({ payments: mapped })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const supabase = await createClient()
  
  const { data: payment, error } = await supabase.from('payments').insert({
    month: body.month,
    amount: body.amount,
    status: body.status || 'pending',
    due_date: body.dueDate,
    user_id: session.userId
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ payment: {
    ...payment,
    userId: payment.user_id,
    dueDate: payment.due_date,
    paidDate: payment.paid_date,
  } }, { status: 201 })
}
