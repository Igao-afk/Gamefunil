import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QueuedMessage } from '../../types/funnel'
import AudioMessageBubble from './AudioMessageBubble'
import type { AudioId } from '../../types/audio'

interface WhatsAppSimulatorProps {
  messages: QueuedMessage[]
  isTyping: boolean
  avatarSrc?: string
  contactName?: string
}

// Timestamp fixo para MVP
const getTimestamp = (index: number) => {
  const base = new Date()
  base.setMinutes(base.getMinutes() - (10 - index))
  return base.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

// Indicador "Digitando..." com três pontos animados
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 4 }}
    className="flex items-center gap-[5px] rounded-[0_12px_12px_12px] px-4 py-3"
    style={{ backgroundColor: '#1F2C34', width: 'fit-content' }}
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="h-2 w-2 rounded-full bg-white/50"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
      />
    ))}
  </motion.div>
)

const WhatsAppSimulator = ({ messages, isTyping, avatarSrc, contactName = 'DarkGirl' }: WhatsAppSimulatorProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll para última mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex h-full w-full flex-col bg-black">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 pt-14"
        style={{ backgroundColor: '#1F2C34' }}
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-hacker-green/20">
          {avatarSrc ? (
            <img src={avatarSrc} alt={contactName} className="h-full w-full object-cover" />
          ) : (
            <span className="font-mono text-sm font-bold text-hacker-green">
              {contactName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">{contactName}</span>
          <motion.span
            className="text-[11px] text-hacker-green/70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            online
          </motion.span>
        </div>

        {/* Ícone cadeado — conexão criptografada */}
        <div className="ml-auto flex items-center gap-1">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="rgba(0,255,65,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="6" width="10" height="7" rx="1.5" />
            <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
          </svg>
          <span className="font-mono text-[9px] text-hacker-green/40">E2E</span>
        </div>
      </div>

      {/* Background padrão WhatsApp dark */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          backgroundColor: '#0B141A',
        }}
      >
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex flex-col items-start"
              >
                {msg.type === 'text' ? (
                  <div
                    className="max-w-[85%] rounded-[0_12px_12px_12px] px-3 py-2"
                    style={{ backgroundColor: '#1F2C34' }}
                  >
                    <p className="text-sm leading-relaxed text-white">{msg.content}</p>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <span className="font-mono text-[10px] text-white/40">
                        {getTimestamp(i)}
                      </span>
                      <svg width="14" height="9" viewBox="0 0 14 9">
                        <path d="M1 4l3 3 5-6" stroke="#00FF41" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                        <path d="M5 4l3 3 5-6" stroke="#00FF41" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <AudioMessageBubble
                    audioId={msg.audioId as AudioId}
                    duration={msg.duration}
                    timestamp={getTimestamp(i)}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Indicador digitando */}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          {/* Âncora para scroll */}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}

export default WhatsAppSimulator
