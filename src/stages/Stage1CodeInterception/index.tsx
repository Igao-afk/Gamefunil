import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IPhoneCallScreen, { type CallStatus } from '../../components/simulators/IPhoneCallScreen'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useAudio } from '../../hooks/useAudio'
import { useFunnelStore } from '../../store/funnelStore'
import { audioEngine } from '../../utils/audioEngine'
import { CODE_DIALOGUE } from './dialogue'

// Número revelado ao final — corresponde ao falado no áudio
const CALLER_NUMBER = '(11) 98765-4321'

type Scene = 'call' | 'ended' | 'reveal'

const Stage1CodeInterception = () => {
  const advanceStage = useFunnelStore((s) => s.advanceStage)
  const { stopAll } = useAudio()

  const [scene, setScene] = useState<Scene>('call')
  const [callStatus, setCallStatus] = useState<CallStatus>('incoming')

  // Fallback: garante que o engine está inicializado mesmo após refresh direto no Stage1
  useEffect(() => {
    if (!audioEngine.isInitialized) audioEngine.initialize()
  }, [])

  // Sons atmosféricos: suspense + teclado mecânico + sirenes + passos + tiro
  // Usa audioEngine diretamente (singleton estável) para evitar re-execução do effect a cada render
  useEffect(() => {
    audioEngine.play('cellphone')
    audioEngine.fadeIn('suspense', 2000)
    audioEngine.play('keyboard-loop')
    const sirenTimer = setTimeout(() => audioEngine.fadeIn('sirens', 4000), 5000)
    const footstepsTimer = setTimeout(() => audioEngine.play('footsteps'), 10000)
    const gunTimer = setTimeout(() => audioEngine.play('gunshot-1'), 15000)
    return () => {
      clearTimeout(sirenTimer)
      clearTimeout(footstepsTimer)
      clearTimeout(gunTimer)
    }
  }, [])

  const { displayedLines, start: startDialogue } = useTypewriter({
    lines: CODE_DIALOGUE,
    autoStart: false,
    // Sem onComplete — o encerramento da chamada é controlado pelo fim do áudio
  })

  // Exibe as últimas 4 linhas com conteúdo (filtra slots vazios para não empurrar linhas visíveis)
  const visibleLines = displayedLines
    .map((text, i) => ({ text, index: i }))
    .filter(({ text }) => text !== '')
    .slice(-4)

  // Atende a chamada após 2s, inicia diálogo e encadeia os dois áudios em sequência
  useEffect(() => {
    let gunTimer: ReturnType<typeof setTimeout>

    const t = setTimeout(() => {
      audioEngine.stop('cellphone')
      setCallStatus('active')

      // Diálogo começa 500ms antes do áudio — corrige drift cumulativo do React
      startDialogue()

      setTimeout(() => {
        // Dispara gun.mp3 exatamente quando CODE diz "droga" (53s no áudio)
        gunTimer = setTimeout(() => {
          audioEngine.fadeOut('suspense', 500)
          audioEngine.play('gun')
        }, 53000)

        // Registra callbacks ANTES de dar play (evita race condition)
        audioEngine.onEnd('code-voice-1', () => {
          audioEngine.onEnd('code-voice-2', () => {
            // Encerra a chamada somente quando o segundo áudio terminar
            setCallStatus('ended')
            audioEngine.fadeOut('keyboard-loop', 1500)
            audioEngine.fadeOut('sirens', 2000)
            audioEngine.fadeOut('suspense', 500)
            audioEngine.fadeOut('gun', 1500)
            setTimeout(() => setScene('ended'), 800)
          })
          audioEngine.play('code-voice-2')
        })
        audioEngine.play('code-voice-1')
      }, 500)
    }, 2000)

    return () => {
      clearTimeout(t)
      clearTimeout(gunTimer)
    }
  }, [startDialogue])

  const handleAdvance = () => {
    stopAll()
    advanceStage()
  }

  return (
    <div className="relative h-full w-full bg-black">
      {/* Tela de chamada */}
      <AnimatePresence>
        {scene === 'call' && (
          <motion.div
            key="call"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IPhoneCallScreen
              callerName="CODE"
              callerNumber={CALLER_NUMBER}
              callStatus={callStatus}
              avatarSrc="/images/code-avatar.jpg"
            />

            {/* Diálogo typewriter — rolante (últimas 2 linhas), centralizado */}
            {callStatus === 'active' && (
              <div className="absolute inset-x-0 bottom-56 flex flex-col items-center gap-2 px-6">
                {visibleLines.map(({ text, index }) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-center font-mono text-[12px] leading-relaxed text-hacker-green/90"
                  >
                    {text}
                    {/* Cursor piscante apenas na última linha sendo digitada */}
                    {index === displayedLines.length - 1 && (
                      <span className="animate-cursor-blink ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[1px] bg-hacker-green" />
                    )}
                  </motion.p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cena: CHAMADA ENCERRADA */}
      <AnimatePresence>
        {(scene === 'ended' || scene === 'reveal') && (
          <motion.div
            key="ended"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => {
              if (scene === 'ended') {
                setTimeout(() => setScene('reveal'), 1500)
              }
            }}
          >
            <motion.p
              className="font-mono text-lg tracking-[0.2em] text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              CHAMADA ENCERRADA
            </motion.p>

            {/* Reveal do número */}
            <AnimatePresence>
              {scene === 'reveal' && (
                <motion.div
                  className="mt-10 flex flex-col items-center gap-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-mono text-xs tracking-widest text-white/40">
                    NÚMERO IDENTIFICADO
                  </p>

                  <p className="font-mono text-2xl tracking-wider text-hacker-green">
                    {CALLER_NUMBER}
                  </p>

                  <motion.button
                    onClick={handleAdvance}
                    className="mt-4 flex items-center gap-3 rounded-full bg-hacker-green px-8 py-4 font-mono text-sm font-bold tracking-widest text-black transition-opacity active:opacity-80"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    aria-label="Ligar de volta para CODE"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                    LIGAR
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Stage1CodeInterception
