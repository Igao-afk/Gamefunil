# PROJECT INVISIBLE — Frontend Architecture Document

**Versão:** 1.0
**Data:** 2026-03-05
**Autor:** Aria (Architect) — Synkra AIOS
**Status:** Aprovado para Desenvolvimento

---

## Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 2026-03-05 | 1.0 | Criação inicial da arquitetura frontend | Aria (Architect) |

---

## 1. Template & Framework

**Starter:** `npm create vite@latest project-invisible -- --template react-ts`

Vite + React + TypeScript foi escolhido por:
- Bundle splitting nativo (ideal para lazy loading por stage)
- Hot Module Replacement ultra-rápido para desenvolvimento
- Build otimizado para SPA mobile-first
- Sem overhead de SSR (desnecessário para SPA de funil)
- Ecosistema maduro e amplamente suportado

---

## 2. Frontend Tech Stack

| Categoria | Tecnologia | Versão | Propósito | Rationale |
|-----------|-----------|--------|-----------|-----------|
| Framework | React | 19.x | UI rendering | Concurrent features para animações suaves |
| Language | TypeScript | 5.x | Type safety | Strict mode para qualidade de código |
| Build Tool | Vite | 5.x | Dev server + bundler | Bundle splitting, lazy loading, HMR rápido |
| Styling | Tailwind CSS | 3.4.x | Utility CSS | Sem CSS-in-JS overhead, customizável |
| Animation | Framer Motion | 11.x | Animações e transições | API declarativa, AnimatePresence, motion values |
| Audio | Howler.js | 2.x | Gerenciamento de áudio | Cross-browser, sprites, iOS unlock built-in |
| State | Zustand | 5.x | Estado global do funil | Simples, performático, persist middleware |
| Icons | Lucide React | latest | Ícones SVG | Tree-shakeable, consistente |
| Testing | Vitest | 1.x | Unit/integration tests | Integrado com Vite, API compatível Jest |
| Testing DOM | @testing-library/react | 14.x | Component tests | Best practices para testes de componentes React |
| Linting | ESLint + Prettier | latest | Qualidade de código | TypeScript rules, consistência |

---

## 3. Project Structure

```
project-invisible/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.tsx                    # Entry point — monta App
│   ├── App.tsx                     # Root component — StageRouter + MobileFrame
│   ├── vite-env.d.ts
│   │
│   ├── stages/                     # Cada stage é um módulo lazy-loadado
│   │   ├── TapToStart/
│   │   │   └── index.tsx
│   │   ├── Stage1CodeInterception/
│   │   │   ├── index.tsx           # Orquestra o stage
│   │   │   ├── dialogue.ts         # Script do diálogo com timing e audioTriggers
│   │   │   └── Stage1.test.tsx
│   │   ├── Stage2DarkgirlCall/
│   │   │   ├── index.tsx
│   │   │   ├── dialogue.ts
│   │   │   └── Stage2.test.tsx
│   │   ├── Stage3WhatsApp/
│   │   │   ├── index.tsx
│   │   │   ├── messages.ts         # Queue de mensagens com timing
│   │   │   └── Stage3.test.tsx
│   │   ├── Stage4TikTok/
│   │   │   ├── index.tsx
│   │   │   ├── videos.ts           # Config dos 4 vídeos
│   │   │   └── Stage4.test.tsx
│   │   └── Stage5SalesPage/
│   │       ├── index.tsx
│   │       ├── sections/
│   │       │   ├── Hero.tsx
│   │       │   ├── Problem.tsx
│   │       │   ├── Antagonist.tsx
│   │       │   ├── Solution.tsx
│   │       │   ├── SocialProof.tsx
│   │       │   ├── Offer.tsx
│   │       │   ├── FAQ.tsx
│   │       │   └── CTAFinal.tsx
│   │       └── Stage5.test.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # Primitivos UI agnósticos de stage
│   │   │   ├── MobileFrame.tsx
│   │   │   ├── StatusBarIOS.tsx
│   │   │   ├── CTAButton.tsx
│   │   │   ├── GlitchOverlay.tsx
│   │   │   ├── TypewriterDisplay.tsx
│   │   │   ├── PriceReveal.tsx
│   │   │   ├── SalesPageSection.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   └── StageRouter.tsx
│   │   │
│   │   └── simulators/             # Componentes que simulam apps nativos
│   │       ├── IPhoneCallScreen.tsx
│   │       ├── WhatsAppSimulator.tsx
│   │       ├── AudioMessageBubble.tsx
│   │       ├── CredentialsCard.tsx
│   │       ├── TikTokFeedSimulator.tsx
│   │       └── VideoCard.tsx
│   │
│   ├── store/
│   │   └── funnelStore.ts          # Zustand store — stage router + session
│   │
│   ├── hooks/
│   │   ├── useTypewriter.ts        # Engine de typewriter
│   │   ├── useAudio.ts             # Abstração do AudioEngine
│   │   ├── useMessageQueue.ts      # Fila de mensagens com delay
│   │   └── useAnalytics.ts         # dataLayer.push abstraction
│   │
│   ├── utils/
│   │   ├── audioEngine.ts          # Classe AudioEngine (Howler.js)
│   │   └── audioManifest.ts        # Mapa de IDs para arquivos de áudio
│   │
│   ├── assets/
│   │   └── audio/                  # Arquivos .mp3 e .ogg
│   │       ├── keyboard-loop.mp3
│   │       ├── keyboard-loop.ogg
│   │       ├── sirens.mp3
│   │       ├── sirens.ogg
│   │       ├── footsteps.mp3
│   │       ├── footsteps.ogg
│   │       ├── gunshot-1.mp3
│   │       ├── gunshot-1.ogg
│   │       ├── gunshot-2.mp3
│   │       ├── gunshot-2.ogg
│   │       ├── static-noise.mp3    # Stage 2 — interferência crescente
│   │       ├── static-noise.ogg
│   │       ├── dialing-tone.mp3    # Stage 2 — tom de discagem
│   │       ├── dialing-tone.ogg
│   │       ├── call-connected.mp3  # Stage 2 — bipe de conexão
│   │       ├── call-connected.ogg
│   │       ├── voice-message-1.mp3 # Stage 3 — mensagens de voz
│   │       ├── voice-message-2.mp3
│   │       └── voice-message-3.mp3
│   │
│   ├── styles/
│   │   ├── globals.css             # CSS resets + tokens CSS
│   │   └── tokens.css              # CSS Custom Properties
│   │
│   └── types/
│       ├── funnel.ts               # Types do funil (Stage, DialogueLine, etc.)
│       └── audio.ts                # Types do audio engine
│
├── .env.example
├── .env.local                      # (não commitado)
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vitest.config.ts
├── eslint.config.js
├── prettier.config.js
├── vercel.json
└── package.json
```

---

## 4. Component Standards

### Component Template

```typescript
// src/components/ui/ExampleComponent.tsx
import { type FC } from 'react'
import { motion } from 'framer-motion'

interface ExampleComponentProps {
  title: string
  variant?: 'default' | 'highlight'
  onAction?: () => void
}

const ExampleComponent: FC<ExampleComponentProps> = ({
  title,
  variant = 'default',
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
        flex items-center justify-center
        ${variant === 'highlight' ? 'text-hacker-green' : 'text-white'}
      `}
    >
      <span className="font-mono text-sm">{title}</span>
      {onAction && (
        <button
          onClick={onAction}
          className="ml-2 min-h-[48px] min-w-[48px]"
          aria-label={`Ação: ${title}`}
        >
          →
        </button>
      )}
    </motion.div>
  )
}

export default ExampleComponent
```

### Naming Conventions

| Elemento | Convenção | Exemplo |
|----------|-----------|---------|
| Componente React | PascalCase | `IPhoneCallScreen.tsx` |
| Hook customizado | camelCase com prefixo `use` | `useTypewriter.ts` |
| Store Zustand | camelCase com sufixo `Store` | `funnelStore.ts` |
| Utilitários | camelCase | `audioEngine.ts` |
| Tipos/Interfaces | PascalCase | `DialogueLine`, `FunnelState` |
| CSS classes (Tailwind) | kebab-case seguindo Tailwind | `text-hacker-green` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_STAGE = 5` |
| Arquivo de data | camelCase | `dialogue.ts`, `messages.ts` |
| Stage folder | PascalCase | `Stage1CodeInterception/` |
| Assets | kebab-case | `keyboard-loop.mp3` |

---

## 5. State Management

### Store Structure

```
src/store/
└── funnelStore.ts      # Store único — toda state global do funil
```

### State Management Template

```typescript
// src/store/funnelStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type StageNumber = 0 | 1 | 2 | 3 | 4 | 5
// 0 = TapToStart, 1-5 = stages do funil

interface FunnelState {
  // State
  currentStage: StageNumber
  isTransitioning: boolean
  sessionStarted: boolean
  audioUnlocked: boolean

  // Actions
  startSession: () => void
  advanceStage: () => void
  setTransitioning: (value: boolean) => void
  unlockAudio: () => void
  resetFunnel: () => void
}

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      currentStage: 0,
      isTransitioning: false,
      sessionStarted: false,
      audioUnlocked: false,

      startSession: () => {
        set({ sessionStarted: true, currentStage: 1 })
      },

      advanceStage: () => {
        const { currentStage, isTransitioning } = get()
        if (isTransitioning) return
        if (currentStage >= 5) return
        set({ currentStage: (currentStage + 1) as StageNumber })
      },

      setTransitioning: (value: boolean) => {
        set({ isTransitioning: value })
      },

      unlockAudio: () => {
        set({ audioUnlocked: true })
      },

      resetFunnel: () => {
        set({
          currentStage: 0,
          isTransitioning: false,
          sessionStarted: false,
          audioUnlocked: false,
        })
      },
    }),
    {
      name: 'project-invisible-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentStage: state.currentStage,
        sessionStarted: state.sessionStarted,
        audioUnlocked: state.audioUnlocked,
      }),
    }
  )
)
```

---

## 6. Audio Engine Architecture

O AudioEngine é um singleton que encapsula Howler.js. Não usa React state — é gerenciado fora do ciclo React para performance máxima.

```typescript
// src/utils/audioEngine.ts
import { Howl, Howler } from 'howler'
import { AUDIO_MANIFEST } from './audioManifest'

export type AudioId = keyof typeof AUDIO_MANIFEST

class AudioEngine {
  private sounds: Map<AudioId, Howl> = new Map()
  private initialized = false

  // Resolve iOS/Android autoplay policy — chamar após primeira interação do usuário
  initialize(): void {
    if (this.initialized) return

    // Howler.js handles the AudioContext unlock automatically
    // when ctx.resume() is called after user gesture
    Howler.volume(0.7) // volume global padrão

    // Pré-carregar sons do Stage 1
    const stage1Sounds: AudioId[] = [
      'keyboard-loop',
      'sirens',
      'footsteps',
      'gunshot-1',
      'gunshot-2',
    ]

    stage1Sounds.forEach((id) => {
      this.loadSound(id)
    })

    this.initialized = true
  }

  private loadSound(id: AudioId): Howl {
    if (this.sounds.has(id)) return this.sounds.get(id)!

    const config = AUDIO_MANIFEST[id]
    const howl = new Howl({
      src: config.src,
      loop: config.loop ?? false,
      volume: config.defaultVolume ?? 0.7,
      preload: true,
    })

    this.sounds.set(id, howl)
    return howl
  }

  play(id: AudioId): void {
    if (!this.initialized) return
    const sound = this.loadSound(id)
    sound.play()
  }

  stop(id: AudioId): void {
    this.sounds.get(id)?.stop()
  }

  stopAll(): void {
    this.sounds.forEach((sound) => sound.stop())
  }

  setVolume(id: AudioId, volume: number): void {
    this.sounds.get(id)?.volume(volume)
  }

  fadeIn(id: AudioId, duration: number): void {
    const sound = this.loadSound(id)
    sound.volume(0)
    sound.play()
    sound.fade(0, 0.7, duration)
  }

  fadeOut(id: AudioId, duration: number): void {
    const sound = this.sounds.get(id)
    if (!sound) return
    sound.fade(sound.volume(), 0, duration)
    setTimeout(() => sound.stop(), duration)
  }

  preloadStage(stage: 1 | 2 | 3 | 4): void {
    const stageMap: Record<number, AudioId[]> = {
      1: ['keyboard-loop', 'sirens', 'footsteps', 'gunshot-1', 'gunshot-2'],
      2: ['dialing-tone', 'call-connected', 'static-noise'],
      3: ['voice-message-1', 'voice-message-2', 'voice-message-3'],
      4: [], // Stage 4 não tem áudio no MVP
    }
    stageMap[stage]?.forEach((id) => this.loadSound(id))
  }
}

// Singleton
export const audioEngine = new AudioEngine()
```

```typescript
// src/utils/audioManifest.ts
export const AUDIO_MANIFEST = {
  'keyboard-loop': {
    src: ['/audio/keyboard-loop.mp3', '/audio/keyboard-loop.ogg'],
    loop: true,
    defaultVolume: 0.3,
  },
  'sirens': {
    src: ['/audio/sirens.mp3', '/audio/sirens.ogg'],
    loop: false,
    defaultVolume: 0.4,
  },
  'footsteps': {
    src: ['/audio/footsteps.mp3', '/audio/footsteps.ogg'],
    loop: false,
    defaultVolume: 0.6,
  },
  'gunshot-1': {
    src: ['/audio/gunshot-1.mp3', '/audio/gunshot-1.ogg'],
    loop: false,
    defaultVolume: 0.8,
  },
  'gunshot-2': {
    src: ['/audio/gunshot-2.mp3', '/audio/gunshot-2.ogg'],
    loop: false,
    defaultVolume: 0.8,
  },
  'dialing-tone': {
    src: ['/audio/dialing-tone.mp3', '/audio/dialing-tone.ogg'],
    loop: true,
    defaultVolume: 0.5,
  },
  'call-connected': {
    src: ['/audio/call-connected.mp3', '/audio/call-connected.ogg'],
    loop: false,
    defaultVolume: 0.6,
  },
  'static-noise': {
    src: ['/audio/static-noise.mp3', '/audio/static-noise.ogg'],
    loop: true,
    defaultVolume: 0,
  },
  'voice-message-1': {
    src: ['/audio/voice-message-1.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'voice-message-2': {
    src: ['/audio/voice-message-2.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'voice-message-3': {
    src: ['/audio/voice-message-3.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
} as const
```

---

## 7. Routing (Stage Router)

Sem React Router — o "routing" é gerenciado pelo `funnelStore`. O StageRouter é um componente que renderiza o stage correto via lazy loading.

```typescript
// src/components/ui/StageRouter.tsx
import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useFunnelStore } from '../../store/funnelStore'

// Lazy load de cada stage para code splitting automático
const TapToStart = lazy(() => import('../../stages/TapToStart'))
const Stage1 = lazy(() => import('../../stages/Stage1CodeInterception'))
const Stage2 = lazy(() => import('../../stages/Stage2DarkgirlCall'))
const Stage3 = lazy(() => import('../../stages/Stage3WhatsApp'))
const Stage4 = lazy(() => import('../../stages/Stage4TikTok'))
const Stage5 = lazy(() => import('../../stages/Stage5SalesPage'))

const STAGE_MAP = {
  0: TapToStart,
  1: Stage1,
  2: Stage2,
  3: Stage3,
  4: Stage4,
  5: Stage5,
} as const

const StageRouter = () => {
  const currentStage = useFunnelStore((s) => s.currentStage)
  const CurrentStage = STAGE_MAP[currentStage]

  return (
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <AnimatePresence mode="wait">
        <CurrentStage key={currentStage} />
      </AnimatePresence>
    </Suspense>
  )
}

export default StageRouter
```

---

## 8. Hooks Architecture

### `useTypewriter`

```typescript
// src/hooks/useTypewriter.ts
import { useState, useEffect, useRef } from 'react'
import { audioEngine } from '../utils/audioEngine'
import type { AudioId } from '../utils/audioEngine'

export interface DialogueLine {
  text: string
  delay: number          // ms antes de iniciar esta linha
  speed?: number         // ms por caractere (default: 40)
  audioTrigger?: AudioId // som disparado quando a linha inicia
}

interface UseTypewriterOptions {
  lines: DialogueLine[]
  onLineComplete?: (index: number) => void
  onComplete?: () => void
  autoStart?: boolean
}

export const useTypewriter = ({
  lines,
  onLineComplete,
  onComplete,
  autoStart = true,
}: UseTypewriterOptions) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const activeTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!autoStart) return

    let globalDelay = 0

    lines.forEach((line, lineIdx) => {
      globalDelay += line.delay
      const lineDelay = globalDelay

      const lineTimer = setTimeout(() => {
        setCurrentLineIndex(lineIdx)

        if (line.audioTrigger) {
          audioEngine.play(line.audioTrigger)
        }

        const speed = line.speed ?? 40
        const chars = line.text.split('')

        chars.forEach((_, charIdx) => {
          const charTimer = setTimeout(() => {
            setDisplayedLines((prev) => {
              const updated = [...prev]
              if (!updated[lineIdx]) updated[lineIdx] = ''
              updated[lineIdx] = line.text.slice(0, charIdx + 1)
              return updated
            })

            if (charIdx === chars.length - 1) {
              onLineComplete?.(lineIdx)
              if (lineIdx === lines.length - 1) {
                setIsComplete(true)
                onComplete?.()
              }
            }
          }, charIdx * speed)

          activeTimers.current.push(charTimer)
        })

        globalDelay += chars.length * (line.speed ?? 40)
      }, lineDelay)

      activeTimers.current.push(lineTimer)
    })

    return () => {
      activeTimers.current.forEach(clearTimeout)
      activeTimers.current = []
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayedLines, isComplete, currentLineIndex }
}
```

### `useMessageQueue`

```typescript
// src/hooks/useMessageQueue.ts
import { useState, useEffect } from 'react'

export interface TextMessage {
  type: 'text'
  content: string
  delay: number
}

export interface AudioMessage {
  type: 'audio'
  audioId: string
  duration: string // "0:42"
  delay: number
}

export type QueuedMessage = TextMessage | AudioMessage

export const useMessageQueue = (messages: QueuedMessage[]) => {
  const [visibleMessages, setVisibleMessages] = useState<QueuedMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let cumulativeDelay = 0

    messages.forEach((msg, idx) => {
      cumulativeDelay += msg.delay

      // Mostrar "digitando..." 1.5s antes de texto
      if (msg.type === 'text') {
        setTimeout(() => setIsTyping(true), cumulativeDelay - 1500)
      }

      setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((prev) => [...prev, msg])
        if (idx === messages.length - 1) {
          setIsComplete(true)
        }
      }, cumulativeDelay)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { visibleMessages, isTyping, isComplete }
}
```

### `useAnalytics`

```typescript
// src/hooks/useAnalytics.ts
type FunnelEvent =
  | { event: 'stage_start'; stage_number: number }
  | { event: 'stage_complete'; stage_number: number }
  | { event: 'audio_play'; audio_id: string }
  | { event: 'cta_click'; stage_number: number }

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const useAnalytics = () => {
  const track = (data: FunnelEvent) => {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  }

  return { track }
}
```

---

## 9. Styling Guidelines

### Abordagem
Tailwind CSS utility-first. Nenhuma classe CSS customizada exceto para:
- Animações CSS complexas não cobertas pelo Tailwind (ex: glitch displacement)
- CSS Custom Properties (tokens globais)

Regra: **Tailwind first, custom CSS apenas como último recurso.**

### Global Theme Variables

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg: #000000;
  --color-surface: #1c1c1e;
  --color-surface-2: #2c2c2e;
  --color-text-primary: #ffffff;
  --color-text-secondary: #8e8e93;
  --color-accent: #00ff41;
  --color-whatsapp: #25d366;
  --color-danger: #ff3b30;
  --color-credentials: #0d1117;

  /* Typography */
  --font-mono: 'Space Mono', 'Courier New', monospace;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  --font-ios: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;

  /* Spacing */
  --safe-area-top: env(safe-area-inset-top, 0px);
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);

  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 250ms ease-out;
  --transition-slow: 500ms ease-in-out;
  --transition-stage: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glitch CSS animation */
@keyframes glitch-shift {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
}

.glitch-active {
  animation: glitch-shift 0.1s steps(1) infinite;
}
```

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'hacker-green': '#00FF41',
        'surface': '#1C1C1E',
        'surface-2': '#2C2C2E',
        'secondary': '#8E8E93',
        'whatsapp': '#25D366',
        'danger': '#FF3B30',
        'credentials': '#0D1117',
      },
      fontFamily: {
        mono: ['Space Mono', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        ios: ['-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'pulse-border': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'blink 0.5s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 10. Testing Requirements

### Component Test Template

```typescript
// src/stages/Stage1CodeInterception/Stage1.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock do audioEngine antes dos imports dos componentes
vi.mock('../../utils/audioEngine', () => ({
  audioEngine: {
    initialize: vi.fn(),
    play: vi.fn(),
    stop: vi.fn(),
    stopAll: vi.fn(),
    fadeIn: vi.fn(),
    fadeOut: vi.fn(),
    preloadStage: vi.fn(),
  },
}))

// Mock do funnelStore
vi.mock('../../store/funnelStore', () => ({
  useFunnelStore: vi.fn(() => ({
    currentStage: 1,
    advanceStage: vi.fn(),
    setTransitioning: vi.fn(),
  })),
}))

import Stage1 from './index'
import { audioEngine } from '../../utils/audioEngine'

describe('Stage1CodeInterception', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar a tela de chamada recebida', () => {
    render(<Stage1 />)
    expect(screen.getByText(/CÓDIGO/i)).toBeInTheDocument()
  })

  it('deve iniciar o áudio de fundo ao montar', () => {
    render(<Stage1 />)
    expect(audioEngine.play).toHaveBeenCalledWith('keyboard-loop')
  })

  it('deve parar todos os sons ao desmontar', () => {
    const { unmount } = render(<Stage1 />)
    unmount()
    expect(audioEngine.stopAll).toHaveBeenCalled()
  })
})
```

### Testing Best Practices

1. **Unit Tests:** Testar hooks (`useTypewriter`, `useMessageQueue`, `useAudio`) em isolamento com timers fake (`vi.useFakeTimers()`)
2. **Component Tests:** Testar renderização e interações críticas com `@testing-library/react`; sempre mockar `audioEngine` e `funnelStore`
3. **Store Tests:** Testar actions do Zustand diretamente: `advanceStage`, `setTransitioning`, persistência
4. **Sem E2E no MVP:** Custo/benefício desfavorável; substituir por testes manuais documentados em checklist
5. **Test Structure:** Arrange-Act-Assert; um `describe` por arquivo, `it` com descrição em português
6. **Coverage Target:** 70% de cobertura nas funções de lógica core (hooks, store, audioEngine)

---

## 11. Environment Configuration

```bash
# .env.example

# URL do checkout externo (Hotmart, Kiwify, Stripe, etc.)
VITE_CHECKOUT_URL=https://example.com/checkout

# Google Tag Manager ID (ex: GTM-XXXXXXX)
VITE_GTM_ID=GTM-XXXXXXX

# URL base para assets de vídeo do Stage 4
# Se vazio, usa assets locais em /public/videos/
VITE_VIDEO_BASE_URL=

# Modo debug — exibe botões de skip entre stages (apenas dev)
VITE_DEBUG_MODE=false
```

```typescript
// src/types/env.d.ts
interface ImportMetaEnv {
  readonly VITE_CHECKOUT_URL: string
  readonly VITE_GTM_ID: string
  readonly VITE_VIDEO_BASE_URL: string
  readonly VITE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## 12. Frontend Developer Standards

### Critical Coding Rules

1. **NUNCA animar propriedades que causam layout reflow** — Usar apenas `transform` e `opacity` com Framer Motion. Proibido animar `width`, `height`, `top`, `left`, `padding`, `margin`.

2. **NUNCA chamar `audioEngine.play()` sem verificar `audioUnlocked`** do funnelStore — Áudio só funciona após a primeira interação do usuário.

3. **SEMPRE mockar `audioEngine` em testes** — Howler.js não funciona em jsdom. Todo teste que envolve componente com áudio deve mockar o módulo.

4. **NUNCA usar `document.querySelector` ou `getElementById`** — Usar refs React (`useRef`) quando precisar de acesso direto ao DOM.

5. **SEMPRE usar `useEffect` cleanup** para timers, audio e event listeners — Evitar memory leaks entre stages.

6. **NUNCA hardcodar texto de diálogo dentro dos componentes** — Texto vai em arquivos de data (`dialogue.ts`, `messages.ts`) para fácil edição.

7. **SEMPRE envolver animações em `motion.div`/`motion.span`** do Framer Motion — Nunca usar `transition` CSS para animações de estado.

8. **NUNCA usar `any` em TypeScript** — Usar tipos específicos ou `unknown` quando necessário.

9. **SEMPRE respeitar `prefers-reduced-motion`** — Framer Motion já suporta via `useReducedMotion()`. Usar em todas as animações não-críticas.

10. **NUNCA acessar `import.meta.env` diretamente nos componentes** — Criar arquivo de configuração centralizado em `src/config.ts`.

### Quick Reference

```bash
# Comandos essenciais
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção (TypeScript check + Vite build)
npm run preview      # Preview do build local
npm run test         # Testes com Vitest
npm run test:ui      # Vitest UI
npm run lint         # ESLint
npm run type-check   # TypeScript check sem build
```

```typescript
// Padrões de importação
import { useFunnelStore } from '../store/funnelStore'
import { audioEngine } from '../utils/audioEngine'
import { useTypewriter } from '../hooks/useTypewriter'
import { motion, AnimatePresence } from 'framer-motion'

// Avanço de stage — sempre via store
const advanceStage = useFunnelStore((s) => s.advanceStage)
const setTransitioning = useFunnelStore((s) => s.setTransitioning)

// Padrão de transição entre stages
const handleAdvance = async () => {
  setTransitioning(true)
  audioEngine.stopAll()
  // Aguardar animação de saída (500ms)
  await new Promise((r) => setTimeout(r, 500))
  advanceStage()
  setTransitioning(false)
}
```

```typescript
// src/config.ts — Centralizador de env vars
export const config = {
  checkoutUrl: import.meta.env.VITE_CHECKOUT_URL || '#',
  gtmId: import.meta.env.VITE_GTM_ID || '',
  videoBaseUrl: import.meta.env.VITE_VIDEO_BASE_URL || '',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
} as const
```

---

## 13. Deployment

```json
// vercel.json
{
  "headers": [
    {
      "source": "/audio/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Deploy checklist:**
- [ ] `VITE_CHECKOUT_URL` configurado no Vercel dashboard
- [ ] `VITE_GTM_ID` configurado no Vercel dashboard
- [ ] Assets de áudio em `/public/audio/` (MP3 + OGG)
- [ ] Vídeos em `/public/videos/` ou `VITE_VIDEO_BASE_URL` configurado
- [ ] `npm run build` sem erros TypeScript antes do deploy
- [ ] Teste manual em iOS Safari e Android Chrome após deploy
