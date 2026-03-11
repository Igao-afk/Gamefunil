import { useState, useEffect, useRef, useCallback } from 'react'
import type { DialogueLine } from '../types/funnel'
import { audioEngine } from '../utils/audioEngine'
import type { AudioId } from '../types/audio'

interface UseTypewriterOptions {
  lines: DialogueLine[]
  autoStart?: boolean
  onLineComplete?: (index: number) => void
  onComplete?: () => void
}

interface UseTypewriterReturn {
  displayedLines: string[]
  isComplete: boolean
  currentLineIndex: number
  start: () => void
}

// RAF com fallback para ambientes sem window (testes)
const raf =
  typeof requestAnimationFrame !== 'undefined'
    ? requestAnimationFrame
    : (fn: FrameRequestCallback) => setTimeout(fn, 16) as unknown as number
const cancelRaf =
  typeof cancelAnimationFrame !== 'undefined'
    ? cancelAnimationFrame
    : clearTimeout

export function useTypewriter({
  lines,
  autoStart = true,
  onLineComplete,
  onComplete,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [started, setStarted] = useState(autoStart)

  // Refs para callbacks — evita stale closures
  const onLineCompleteRef = useRef(onLineComplete)
  const onCompleteRef = useRef(onComplete)
  onLineCompleteRef.current = onLineComplete
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!started || lines.length === 0) return

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const rafIds: number[] = []

    // Marca o instante em que o diálogo começa
    const dialogueStart = Date.now()

    // Pré-calcula o instante absoluto (ms desde dialogueStart) em que cada
    // linha deve iniciar a digitação. Fórmula idêntica à do código anterior,
    // mas calculada de uma vez — sem acúmulo de drift entre chamadas.
    //
    // absoluteStart[i] = sum(delay[0..i]) + sum(typingTime[0..i-1])
    //   onde typingTime[j] = lines[j].text.length * (lines[j].speed ?? 40)
    let cursor = 0
    const absoluteStarts: number[] = []
    for (const line of lines) {
      cursor += line.delay
      absoluteStarts.push(cursor)
      cursor += line.text.length * (line.speed ?? 40)
    }

    lines.forEach((line, lineIndex) => {
      const absStart = absoluteStarts[lineIndex]
      const speed = line.speed ?? 40
      const text = line.text

      // Agenda o início da digitação desta linha no instante absoluto correto.
      // Como todos os setTimeout são agendados a partir do MESMO ponto de
      // referência (dialogueStart), o erro de cada timer é independente e não
      // se acumula entre linhas.
      const delay = Math.max(0, absStart - (Date.now() - dialogueStart))
      const timerId = setTimeout(() => {
        if (cancelled) return

        // Dispara trigger de áudio configurado na linha
        if (line.audioTrigger) {
          audioEngine.play(line.audioTrigger as AudioId)
        }

        setCurrentLineIndex(lineIndex)
        // Reserva o slot (string vazia) para evitar saltos no array
        setDisplayedLines((prev) => {
          const next = [...prev]
          next[lineIndex] = ''
          return next
        })

        const typingStart = Date.now()

        // Animação dos caracteres via RAF — baseada em tempo decorrido real,
        // não em timeouts encadeados. Elimina o drift intra-linha.
        const animate = () => {
          if (cancelled) return

          const elapsed = Date.now() - typingStart
          const charsToShow = Math.min(
            Math.floor(elapsed / speed) + 1,
            text.length,
          )

          setDisplayedLines((prev) => {
            const next = [...prev]
            next[lineIndex] = text.slice(0, charsToShow)
            return next
          })

          if (charsToShow < text.length) {
            rafIds.push(raf(animate))
          } else {
            onLineCompleteRef.current?.(lineIndex)
            if (lineIndex === lines.length - 1) {
              setIsComplete(true)
              onCompleteRef.current?.()
            }
          }
        }

        rafIds.push(raf(animate))
      }, delay)

      timers.push(timerId)
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      rafIds.forEach(cancelRaf)
    }
  }, [started, lines])

  const start = useCallback(() => setStarted(true), [])

  return { displayedLines, isComplete, currentLineIndex, start }
}
