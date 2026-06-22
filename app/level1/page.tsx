'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/lib/gameState'
import { timelineEvents, CardData } from '@/lib/drugData'
import NavBar from '@/components/NavBar'
import DragCard from '@/components/DragCard'

function shuffle<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Level1() {
  const router = useRouter()
  const { addScore, setLevel } = useGameState()
  const [cards, setCards] = useState<CardData[]>(() => shuffle(timelineEvents))
  const [reveal, setReveal] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [pageAnim, setPageAnim] = useState<'idle' | 'turn'>('idle')
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDragIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault()
      if (dragIndex === null || dragIndex === targetIndex) return
      setCards((prev) => {
        const next = [...prev]
        const [moved] = next.splice(dragIndex, 1)
        next.splice(targetIndex, 0, moved)
        return next
      })
      setDragIndex(null)
    },
    [dragIndex]
  )

  const handleSubmit = () => {
    const sorted = [...cards].sort((a, b) => a.year - b.year)
    const correctOrder = sorted.map((c) => c.id)
    const playerOrder = cards.map((c) => c.id)
    const res: boolean[] = []
    let pts = 0

    for (let i = 0; i < playerOrder.length; i++) {
      const correctIdx = correctOrder.indexOf(playerOrder[i])
      if (correctIdx === i) {
        res.push(true)
        pts += 10
      } else if (Math.abs(correctIdx - i) === 1) {
        res.push(false)
        pts += 5
      } else {
        res.push(false)
      }
    }

    setResults(res)
    setScore(pts)
    setReveal(true)
    setSubmitted(true)
    addScore(pts, 1)
  }

  const handleNext = () => {
    setPageAnim('turn')
    setTimeout(() => {
      setLevel(2)
      router.push('/level2')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#2a1a0a]">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className={`transition-all duration-700 ${pageAnim === 'turn' ? 'opacity-0 -translate-x-full' : 'opacity-100'}`}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-georgia font-bold text-[#e8d5a8]">
              The Great Debate
            </h1>
            <p className="text-[#c4a86a] mt-2 font-georgia text-sm md:text-base">
              Drag each discovery into the correct chronological order on the timeline.
            </p>
          </div>

          <div className="relative mb-10">
            <div className="ink-line absolute top-1/2 left-0 right-0 -translate-y-1/2" />
            <div className="flex items-center justify-between relative px-1">
              {cards.map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#c4a86a] border-2 border-[#8b7355] z-10" />
                  {i < cards.length - 1 && (
                    <span className="text-[#8b7355] text-xs mt-1">{i + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {cards.map((card, i) => (
              <DragCard
                key={card.id}
                card={card}
                index={i}
                revealYear={reveal}
                isCorrect={reveal ? results[i] : null}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-[#c4a86a] text-[#2a1a0a] font-bold text-base
                           hover:brightness-110 transition-all duration-300
                           focus:outline-none focus:ring-4 focus:ring-[#c4a86a]/50"
                aria-label="Submit timeline order"
              >
                Submit Order
              </button>
            ) : (
              <>
                <div className="text-[#e8d5a8] font-georgia text-lg font-bold">
                  Score: {score} / 60
                </div>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl bg-[#00d4aa] text-[#0a1628] font-bold text-base
                             hover:brightness-110 transition-all duration-300
                             focus:outline-none focus:ring-4 focus:ring-[#00d4aa]/50"
                  aria-label="Proceed to Level 2"
                >
                  Next Level →
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
