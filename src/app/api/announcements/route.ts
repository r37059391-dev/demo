import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = await createClient()
  const { data: announcements } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })

  const mapped = (announcements || []).map((a: any) => ({
    ...a,
    createdBy: a.created_by,
    createdAt: a.created_at,
  }))

  return NextResponse.json({ announcements: mapped })
}
