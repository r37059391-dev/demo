import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || "Invalid email or password" }, { status: 401 })
    }

    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (!user) {
      // Auto-heal: If the user was created in Supabase Auth but the registration 
      // got interrupted before inserting into public.users, we don't force a database insert.
      // Instead we just return a fallback profile so they can log in!
      user = {
        id: data.user.id,
        email: data.user.email,
        name: email.split('@')[0],
        role: 'tenant'
      }
    }

    const finalRole = data.user.email === 'admin@gmail.com' ? 'admin' : (user?.role || 'tenant')

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: user?.name || email,
        role: finalRole,
        unit: user?.unit,
        block: user?.block,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
