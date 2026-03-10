import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../../hooks/useAudio'
import type { AudioId } from '../../types/audio'

interface AudioMessageBubbleProps {
  audioId: AudioId
  duration: string // ex: "0:42"
  timestamp: string
}

// Waveform SVG estática — barras de altura variada simulando onda de áudio
const WAVEFORM_HEIGHTS = [4, 8, 14, 10, 6, 12, 16, 10, 8, 5, 11, 15, 9, 7, 13, 10, 6, 9, 14, 8]

const AudioMessageBubble = ({ audioId, duration, timestamp }: AudioMessageBubbleProps) => {
  const [playing, setPlaying] = useState(false)
  const { play, stop } = useAudio()

  const handleToggle = () => {
    if (playing) {
      stop(audioId)
      setPlaying(false)
    } else {
      play(audioId)
      setPlaying(true)
    }
  }

  return (
    <div
      className="flex max-w-[240px] flex-col gap-2 rounded-[0_12px_12px_12px] px-3 py-2"
      style={{ backgroundColor: '#1F2C34' }}
    >
      <div className="flex items-center gap-3">
        {/* Botão play/pause */}
        <button
          onClick={handleToggle}
          aria-label={playing ? 'Pausar mensagem de voz' : 'Reproduzir mensagem de voz'}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-hacker-green/90 text-black transition-opacity active:opacity-70"
        >
          {playing ? (
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

        {/* Waveform */}
        <div className="flex flex-1 items-center gap-[2px]">
          {WAVEFORM_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full"
              style={{
                height: `${h}px`,
                backgroundColor: playing ? '#00FF41' : 'rgba(255,255,255,0.3)',
              }}
              animate={
                playing
                  ? {
                      height: [`${h}px`, `${Math.min(h * 1.5, 18)}px`, `${h}px`],
                    }
                  : { height: `${h}px` }
              }
              transition={{
                duration: 0.6,
                repeat: playing ? Infinity : 0,
                delay: i * 0.03,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Duração */}
        <span className="flex-shrink-0 font-mono text-[11px] text-white/50">{duration}</span>
      </div>

      {/* Footer: timestamp + checkmark */}
      <div className="flex items-center justify-end gap-1">
        <span className="font-mono text-[10px] text-white/40">{timestamp}</span>
        <svg width="14" height="9" viewBox="0 0 14 9" fill="#00FF41" opacity="0.8">
          <path d="M1 4l3 3 5-6" stroke="#00FF41" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 4l3 3 5-6" stroke="#00FF41" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default AudioMessageBubble
