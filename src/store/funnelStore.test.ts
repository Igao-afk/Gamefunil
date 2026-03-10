import { describe, it, expect, beforeEach } from 'vitest'
import { useFunnelStore } from './funnelStore'

describe('funnelStore', () => {
  beforeEach(() => {
    useFunnelStore.getState().resetFunnel()
  })

  it('estado inicial correto', () => {
    const state = useFunnelStore.getState()
    expect(state.currentStage).toBe(0)
    expect(state.sessionStarted).toBe(false)
    expect(state.isTransitioning).toBe(false)
    expect(state.audioUnlocked).toBe(false)
  })

  it('startSession define stage 1', () => {
    useFunnelStore.getState().startSession()
    expect(useFunnelStore.getState().currentStage).toBe(1)
    expect(useFunnelStore.getState().sessionStarted).toBe(true)
  })

  it('advanceStage incrementa stage', () => {
    useFunnelStore.getState().startSession() // stage 1
    useFunnelStore.getState().advanceStage() // stage 2
    expect(useFunnelStore.getState().currentStage).toBe(2)
  })

  it('advanceStage não ultrapassa stage 5', () => {
    const store = useFunnelStore.getState()
    store.startSession()
    store.advanceStage() // 2
    store.advanceStage() // 3
    store.advanceStage() // 4
    store.advanceStage() // 5
    store.advanceStage() // deve ficar em 5
    expect(useFunnelStore.getState().currentStage).toBe(5)
  })

  it('advanceStage bloqueado durante transição', () => {
    useFunnelStore.getState().startSession()
    useFunnelStore.getState().setTransitioning(true)
    useFunnelStore.getState().advanceStage()
    expect(useFunnelStore.getState().currentStage).toBe(1) // não avançou
  })

  it('resetFunnel volta ao estado inicial', () => {
    useFunnelStore.getState().startSession()
    useFunnelStore.getState().advanceStage()
    useFunnelStore.getState().resetFunnel()
    expect(useFunnelStore.getState().currentStage).toBe(0)
    expect(useFunnelStore.getState().sessionStarted).toBe(false)
  })
})
