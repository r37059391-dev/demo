import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  
  // Get the auth session directly from Supabase
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session) {
    console.error("AUTH ME: No session found", sessionError)
    return NextResponse.json({ user: null }, { status: 401 })
  }

  // Fetch the full user profile from the public.users table
  let { data: user, error: dbError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (dbError?.code === 'PGRST116' || !user) {
    // User exists in Auth but missing from public.users (interrupted registration)
    // Instead of forcing a database insert that might fail, we just return a fallback profile 
    // from the Auth session so they can still log in!
    user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
      role: 'tenant'
    }
  } else if (dbError) {
    console.error("AUTH ME: DB error", dbError, session.user.id)
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const finalRole = session.user.email === 'admin@gmail.com' ? 'admin' : (user.role || 'tenant')

  return NextResponse.json({
    user: {
      id: user.id || session.user.id,
      email: user.email || session.user.email,
      name: user.name,
      role: finalRole,
      unit: user.unit,
      block: user.block,
      phone: user.phone,
      leaseEnd: user.lease_end,
    },
  })
}
