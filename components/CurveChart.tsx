'use client'

interface CurveChartProps {
  concentrations: number[]
  effects: number[]
  sliderValue: number
  dosePosition: number
  therapeuticMin: number
  therapeuticMax: number
  toxicThreshold: number
}

export default function CurveChart({
  concentrations,
  effects,
  sliderValue,
  dosePosition,
  therapeuticMin,
  therapeuticMax,
  toxicThreshold,
}: CurveChartProps) {
  const width = 600
  const height = 300
  const pad = { top: 20, right: 20, bottom: 40, left: 50 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom

  const maxConc = Math.max(...concentrations, toxicThreshold * 1.2)
  const maxEffect = 100

  const xScale = (v: number) => pad.left + (Math.log10(v + 0.01) - Math.log10(0.001)) / (Math.log10(maxConc) - Math.log10(0.001)) * plotW
  const yScale = (v: number) => pad.top + plotH - (v / maxEffect) * plotH

  const points = concentrations
    .map((c, i) => `${xScale(c)},${yScale(effects[i])}`)
    .join(' ')

  const zoneSubX = [xScale(0.001), xScale(therapeuticMin)]
  const zoneTherapeuticX = [xScale(therapeuticMin), xScale(therapeuticMax)]
  const zoneToxicX = [xScale(therapeuticMax), xScale(maxConc)]

  const svgHeight = height + 10

  const doseX = xScale(Math.max(0.01, dosePosition))

  return (
    <div className="w-full overflow-x-auto" role="img" aria-label="Dose-response curve chart showing effect percentage versus drug concentration">
      <svg
        viewBox={`0 0 ${width} ${svgHeight}`}
        className="w-full max-w-[600px] mx-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="plotArea">
            <rect x={pad.left} y={pad.top} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#0d1520" rx="4" />

        <rect
          x={Math.min(...zoneSubX)}
          y={pad.top}
          width={Math.max(0, zoneSubX[1] - zoneSubX[0])}
          height={plotH}
          fill="#ff6b6b"
          opacity="0.15"
        />
        <rect
          x={Math.min(...zoneTherapeuticX)}
          y={pad.top}
          width={Math.max(0, zoneTherapeuticX[1] - zoneTherapeuticX[0])}
          height={plotH}
          fill="#00c851"
          opacity="0.15"
        />
        <rect
          x={Math.min(...zoneToxicX)}
          y={pad.top}
          width={Math.max(0, zoneToxicX[1] - zoneToxicX[0])}
          height={plotH}
          fill="#ffa500"
          opacity="0.15"
        />

        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line
              x1={pad.left}
              y1={yScale(v)}
              x2={pad.left + plotW}
              y2={yScale(v)}
              stroke="#ffffff"
              strokeOpacity="0.08"
            />
            <text
              x={pad.left - 8}
              y={yScale(v) + 4}
              textAnchor="end"
              fill="#ffffff"
              fontSize="11"
              opacity="0.6"
              fontFamily="monospace"
            >
              {v}
            </text>
          </g>
        ))}

        {[0.01, 0.1, 1, 10, 100].map((v) => {
          const x = xScale(v)
          if (x < pad.left || x > pad.left + plotW) return null
          return (
            <g key={v}>
              <line
                x1={x}
                y1={pad.top}
                x2={x}
                y2={pad.top + plotH}
                stroke="#ffffff"
                strokeOpacity="0.08"
              />
              <text
                x={x}
                y={pad.top + plotH + 16}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                opacity="0.6"
                fontFamily="monospace"
              >
                {v}
              </text>
            </g>
          )
        })}

        <polyline
          points={points}
          fill="none"
          stroke="#00d4aa"
          strokeWidth="2.5"
          strokeLinejoin="round"
          clipPath="url(#plotArea)"
        />

        <line
          x1={doseX}
          y1={pad.top}
          x2={doseX}
          y2={pad.top + plotH}
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="4,3"
        />

        <text
          x={doseX}
          y={pad.top - 6}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontFamily="monospace"
        >
          {sliderValue.toFixed(1)} mg/L
        </text>

        <text x={pad.left + plotW - 8} y={pad.top - 6} textAnchor="end" fill="#ff6b6b" fontSize="10" opacity="0.8">
          Sub-therapeutic
        </text>
        <text x={pad.left + plotW - 8} y={pad.top + 12} textAnchor="end" fill="#00c851" fontSize="10" opacity="0.8">
          Therapeutic
        </text>
        <text x={pad.left + plotW - 8} y={pad.top + 30} textAnchor="end" fill="#ffa500" fontSize="10" opacity="0.8">
          Toxic
        </text>
      </svg>
    </div>
  )
}
