'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/lib/gameState'
import Confetti from '@/components/Confetti'

function getGrade(score: number): { title: string; emoji: string } {
  if (score >= 180) return { title: 'Chief Pharmacologist', emoji: '🏆' }
  if (score >= 140) return { title: 'Senior Scientist', emoji: '🌟' }
  if (score >= 80) return { title: 'Junior Researcher', emoji: '🔬' }
  return { title: 'Apprentice Pharmacologist', emoji: '📚' }
}

function getKeyFacts(
  l1Score: number,
  l2Score: number,
  l3Score: number
): string[] {
  const facts: string[] = []
  if (l1Score > 0) {
    facts.push(
      'Germ theory was built over decades by pioneers like Semmelweis, Snow, Pasteur, Lister, Koch, and Fleming — each building on the work before them.'
    )
  }
  if (l2Score > 0) {
    facts.push(
      'Drugs have a therapeutic window: too little has no effect, too much is toxic. The dose-response curve shows where the safe zone lies.'
    )
  }
  if (l3Score > 0) {
    facts.push(
      'Microscopy revealed the hidden world of pathogens — from comma-shaped cholera bacteria to the ring-stage malaria parasite — proving that specific germs cause specific diseases.'
    )
  }
  return facts
}

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === 0) return
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="tabular-nums text-5xl md:text-6xl font-bold text-white">
      {display}
    </span>
  )
}

export default function Results() {
  const router = useRouter()
  const { score, level1Score, level2Score, level3Score, reset } = useGameState()
  const [copied, setCopied] = useState(false)

  const grade = useMemo(() => getGrade(score), [score])
  const facts = useMemo(
    () => getKeyFacts(level1Score, level2Score, level3Score),
    [level1Score, level2Score, level3Score]
  )
  const showConfetti = score >= 140

  const handleShare = async () => {
    const text = `I scored ${score}/200 on PharmQuest! Grade: ${grade.title} ${grade.emoji}\n\nPlay at: https://pharmquest.vercel.app`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePlayAgain = () => {
    reset()
    router.push('/level1')
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center px-6 py-12">
      <Confetti active={showConfetti} />

      <div className="max-w-xl w-full text-center animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Quest Complete!
        </h1>
        <p className="text-gray-400 text-base mb-8">
          Your journey through the history of pharmacology
        </p>

        <div className="mb-8">
          <AnimatedScore value={score} />
          <span className="text-gray-400 text-2xl">/200</span>
        </div>

        <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6 mb-8">
          <p className="text-[#00d4aa] text-xl font-bold">
            {grade.emoji} {grade.title}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Level 1', score: level1Score, max: 60 },
            { label: 'Level 2', score: level2Score, max: 60 },
            { label: 'Level 3', score: level3Score, max: 80 },
          ].map((lv) => (
            <div
              key={lv.label}
              className="bg-[#1a2332] border border-white/10 rounded-xl p-4"
            >
              <p className="text-gray-400 text-xs mb-1">{lv.label}</p>
              <p className="text-white font-bold text-lg tabular-nums">
                {lv.score}
              </p>
              <p className="text-gray-500 text-xs">/ {lv.max}</p>
            </div>
          ))}
        </div>

        {facts.length > 0 && (
          <div className="bg-[#1a2332] border border-white/10 rounded-xl p-5 mb-8 text-left">
            <h3 className="text-[#00d4aa] font-bold text-sm mb-3">
              Key Facts Learned
            </h3>
            <ul className="space-y-2">
              {facts.map((f, i) => (
                <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                  <span className="text-[#00d4aa] shrink-0">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleShare}
            className="px-8 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm
                       hover:bg-white/20 transition-all duration-200 border border-white/10
                       focus:outline-none focus:ring-4 focus:ring-white/20"
            aria-label="Share score"
          >
            {copied ? 'Copied!' : 'Share Score'}
          </button>
          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 rounded-xl bg-[#00d4aa] text-[#0a1628] font-bold text-sm
                       hover:brightness-110 transition-all duration-300 animate-glowPulse
                       focus:outline-none focus:ring-4 focus:ring-[#00d4aa]/50"
            aria-label="Play again"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}
