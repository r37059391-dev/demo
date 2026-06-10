"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Home, Phone, FileText, CreditCard, UploadCloud, CheckCircle2, Building2, Camera, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const tabs = ["personal", "apartment", "emergency", "documents", "payment"]
  const tabMeta = [
    { value: "personal", icon: User, label: "Personal Info" },
    { value: "apartment", icon: Home, label: "Apartment" },
    { value: "emergency", icon: Phone, label: "Emergency" },
    { value: "documents", icon: FileText, label: "Documents" },
    { value: "payment", icon: CreditCard, label: "Payment" },
  ]
  const currentIndex = tabs.indexOf(activeTab)
  const progress = ((currentIndex + 1) / tabs.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col items-center justify-start py-8 px-4">
      {/* Decorative bg elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-600/20 mb-5">
            <Building2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Your Account</h1>
          <p className="text-gray-500 mt-2 text-base">Join the SmartApt community in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress line background */}
            <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-gray-200" />
            <div 
              className="absolute top-5 left-[10%] h-[2px] bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-700 ease-out"
              style={{ width: `${currentIndex / (tabs.length - 1) * 80}%` }}
            />
            
            {tabMeta.map((tab, i) => {
              const isCompleted = i < currentIndex
              const isActive = i === currentIndex
              const isFuture = i > currentIndex
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className="relative z-10 flex flex-col items-center gap-2 group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isCompleted 
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-100" 
                      : isActive 
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 scale-110 ring-4 ring-blue-100" 
                      : "bg-white text-gray-400 border-2 border-gray-200 group-hover:border-gray-300"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <tab.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`text-xs font-semibold transition-colors hidden sm:block ${
                    isActive ? "text-blue-700" : isCompleted ? "text-emerald-600" : "text-gray-400"
                  }`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl shadow-gray-200/60 border-0 rounded-2xl overflow-hidden ring-1 ring-black/[0.04]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Title Bar */}
            <CardHeader className="bg-white border-b border-gray-100 px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50">
                  {(() => {
                    const Icon = tabMeta[currentIndex].icon
                    return <Icon className="w-5 h-5 text-blue-600" />
                  })()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{tabMeta[currentIndex].label}</h2>
                  <p className="text-xs text-gray-400 font-medium">Step {currentIndex + 1} of {tabs.length}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 bg-white">
              <form>
                {/* ===== PERSONAL INFO ===== */}
                <TabsContent value="personal" className="mt-0 space-y-8">
                  {/* Profile Photo */}
                  <div className="flex justify-center">
                    <div className="relative group cursor-pointer">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all">
                        <Camera className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] text-gray-400 mt-1 font-medium group-hover:text-blue-500">Upload Photo</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <InputField label="Full Name" required placeholder="Enter your full name" />
                    <InputField label="Tenant ID" placeholder="T-10045" disabled />
                    <InputField label="Date of Birth" required type="date" />
                    <SelectField label="Gender" required placeholder="Select gender" options={["Male", "Female", "Other"]} />
                    <InputField label="Mobile Number" required placeholder="+91 98765 43210" />
                    <InputField label="Alternate Mobile" placeholder="+91 98765 43211" />
                    <div className="md:col-span-2">
                      <InputField label="Email Address" required type="email" placeholder="john.doe@example.com" />
                    </div>
                    <InputField label="Aadhaar / National ID" required placeholder="1234 5678 9012" />
                    <InputField label="PAN Number" optional placeholder="ABCDE1234F" />
                  </div>
                </TabsContent>

                {/* ===== APARTMENT INFO ===== */}
                <TabsContent value="apartment" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <SelectField label="Apartment Block" required placeholder="Select block" options={["Block A", "Block B", "Block C", "Block D"]} />
                    <InputField label="Flat Number" required placeholder="e.g. 402" />
                    <InputField label="Floor Number" placeholder="e.g. 4" type="number" />
                    <SelectField label="Apartment Type" required placeholder="Select type" options={["1 BHK", "2 BHK", "3 BHK", "Villa"]} />
                    <InputField label="Move-in Date" type="date" />
                    <InputField label="Lease Start Date" required type="date" />
                    <InputField label="Lease End Date" required type="date" />
                    <InputField label="Family Members" placeholder="2" type="number" />
                  </div>
                </TabsContent>

                {/* ===== EMERGENCY CONTACT ===== */}
                <TabsContent value="emergency" className="mt-0 space-y-6">
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl">
                    <Phone className="h-5 w-5 shrink-0 mt-0.5 text-amber-500" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Emergency Contact</p>
                      <p className="text-xs text-amber-600 mt-0.5 leading-relaxed">Provide details of someone we can reach in an emergency situation.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <InputField label="Contact Name" required placeholder="Jane Doe" />
                    <SelectField label="Relationship" required placeholder="Select" options={["Spouse", "Parent", "Sibling", "Friend", "Other"]} />
                    <div className="md:col-span-2">
                      <InputField label="Mobile Number" required placeholder="+91 98765 43212" />
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="Full Address" placeholder="Street, City, State, PIN Code" />
                    </div>
                  </div>
                </TabsContent>

                {/* ===== DOCUMENTS ===== */}
                <TabsContent value="documents" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Aadhaar Card", req: true, desc: "Front & back copy" },
                      { name: "Rental Agreement", req: true, desc: "Signed by both parties" },
                      { name: "Passport Photo", req: true, desc: "White background" },
                      { name: "PAN Card", req: false, desc: "Optional document" },
                      { name: "Other Documents", req: false, desc: "Supporting documents" },
                    ].map((doc) => (
                      <div 
                        key={doc.name} 
                        className="relative border-2 border-dashed border-gray-200 rounded-2xl p-5 flex items-start gap-4 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/40 hover:to-indigo-50/20 transition-all cursor-pointer group"
                      >
                        <div className="p-2.5 bg-gray-100 text-gray-400 rounded-xl group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                            {doc.name}
                            {doc.req && <span className="text-red-500">*</span>}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">{doc.desc}</p>
                          <p className="text-[10px] text-gray-400 mt-1.5">PDF, JPG, PNG • Max 5MB</p>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Browse</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* ===== PAYMENT INFO ===== */}
                <TabsContent value="payment" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <InputField label="Security Deposit" required placeholder="₹ 50,000" type="number" />
                    <InputField label="Monthly Rent" required placeholder="₹ 25,000" type="number" />
                    <div className="md:col-span-2">
                      <InputField label="Maintenance Charges" placeholder="₹ 3,000" type="number" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment Preferences</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <SelectField label="Preferred Method" placeholder="Select method" options={["UPI", "Credit/Debit Card", "Net Banking"]} />
                    <InputField label="UPI ID" placeholder="yourname@upi" />
                    <div className="md:col-span-2">
                      <InputField label="Bank Details" optional placeholder="Account Number, IFSC Code" />
                    </div>
                  </div>
                </TabsContent>
              </form>
            </CardContent>

            {/* Footer Actions */}
            <CardFooter className="bg-gray-50/60 border-t border-gray-100 px-8 py-5 flex justify-between items-center">
              <Button 
                variant="ghost" 
                type="button" 
                className="rounded-xl font-medium text-gray-500 hover:text-gray-700" 
                onClick={() => { if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]) }} 
                disabled={activeTab === "personal"}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              
              {activeTab !== "payment" ? (
                <Button 
                  type="button" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-xl font-medium shadow-lg shadow-blue-600/20 px-6"
                  onClick={() => { if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]) }}
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 rounded-xl font-medium shadow-lg shadow-emerald-600/20 px-6"
                >
                  <Sparkles className="w-4 h-4 mr-2" /> Complete Registration
                </Button>
              )}
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

/* ===== Reusable Field Components ===== */

function InputField({ label, required, optional, ...props }: { 
  label: string
  required?: boolean
  optional?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-gray-400 font-normal ml-1 text-xs">(Optional)</span>}
      </Label>
      <Input 
        {...props}
        className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 
          focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
          transition-all duration-200 text-sm
          ${props.disabled ? "bg-gray-100/80 text-gray-500" : ""}
          ${props.className || ""}`}
      />
    </div>
  )
}

function SelectField({ label, required, placeholder, options }: {
  label: string
  required?: boolean
  placeholder: string
  options: string[]
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <Select>
        <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt} value={opt.toLowerCase().replace(/\s+/g, '_')}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
