import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTypewriter } from './useTypewriter'
import type { DialogueLine } from '../types/funnel'

vi.mock('howler')
vi.mock('../utils/audioEngine', () => ({
  audioEngine: { play: vi.fn(), initialize: vi.fn() },
}))

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  const lines: DialogueLine[] = [
    { text: 'Oi', delay: 0, speed: 10 },
    { text: 'Tudo bem', delay: 100, speed: 10 },
  ]

  it('começa com arrays vazios', () => {
    const { result } = renderHook(() =>
      useTypewriter({ lines, autoStart: false }),
    )
    expect(result.current.displayedLines).toEqual([])
    expect(result.current.isComplete).toBe(false)
    expect(result.current.currentLineIndex).toBe(0)
  })

  it('não inicia sem autoStart', () => {
    const { result } = renderHook(() =>
      useTypewriter({ lines, autoStart: false }),
    )
    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current.displayedLines).toEqual([])
  })

  it('inicia com autoStart=true', () => {
    const { result } = renderHook(() =>
      useTypewriter({ lines, autoStart: true }),
    )
    // Avança além do primeiro caractere da linha 0 (delay 0, speed 10ms)
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current.displayedLines[0]).toBeTruthy()
  })

  it('completa a primeira linha antes de iniciar a segunda', () => {
    const { result } = renderHook(() =>
      useTypewriter({ lines, autoStart: true }),
    )
    // linha 0: delay 0, "Oi" 2 chars × 10ms = 20ms + 1 extra
    act(() => { vi.advanceTimersByTime(30) })
    expect(result.current.displayedLines[0]).toBe('Oi')
  })

  it('marca isComplete após todas as linhas', () => {
    const { result } = renderHook(() =>
      useTypewriter({ lines, autoStart: true }),
    )
    // linha 0: 20ms; linha 1: delay 100ms + 80ms = 180ms; total ~200ms
    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current.isComplete).toBe(true)
  })

  it('chama onComplete ao terminar', () => {
    const onComplete = vi.fn()
    renderHook(() => useTypewriter({ lines, autoStart: true, onComplete }))
    act(() => { vi.advanceTimersByTime(500) })
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('chama onLineComplete para cada linha', () => {
    const onLineComplete = vi.fn()
    renderHook(() =>
      useTypewriter({ lines, autoStart: true, onLineComplete }),
    )
    act(() => { vi.advanceTimersByTime(500) })
    expect(onLineComplete).toHaveBeenCalledTimes(2)
  })

  it('start() inicia quando autoStart=false', () => {
    const { result } = renderHook(() =>
      useTypewriter({ lines, autoStart: false }),
    )
    act(() => { result.current.start() })
    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current.isComplete).toBe(true)
  })

  it('dispara audioTrigger quando presente', async () => {
    const { audioEngine } = await import('../utils/audioEngine')
    const linesWithAudio: DialogueLine[] = [
      { text: 'X', delay: 0, speed: 10, audioTrigger: 'keyboard-loop' },
    ]
    renderHook(() => useTypewriter({ lines: linesWithAudio, autoStart: true }))
    act(() => { vi.advanceTimersByTime(50) })
    expect(audioEngine.play).toHaveBeenCalledWith('keyboard-loop')
  })
})
