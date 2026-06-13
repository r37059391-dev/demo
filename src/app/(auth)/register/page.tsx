"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Home, Phone, FileText, CreditCard, UploadCloud, CheckCircle2, Building2, Camera, ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const defaultFormData = {
  fullName: "",
  dob: "",
  gender: "",
  mobile: "",
  altMobile: "",
  email: "",
  password: "",
  confirmPassword: "",
  nationalId: "",
  pan: "",
  block: "",
  flatNumber: "",
  floorNumber: "",
  apartmentType: "",
  moveInDate: "",
  leaseStartDate: "",
  leaseEndDate: "",
  familyMembers: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyMobile: "",
  emergencyAddress: "",
  securityDeposit: "",
  monthlyRent: "",
  maintenanceCharges: "",
  paymentMethod: "",
  upiId: "",
  bankDetails: ""
}

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [documents, setDocuments] = useState<Record<string, File>>({})
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const router = useRouter()
  const supabase = createClient()

  // Persisted state
  const [formData, setFormData] = useState(defaultFormData)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("registerFormData")
    const savedTab = localStorage.getItem("registerActiveTab")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Failed to parse saved form data", e)
      }
    }
    if (savedTab) {
      setActiveTab(savedTab)
    }
    setIsHydrated(true)
  }, [])

  // Save to local storage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("registerFormData", JSON.stringify(formData))
      localStorage.setItem("registerActiveTab", activeTab)
    }
  }, [formData, activeTab, isHydrated])

  const handleChange = (field: keyof typeof defaultFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSelectChange = (field: keyof typeof defaultFormData) => (val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!")
      setActiveTab("personal")
      return
    }

    try {
      setIsSubmitting(true)

      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      })

      if (authError) {
        if (authError.message.includes("rate limit") || authError.message.includes("email rate limit exceeded")) {
          setErrorMsg(
            "🚨 SUPABASE RATE LIMIT HIT: You have sent too many test emails to this address! " +
            "To fix this, please either: (1) Use a totally random fake email (like test99@example.com), OR " +
            "(2) Go to your Supabase Dashboard -> Authentication -> Providers -> Email -> Turn OFF 'Confirm Email'."
          )
        } else {
          setErrorMsg(authError.message || "Failed to create user account.")
        }
        setIsSubmitting(false)
        return
      }
      
      const userId = authData.user?.id
      if (!userId) {
        setErrorMsg("Failed to create user account.")
        setIsSubmitting(false)
        return
      }

      let avatarUrl = null

      // 2. Upload Profile Photo
      if (profilePhoto) {
        const fileExt = profilePhoto.name.split('.').pop()
        const filePath = `${userId}-${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('profle_photo').upload(filePath, profilePhoto, { upsert: true })
        if (!uploadError) {
          const { data } = supabase.storage.from('profle_photo').getPublicUrl(filePath)
          avatarUrl = data.publicUrl
        }
      }

      // 3. Upload Documents
      const uploadedDocs = []
      for (const [docName, file] of Object.entries(documents)) {
        const fileExt = file.name.split('.').pop()
        const filePath = `${userId}/${docName.replace(/\s+/g, '-')}-${Math.random()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage.from('user_documents').upload(filePath, file)
        
        if (!uploadError) {
          const { data } = supabase.storage.from('user_documents').getPublicUrl(filePath)
          uploadedDocs.push({
            user_id: userId,
            name: docName,
            type: docName.includes('Rental') ? 'lease' : 'kyc',
            status: 'pending',
            file_url: data.publicUrl
          })
        }
      }

      // 4. Insert into `users` table
      const { error: userError } = await supabase.from('users').insert({
        id: userId,
        email: formData.email,
        name: formData.fullName,
        role: 'tenant',
        avatar: avatarUrl,
        unit: formData.flatNumber,
        block: formData.block,
        phone: formData.mobile,
        lease_end: formData.leaseEndDate || null,
        dob: formData.dob || null,
        gender: formData.gender || null,
        alt_mobile: formData.altMobile || null,
        national_id: formData.nationalId || null,
        pan_number: formData.pan || null,
        floor_number: formData.floorNumber || null,
        apartment_type: formData.apartmentType || null,
        move_in_date: formData.moveInDate || null,
        lease_start: formData.leaseStartDate || null,
        family_members: formData.familyMembers ? parseInt(formData.familyMembers) : null,
        emergency_name: formData.emergencyName || null,
        emergency_relation: formData.emergencyRelationship || null,
        emergency_phone: formData.emergencyMobile || null,
        emergency_address: formData.emergencyAddress || null,
        security_deposit: formData.securityDeposit ? parseFloat(formData.securityDeposit) : null,
        monthly_rent: formData.monthlyRent ? parseFloat(formData.monthlyRent) : null,
        maintenance_charges: formData.maintenanceCharges ? parseFloat(formData.maintenanceCharges) : null,
        payment_method: formData.paymentMethod || null,
        upi_id: formData.upiId || null,
        bank_details: formData.bankDetails || null,
      })

      if (userError) {
        console.error("Database Insert Error:", userError)
        setErrorMsg(`Database Error: ${userError.message} ${userError.details || ''}`)
        setIsSubmitting(false)
        return
      }

      // 5. Insert documents
      if (uploadedDocs.length > 0) {
        const { error: docError } = await supabase.from('documents').insert(uploadedDocs)
        if (docError) console.error("Failed to insert documents metadata", docError)
      }

      // Success cleanup
      localStorage.removeItem("registerFormData")
      localStorage.removeItem("registerActiveTab")
      setFormData(defaultFormData)
      
      // Redirect
      router.push("/dashboard")

    } catch (error: any) {
      console.error("Registration Error:", error)
      
      // Specifically handle the Supabase Email Rate Limit error
      if (error.message?.includes("rate limit") || error.message?.includes("email rate limit exceeded")) {
        setErrorMsg(
          "🚨 SUPABASE RATE LIMIT HIT: You have sent too many test emails to this address! " +
          "To fix this, please either: (1) Use a totally random fake email (like test99@example.com), OR " +
          "(2) Go to your Supabase Dashboard -> Authentication -> Providers -> Email -> Turn OFF 'Confirm Email'."
        )
      } else {
        setErrorMsg(error.message || "An error occurred during registration.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = ["personal", "apartment", "emergency", "documents", "payment"]
  const tabMeta = [
    { value: "personal", icon: User, label: "Personal Info" },
    { value: "apartment", icon: Home, label: "Apartment" },
    { value: "emergency", icon: Phone, label: "Emergency" },
    { value: "documents", icon: FileText, label: "Documents" },
    { value: "payment", icon: CreditCard, label: "Payment" },
  ]
  const currentIndex = tabs.indexOf(activeTab)

  if (!isHydrated) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col items-center justify-start py-8 px-4">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-600/20 mb-5">
            <Building2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Your Account</h1>
          <p className="text-gray-500 mt-2 text-base">Join the SmartApt community in just a few steps</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-gray-200" />
            <div 
              className="absolute top-5 left-[10%] h-[2px] bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-700 ease-out"
              style={{ width: `${currentIndex / (tabs.length - 1) * 80}%` }}
            />
            
            {tabMeta.map((tab, i) => {
              const isCompleted = i < currentIndex
              const isActive = i === currentIndex
              return (
                <button
                  key={tab.value}
                  type="button"
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

        <Card className="shadow-2xl shadow-gray-200/60 border-0 rounded-2xl overflow-hidden ring-1 ring-black/[0.04]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                    <p>{errorMsg}</p>
                    {errorMsg.includes("RATE LIMIT") && (
                      <button 
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("registerFormData");
                          localStorage.removeItem("registerActiveTab");
                          window.location.reload();
                        }}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-red-700 transition-colors"
                      >
                        Reset Form to Try a New Email
                      </button>
                    )}
                  </div>
                )}
                
                {/* ===== PERSONAL INFO ===== */}
                <TabsContent value="personal" className="mt-0 space-y-8">
                  <div className="flex justify-center">
                    <div 
                      className="relative group cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfilePhoto(file);
                            setPhotoPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all overflow-hidden">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Camera className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <span className="text-[10px] text-gray-400 mt-1 font-medium group-hover:text-blue-500">Upload Photo</span>
                          </>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <InputField label="Full Name" required placeholder="Enter your full name" value={formData.fullName} onChange={handleChange("fullName")} />
                    <InputField label="Tenant ID" placeholder="T-10045" disabled />
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-4 border rounded-xl bg-gray-50/30">
                      <InputField label="Email Address" required type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange("email")} />
                      <div className="hidden md:block"></div>
                      <InputField label="Password" required type="password" placeholder="••••••••" value={formData.password} onChange={handleChange("password")} />
                      <InputField label="Confirm Password" required type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange("confirmPassword")} />
                    </div>
                    <InputField label="Date of Birth" required type="date" value={formData.dob} onChange={handleChange("dob")} />
                    <SelectField label="Gender" required placeholder="Select gender" options={["Male", "Female", "Other"]} value={formData.gender} onValueChange={handleSelectChange("gender")} />
                    <InputField label="Mobile Number" required placeholder="+91 98765 43210" value={formData.mobile} onChange={handleChange("mobile")} />
                    <InputField label="Alternate Mobile" placeholder="+91 98765 43211" value={formData.altMobile} onChange={handleChange("altMobile")} />
                    <InputField label="Aadhaar / National ID" required placeholder="1234 5678 9012" value={formData.nationalId} onChange={handleChange("nationalId")} />
                    <InputField label="PAN Number" optional placeholder="ABCDE1234F" value={formData.pan} onChange={handleChange("pan")} />
                  </div>
                </TabsContent>

                {/* ===== APARTMENT INFO ===== */}
                <TabsContent value="apartment" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <SelectField label="Apartment Block" required placeholder="Select block" options={["Block A", "Block B", "Block C", "Block D"]} value={formData.block} onValueChange={handleSelectChange("block")} />
                    <InputField label="Flat Number" required placeholder="e.g. 402" value={formData.flatNumber} onChange={handleChange("flatNumber")} />
                    <InputField label="Floor Number" placeholder="e.g. 4" type="number" value={formData.floorNumber} onChange={handleChange("floorNumber")} />
                    <SelectField label="Apartment Type" required placeholder="Select type" options={["1 BHK", "2 BHK", "3 BHK", "Villa"]} value={formData.apartmentType} onValueChange={handleSelectChange("apartmentType")} />
                    <InputField label="Move-in Date" type="date" value={formData.moveInDate} onChange={handleChange("moveInDate")} />
                    <InputField label="Lease Start Date" required type="date" value={formData.leaseStartDate} onChange={handleChange("leaseStartDate")} />
                    <InputField label="Lease End Date" required type="date" value={formData.leaseEndDate} onChange={handleChange("leaseEndDate")} />
                    <InputField label="Family Members" placeholder="2" type="number" value={formData.familyMembers} onChange={handleChange("familyMembers")} />
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
                    <InputField label="Contact Name" required placeholder="Jane Doe" value={formData.emergencyName} onChange={handleChange("emergencyName")} />
                    <SelectField label="Relationship" required placeholder="Select" options={["Spouse", "Parent", "Sibling", "Friend", "Other"]} value={formData.emergencyRelationship} onValueChange={handleSelectChange("emergencyRelationship")} />
                    <div className="md:col-span-2">
                      <InputField label="Mobile Number" required placeholder="+91 98765 43212" value={formData.emergencyMobile} onChange={handleChange("emergencyMobile")} />
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="Full Address" placeholder="Street, City, State, PIN Code" value={formData.emergencyAddress} onChange={handleChange("emergencyAddress")} />
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
                    ].map((doc) => {
                      const inputId = `doc-upload-${doc.name.replace(/\s+/g, '-')}`
                      const selectedFile = documents[doc.name]

                      return (
                        <div 
                          key={doc.name} 
                          onClick={() => document.getElementById(inputId)?.click()}
                          className={`relative border-2 border-dashed rounded-2xl p-5 flex items-start gap-4 transition-all cursor-pointer group ${
                            selectedFile 
                              ? "border-emerald-300 bg-emerald-50/30 hover:border-emerald-400" 
                              : "border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/40 hover:to-indigo-50/20"
                          }`}
                        >
                          <input 
                            type="file"
                            id={inputId}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setDocuments(prev => ({ ...prev, [doc.name]: file }));
                              }
                            }}
                          />
                          <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                            selectedFile 
                              ? "bg-emerald-100 text-emerald-600" 
                              : "bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600"
                          }`}>
                            {selectedFile ? <CheckCircle2 className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                              {doc.name}
                              {doc.req && <span className="text-red-500">*</span>}
                            </h4>
                            <p className={`text-xs mt-0.5 truncate ${selectedFile ? "text-emerald-600 font-medium" : "text-gray-400"}`}>
                              {selectedFile ? selectedFile.name : doc.desc}
                            </p>
                            {!selectedFile && <p className="text-[10px] text-gray-400 mt-1.5">PDF, JPG, PNG • Max 5MB</p>}
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className={`text-[10px] text-white px-2 py-0.5 rounded-full font-medium ${selectedFile ? "bg-emerald-600" : "bg-blue-600"}`}>
                              {selectedFile ? "Change" : "Browse"}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* ===== PAYMENT INFO ===== */}
                <TabsContent value="payment" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <InputField label="Security Deposit" required placeholder="₹ 50,000" type="number" value={formData.securityDeposit} onChange={handleChange("securityDeposit")} />
                    <InputField label="Monthly Rent" required placeholder="₹ 25,000" type="number" value={formData.monthlyRent} onChange={handleChange("monthlyRent")} />
                    <div className="md:col-span-2">
                      <InputField label="Maintenance Charges" placeholder="₹ 3,000" type="number" value={formData.maintenanceCharges} onChange={handleChange("maintenanceCharges")} />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment Preferences</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <SelectField label="Preferred Method" placeholder="Select method" options={["UPI", "Credit/Debit Card", "Net Banking"]} value={formData.paymentMethod} onValueChange={handleSelectChange("paymentMethod")} />
                    <InputField label="UPI ID" placeholder="yourname@upi" value={formData.upiId} onChange={handleChange("upiId")} />
                    <div className="md:col-span-2">
                      <InputField label="Bank Details" optional placeholder="Account Number, IFSC Code" value={formData.bankDetails} onChange={handleChange("bankDetails")} />
                    </div>
                  </div>
                </TabsContent>

                {/* Footer Actions */}
                <CardFooter className="bg-gray-50/60 border-t border-gray-100 px-8 py-5 flex justify-between items-center mt-8 -mx-8 -mb-8">
                  <Button 
                    variant="ghost" 
                    type="button" 
                    className="rounded-xl font-medium text-gray-500 hover:text-gray-700" 
                    onClick={() => { if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]) }} 
                    disabled={activeTab === "personal" || isSubmitting}
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
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 rounded-xl font-medium shadow-lg shadow-emerald-600/20 px-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" /> Complete Registration
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

/* ===== Reusable Field Components ===== */

function InputField({ label, required, optional, value, onChange, ...props }: { 
  label: string
  required?: boolean
  optional?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-gray-400 font-normal ml-1 text-xs">(Optional)</span>}
      </Label>
      <Input 
        {...props}
        value={value}
        onChange={onChange}
        className={`h-12 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 
          focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
          transition-all duration-200 text-sm
          ${props.disabled ? "bg-gray-100/80 text-gray-500" : ""}
          ${props.className || ""}`}
      />
    </div>
  )
}

function SelectField({ label, required, placeholder, options, value, onValueChange }: {
  label: string
  required?: boolean
  placeholder: string
  options: string[]
  value?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <Select value={value} onValueChange={(val: any) => onValueChange?.(val)}>
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
