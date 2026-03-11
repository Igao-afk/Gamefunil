import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StatusBarIOS from '../ui/StatusBarIOS'

export type CallStatus = 'incoming' | 'active' | 'ended'

interface IPhoneCallScreenProps {
  callerName: string
  callerNumber: string
  callStatus: CallStatus
  avatarSrc?: string
  onDecline?: () => void
  onMute?: () => void
}

// Formata segundos → MM:SS
const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// Ondas de voz verdes pulsando
const VoiceWaves = () => (
  <div className="flex items-center justify-center gap-[5px]">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-hacker-green"
        animate={{ height: ['8px', '24px', '8px'] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
)

// Keyframes da vibração — simula telefone em modo silencioso
const vibrateX = [0, -5, 5, -5, 5, -4, 4, -2, 2, 0]
const vibrateY = [0, 2, -2, 2, -2, 1, -1, 1, 0, 0]

const IPhoneCallScreen = ({
  callerName,
  callerNumber,
  callStatus,
  avatarSrc,
  onDecline,
  onMute,
}: IPhoneCallScreenProps) => {
  const [elapsed, setElapsed] = useState(0)

  // Contador de tempo ativo
  useEffect(() => {
    if (callStatus !== 'active') return
    const id = setInterval(() => setElapsed((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [callStatus])

  const statusLabel =
    callStatus === 'incoming'
      ? 'Chamada recebida'
      : callStatus === 'active'
        ? formatTime(elapsed)
        : 'Chamada encerrada'

  const isIncoming = callStatus === 'incoming'

  return (
    <motion.div
      className="flex h-full w-full flex-col bg-black text-white"
      animate={
        isIncoming
          ? {
              x: vibrateX,
              y: vibrateY,
            }
          : { x: 0, y: 0 }
      }
      transition={
        isIncoming
          ? {
              duration: 0.55,
              ease: 'easeInOut',
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.55, 0.7, 0.8, 0.9, 1],
              repeat: Infinity,
              repeatDelay: 1.3,
            }
          : { duration: 0.2 }
      }
    >
      <StatusBarIOS />

      {/* Área principal */}
      <div className="flex flex-1 flex-col items-center gap-4 px-8">
        {/* Espaçador superior — 2/3 do espaço disponível, empurra o avatar para o centro óptico da tela */}
        <div style={{ flex: 2 }} />

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-surface-2"
        >
          {/* Pulse ring quando incoming */}
          {callStatus === 'incoming' && (
            <motion.div
              className="absolute inset-0 rounded-full border border-hacker-green/40"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={callerName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="font-mono text-2xl text-hacker-green">
              {callerName.charAt(0).toUpperCase()}
            </span>
          )}
        </motion.div>

        {/* Nome */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-semibold tracking-tight"
        >
          {callerName}
        </motion.h1>

        {/* Número */}
        <p className="font-mono text-sm text-secondary">{callerNumber}</p>

        {/* Status / timer */}
        <AnimatePresence mode="wait">
          <motion.p
            key={statusLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-white/60"
          >
            {statusLabel}
          </motion.p>
        </AnimatePresence>

        {/* Ondas de voz */}
        <AnimatePresence>
          {callStatus === 'active' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <VoiceWaves />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Espaçador inferior — 1/3 do espaço disponível */}
        <div className="flex-1" />
      </div>

      {/* Botões de ação */}
      <div className="flex justify-center gap-16 pb-16">
        {/* Mudo */}
        <button
          onClick={onMute}
          aria-label="Mutar chamada"
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full bg-surface-2 text-white/70 transition-opacity active:opacity-60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span className="text-[11px]">Mudo</span>
        </button>

        {/* Desligar */}
        <button
          onClick={onDecline}
          aria-label="Desligar chamada"
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full bg-danger text-white transition-opacity active:opacity-60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span className="text-[11px]">Desligar</span>
        </button>
      </div>
    </motion.div>
  )
}

export default IPhoneCallScreen
