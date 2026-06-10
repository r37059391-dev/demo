import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.role === "admin") {
    return NextResponse.json({ complaints: db.complaints.getAll() })
  }

  return NextResponse.json({ complaints: db.complaints.getByUser(session.userId) })
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const user = db.users.findById(session.userId)
  const complaint = db.complaints.create({
    ...body,
    userId: session.userId,
    userName: user?.name || "Unknown",
    unit: `${user?.block}-${user?.unit}`,
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return NextResponse.json({ complaint }, { status: 201 })
}
