'use client'

import { Patient } from '@/lib/drugData'

interface DoseSliderProps {
  patient: Patient
  drugName: string
  sliderValue: number
  onChange: (value: number) => void
  disabled: boolean
}

export default function DoseSlider({
  patient,
  drugName,
  sliderValue,
  onChange,
  disabled,
}: DoseSliderProps) {
  return (
    <div className="bg-[#1a2332] rounded-xl p-5 border border-white/10">
      <div className="animate-heartbeat flex items-center gap-3 mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ff6b6b"
          />
        </svg>
        <div>
          <h3 className="text-white font-bold text-base">{patient.name}</h3>
          <p className="text-gray-400 text-xs">
            Age {patient.age} &middot; {patient.condition}
          </p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-300 text-sm font-medium">
          Prescribed: <span className="text-[#00d4aa] font-bold">{drugName}</span>
        </p>
      </div>

      <div className="mt-4">
        <label htmlFor="dose-slider" className="text-gray-400 text-xs block mb-2">
          Dose: <span className="text-white font-bold tabular-nums">{sliderValue.toFixed(1)}</span> mg/L
        </label>
        <input
          id="dose-slider"
          type="range"
          min="0.1"
          max="100"
          step="0.1"
          value={sliderValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                     accent-[#00d4aa] disabled:opacity-40 disabled:cursor-not-allowed
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#00d4aa]
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:cursor-grab"
          aria-label={`Dose slider for ${drugName}, current value ${sliderValue.toFixed(1)} mg/L`}
        />
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-gray-500">
        <span>0.1 mg/L</span>
        <span>100 mg/L</span>
      </div>
    </div>
  )
}
