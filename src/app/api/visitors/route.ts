import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.role === "admin") {
    return NextResponse.json({ visitors: db.visitors.getAll() })
  }

  return NextResponse.json({ visitors: db.visitors.getByUser(session.userId) })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const user = db.users.findById(session.userId)
  const visitor = db.visitors.create({
    ...body,
    userId: session.userId,
    unit: `${user?.block}-${user?.unit}`,
    status: "expected",
  })
  return NextResponse.json({ visitor }, { status: 201 })
}
