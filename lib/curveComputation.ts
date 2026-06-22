export interface CurveRequest {
  drug: string
  ec50: number
  hill: number
  concentrations: number[]
}

export interface CurveResponse {
  effects: number[]
  therapeutic_window: { min: number; max: number }
  toxic_threshold: number
}

export function computeCurve(req: CurveRequest): CurveResponse {
  const effects = req.concentrations.map((c) => {
    if (c <= 0) return 0
    const e = (100 * c ** req.hill) / (req.ec50 ** req.hill + c ** req.hill)
    return Math.round(e * 100) / 100
  })

  return {
    effects,
    therapeutic_window: {
      min: req.ec50 * 0.5,
      max: req.ec50 * 2.0,
    },
    toxic_threshold: req.ec50 * 3.5,
  }
}
