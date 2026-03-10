import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AudioEngine } from './audioEngine.test.helpers'

// Howler é mockado globalmente no setup.ts
vi.mock('howler')

describe('AudioEngine', () => {
  let engine: AudioEngine

  beforeEach(() => {
    engine = new AudioEngine()
    vi.clearAllMocks()
  })

  it('não está inicializado por padrão', () => {
    expect(engine.isInitialized).toBe(false)
  })

  it('initialize() marca como inicializado', () => {
    engine.initialize()
    expect(engine.isInitialized).toBe(true)
  })

  it('initialize() é idempotente', () => {
    engine.initialize()
    engine.initialize()
    expect(engine.isInitialized).toBe(true)
  })

  it('play() não reproduz antes de initialize()', () => {
    engine.play('keyboard-loop')
    expect(engine.isInitialized).toBe(false)
  })

  it('play() funciona após initialize()', () => {
    engine.initialize()
    expect(() => engine.play('keyboard-loop')).not.toThrow()
  })

  it('stop() não lança erro para id inexistente', () => {
    expect(() => engine.stop('keyboard-loop')).not.toThrow()
  })

  it('stopAll() não lança erro com sons carregados', () => {
    engine.initialize()
    engine.play('keyboard-loop')
    engine.play('sirens')
    expect(() => engine.stopAll()).not.toThrow()
  })

  it('preloadStage() carrega sons do estágio', () => {
    expect(() => engine.preloadStage(1)).not.toThrow()
  })

  it('fadeIn() não lança erro após initialize()', () => {
    engine.initialize()
    expect(() => engine.fadeIn('keyboard-loop', 1000)).not.toThrow()
  })

  it('fadeOut() não lança erro se som não existir', () => {
    expect(() => engine.fadeOut('keyboard-loop', 500)).not.toThrow()
  })
})
