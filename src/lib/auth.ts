import { createClient } from "./supabase/server"

export type Session = {
  userId: string
  email: string
  role: "tenant" | "admin"
  name: string
}

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) return null

  // fetch user role and name from public.users
  const { data: user } = await supabase
    .from('users')
    .select('role, name')
    .eq('id', session.user.id)
    .single()

  return {
    userId: session.user.id,
    email: session.user.email!,
    role: user?.role || "tenant",
    name: user?.name || session.user.email!.split('@')[0],
  }
}

export async function destroySession(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
