'use client'

export default function FloatingOrbs() {
  return (
    <>
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          top: '-15%',
          right: '-10%',
          width: '700px',
          height: '700px',
          background: '#028090',
          borderRadius: '50%',
          filter: 'blur(280px)',
          opacity: 0.06,
          animation: 'orbFloat 20s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          bottom: '-15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: '#553555',
          borderRadius: '50%',
          filter: 'blur(220px)',
          opacity: 0.05,
          animation: 'orbFloat 25s ease-in-out infinite reverse',
        }}
        aria-hidden="true"
      />
    </>
  )
}
