import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Hero Visual */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/luxury-apartment.png"
          alt="Modern luxury apartment"
          fill
          className="object-cover"
          priority
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8713A]/80 via-[#D4894A]/50 to-[#1a1a2e]/70 z-10" />
        
        {/* Content overlay */}
        <div className="relative z-20 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-white/90 font-bold text-xl tracking-tight">SmartApt</span>
          </div>

          {/* Hero text */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white leading-[1.15] mb-5">
              Experience Urban<br />Living Today
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-md">
              Discover premium apartments, manage your property, and enjoy seamless living with SmartApt.
            </p>

            {/* Stats row */}
            <div className="flex gap-10 mt-10">
              <div>
                <div className="text-3xl font-bold text-white">2,500+</div>
                <div className="text-white/60 text-sm mt-1">Properties Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-white/60 text-sm mt-1">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">15k+</div>
                <div className="text-white/60 text-sm mt-1">Happy Tenants</div>
              </div>
            </div>
          </div>

          {/* Bottom decorative card */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg">
              <Image
                src="/apartment-interior.png"
                alt="Featured apartment"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Featured: Sunrise Bay Ridge</div>
              <div className="text-white/60 text-xs">San Francisco, California</div>
            </div>
            <div className="ml-auto bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-semibold text-sm">$875,700</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#FFF8F3] px-6 py-12 relative">
        {/* Decorative warm blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8713A]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5C28A]/10 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Mobile logo (visible on small screens) */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8713A] to-[#D4894A] flex items-center justify-center shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-gray-800 font-bold text-xl tracking-tight">SmartApt</span>
        </div>

        {children}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By signing in you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
