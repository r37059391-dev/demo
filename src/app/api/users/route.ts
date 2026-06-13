import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Only allow admins to list all users? 
    // Wait, the UI might need users for other things too, but let's restrict or just fetch tenants
    const supabase = await createClient()

    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, unit, block, email, role')
      .neq('email', 'admin@gmail.com')
      .order('name')

    if (error) {
      console.error("Users API DB Error:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Users API Crash:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
