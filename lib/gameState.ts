import { create } from 'zustand'

interface GameState {
  score: number
  level: 1 | 2 | 3 | 'results'
  level1Score: number
  level2Score: number
  level3Score: number
  level1Complete: boolean
  level2Complete: boolean
  level3Complete: boolean
  addScore: (points: number, level: 1 | 2 | 3) => void
  setLevel: (level: GameState['level']) => void
  reset: () => void
}

export const useGameState = create<GameState>((set) => ({
  score: 0,
  level: 1,
  level1Score: 0,
  level2Score: 0,
  level3Score: 0,
  level1Complete: false,
  level2Complete: false,
  level3Complete: false,
  addScore: (points: number, level: 1 | 2 | 3) =>
    set((state) => {
      const scoreKey = `level${level}Score` as const
      const completeKey = `level${level}Complete` as const
      return {
        score: state.score + points,
        [scoreKey]: state[scoreKey] + points,
        [completeKey]: true,
      }
    }),
  setLevel: (level) => set({ level }),
  reset: () =>
    set({
      score: 0,
      level: 1,
      level1Score: 0,
      level2Score: 0,
      level3Score: 0,
      level1Complete: false,
      level2Complete: false,
      level3Complete: false,
    }),
}))
