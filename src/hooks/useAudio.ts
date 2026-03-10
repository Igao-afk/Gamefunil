import { audioEngine } from '../utils/audioEngine'
import type { AudioId } from '../types/audio'

export const useAudio = () => ({
  initialize: () => audioEngine.initialize(),
  play: (id: AudioId) => audioEngine.play(id),
  stop: (id: AudioId) => audioEngine.stop(id),
  stopAll: () => audioEngine.stopAll(),
  setVolume: (id: AudioId, volume: number) => audioEngine.setVolume(id, volume),
  fadeIn: (id: AudioId, duration: number, target?: number) =>
    audioEngine.fadeIn(id, duration, target),
  fadeOut: (id: AudioId, duration: number) => audioEngine.fadeOut(id, duration),
  preloadStage: (stage: 1 | 2 | 3 | 4) => audioEngine.preloadStage(stage),
  isInitialized: audioEngine.isInitialized,
})
