import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', session.userId)
    .order('created_at', { ascending: false })

  const mapped = (notifications || []).map((n: any) => ({
    ...n,
    userId: n.user_id,
    createdAt: n.created_at,
  }))

  return NextResponse.json({ notifications: mapped })
}
