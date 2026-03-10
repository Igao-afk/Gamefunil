import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMessageQueue } from './useMessageQueue'
import type { QueuedMessage } from '../types/funnel'

describe('useMessageQueue', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  const messages: QueuedMessage[] = [
    { type: 'text', content: 'Olá', delay: 500 },
    { type: 'text', content: 'Mundo', delay: 500 },
  ]

  const audioMessages: QueuedMessage[] = [
    { type: 'audio', audioId: 'voice-message-1', duration: '0:10', delay: 300 },
  ]

  it('começa com fila vazia e não digitando', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: false }),
    )
    expect(result.current.visibleMessages).toEqual([])
    expect(result.current.isTyping).toBe(false)
    expect(result.current.isComplete).toBe(false)
  })

  it('não inicia sem autoStart', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: false }),
    )
    act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current.visibleMessages).toEqual([])
  })

  it('mostra isTyping antes da primeira mensagem de texto', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: true }),
    )
    // delay=500 dispara → isTyping=true; depois 1500ms → mensagem aparece
    act(() => { vi.advanceTimersByTime(600) })
    expect(result.current.isTyping).toBe(true)
    expect(result.current.visibleMessages).toHaveLength(0)
  })

  it('exibe mensagem após typing indicator', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: true }),
    )
    // delay 500 + typing 1500 = 2000ms
    act(() => { vi.advanceTimersByTime(2100) })
    expect(result.current.visibleMessages).toHaveLength(1)
    expect(result.current.visibleMessages[0]).toMatchObject({ content: 'Olá' })
  })

  it('exibe todas as mensagens após tempo suficiente', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: true }),
    )
    // msg1: 500 + 1500 = 2000; msg2: +500 + 1500 = 4000
    act(() => { vi.advanceTimersByTime(5000) })
    expect(result.current.visibleMessages).toHaveLength(2)
  })

  it('marca isComplete após todas as mensagens', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: true }),
    )
    act(() => { vi.advanceTimersByTime(5000) })
    expect(result.current.isComplete).toBe(true)
  })

  it('chama onComplete ao terminar', () => {
    const onComplete = vi.fn()
    renderHook(() =>
      useMessageQueue({ messages, autoStart: true, onComplete }),
    )
    act(() => { vi.advanceTimersByTime(5000) })
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('mensagem de áudio não mostra isTyping', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages: audioMessages, autoStart: true }),
    )
    act(() => { vi.advanceTimersByTime(400) })
    // Após delay, áudio aparece direto sem typing
    expect(result.current.isTyping).toBe(false)
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current.visibleMessages).toHaveLength(1)
  })

  it('start() inicia quando autoStart=false', () => {
    const { result } = renderHook(() =>
      useMessageQueue({ messages, autoStart: false }),
    )
    act(() => { result.current.start() })
    act(() => { vi.advanceTimersByTime(5000) })
    expect(result.current.isComplete).toBe(true)
  })
})
