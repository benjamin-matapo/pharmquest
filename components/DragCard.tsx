'use client'

import { CardData } from '@/lib/drugData'

interface DragCardProps {
  card: CardData
  index: number
  revealYear: boolean
  isCorrect: boolean | null
  onDragStart: (e: React.DragEvent, index: number) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, targetIndex: number) => void
}

export default function DragCard({
  card,
  index,
  revealYear,
  isCorrect,
  onDragStart,
  onDragOver,
  onDrop,
}: DragCardProps) {
  const borderColor =
    isCorrect === true
      ? 'border-[#00c851]'
      : isCorrect === false
      ? 'border-[#ff6b6b]'
      : 'border-[#c4a86a]'

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className={`parchment-card rounded-xl p-4 md:p-5 cursor-grab active:cursor-grabbing
                  transition-all duration-300 hover:shadow-lg select-none
                  border-2 ${borderColor}
                  ${isCorrect === null ? 'opacity-100' : isCorrect ? 'opacity-100' : 'opacity-80'}`}
      role="button"
      aria-label={`Card: ${card.scientist} - ${card.discovery}. Drag to reorder.`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
        }
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-[#8b7355] text-sm font-bold min-w-[24px]">{index + 1}.</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#3a2a1a] text-base md:text-lg leading-tight">
            {card.scientist}
          </h3>
          <p className="text-sm text-[#5a4a3a] mt-1 font-semibold">{card.discovery}</p>
          <p className="text-xs text-[#7a6a5a] mt-2 italic leading-relaxed">{card.flavour}</p>
          {revealYear && (
            <span
              className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold
                ${isCorrect ? 'bg-[#00c851]/20 text-[#00c851]' : 'bg-[#ff6b6b]/20 text-[#ff6b6b]'}`}
            >
              {card.year}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
