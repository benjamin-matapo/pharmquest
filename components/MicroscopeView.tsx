'use client'

interface MicroscopeViewProps {
  pathogenId: string
  blurLevel: number
}

function CholeraBacterium() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
      <path
        d="M80 100 Q60 60 90 40 Q110 20 130 40 Q150 60 120 100 Q100 130 80 100Z"
        fill="#00c851"
        opacity="0.8"
        stroke="#00a040"
        strokeWidth="2"
      />
      <path
        d="M70 90 Q50 50 80 30"
        fill="none"
        stroke="#00c851"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="68" cy="88" r="4" fill="#00a040" opacity="0.6" />
      <circle cx="78" cy="78" r="3" fill="#00a040" opacity="0.6" />
    </svg>
  )
}

function InfluenzaVirus() {
  const spikes = 8
  const spikePaths = Array.from({ length: spikes }, (_, i) => {
    const angle = (i * 360) / spikes
    const rad = (angle * Math.PI) / 180
    const x1 = 100 + 30 * Math.cos(rad)
    const y1 = 100 + 30 * Math.sin(rad)
    const x2 = 100 + 50 * Math.cos(rad)
    const y2 = 100 + 50 * Math.sin(rad)
    return { x1, y1, x2, y2 }
  })

  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
      <circle cx="100" cy="100" r="30" fill="#00c851" opacity="0.7" stroke="#00a040" strokeWidth="2" />
      {spikePaths.map((sp, i) => (
        <line
          key={i}
          x1={sp.x1}
          y1={sp.y1}
          x2={sp.x2}
          y2={sp.y2}
          stroke="#00c851"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
      ))}
      {spikePaths.map((sp, i) => (
        <circle
          key={`tip-${i}`}
          cx={sp.x2}
          cy={sp.y2}
          r="4"
          fill="#00a040"
          opacity="0.7"
        />
      ))}
      <circle cx="90" cy="92" r="3" fill="#ffffff" opacity="0.3" />
      <circle cx="108" cy="95" r="2" fill="#ffffff" opacity="0.3" />
    </svg>
  )
}

function Plasmodium() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
      <circle cx="100" cy="100" r="60" fill="#00c851" opacity="0.2" stroke="#00c851" strokeWidth="2" />
      <circle cx="100" cy="100" r="35" fill="none" stroke="#00c851" strokeWidth="3" opacity="0.6" />
      <path
        d="M100 65 Q115 80 110 100 Q105 115 100 135"
        fill="none"
        stroke="#00c851"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="100" cy="65" r="6" fill="#00c851" opacity="0.9" />
      <circle cx="90" cy="130" r="3" fill="#00c851" opacity="0.5" />
      <circle cx="108" cy="125" r="2.5" fill="#00c851" opacity="0.5" />
      <circle cx="95" cy="70" r="2" fill="#ffffff" opacity="0.3" />
    </svg>
  )
}

function Tuberculosis() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
      <defs>
        <linearGradient id="tbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00a040" />
          <stop offset="50%" stopColor="#00c851" />
          <stop offset="100%" stopColor="#00a040" />
        </linearGradient>
      </defs>
      <rect
        x="50"
        y="80"
        width="100"
        height="40"
        rx="20"
        ry="20"
        fill="url(#tbGrad)"
        opacity="0.85"
      />
      <rect
        x="55"
        y="85"
        width="12"
        height="30"
        rx="6"
        fill="#00c851"
        opacity="0.5"
      />
      <rect
        x="75"
        y="87"
        width="8"
        height="26"
        rx="4"
        fill="#00c851"
        opacity="0.4"
      />
      <rect
        x="95"
        y="84"
        width="10"
        height="32"
        rx="5"
        fill="#00c851"
        opacity="0.5"
      />
      <rect
        x="115"
        y="86"
        width="6"
        height="28"
        rx="3"
        fill="#00c851"
        opacity="0.4"
      />
      <rect
        x="132"
        y="88"
        width="8"
        height="24"
        rx="4"
        fill="#00c851"
        opacity="0.5"
      />
    </svg>
  )
}

export default function MicroscopeView({ pathogenId, blurLevel }: MicroscopeViewProps) {
  const pathogenSvgs: Record<string, React.ReactNode> = {
    cholera: <CholeraBacterium />,
    influenza: <InfluenzaVirus />,
    malaria: <Plasmodium />,
    tb: <Tuberculosis />,
  }

  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto">
      <div
        className="w-full h-full rounded-full bg-black microscope-vignette
                   flex items-center justify-center overflow-hidden border-2 border-[#00c851]/30"
        aria-label={`Microscope view of pathogen, blur level ${blurLevel}`}
      >
        <div
          className="transition-all duration-500 ease-in-out"
          style={{ filter: `blur(${blurLevel}px)` }}
        >
          {pathogenId && pathogenSvgs[pathogenId]
            ? pathogenSvgs[pathogenId]
            : <CholeraBacterium />}
        </div>
      </div>
    </div>
  )
}
