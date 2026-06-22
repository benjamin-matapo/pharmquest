'use client'

import { useMemo } from 'react'

interface ConfettiProps {
  active: boolean
}

const COLORS = ['#ff6b6b', '#00d4aa', '#ffa500', '#00c851', '#ffffff', '#ffd700', '#ff69b4']

export default function Confetti({ active }: ConfettiProps) {
  const pieces = useMemo(() => {
    if (!active) return []
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
  }, [active])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: '2px',
            animation: `confettiFall ${p.duration}s linear ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 1,
          }}
        />
      ))}
    </div>
  )
}
