// Re-exporta AudioEngine como classe testável (sem singleton)
import { Howl, Howler } from 'howler'
import type { AudioId } from '../types/audio'
import { AUDIO_MANIFEST } from './audioManifest'

export class AudioEngine {
  private sounds: Map<AudioId, Howl> = new Map()
  private _initialized = false

  get isInitialized(): boolean {
    return this._initialized
  }

  initialize(): void {
    if (this._initialized) return
    Howler.volume(0.7)
    this._initialized = true
  }

  private loadSound(id: AudioId): Howl {
    const existing = this.sounds.get(id)
    if (existing) return existing
    const config = AUDIO_MANIFEST[id]
    const howl = new Howl({ src: config.src, loop: config.loop ?? false })
    this.sounds.set(id, howl)
    return howl
  }

  play(id: AudioId): void {
    if (!this._initialized) return
    this.loadSound(id).play()
  }

  stop(id: AudioId): void {
    this.sounds.get(id)?.stop()
  }

  stopAll(): void {
    this.sounds.forEach((s) => s.stop())
  }

  fadeIn(id: AudioId, duration: number): void {
    if (!this._initialized) return
    const sound = this.loadSound(id)
    sound.volume(0)
    sound.play()
    sound.fade(0, 0.7, duration)
  }

  fadeOut(id: AudioId, duration: number): void {
    const sound = this.sounds.get(id)
    if (!sound) return
    sound.fade(0.7, 0, duration)
    setTimeout(() => sound.stop(), duration)
  }

  preloadStage(stage: 1 | 2 | 3 | 4): void {
    const map: Record<number, AudioId[]> = {
      1: ['keyboard-loop', 'sirens', 'footsteps', 'gunshot-1', 'gunshot-2'],
      2: ['dialing-tone', 'call-connected', 'static-noise'],
      3: ['voice-message-1', 'voice-message-2', 'voice-message-3'],
      4: [],
    }
    const ids = map[stage]
    if (ids) ids.forEach((id) => this.loadSound(id))
  }
}
