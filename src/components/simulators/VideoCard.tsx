import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VideoConfig } from '../../types/funnel'

interface VideoCardProps extends VideoConfig {
  isActive: boolean
  isLast?: boolean
  onCTAClick?: () => void
}

// Formata número grande → "1.2k", "34k"
const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

const VideoCard = ({
  src,
  title,
  description,
  initialLikeCount,
  isActive,
  isLast = false,
  onCTAClick,
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [liked, setLiked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showPriceReveal, setShowPriceReveal] = useState(false)

  // Autoplay / pause conforme isActive
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isActive) {
      v.play().catch(() => {/* autoplay bloqueado — silencioso */})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [isActive])

  // Atualiza progresso e dispara price reveal no último card
  useEffect(() => {
    const v = videoRef.current
    if (!v || !isActive) return

    const onTimeUpdate = () => {
      if (v.duration) {
        const pct = v.currentTime / v.duration
        setProgress(pct)
        if (isLast && pct >= 0.8 && !showPriceReveal) {
          setShowPriceReveal(true)
        }
      }
    }

    v.addEventListener('timeupdate', onTimeUpdate)
    return () => v.removeEventListener('timeupdate', onTimeUpdate)
  }, [isActive, isLast, showPriceReveal])

  // Like counter aleatório enquanto vídeo toca
  useEffect(() => {
    if (!isActive) return
    const id = setInterval(() => {
      if (Math.random() > 0.6) {
        setLikeCount((c) => c + Math.floor(Math.random() * 3 + 1))
      }
    }, 2500)
    return () => clearInterval(id)
  }, [isActive])

  const handleLike = () => {
    setLiked((l) => !l)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <div className="relative h-full w-full flex-shrink-0 overflow-hidden bg-black [scroll-snap-align:start]">
      {/* Vídeo */}
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Gradiente inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Barra de progresso topo */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-hacker-green"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Ações lado direito */}
      <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5">
        {/* Like */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <motion.div
            animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill={liked ? '#ff4d4d' : 'white'}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
          <span className="font-mono text-[11px] font-semibold text-white">
            {formatCount(likeCount)}
          </span>
        </button>

        {/* Comentário */}
        <button className="flex flex-col items-center gap-1">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-mono text-[11px] text-white">348</span>
        </button>

        {/* Compartilhar */}
        <button className="flex flex-col items-center gap-1">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span className="font-mono text-[11px] text-white">97</span>
        </button>
      </div>

      {/* Info inferior */}
      <div className="absolute bottom-6 left-4 right-16">
        <p className="mb-1 font-mono text-[13px] font-bold text-white">@code.system</p>
        <p className="text-sm font-semibold leading-snug text-white">{title}</p>
        <p className="mt-1 text-xs leading-snug text-white/70">{description}</p>
      </div>

      {/* Price Reveal — apenas no último card */}
      <AnimatePresence>
        {isLast && showPriceReveal && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="mb-2 font-mono text-xs tracking-widest text-hacker-green/70"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ACESSO COMPLETO
            </motion.p>

            {/* Preço com glitch */}
            <motion.h2
              className="font-mono text-5xl font-bold text-hacker-green"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: [0, -3, 3, -2, 0],
                filter: [
                  'hue-rotate(0deg)',
                  'hue-rotate(90deg)',
                  'hue-rotate(0deg)',
                ],
              }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              R$89,90
            </motion.h2>

            <motion.p
              className="mt-1 font-mono text-sm text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              /mês
            </motion.p>

            <motion.p
              className="mt-3 text-center text-xs text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Sem fidelidade. Cancele quando quiser.
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={onCTAClick}
              className="mt-8 rounded-full px-10 py-4 font-mono text-sm font-bold tracking-widest text-black"
              style={{ backgroundColor: '#00FF41' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  '0 0 16px rgba(0,255,65,0.5)',
                  '0 0 32px rgba(0,255,65,0.8)',
                  '0 0 16px rgba(0,255,65,0.5)',
                ],
              }}
              transition={{
                opacity: { delay: 1.1, duration: 0.4 },
                y: { delay: 1.1, duration: 0.4 },
                boxShadow: { delay: 1.5, duration: 2, repeat: Infinity },
              }}
              aria-label="Testar Conectagram agora"
            >
              TESTAR AGORA →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoCard
