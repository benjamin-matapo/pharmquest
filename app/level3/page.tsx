'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/lib/gameState'
import { pathogens, multipleChoiceOptions, Pathogen } from '@/lib/drugData'
import NavBar from '@/components/NavBar'
import MicroscopeView from '@/components/MicroscopeView'

const BLUR_STEPS = [20, 14, 8, 3, 0]
const SCORE_MAP = [40, 30, 20, 15, 10]

export default function Level3() {
  const router = useRouter()
  const { addScore, setLevel } = useGameState()

  const currentPathogen = useMemo<Pathogen>(
    () => pathogens[Math.floor(Math.random() * pathogens.length)],
    []
  )

  const [focusTokens, setFocusTokens] = useState(5)
  const [blurIndex, setBlurIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [correct, setCorrect] = useState<boolean | null>(null)
  const [showFunFact, setShowFunFact] = useState(false)
  const [earnedScore, setEarnedScore] = useState(0)

  const blurLevel = BLUR_STEPS[Math.min(blurIndex, BLUR_STEPS.length - 1)]

  const handleFocus = () => {
    if (focusTokens <= 0 || revealed) return
    setFocusTokens((t) => t - 1)
    setBlurIndex((i) => Math.min(i + 1, BLUR_STEPS.length - 1))
  }

  const handleAnswer = (answer: string) => {
    if (revealed) return
    setSelectedAnswer(answer)
    const isCorrect = answer === currentPathogen.name
    setCorrect(isCorrect)
    setRevealed(true)

    if (isCorrect) {
      const pts = SCORE_MAP[Math.min(blurIndex, SCORE_MAP.length - 1)]
      setEarnedScore(pts)
      addScore(pts, 3)
    } else {
      setEarnedScore(0)
    }
  }

  const showOptions = !revealed || correct === false
  const hasWon = revealed && correct === true

  const handleFinish = () => {
    setLevel('results')
    router.push('/results')
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Microscopy Mystery
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Identify the pathogen using your focus tokens. Spend a token to
            sharpen the image, then guess.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-[#1a2332] rounded-full px-5 py-2 flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="#ffa500" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="4" fill="#ffa500" />
            </svg>
            <span className="text-[#ffa500] font-bold text-sm tabular-nums">
              Focus tokens: {focusTokens}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <MicroscopeView pathogenId={currentPathogen.id} blurLevel={blurLevel} />

          {!revealed && (
            <div className="mt-4 text-center text-gray-500 text-xs italic max-w-md">
              &ldquo;{currentPathogen.historicalQuote}&rdquo;
            </div>
          )}

          <div className="mt-6 flex gap-4">
            {!revealed && (
              <button
                onClick={handleFocus}
                disabled={focusTokens <= 0}
                className="px-6 py-2.5 rounded-lg bg-white/10 text-white text-sm font-semibold
                           hover:bg-white/20 transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={`Focus microscope. ${focusTokens} tokens remaining.`}
              >
                Focus ({focusTokens} left)
              </button>
            )}
          </div>

          {showOptions && (
            <div className="mt-6 grid gap-3 w-full max-w-lg">
              {multipleChoiceOptions.map((opt) => {
                const isSelected = selectedAnswer === opt
                const isCorrectAnswer = opt === currentPathogen.name
                let btnStyle =
                  'bg-white/10 text-white hover:bg-white/20 border border-transparent'

                if (revealed) {
                  if (isCorrectAnswer) {
                    btnStyle = 'bg-[#00c851]/20 text-[#00c851] border-[#00c851]/50'
                  } else if (isSelected && !isCorrectAnswer) {
                    btnStyle = 'bg-[#ff6b6b]/20 text-[#ff6b6b] border-[#ff6b6b]/50'
                  } else {
                    btnStyle = 'bg-white/5 text-gray-500 border border-white/5'
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={revealed && !correct}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 ${btnStyle}`}
                    aria-label={`Identify as ${opt}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {revealed && (
            <div className="mt-6 max-w-lg w-full">
              {hasWon ? (
                <div className="bg-[#00c851]/10 border border-[#00c851]/30 rounded-xl p-5 text-center">
                  <p className="text-[#00c851] font-bold text-lg mb-1">
                    Correct! +{earnedScore} pts
                  </p>
                  <p className="text-gray-300 text-sm">
                    You identified {currentPathogen.name}.
                  </p>
                </div>
              ) : correct === false ? (
                <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-xl p-5 text-center">
                  <p className="text-[#ff6b6b] font-bold text-lg mb-1">
                    Incorrect — 0 pts
                  </p>
                  <p className="text-gray-300 text-sm">
                    The correct answer was {currentPathogen.name}.
                  </p>
                </div>
              ) : null}

              {!showFunFact && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setShowFunFact(true)}
                    className="px-6 py-2.5 rounded-lg bg-white/10 text-white text-sm font-semibold
                               hover:bg-white/20 transition-all duration-200"
                    aria-label="Show fun fact"
                  >
                    Show Fun Fact
                  </button>
                </div>
              )}

              {showFunFact && (
                <div className="mt-4 bg-[#1a2332] border border-white/10 rounded-xl p-5">
                  <h3 className="text-[#00d4aa] font-bold text-sm mb-2">Did you know?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentPathogen.funFact}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleFinish}
                  className="px-8 py-3 rounded-xl bg-[#00d4aa] text-[#0a1628] font-bold text-base
                             hover:brightness-110 transition-all duration-300 animate-glowPulse
                             focus:outline-none focus:ring-4 focus:ring-[#00d4aa]/50"
                  aria-label="View results"
                >
                  View Results
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
