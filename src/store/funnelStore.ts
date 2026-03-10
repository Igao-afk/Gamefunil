import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StageNumber } from '../types/funnel'

interface FunnelState {
  currentStage: StageNumber
  isTransitioning: boolean
  sessionStarted: boolean
  audioUnlocked: boolean

  startSession: () => void
  advanceStage: () => void
  setTransitioning: (value: boolean) => void
  unlockAudio: () => void
  resetFunnel: () => void
}

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      currentStage: 0,
      isTransitioning: false,
      sessionStarted: false,
      audioUnlocked: false,

      startSession: () => {
        set({ sessionStarted: true, currentStage: 1 })
      },

      advanceStage: () => {
        const { currentStage, isTransitioning } = get()
        if (isTransitioning) return
        if (currentStage >= 5) return
        set({ currentStage: (currentStage + 1) as StageNumber })
      },

      setTransitioning: (value: boolean) => {
        set({ isTransitioning: value })
      },

      unlockAudio: () => {
        set({ audioUnlocked: true })
      },

      resetFunnel: () => {
        set({
          currentStage: 0,
          isTransitioning: false,
          sessionStarted: false,
          audioUnlocked: false,
        })
      },
    }),
    {
      name: 'project-invisible-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentStage: state.currentStage,
        sessionStarted: state.sessionStarted,
        audioUnlocked: state.audioUnlocked,
      }),
    }
  )
)
