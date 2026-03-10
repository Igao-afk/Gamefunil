import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WhatsAppSimulator from '../../components/simulators/WhatsAppSimulator'
import CredentialsCard from '../../components/simulators/CredentialsCard'
import { useMessageQueue } from '../../hooks/useMessageQueue'
import { useAudio } from '../../hooks/useAudio'
import { useFunnelStore } from '../../store/funnelStore'
import { audioEngine } from '../../utils/audioEngine'
import type { QueuedMessage } from '../../types/funnel'

// Fila de mensagens da DarkGirl
const MESSAGES: QueuedMessage[] = [
  { type: 'text', content: 'Conexão iniciada.', delay: 800 },
  { type: 'text', content: 'Ativando criptografia.', delay: 2000 },
  { type: 'text', content: 'Estamos seguros agora.', delay: 2000 },
  { type: 'text', content: 'Esse é o método. Escuta com atenção.', delay: 2500 },
  { type: 'audio', audioId: 'darkgirl-whatsapp-audio-1', duration: '0:26', delay: 2000 },
  { type: 'text', content: 'Viu como funciona?', delay: 27000 },
  { type: 'audio', audioId: 'darkgirl-whatsapp-audio-2', duration: '0:16', delay: 2000 },
  { type: 'text', content: 'Use essas credenciais para acessar.', delay: 17000 },
  { type: 'text', content: 'Não compartilha com ninguém.', delay: 1800 },
]

const Stage3WhatsApp = () => {
  const advanceStage = useFunnelStore((s) => s.advanceStage)
  const { stopAll } = useAudio()
  const [showCredentials, setShowCredentials] = useState(false)

  useEffect(() => {
    if (!audioEngine.isInitialized) audioEngine.initialize()
    audioEngine.preloadStage(3)
  }, [])

  const { visibleMessages, isTyping } = useMessageQueue({
    messages: MESSAGES,
    autoStart: true,
    onMessageAdded: (type) => { if (type === 'text') setTimeout(() => audioEngine.play('whatsapp'), 200) },
    onComplete: () => {
      // Após todas as mensagens, revela o card de credenciais
      setTimeout(() => setShowCredentials(true), 800)
    },
  })

  const handleAccess = () => {
    stopAll()
    advanceStage()
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <WhatsAppSimulator
        messages={visibleMessages}
        isTyping={isTyping}
        avatarSrc="/images/darkgirl.jpg"
        contactName="DarkGirl"
      />

      {/* Card de credenciais — aparece sobre o chat */}
      <AnimatePresence>
        {showCredentials && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end bg-black/80 pb-16 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
              className="w-full flex justify-center"
            >
              <CredentialsCard
                username="code_access"
                password="C0NNECT"
                onAccess={handleAccess}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Stage3WhatsApp
