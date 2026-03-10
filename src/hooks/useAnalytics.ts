// Abstrai window.dataLayer.push() com tipagem e fallback seguro

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

type AnalyticsEvent =
  | { event: 'stage_start'; stage: number }
  | { event: 'stage_complete'; stage: number }
  | { event: 'audio_play'; audio_id: string }
  | { event: 'cta_click'; label: string; destination?: string }

const push = (payload: AnalyticsEvent) => {
  try {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push(payload as Record<string, unknown>)
  } catch {
    // Silencioso em ambientes sem dataLayer (testes, SSR)
  }
}

export function useAnalytics() {
  return {
    track: push,
    trackStageStart: (stage: number) => push({ event: 'stage_start', stage }),
    trackStageComplete: (stage: number) => push({ event: 'stage_complete', stage }),
    trackAudioPlay: (audioId: string) => push({ event: 'audio_play', audio_id: audioId }),
    trackCTAClick: (label: string, destination?: string) =>
      push({ event: 'cta_click', label, destination }),
  }
}
