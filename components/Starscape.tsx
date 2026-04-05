'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  driftX: number
  driftY: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function Starscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const starCount = isMobile ? 80 : 180

    // Generate stars
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + 0.3,
      baseOpacity: Math.random() * 0.6 + 0.2,
      driftX: (Math.random() - 0.5) * 0.04,
      driftY: (Math.random() - 0.5) * 0.02,
      twinkleSpeed: Math.random() * 0.002 + 0.001,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      canvas!.style.width = window.innerWidth + 'px'
      canvas!.style.height = window.innerHeight + 'px'
      ctx!.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationId: number

    function drawStars() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const now = Date.now()

      stars.forEach(star => {
        if (!prefersReducedMotion) {
          star.x += star.driftX
          star.y += star.driftY
          if (star.x < 0) star.x = window.innerWidth
          if (star.x > window.innerWidth) star.x = 0
          if (star.y < 0) star.y = window.innerHeight
          if (star.y > window.innerHeight) star.y = 0
        }

        const twinkle = Math.sin(now * star.twinkleSpeed + star.twinklePhase)
        const opacity = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity + twinkle * 0.3

        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`
        ctx!.fill()
      })

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(drawStars)
      }
    }

    drawStars()
    if (prefersReducedMotion) {
      // Draw once for static stars
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
