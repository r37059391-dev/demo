import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Edit2, UploadCloud, ShieldCheck, MapPin, CalendarDays, Phone, Mail, CreditCard, Building2 } from "lucide-react"

export default function TenantProfilePage() {
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
              <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <AvatarFallback className="text-2xl bg-primary/20 text-[#D4894A] font-bold">JD</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <UploadCloud className="text-white w-6 h-6" />
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
            </div>
          </div>
          
          <CardContent className="pt-16 pb-6 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500 font-medium">T-10045</p>
            
            <Badge className="mt-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded-lg font-medium">
              <ShieldCheck className="w-3 h-3 mr-1" /> Verified Tenant
            </Badge>

            <Separator className="my-5" />

            <div className="w-full text-left space-y-4 px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Block & Flat</p>
                  <p className="text-sm font-semibold text-gray-900">Block A, 402</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarDays className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Lease Valid Until</p>
                  <p className="text-sm font-semibold text-gray-900">Oct 12, 2027</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Monthly Rent</p>
                  <p className="text-sm font-semibold text-gray-900">₹25,000</p>
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
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">John Doe</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Date of Birth</Label>
                  <p className="text-sm font-medium text-gray-900">May 15, 1990</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Mobile Number</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400" /> +91 9876543210
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Address</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" /> john.doe@example.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-100 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Emergency Contact</CardTitle>
              <CardDescription>Person to contact in case of emergency.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Contact Name</Label>
                  <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Relationship</Label>
                  <p className="text-sm font-medium text-gray-900">Spouse</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Mobile Number</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400" /> +91 9876543212
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Address</Label>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" /> Mumbai, Maharashtra
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
