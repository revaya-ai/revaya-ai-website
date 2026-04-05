interface GlowCTAProps {
  heading: string
  subtext?: string
  buttonText: string
  buttonHref: string
}

export default function GlowCTA({ heading, subtext, buttonText, buttonHref }: GlowCTAProps) {
  return (
    <section className="py-24 md:py-32 text-center relative">
      <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-6">
        {heading}
      </h2>

      {subtext && (
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          {subtext}
        </p>
      )}

      <div className="relative inline-block">
        {/* Glow orb behind button */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: '#028090',
            filter: 'blur(100px)',
            opacity: 0.15,
          }}
        />

        <a
          href={buttonHref}
          className="relative inline-flex items-center gap-2 bg-[#553555] text-white font-display font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          style={{
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(85, 53, 85, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {buttonText}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
