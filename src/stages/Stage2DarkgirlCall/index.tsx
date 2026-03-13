import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IPhoneCallScreen, { type CallStatus } from '../../components/simulators/IPhoneCallScreen'
import GlitchOverlay from '../../components/ui/GlitchOverlay'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useAudio } from '../../hooks/useAudio'
import { audioEngine } from '../../utils/audioEngine'
import { useFunnelStore } from '../../store/funnelStore'
import { DARKGIRL_DIALOGUE, GLITCH_START_INDEX } from './dialogue'

type Scene = 'dialing' | 'call' | 'transitioning'

const Stage2DarkgirlCall = () => {
  const advanceStage = useFunnelStore((s) => s.advanceStage)
  const setTransitioning = useFunnelStore((s) => s.setTransitioning)
  const { fadeIn, stopAll } = useAudio()

  const [scene, setScene] = useState<Scene>('dialing')
  const [callStatus, setCallStatus] = useState<CallStatus>('incoming')
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const glitchRef = useRef(0)
  const glitchRafRef = useRef<number | null>(null)

  // Anima glitch progressivamente a partir do índice GLITCH_START_INDEX
  const animateGlitch = (targetIntensity: number) => {
    const start = glitchRef.current
    const startTime = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const value = start + (targetIntensity - start) * eased
      glitchRef.current = value
      setGlitchIntensity(value)
      if (t < 1) {
        glitchRafRef.current = requestAnimationFrame(tick)
      }
    }
    glitchRafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => {
    if (glitchRafRef.current) cancelAnimationFrame(glitchRafRef.current)
  }, [])

  const { displayedLines, start: startDialogue } = useTypewriter({
    lines: DARKGIRL_DIALOGUE,
    autoStart: false,
    onLineComplete: (index) => {
      // Interferência eletrônica: dispara 2.5s após o fim da linha anterior ao SFX (ts≈100s)
      if (index === GLITCH_START_INDEX - 1) {
        setTimeout(() => audioEngine.play('interferencia'), 2500)
      }
      // Glitch começa a crescer na linha GLITCH_START_INDEX ("...espera." ts=103s)
      if (index === GLITCH_START_INDEX) {
        audioEngine.play('glitch-sound')
        fadeIn('static-noise', 2000)
        animateGlitch(0.4)
      }
      // Cresce mais nas linhas seguintes
      if (index === GLITCH_START_INDEX + 1) animateGlitch(0.65)
      if (index === GLITCH_START_INDEX + 2) animateGlitch(0.85)
    },
    onComplete: () => {
      // Última linha: glitch explode → transição
      animateGlitch(1)
      audioEngine.fadeOut('suspense', 800)
      audioEngine.fadeOut('darkgirl-voice', 800)
      setTimeout(() => {
        setScene('transitioning')
        setTransitioning(true)
        stopAll()
        setTimeout(() => {
          setTransitioning(false)
          advanceStage()
        }, 900)
      }, 600)
    },
  })

  // Tom de discagem + suspense no fundo → atende após 3s e inicia voz + diálogo
  useEffect(() => {
    audioEngine.play('dialing-tone')
    audioEngine.fadeIn('suspense', 2000)

    const t = setTimeout(() => {
      audioEngine.stop('dialing-tone')
      setCallStatus('active')
      setScene('call')

      // Diálogo começa 500ms antes da voz (corrige drift cumulativo)
      startDialogue()
      setTimeout(() => {
        audioEngine.play('darkgirl-voice')
      }, 500)
    }, 3000)

    return () => clearTimeout(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence mode="wait">
      {scene !== 'transitioning' ? (
        <motion.div
          key="stage2"
          className="relative h-full w-full bg-black"
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Tela de chamada */}
          <IPhoneCallScreen
            callerName="DarkGirl"
            callerNumber="+55 (11) 9 8765-4321"
            callStatus={callStatus}
            avatarSrc="/images/darkGirl.jpg"
            caption={
              scene === 'dialing' ? (
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="font-mono text-xs tracking-widest text-white/50"
                >
                  DISCANDO...
                </motion.p>
              ) : scene === 'call' ? (
                <AnimatePresence mode="popLayout" initial={false}>
                  {displayedLines.slice(-2).map((line, i, arr) => {
                    const lineIndex = displayedLines.length - arr.length + i
                    return (
                      <motion.p
                        key={lineIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-center font-mono text-[10px] leading-relaxed text-hacker-green/80"
                      >
                        {line}
                        {lineIndex === displayedLines.length - 1 && (
                          <span className="animate-cursor-blink ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[1px] bg-white/60" />
                        )}
                      </motion.p>
                    )
                  })}
                </AnimatePresence>
              ) : null
            }
          />

          {/* Glitch overlay */}
          <GlitchOverlay intensity={glitchIntensity} />
        </motion.div>
      ) : (
        <motion.div
          key="transition"
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  )
}

export default Stage2DarkgirlCall
