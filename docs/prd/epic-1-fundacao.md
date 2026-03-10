# Epic 1 — Fundação & Core Engine

**Referência PRD:** `docs/prd.md` → Epic 1
**Status:** Pendente

## Objetivo
Configurar projeto, implementar stage router, audio engine, mobile frame e design tokens. Ao final, estrutura navegável com placeholders para os 5 stages e sistema de áudio funcional.

---

## Story 1.1 — Setup do Projeto

**Como** desenvolvedor,
**Quero** inicializar o projeto com Vite + React + TypeScript + Tailwind + Framer Motion + Howler.js + Zustand,
**Para que** todos os agentes possam trabalhar com stack configurada e funcional.

**Acceptance Criteria:**
1. Projeto criado com `npm create vite@latest` com template react-ts
2. Tailwind CSS 3.4+ instalado e configurado com arquivo `tailwind.config.ts`
3. Framer Motion 11+ instalado
4. Howler.js 2.x instalado com tipos TypeScript (`@types/howler`)
5. Zustand 5+ instalado
6. Estrutura de diretórios criada: `src/stages/`, `src/components/ui/`, `src/components/simulators/`, `src/store/`, `src/hooks/`, `src/assets/audio/`, `src/utils/`
7. `npm run dev` inicia servidor sem erros
8. `npm run build` compila sem erros TypeScript
9. Arquivo `.env.example` com variáveis `VITE_CHECKOUT_URL` e `VITE_GTM_ID`
10. ESLint + Prettier configurados com regras TypeScript strict

---

## Story 1.2 — Design Tokens & Dark Theme

**Como** designer/desenvolvedor,
**Quero** que os design tokens estejam definidos no Tailwind config e como CSS Custom Properties,
**Para que** todos os componentes usem o sistema visual consistente do PROJECT INVISIBLE.

**Acceptance Criteria:**
1. CSS Custom Properties definidas em `src/styles/tokens.css`
2. Tailwind config extendido com as cores do projeto
3. Google Fonts importadas (Space Mono, Inter) com `font-display: swap`
4. Classe global `body` com `background: #000`, `color: #fff`, `font-family: Inter`
5. Componente `<MobileFrame>` criado em `src/components/ui/MobileFrame.tsx`
6. `src/styles/globals.css` importado no `main.tsx`

---

## Story 1.3 — Stage Router (Zustand)

**Como** sistema,
**Quero** uma máquina de estados gerenciando a progressão entre os 5 stages,
**Para que** a navegação seja linear, controlada e com suporte a persistência de sessão.

**Acceptance Criteria:**
1. Store Zustand em `src/store/funnelStore.ts`
2. Actions: `advanceStage()`, `setTransitioning(bool)`, `startSession()`
3. `advanceStage()` bloqueia se `isTransitioning` ou `currentStage >= 5`
4. Persistência em sessionStorage (chave: `project-invisible-session`)
5. `<StageRouter>` renderiza o stage correto com lazy loading
6. Placeholders funcionais para todos os 5 stages
7. Testes unitários para actions e persistência

---

## Story 1.4 — Audio Engine

**Como** sistema,
**Quero** um Audio Engine centralizado com Howler.js,
**Para que** os stages possam disparar sons com precisão e o bloqueio iOS seja resolvido.

**Acceptance Criteria:**
1. Classe `AudioEngine` em `src/utils/audioEngine.ts`
2. Métodos: `initialize()`, `play()`, `stop()`, `setVolume()`, `fadeIn()`, `fadeOut()`, `stopAll()`, `preloadStage()`
3. `initialize()` resolve iOS autoplay policy
4. Hook `useAudio()` em `src/hooks/useAudio.ts`
5. `audioManifest.ts` com todos os sons mapeados
6. Testes unitários com Howler mockado

---

## Story 1.5 — "Tap to Start" Screen

**Como** usuário,
**Quero** uma tela inicial para ativar o áudio antes da experiência,
**Para que** o áudio funcione desde o início no iOS/Android.

**Acceptance Criteria:**
1. Componente `<TapToStart>` com texto "▶ TAP TO START" pulsando em verde
2. Ao tap: chama `audioEngine.initialize()` e `funnelStore.startSession()`
3. Animação de transição fade out → Stage 1
4. `aria-label` adequado para acessibilidade
