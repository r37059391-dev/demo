import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const user = db.users.findById(session.userId)

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      unit: user.unit,
      block: user.block,
      phone: user.phone,
      leaseEnd: user.leaseEnd,
    },
  })
}
