'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  target: number
  suffix?: string
  prefix?: string
  label: string
}

interface CountUpStatsProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { target: 10, suffix: '+', label: 'Hours/Week Back' },
  { target: 47, label: 'Tasks Automated' },
  { target: 5, label: 'Layers Deep' },
  { target: 0, prefix: '$', label: 'New Tools Needed' },
]

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function CountUpStats({ stats = defaultStats }: CountUpStatsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [values, setValues] = useState<number[]>(() => stats.map(() => 0))
  const [counting, setCounting] = useState<boolean[]>(() => stats.map(() => false))
  const hasTriggered = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          observer.disconnect()

          stats.forEach((stat, index) => {
            const delay = index * 200
            const duration = 2000

            setTimeout(() => {
              setCounting((prev) => {
                const next = [...prev]
                next[index] = true
                return next
              })

              const startTime = performance.now()

              function animate(now: number) {
                const elapsed = now - startTime
                const progress = Math.min(elapsed / duration, 1)
                const easedProgress = easeOutExpo(progress)
                const currentValue = Math.round(easedProgress * stat.target)

                setValues((prev) => {
                  const next = [...prev]
                  next[index] = currentValue
                  return next
                })

                if (progress < 1) {
                  requestAnimationFrame(animate)
                } else {
                  setValues((prev) => {
                    const next = [...prev]
                    next[index] = stat.target
                    return next
                  })
                  setTimeout(() => {
                    setCounting((prev) => {
                      const next = [...prev]
                      next[index] = false
                      return next
                    })
                  }, 100)
                }
              }

              requestAnimationFrame(animate)
            }, delay)
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stats])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 text-center max-w-5xl mx-auto px-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <div key={index}>
            <div
              className="font-display text-5xl md:text-6xl font-black text-white"
              style={{
                textShadow: counting[index]
                  ? '0 0 20px rgba(2, 128, 144, 0.5), 0 0 40px rgba(2, 128, 144, 0.2)'
                  : 'none',
                transition: 'text-shadow 0.5s ease',
              }}
            >
              {stat.prefix ?? ''}
              {values[index]}
              {stat.suffix ?? ''}
            </div>
            <div className="text-sm text-white/60 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
