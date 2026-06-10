"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hasError, setHasError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHasError(false)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setHasError(true)
        setErrorMsg(data.error || "Invalid email or password")
        setIsLoading(false)
        return
      }

      // Store user info for client-side access
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", data.user.role)
        localStorage.setItem("userName", data.user.name)
        localStorage.setItem("userId", data.user.id)
      }

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch {
      setHasError(true)
      setErrorMsg("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
        </div>

        <div className="space-y-6">
          <Button variant="outline" className="w-full h-11 text-gray-700 font-medium border-gray-200 hover:bg-gray-50 rounded-lg">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium tracking-wide">
                OR CONTINUE WITH EMAIL
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {hasError && (
              <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 flex items-center">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Email address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="email"
                  value={email}
                  placeholder="you@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-gray-50/50 border-gray-200 rounded-lg text-gray-900"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-gray-50/50 border-gray-200 rounded-lg tracking-[0.2em] text-gray-900 placeholder:tracking-normal"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-medium rounded-lg text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
