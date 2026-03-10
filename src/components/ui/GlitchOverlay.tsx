import { motion } from 'framer-motion'

interface GlitchOverlayProps {
  intensity: number // 0–1
}

// Gera N barras de glitch com posições aleatórias estáveis por render
const BARS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: `${8 + i * 11}%`,
  height: `${2 + (i % 3) * 3}px`,
  offsetX: (i % 2 === 0 ? 1 : -1) * (4 + i * 2),
}))

const GlitchOverlay = ({ intensity }: GlitchOverlayProps) => {
  if (intensity <= 0) return null

  const opacity = Math.min(intensity, 1)
  const scanlineOpacity = opacity * 0.15

  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
          opacity: scanlineOpacity,
        }}
      />

      {/* RGB shift — camada vermelha */}
      <motion.div
        className="absolute inset-0 bg-black/5"
        animate={{
          x: intensity > 0.3 ? [-2, 2, -1, 0] : 0,
          opacity: opacity * 0.3,
        }}
        transition={{ duration: 0.08, repeat: Infinity, repeatType: 'mirror' }}
        style={{ mixBlendMode: 'screen', filter: 'url(#red-shift)' }}
      />

      {/* Barras de glitch horizontais */}
      {BARS.map((bar) => (
        <motion.div
          key={bar.id}
          className="absolute left-0 right-0 bg-hacker-green/20"
          style={{ top: bar.top, height: bar.height }}
          animate={
            intensity > 0.2
              ? {
                  x: [0, bar.offsetX, 0, -bar.offsetX / 2, 0],
                  opacity: [0, opacity * 0.7, 0],
                  scaleX: [1, 1.05, 1],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.15 + bar.id * 0.04,
            repeat: Infinity,
            repeatDelay: 0.3 / Math.max(intensity, 0.1),
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vinheta extrema em intensity alta */}
      {intensity > 0.6 && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,255,65,0.08) 70%, rgba(0,0,0,0.6) 100%)',
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      )}

      {/* Fragmentação total — intensity = 1 */}
      {intensity >= 0.95 && (
        <motion.div
          className="absolute inset-0 bg-hacker-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0, 0.3, 0] }}
          transition={{ duration: 0.12, repeat: Infinity }}
        />
      )}
    </div>
  )
}

export default GlitchOverlay
