"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hasError, setHasError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHasError(false)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)

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
    <div className="w-full max-w-[420px] animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
          Welcome back
        </h1>
        <p className="text-gray-500 mt-2 text-[15px]">
          Sign in to manage your properties and spaces
        </p>
      </div>

      {/* Google Sign-in */}
      <button
        type="button"
        className="login-google-btn w-full"
        id="google-signin-btn"
      >
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
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
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200/80" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-[#FFF8F3] text-[11px] text-gray-400 font-semibold tracking-[0.12em] uppercase">
            or continue with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        {hasError && (
          <div className="login-error-msg" id="login-error-alert">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <span className="text-red-500 text-xs font-bold">!</span>
            </div>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="login-email" className="text-[13px] font-semibold text-gray-700 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            Email address
          </label>
          <div className={`login-input-wrapper ${focusedField === 'email' ? 'login-input-focused' : ''}`}>
            <input
              id="login-email"
              type="email"
              value={email}
              placeholder="you@company.com"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="login-input"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-[13px] font-semibold text-gray-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              Password
            </label>
            <button type="button" className="text-[12px] text-[#E8713A] hover:text-[#D4894A] font-medium transition-colors">
              Forgot password?
            </button>
          </div>
          <div className={`login-input-wrapper ${focusedField === 'password' ? 'login-input-focused' : ''}`}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="login-input pr-10"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          <input
            id="remember-me"
            type="checkbox"
            className="login-checkbox"
          />
          <label htmlFor="remember-me" className="text-[13px] text-gray-600 cursor-pointer select-none">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="login-submit-btn"
          disabled={isLoading}
          id="login-submit-btn"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-[18px] h-[18px] animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Sign up link */}
      <div className="text-center mt-7">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#E8713A] hover:text-[#D4894A] font-semibold transition-colors"
            id="register-link"
          >
            Create one free
          </Link>
        </p>
      </div>
    </div>
  )
}
