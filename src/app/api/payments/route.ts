import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.role === "admin") {
    return NextResponse.json({ payments: db.payments.getAll() })
  }

  return NextResponse.json({ payments: db.payments.getByUser(session.userId) })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const payment = db.payments.create({ ...body, userId: session.userId })
  return NextResponse.json({ payment }, { status: 201 })
}
