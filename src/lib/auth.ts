import { cookies } from "next/headers"
import { db } from "./db"

const SESSION_COOKIE = "smartapt_session"

export type Session = {
  userId: string
  email: string
  role: "tenant" | "admin"
  name: string
}

export async function createSession(userId: string): Promise<Session | null> {
  const user = db.users.findById(userId)
  if (!user) return null

  const session: Session = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return session
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_COOKIE)
  if (!raw?.value) return null

  try {
    return JSON.parse(raw.value) as Session
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
