import { useState, useEffect, useRef, useCallback } from 'react'
import type { QueuedMessage } from '../types/funnel'

interface UseMessageQueueOptions {
  messages: QueuedMessage[]
  autoStart?: boolean
  onComplete?: () => void
  onMessageAdded?: (type: QueuedMessage['type']) => void
}

interface UseMessageQueueReturn {
  visibleMessages: QueuedMessage[]
  isTyping: boolean
  isComplete: boolean
  start: () => void
}

export function useMessageQueue({
  messages,
  autoStart = true,
  onComplete,
  onMessageAdded,
}: UseMessageQueueOptions): UseMessageQueueReturn {
  const [visibleMessages, setVisibleMessages] = useState<QueuedMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [started, setStarted] = useState(autoStart)

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const onMessageAddedRef = useRef(onMessageAdded)
  onMessageAddedRef.current = onMessageAdded

  useEffect(() => {
    if (!started || messages.length === 0) return

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const after = (fn: () => void, delay: number) => {
      const id = setTimeout(() => { if (!cancelled) fn() }, delay)
      timers.push(id)
      return id
    }

    const processMessage = (index: number) => {
      if (index >= messages.length) {
        after(() => {
          setIsTyping(false)
          setIsComplete(true)
          onCompleteRef.current?.()
        }, 300)
        return
      }

      const msg = messages[index]

      // Aguarda o delay da mensagem
      after(() => {
        // Mostra "digitando..." 1.5s antes de texto
        if (msg.type === 'text') {
          setIsTyping(true)
          after(() => {
            setIsTyping(false)
            setVisibleMessages((prev) => [...prev, msg])
            onMessageAddedRef.current?.(msg.type)
            processMessage(index + 1)
          }, 1500)
        } else {
          // Áudio: sem "digitando", aparece direto
          setVisibleMessages((prev) => [...prev, msg])
          onMessageAddedRef.current?.(msg.type)
          processMessage(index + 1)
        }
      }, msg.delay)
    }

    processMessage(0)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [started, messages])

  const start = useCallback(() => setStarted(true), [])

  return { visibleMessages, isTyping, isComplete, start }
}
