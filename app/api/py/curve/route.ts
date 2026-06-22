import { NextRequest, NextResponse } from 'next/server'
import { computeCurve, type CurveRequest } from '@/lib/curveComputation'

export async function POST(request: NextRequest) {
  let body: CurveRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (
    typeof body.ec50 !== 'number' ||
    typeof body.hill !== 'number' ||
    !Array.isArray(body.concentrations)
  ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  return NextResponse.json(computeCurve(body))
}
