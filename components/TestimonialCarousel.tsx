'use client'

import { useRef, useState } from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (!testimonials || testimonials.length === 0) return null

  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0 })

  function handleMouseDown(e: React.MouseEvent) {
    const track = trackRef.current
    if (!track) return
    setIsDragging(true)
    dragState.current.startX = e.pageX - track.offsetLeft
    dragState.current.scrollLeft = track.scrollLeft
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return
    const track = trackRef.current
    if (!track) return
    e.preventDefault()
    const x = e.pageX - track.offsetLeft
    const walk = (x - dragState.current.startX) * 1.5
    track.scrollLeft = dragState.current.scrollLeft - walk
  }

  function handleMouseUp() {
    setIsDragging(false)
  }

  function handleMouseLeave() {
    setIsDragging(false)
  }

  return (
    <section className="py-24 md:py-32 px-6">
      <h2 className="font-display text-2xl md:text-3xl font-black text-white text-center mb-12">
        What Founders Are Saying
      </h2>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl rounded-2xl p-8 min-w-[340px] snap-start shrink-0"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="text-white/80 text-base leading-relaxed mb-6">
              <span className="text-[#028090] text-3xl font-serif leading-none mr-1">
                &ldquo;
              </span>
              {testimonial.quote}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                {testimonial.name}
              </div>
              <div className="text-white/50 text-sm">
                {testimonial.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
