import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const supabase = await createClient()

    // Fetch all parking slots and join with users to get the tenant's name
    const { data: parkingSlots, error } = await supabase
      .from('parking_slots')
      .select('*, users(name, unit, block)')
      .order('id')

    if (error) {
      console.error("Parking API DB Error:", error)
      return NextResponse.json({ error: "Failed to fetch parking slots" }, { status: 500 })
    }

    // Format the response for the frontend
    const formattedSlots = parkingSlots.map((slot: any) => ({
      ...slot,
      tenant: slot.users ? slot.users.name : "-",
      flat: slot.users ? `${slot.users.block}-${slot.users.unit}` : "-",
      vehicle: slot.vehicle_number || "-",
      vehicleType: slot.vehicle_type || "-"
    }))

    return NextResponse.json({ parkingSlots: formattedSlots })
  } catch (error) {
    console.error("Parking API Crash:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Only allow admins to assign parking
    const supabase = await createClient()
    const { data: adminUser } = await supabase.from('users').select('role').eq('id', session.userId).single()
    
    // As a fallback for the hardcoded admin
    const isAdmin = adminUser?.role === 'admin' || session.email === 'admin@gmail.com'
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 })
    }

    const body = await request.json()
    const { slotId, tenantId, vehicleNumber, vehicleType } = body

    if (!slotId || !tenantId) {
      return NextResponse.json({ error: "Slot ID and Tenant ID are required" }, { status: 400 })
    }

    // Update the parking slot
    const { data, error } = await supabase
      .from('parking_slots')
      .update({
        tenant_id: tenantId,
        vehicle_number: vehicleNumber || null,
        vehicle_type: vehicleType || null,
        status: 'Occupied'
      })
      .eq('id', slotId)
      .select()

    if (error) {
      console.error("Parking Assign DB Error:", error)
      return NextResponse.json({ error: "Failed to assign parking" }, { status: 500 })
    }

    return NextResponse.json({ success: true, slot: data[0] })
  } catch (error) {
    console.error("Parking API Crash:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
