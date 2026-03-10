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

    const after = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn()
      }, delay)
      timers.push(id)
    }

    const processLine = (lineIndex: number) => {
      if (lineIndex >= lines.length) {
        setIsComplete(true)
        onCompleteRef.current?.()
        return
      }

      const line = lines[lineIndex]
      const speed = line.speed ?? 40
      const text = line.text

      after(() => {
        // Dispara audio trigger no início da linha
        if (line.audioTrigger) {
          audioEngine.play(line.audioTrigger as AudioId)
        }

        setCurrentLineIndex(lineIndex)
        // Reserva o slot da linha
        setDisplayedLines((prev) => {
          const next = [...prev]
          next[lineIndex] = ''
          return next
        })

        // Digita char a char recursivamente
        let charIndex = 0
        const typeChar = () => {
          if (charIndex >= text.length) {
            onLineCompleteRef.current?.(lineIndex)
            processLine(lineIndex + 1)
            return
          }
          charIndex++
          setDisplayedLines((prev) => {
            const next = [...prev]
            next[lineIndex] = text.slice(0, charIndex)
            return next
          })
          after(typeChar, speed)
        }

        after(typeChar, speed)
      }, line.delay)
    }

    processLine(0)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [started, lines])

  const start = useCallback(() => setStarted(true), [])

  return { displayedLines, isComplete, currentLineIndex, start }
}
