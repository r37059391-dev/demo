export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#eef3fb] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Top Title */}
      <div className="absolute top-10 text-center w-full">
        <h2 className="text-gray-500 text-sm">Sign in to your workspace</h2>
      </div>

      {children}

      {/* Bottom Footer */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="text-xs text-gray-400">
          By signing in you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
