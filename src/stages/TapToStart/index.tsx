import { motion } from 'framer-motion'
import { audioEngine } from '../../utils/audioEngine'
import { useFunnelStore } from '../../store/funnelStore'

const TapToStart = () => {
  const startSession = useFunnelStore((s) => s.startSession)

  const handleTap = () => {
    audioEngine.initialize()
    startSession()
  }

  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow ambiental */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,255,65,0.06) 0%, transparent 70%)',
        }}
      />

      <button
        onClick={handleTap}
        aria-label="Toque para iniciar a experiência"
        className="group relative flex flex-col items-center gap-6 focus:outline-none"
      >
        {/* Ícone play pulsante */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-20 w-20 items-center justify-center rounded-full border border-hacker-green/30 bg-hacker-green/10"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="translate-x-0.5 text-hacker-green"
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </motion.div>

        {/* Texto */}
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-sm tracking-[0.25em] text-hacker-green"
        >
          TAP TO START
        </motion.span>

        {/* Sublinhado hover */}
        <span className="absolute -bottom-2 h-px w-0 bg-hacker-green transition-all duration-300 group-hover:w-full" />
      </button>

      {/* Rodapé sutil */}
      <p className="absolute bottom-8 font-mono text-[10px] tracking-widest text-white/20">
        PROJECT INVISIBLE
      </p>
    </motion.div>
  )
}

export default TapToStart
