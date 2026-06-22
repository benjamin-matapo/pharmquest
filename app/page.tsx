'use client'

import { useRouter } from 'next/navigation'
import { useGameState } from '@/lib/gameState'

function PillIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="inline-block"
    >
      <rect x="12" y="6" width="24" height="36" rx="12" fill="#00d4aa" opacity="0.9" />
      <rect x="12" y="6" width="12" height="36" rx="12" fill="#ffffff" opacity="0.3" />
      <path d="M24 6 Q30 24 24 42" stroke="#00d4aa" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  )
}

const levelPreviews = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="#00d4aa" strokeWidth="2" fill="none" />
        <path d="M10 16 L14 20 L22 12" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Level 1: The Great Debate',
    desc: 'Place germ theory discoveries in chronological order',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="#ffa500" strokeWidth="2" fill="none" />
        <line x1="16" y1="8" x2="16" y2="24" stroke="#ffa500" strokeWidth="2" />
        <circle cx="16" cy="16" r="3" fill="#ffa500" />
      </svg>
    ),
    title: 'Level 2: Find the Safe Dose',
    desc: 'Adjust doses to hit the therapeutic window',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="#ff6b6b" strokeWidth="2" fill="none" />
        <circle cx="16" cy="16" r="4" fill="#ff6b6b" opacity="0.6" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#ff6b6b" strokeWidth="1.5" />
        <line x1="16" y1="26" x2="16" y2="30" stroke="#ff6b6b" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Level 3: Microscopy Mystery',
    desc: 'Identify pathogens through blurred microscope images',
  },
]

export default function Home() {
  const router = useRouter()
  const reset = useGameState((s) => s.reset)

  const handleStart = () => {
    reset()
    router.push('/level1')
  }

  return (
    <main className="min-h-screen gradient-home flex flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <PillIcon />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">
          PharmQuest
        </h1>
        <p className="text-xl md:text-2xl text-[#00d4aa] font-light mb-6">
          Unlock the science of drugs — and the history of those who discovered them
        </p>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          It is 1870s London. You are a junior pharmacologist working alongside
          pioneers like John Snow and Louis Pasteur. Master the timeline of germ
          theory, dial in safe doses, and peer through early microscopes to
          identify the hidden microbes that changed medicine forever.
        </p>
        <button
          onClick={handleStart}
          className="px-10 py-4 rounded-xl bg-[#00d4aa] text-[#0a1628] font-bold text-lg
                     hover:brightness-110 transition-all duration-300 animate-glowPulse
                     focus:outline-none focus:ring-4 focus:ring-[#00d4aa]/50"
          aria-label="Start Adventure"
        >
          Start Adventure
        </button>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-4xl w-full">
        {levelPreviews.map((lv, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10
                       hover:border-[#00d4aa]/40 transition-all duration-300"
          >
            <div className="mb-3">{lv.icon}</div>
            <h3 className="font-semibold text-base mb-1">{lv.title}</h3>
            <p className="text-sm text-gray-400">{lv.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
