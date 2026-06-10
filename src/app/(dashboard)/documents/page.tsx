import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Eye, Trash2, Download, ShieldCheck } from "lucide-react"

export default function DocumentsPage() {
  const documents = [
    { name: "Aadhaar Card", status: "Verified", date: "Sep 1, 2026", size: "2.4 MB", type: "Identity" },
    { name: "Rental Agreement", status: "Pending", date: "Sep 2, 2026", size: "5.1 MB", type: "Legal" },
    { name: "Passport Size Photo", status: "Verified", date: "Sep 1, 2026", size: "1.2 MB", type: "Photo" },
    { name: "PAN Card", status: "Re-upload", date: "Sep 1, 2026", size: "Image unclear", type: "Identity" },
  ]

  const statusConfig = {
    "Verified": { icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 border-emerald-200", iconColor: "text-emerald-500" },
    "Pending": { icon: ShieldCheck, color: "bg-amber-50 text-amber-700 border-amber-200", iconColor: "text-amber-500" },
    "Re-upload": { icon: AlertCircle, color: "bg-red-50 text-red-700 border-red-200", iconColor: "text-red-500" },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Document Center</h1>
          <p className="text-sm text-gray-500">Manage and upload your important documents for KYC verification.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-medium">
          <UploadCloud className="w-4 h-4 mr-2" /> Upload New
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Uploaded", value: "4", color: "text-blue-600" },
          { label: "Verified", value: "2", color: "text-emerald-600" },
          { label: "Pending Action", value: "2", color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label} className="shadow-sm border-gray-100 bg-white">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, idx) => {
          const config = statusConfig[doc.status as keyof typeof statusConfig]
          const StatusIcon = config.icon
          return (
            <Card key={idx} className="card-hover shadow-sm border-gray-100 bg-white overflow-hidden group">
              <CardContent className="p-0">
                {/* Top accent bar */}
                <div className={`h-1 ${doc.status === "Verified" ? "bg-emerald-500" : doc.status === "Pending" ? "bg-amber-500" : "bg-red-500"}`} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={`text-xs font-medium border rounded-lg ${config.color}`}>
                      <StatusIcon className={`w-3 h-3 mr-1 ${config.iconColor}`} /> {doc.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 text-base">{doc.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{doc.date} • {doc.size}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.type} Document</p>
                  
                  <div className="mt-5 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs rounded-lg font-medium border-gray-200 hover:bg-gray-50">
                      <Eye className="w-3 h-3 mr-1.5" /> View
                    </Button>
                    {doc.status === "Re-upload" ? (
                      <Button size="sm" className="flex-1 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium">
                        <UploadCloud className="w-3 h-3 mr-1.5" /> Replace
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-xs rounded-lg border-gray-200 hover:bg-gray-50 px-3">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Upload New Card */}
        <Card className="shadow-sm border-2 border-dashed border-gray-200 hover:border-blue-300 bg-gray-50/30 hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[260px] group rounded-2xl">
          <div className="p-4 bg-white shadow-sm text-gray-400 group-hover:text-blue-500 rounded-2xl mb-3 group-hover:shadow-md transition-all">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-700 group-hover:text-gray-900">Upload Document</h3>
          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 5MB</p>
          <p className="text-xs text-blue-600 font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click to browse</p>
        </Card>
      </div>
    </div>
  )
}
