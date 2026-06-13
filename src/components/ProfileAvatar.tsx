"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadCloud, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ProfileAvatarProps {
  userId: string
  name: string
  avatarUrl: string | null
}

export function ProfileAvatar({ userId, name, avatarUrl }: ProfileAvatarProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const filePath = `${userId}-${Math.random()}.${fileExt}`

      // Upload the image to the 'profle_photo' bucket
      const { error: uploadError } = await supabase.storage
        .from('profle_photo')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profle_photo')
        .getPublicUrl(filePath)

      // Update user record
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar: publicUrl })
        .eq('id', userId)

      if (updateError) {
        throw updateError
      }

      // Refresh the page data
      router.refresh()
    } catch (error) {
      console.error('Error uploading avatar:', error)
      alert('Failed to upload profile photo.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Avatar className={`w-24 h-24 border-4 border-white shadow-xl ${isUploading ? 'opacity-50' : ''}`}>
        <AvatarImage src={avatarUrl || ""} />
        <AvatarFallback className="text-2xl bg-primary/20 text-[#D4894A] font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {!isUploading && (
        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <UploadCloud className="text-white w-6 h-6" />
        </div>
      )}
      
      {isUploading && (
        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
          <Loader2 className="text-white w-6 h-6 animate-spin" />
        </div>
      )}
      
      <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
    </div>
  )
}
