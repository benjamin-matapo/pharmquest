'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/lib/gameState'
import {
  drugPresets,
  concentrations,
  generatePatient,
  Patient,
} from '@/lib/drugData'
import NavBar from '@/components/NavBar'
import CurveChart from '@/components/CurveChart'
import DoseSlider from '@/components/DoseSlider'

function hillEquation(c: number, ec50: number, hill: number): number {
  if (c <= 0) return 0
  return 100 * (c ** hill) / (ec50 ** hill + c ** hill)
}

export default function Level2() {
  const router = useRouter()
  const { addScore, setLevel } = useGameState()

  const [selectedDrugIdx, setSelectedDrugIdx] = useState(0)
  const [patient, setPatient] = useState<Patient>(() =>
    generatePatient(drugPresets[0])
  )
  const [sliderValue, setSliderValue] = useState(5)
  const [effects, setEffects] = useState<number[]>([])
  const [therapeuticMin, setTherapeuticMin] = useState(0)
  const [therapeuticMax, setTherapeuticMax] = useState(0)
  const [toxicThreshold, setToxicThreshold] = useState(0)
  const [patientsTreated, setPatientsTreated] = useState(0)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [disabled, setDisabled] = useState(false)

  const drug = drugPresets[selectedDrugIdx]
  const patientEc50 = drug.ec50 * patient.ec50Multiplier

  const fetchCurve = useCallback(async () => {
    const body = {
      drug: drug.name,
      ec50: patientEc50,
      hill: drug.hill,
      concentrations,
    }

    let data: { effects: number[]; therapeutic_window: { min: number; max: number }; toxic_threshold: number }

    try {
      const res = await fetch('/api/py/curve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('API not available')
      data = await res.json()
    } catch {
      data = {
        effects: concentrations.map((c) =>
          Math.round(hillEquation(c, patientEc50, drug.hill) * 100) / 100
        ),
        therapeutic_window: {
          min: patientEc50 * 0.5,
          max: patientEc50 * 2.0,
        },
        toxic_threshold: patientEc50 * 3.5,
      }
    }

    setEffects(data.effects)
    setTherapeuticMin(data.therapeutic_window.min)
    setTherapeuticMax(data.therapeutic_window.max)
    setToxicThreshold(data.toxic_threshold)
  }, [drug, patientEc50])

  useEffect(() => {
    fetchCurve()
  }, [fetchCurve])

  const handleDrugChange = (idx: number) => {
    setSelectedDrugIdx(idx)
    setPatient(generatePatient(drugPresets[idx]))
    setSliderValue(5)
    setMessage('')
    setMessageType('')
    setDisabled(false)
  }

  const handleDoseChange = (value: number) => {
    setSliderValue(value)
    setMessage('')
    setMessageType('')
  }

  const handleAdminister = () => {
    if (disabled) return

    const inTherapeutic = sliderValue >= therapeuticMin && sliderValue <= therapeuticMax
    const isToxic = sliderValue >= toxicThreshold

    if (inTherapeutic) {
      setMessage('Perfect! The patient is in the therapeutic window.')
      setMessageType('success')
      addScore(20, 2)
      setPatientsTreated((p) => p + 1)
      setDisabled(true)
    } else if (isToxic) {
      setMessage('Too high! This dose is toxic.')
      setMessageType('error')
      setDisabled(true)
    } else {
      setMessage('Too low! This dose is sub-therapeutic.')
      setMessageType('error')
      setDisabled(true)
    }
  }

  const handleNextPatient = () => {
    setPatient(generatePatient(drug))
    setSliderValue(5)
    setMessage('')
    setMessageType('')
    setDisabled(false)
  }

  const handleFinish = () => {
    setLevel(3)
    router.push('/level3')
  }

  const allTreated = patientsTreated >= 3

  return (
    <div className="min-h-screen bg-[#0f1923]">
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Find the Safe Dose
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Adjust the dose to hit the therapeutic window for each patient.
            Treat <strong className="text-white">3 patients</strong> to pass.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {drugPresets.map((d, i) => (
            <button
              key={d.name}
              onClick={() => handleDrugChange(i)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                ${
                  selectedDrugIdx === i
                    ? 'bg-[#00d4aa] text-[#0a1628]'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              aria-label={`Select ${d.name}`}
              disabled={disabled}
            >
              {d.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <CurveChart
              concentrations={concentrations}
              effects={effects}
              sliderValue={sliderValue}
              dosePosition={sliderValue}
              therapeuticMin={therapeuticMin}
              therapeuticMax={therapeuticMax}
              toxicThreshold={toxicThreshold}
            />
            <div className="mt-4 text-center text-xs text-gray-500 font-mono">
              Patients treated: {patientsTreated} / 3
            </div>
          </div>

          <div>
            <DoseSlider
              patient={patient}
              drugName={drug.name}
              sliderValue={sliderValue}
              onChange={handleDoseChange}
              disabled={disabled}
            />

            <div className="mt-4 flex flex-col items-center gap-3">
              {!allTreated && (
                <button
                  onClick={handleAdminister}
                  disabled={disabled}
                  className="px-8 py-3 rounded-xl bg-[#00d4aa] text-[#0a1628] font-bold text-base
                             hover:brightness-110 transition-all duration-300
                             disabled:opacity-40 disabled:cursor-not-allowed
                             focus:outline-none focus:ring-4 focus:ring-[#00d4aa]/50"
                  aria-label="Administer dose"
                >
                  Administer Dose
                </button>
              )}

              {message && (
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    messageType === 'success'
                      ? 'bg-[#00c851]/20 text-[#00c851]'
                      : 'bg-[#ff6b6b]/20 text-[#ff6b6b]'
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              {disabled && !allTreated && (
                <button
                  onClick={handleNextPatient}
                  className="px-6 py-2 rounded-lg bg-white/10 text-white text-sm font-semibold
                             hover:bg-white/20 transition-all duration-200"
                  aria-label="Next patient"
                >
                  Next Patient →
                </button>
              )}

              {allTreated && (
                <button
                  onClick={handleFinish}
                  className="px-8 py-3 rounded-xl bg-[#00d4aa] text-[#0a1628] font-bold text-base
                             hover:brightness-110 transition-all duration-300 animate-glowPulse
                             focus:outline-none focus:ring-4 focus:ring-[#00d4aa]/50"
                  aria-label="Proceed to Level 3"
                >
                  Next Level →
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
