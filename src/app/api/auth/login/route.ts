import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = db.users.findByEmail(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const session = await createSession(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        unit: user.unit,
        block: user.block,
      },
      session,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
