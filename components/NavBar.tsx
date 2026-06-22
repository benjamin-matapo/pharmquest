'use client'

import { useGameState } from '@/lib/gameState'

const levelNames: Record<string, string> = {
  '1': 'The Great Debate',
  '2': 'Find the Safe Dose',
  '3': 'Microscopy Mystery',
}

export default function NavBar() {
  const { score, level } = useGameState()
  const levelNum = typeof level === 'number' ? level : 0
  const progress = levelNum === 1 ? 33 : levelNum === 2 ? 66 : levelNum === 3 ? 90 : 100

  return (
    <header
      className="sticky top-0 z-50 bg-[#1a2332]/95 backdrop-blur-md border-b border-white/10"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect x="12" y="6" width="24" height="36" rx="12" fill="#00d4aa" opacity="0.9" />
            <rect x="12" y="6" width="12" height="36" rx="12" fill="#ffffff" opacity="0.3" />
          </svg>
          <span className="text-white font-bold text-sm md:text-base">PharmQuest</span>
        </div>

        {typeof level === 'number' && (
          <span className="text-gray-300 text-sm hidden md:block font-georgia italic">
            Level {level}: {levelNames[String(level)]}
          </span>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="#ffa500" strokeWidth="2" fill="none" />
              <text x="12" y="16" textAnchor="middle" fontSize="14" fill="#ffa500" fontWeight="bold">
                ★
              </text>
            </svg>
            <span className="text-[#ffa500] font-bold text-sm md:text-base tabular-nums">
              {score}
            </span>
          </div>

          {typeof level === 'number' && (
            <div className="w-28 md:w-40 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00d4aa] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
