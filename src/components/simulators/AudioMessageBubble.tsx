import { useEffect, useRef, useState } from 'react'
import { audioEngine } from '../../utils/audioEngine'
import type { AudioId } from '../../types/audio'

interface AudioMessageBubbleProps {
  audioId: AudioId
  duration: string // ex: "0:11" — exibido quando parado
  timestamp: string
  isPlaying: boolean
  onRequestPlay: () => void
  onRequestStop: () => void
}

const WAVEFORM_HEIGHTS = [4, 8, 14, 10, 6, 12, 16, 10, 8, 5, 11, 15, 9, 7, 13, 10, 6, 9, 14, 8]

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

// Converte "0:11" → 11 segundos para uso como fallback antes do Howler carregar
const parseDuration = (d: string) => {
  const [m, s] = d.split(':').map(Number)
  return (m ?? 0) * 60 + (s ?? 0)
}

const AudioMessageBubble = ({
  audioId,
  duration,
  timestamp,
  isPlaying,
  onRequestPlay,
  onRequestStop,
}: AudioMessageBubbleProps) => {
  const [elapsed, setElapsed] = useState(0)
  const [totalDuration, setTotalDuration] = useState(() => parseDuration(duration))
  const scrubberRef = useRef<HTMLDivElement>(null)

  // Polling da posição real + duração enquanto toca
  useEffect(() => {
    if (!isPlaying) {
      setElapsed(0)
      return
    }
    const id = setInterval(() => {
      setElapsed(audioEngine.seek(audioId))
      const d = audioEngine.duration(audioId)
      if (d > 0) setTotalDuration(d)
    }, 100)
    return () => clearInterval(id)
  }, [isPlaying, audioId])

  const progress = totalDuration > 0 ? Math.min(elapsed / totalDuration, 1) : 0

  const handleToggle = () => {
    if (isPlaying) onRequestStop()
    else onRequestPlay()
  }

  // Seek ao clicar na waveform
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || totalDuration === 0) return
    const rect = scrubberRef.current.getBoundingClientRect()
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const targetSec = frac * totalDuration
    audioEngine.seekTo(audioId, targetSec)
    setElapsed(targetSec)
    // Se não estava tocando, inicia
    if (!isPlaying) onRequestPlay()
  }

  const displayTime = isPlaying || elapsed > 0 ? formatTime(elapsed) : duration

  return (
    <div
      className="flex max-w-[240px] flex-col gap-2 rounded-[0_12px_12px_12px] px-3 py-2"
      style={{ backgroundColor: '#1F2C34' }}
    >
      <div className="flex items-center gap-3">
        {/* Botão play/pause */}
        <button
          onClick={handleToggle}
          aria-label={isPlaying ? 'Pausar mensagem de voz' : 'Reproduzir mensagem de voz'}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-hacker-green/90 text-black transition-opacity active:opacity-70"
        >
          {isPlaying ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <rect x="0" y="0" width="4" height="14" rx="1" />
              <rect x="8" y="0" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <polygon points="0,0 12,7 0,14" />
            </svg>
          )}
        </button>

        {/* Waveform + thumb (scrubber) */}
        <div
          ref={scrubberRef}
          onClick={handleScrubberClick}
          className="relative flex flex-1 cursor-pointer items-center gap-[2px] py-2"
        >
          {WAVEFORM_HEIGHTS.map((h, i) => {
            const barFrac = i / (WAVEFORM_HEIGHTS.length - 1)
            const played = barFrac <= progress
            return (
              <div
                key={i}
                className="w-[2px] flex-shrink-0 rounded-full transition-colors duration-100"
                style={{
                  height: `${h}px`,
                  backgroundColor: played ? '#00FF41' : 'rgba(255,255,255,0.25)',
                }}
              />
            )
          })}

          {/* Thumb — bolinha branca no playhead */}
          <div
            className="pointer-events-none absolute h-[11px] w-[11px] rounded-full bg-white shadow"
            style={{
              left: `${progress * 100}%`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>

        {/* Tempo decorrido / total */}
        <span className="w-[26px] flex-shrink-0 text-right font-mono text-[11px] text-white/50">
          {displayTime}
        </span>
      </div>

      {/* Footer: timestamp + checkmark */}
      <div className="flex items-center justify-end gap-1">
        <span className="font-mono text-[10px] text-white/40">{timestamp}</span>
        <svg width="14" height="9" viewBox="0 0 14 9" fill="#00FF41" opacity="0.8">
          <path d="M1 4l3 3 5-6" stroke="#00FF41" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 4l3 3 5-6" stroke="#00FF41" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default AudioMessageBubble
