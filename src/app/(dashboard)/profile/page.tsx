import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Edit2, ShieldCheck, CalendarDays, Phone, Mail, Building2 } from "lucide-react"
import { getSession } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { ProfileAvatar } from "@/components/ProfileAvatar"
import { redirect } from "next/navigation"

export default async function TenantProfilePage() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const supabase = await createClient()
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.userId)
    .single()

  if (!user) {
    return <div>User not found</div>
  }

  // Format lease date if it exists
  const leaseEnd = user.lease_end 
    ? new Date(user.lease_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500">View and manage your personal information.</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-[#D4894A] text-white shadow-lg shadow-primary/20 rounded-xl font-medium">
          <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card Sidebar */}
        <Card className="col-span-1 shadow-sm border-gray-100 h-fit bg-white overflow-hidden">
          {/* Cover gradient */}
          <div className="h-24 bg-gradient-to-br from-primary via-[#D4894A] to-[#C4581E] relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <ProfileAvatar userId={user.id} name={user.name} avatarUrl={user.avatar} />
            </div>
          </div>
          
          <CardContent className="pt-16 pb-6 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{user.role}</p>
            
            <Badge className="mt-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded-lg font-medium">
              <ShieldCheck className="w-3 h-3 mr-1" /> Verified {user.role === 'admin' ? 'Admin' : 'Tenant'}
            </Badge>

            <Separator className="my-5" />

            <div className="w-full text-left space-y-4 px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Block & Flat</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.block && user.unit ? `Block ${user.block}, ${user.unit}` : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarDays className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Lease Valid Until</p>
                  <p className="text-sm font-semibold text-gray-900">{leaseEnd}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="shadow-sm border-gray-100 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
              <CardDescription>Your personal details on record.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Full Name</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">{user.name}</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Mobile Number</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400" /> {user.phone || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" /> {user.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
