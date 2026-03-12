import { Howl, Howler } from 'howler'
import type { AudioId } from '../types/audio'
import { AUDIO_MANIFEST } from './audioManifest'

class AudioEngine {
  private sounds: Map<AudioId, Howl> = new Map()
  private initialized = false
  private crossfadeTimers: Map<AudioId, ReturnType<typeof setTimeout>> = new Map()

  /** Resolve iOS/Android autoplay policy — chamar após primeira interação do usuário */
  initialize(): void {
    if (this.initialized) return
    Howler.volume(0.7)
    this.preloadStage(1)
    this.initialized = true
  }

  get isInitialized(): boolean {
    return this.initialized
  }

  private loadSound(id: AudioId): Howl {
    const existing = this.sounds.get(id)
    if (existing) return existing

    const config = AUDIO_MANIFEST[id]
    const howl = new Howl({
      src: config.src,
      loop: config.loop ?? false,
      volume: config.defaultVolume ?? 0.7,
      preload: true,
    })

    this.sounds.set(id, howl)
    return howl
  }

  play(id: AudioId): void {
    if (!this.initialized) return
    const sound = this.loadSound(id)
    sound.play()
  }

  stop(id: AudioId): void {
    this.sounds.get(id)?.stop()
  }

  stopAll(): void {
    this.crossfadeTimers.forEach((timer) => clearTimeout(timer))
    this.crossfadeTimers.clear()
    this.sounds.forEach((sound) => sound.stop())
  }

  setVolume(id: AudioId, volume: number): void {
    const sound = this.sounds.get(id)
    if (sound) sound.volume(volume)
  }

  fadeIn(id: AudioId, duration: number, targetVolume?: number): void {
    const config = AUDIO_MANIFEST[id]
    const target = targetVolume ?? config.defaultVolume ?? 0.7
    const sound = this.loadSound(id)
    sound.volume(0)
    sound.play()
    sound.fade(0, target, duration)
  }

  fadeOut(id: AudioId, duration: number): void {
    const sound = this.sounds.get(id)
    if (!sound) return
    const currentVolume = sound.volume() as number
    sound.fade(currentVolume, 0, duration)
    setTimeout(() => sound.stop(), duration)
  }

  /**
   * Inicia um loop com crossfade suave — elimina o "tranco" no reinício.
   * Quando o áudio está quase terminando, já sobe o próximo em fade,
   * criando uma transição contínua sem gap.
   */
  startCrossfadeLoop(id: AudioId, fadeDuration = 1500): void {
    if (!this.initialized) return
    const config = AUDIO_MANIFEST[id]
    const targetVol = config.defaultVolume ?? 0.7

    const scheduleNext = (activeHowl: Howl) => {
      const durationMs = activeHowl.duration() * 1000
      if (!durationMs || durationMs <= fadeDuration * 2) return

      const timer = setTimeout(() => {
        // Fade out instância atual
        const vol = activeHowl.volume() as number
        activeHowl.fade(vol, 0, fadeDuration)
        setTimeout(() => {
          activeHowl.stop()
          activeHowl.unload()
        }, fadeDuration + 50)

        // Cria e faz fade in da próxima instância
        const next = new Howl({ src: config.src, loop: false, volume: 0, preload: true })
        next.play()
        next.fade(0, targetVol, fadeDuration)
        this.sounds.set(id, next)

        // Agenda o próximo ciclo quando o áudio estiver carregado
        const trySchedule = () => {
          if (next.duration() > 0) {
            scheduleNext(next)
          } else {
            next.once('load', () => scheduleNext(next))
          }
        }
        trySchedule()
      }, durationMs - fadeDuration)

      this.crossfadeTimers.set(id, timer)
    }

    // Inicia a primeira instância
    const first = this.loadSound(id)
    first.volume(0)
    first.play()
    first.fade(0, targetVol, fadeDuration)

    const trySchedule = () => {
      if (first.duration() > 0) {
        scheduleNext(first)
      } else {
        first.once('load', () => scheduleNext(first))
      }
    }
    trySchedule()
  }

  /** Para o crossfade loop com fade out suave */
  stopCrossfadeLoop(id: AudioId, fadeDuration = 1500): void {
    const timer = this.crossfadeTimers.get(id)
    if (timer) {
      clearTimeout(timer)
      this.crossfadeTimers.delete(id)
    }
    this.fadeOut(id, fadeDuration)
  }

  /** Registra callback disparado UMA vez quando o som termina (usa Howler `once`) */
  onEnd(id: AudioId, callback: () => void): void {
    const sound = this.loadSound(id)
    sound.once('end', callback)
  }

  preloadStage(stage: 1 | 2 | 3 | 4): void {
    const stageMap: Record<number, AudioId[]> = {
      1: ['keyboard-loop', 'sirens', 'footsteps', 'gunshot-1', 'gunshot-2', 'code-voice-1', 'code-voice-2', 'suspense', 'cellphone', 'gun'],
      2: ['dialing-tone', 'call-connected', 'static-noise', 'suspense', 'darkgirl-voice', 'interferencia', 'glitch-sound'],
      3: ['voice-message-1', 'voice-message-2', 'voice-message-3', 'whatsapp', 'darkgirl-whatsapp-audio-1', 'darkgirl-whatsapp-audio-2', 'darkgirl-whatsapp-audio-3'],
      4: [],
    }
    const ids = stageMap[stage]
    if (ids) ids.forEach((id) => this.loadSound(id))
  }
}

// Singleton exportado
export const audioEngine = new AudioEngine()
