# PROJECT INVISIBLE — Product Requirements Document (PRD)

**Versão:** 1.0
**Data:** 2026-03-05
**Autor:** Morgan (PM) — Synkra AIOS
**Status:** Aprovado para Especificação Frontend

---

## Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 2026-03-05 | 1.0 | Criação inicial do PRD | Morgan (PM) |

---

## 1. Goals e Background Context

### Goals

- Construir o funil cinemático PROJECT INVISIBLE como SPA mobile-first que conduza usuários do tráfego até o checkout do Conectagram
- Criar 5 estágios de experiência imersiva que simulem aplicativos nativos (chamada telefônica, WhatsApp, TikTok) de forma realística
- Manter a ilusão narrativa durante toda a jornada — o usuário nunca deve se sentir em um funil de vendas
- Entregar progressão psicológica deliberada: Choque → Lógica → Intimidade → Prova → Decisão
- Atingir taxa de conclusão funil de pelo menos 3% (tráfego → checkout) com experiência fluida em iOS Safari e Android Chrome
- Implementar sistema de áudio imersivo com trigger points mapeados ao timeline de cada diálogo
- Garantir performance mobile: LCP < 2.5s, carregamento por lazy loading por estágio

### Background Context

O Conectagram é um produto de automação de interações estratégicas no Instagram que gera crescimento orgânico previsível. O desafio central de marketing não é o produto em si, mas a percepção: automação de Instagram está saturada de soluções ruins e promessas vazias. O público-alvo (criadores 1k–50k seguidores) tem alta resistência a funnels tradicionais e está "imune" a marketing direto.

O PROJECT INVISIBLE resolve isso criando uma experiência que nunca parece marketing. Através de personagens narrativos (CODE — hacker sob ameaça; DARKGIRL — analista estratégica) e simulações fiéis de interfaces nativas (iOS call screen, WhatsApp, TikTok), o usuário é conduzido por uma jornada de "descoberta de tecnologia proibida". O resultado é engajamento emocional profundo antes de qualquer pitch de vendas, criando o estado psicológico ideal para a decisão de compra.

---

## 2. Requirements

### Functional Requirements

- **FR1:** O sistema deve apresentar 5 estágios em sequência linear (Stage 1 → Stage 2 → Stage 3 → Stage 4 → Stage 5), sem possibilidade de navegação retroativa
- **FR2:** Stage 1 deve simular uma ligação iPhone recebida com status bar iOS realística, animação de chamada ativa e diálogo com efeito typewriter (40ms por caractere)
- **FR3:** O sistema de áudio do Stage 1 deve disparar sons de teclado mecânico (loop de ambiente), sirenes distantes (fade in ~45s), passos correndo (panning L→R ~1:10), e dois tiros (~1:20) nos momentos corretos do diálogo
- **FR4:** Stage 1 deve terminar com animação de "chamada encerrada" e reveal do número que o usuário vai ligar no Stage 2
- **FR5:** Stage 2 deve simular ligação de saída (discando → atendendo) com UI diferenciada da Stage 1, diálogo da DarkGirl e efeito de glitch visual crescente nos últimos 20 segundos
- **FR6:** Stage 2 deve encerrar com interferência de áudio crescente e transição glitch para Stage 3
- **FR7:** Stage 3 deve simular interface WhatsApp iPhone com mensagens aparecendo em sequência com delays realísticos (2–4 segundos entre mensagens) e indicador "digitando..."
- **FR8:** Stage 3 deve incluir 3 componentes AudioMessage com waveform visual animada ao reproduzir, representando mensagens de voz da DarkGirl
- **FR9:** Stage 3 deve revelar credenciais de acesso TikTok em container especial (borda verde pulsando) com botão "ACESSAR" que transita para Stage 4
- **FR10:** Stage 4 deve simular feed TikTok vertical com scroll snap, 4 vídeos em tela cheia (fullscreen vertical), autoplay ao entrar no viewport, e barra de progresso verde no topo
- **FR11:** O quarto vídeo do Stage 4 deve incluir price reveal com efeito glitch (R$89,90/mês) e CTA "TESTAR AGORA" que transita para Stage 5
- **FR12:** Stage 5 deve ser uma sales page completa com seções: Hero, Problema, O Sistema (antagonista), A Solução, Prova Social, Oferta, FAQ (mínimo 5 perguntas), e CTA Final
- **FR13:** O CTA Final do Stage 5 ("Ativar Conectagram") deve direcionar para URL externa de checkout configurável
- **FR14:** O sistema de áudio deve exigir uma interação do usuário antes de reproduzir qualquer som (resolução do bloqueio de autoplay iOS/Android) via "tap to start" no Stage 1
- **FR15:** O progresso do usuário deve ser persistido em sessionStorage para evitar perda em caso de refresh acidental
- **FR16:** Cada estágio deve fazer preload dos assets (áudio, fontes) do estágio seguinte durante sua execução (lazy loading estratégico)
- **FR17:** O Stage 4 deve suportar vídeos hospedados externamente (URL configurável) como fallback se assets locais não estiverem disponíveis

### Non-Functional Requirements

- **NFR1:** A experiência deve ser primariamente mobile-first (viewport base: 390px largura) com suporte a iOS Safari 15+ e Android Chrome 90+
- **NFR2:** LCP (Largest Contentful Paint) deve ser < 2.5 segundos na primeira visita em conexão 4G
- **NFR3:** O bundle inicial (Stage 1 assets) não deve exceder 500KB gzipped para garantir carregamento rápido
- **NFR4:** Todas as animações devem manter 60fps em dispositivos mid-range (iPhone SE 2020 / Samsung Galaxy A32)
- **NFR5:** A aplicação deve funcionar 100% offline após o carregamento inicial (exceto vídeos externos do Stage 4)
- **NFR6:** O código deve ser TypeScript strict mode com cobertura mínima de tipos
- **NFR7:** A aplicação não deve expor informações de sistema (user agent, versão do browser) para scripts de terceiros além dos pixels de analytics configurados
- **NFR8:** Todos os assets de áudio devem ser servidos via CDN com cache headers adequados (Cache-Control: max-age=31536000)

---

## 3. User Interface Design Goals

### Overall UX Vision
A experiência deve ser totalmente imersiva e cinematográfica. Cada estágio tem sua própria "pele" de interface (iOS call screen, WhatsApp, TikTok, Sales Page) mas todos compartilham o mesmo DNA visual dark: preto profundo, branco puro, verde hacker como cor de acento. O usuário não deve ver nenhum elemento que quebre a quarta parede — sem headers de site, sem menus, sem logos da empresa. A interface *é* a narrativa.

### Key Interaction Paradigms
- **Passive viewing (Stages 1–2):** O usuário assiste ao diálogo se desenrolar. Interação mínima — apenas um toque para iniciar o áudio no começo
- **Intimate messaging (Stage 3):** Usuário recebe mensagens em tempo real. Sensação de conversa privada e exclusiva
- **Active exploration (Stage 4):** Scroll vertical livre (TikTok behavior). Usuário controla o ritmo mas com autoplay encorajando progressão
- **Decision consolidation (Stage 5):** Leitura linear com CTAs progressivos. Remover fricção máxima na direção do checkout

### Core Screens and Views
1. **"Tap to Start" Screen** — Tela inicial minimalista para ativar áudio
2. **Stage 1: iPhone Incoming Call** — Simulação chamada recebida
3. **Stage 2: iPhone Outgoing Call** — Simulação chamada realizada
4. **Stage 3: WhatsApp Chat** — Interface mensagens simulada
5. **Stage 4: TikTok Feed** — Feed vertical 4 vídeos
6. **Stage 5: Sales Page** — Página de vendas completa

### Accessibility
WCAG AA para Stage 5 (Sales Page). Stages 1–4 são experiências cinematográficas que por design limitam interatividade; garantir contraste mínimo 4.5:1 em todos os textos.

### Branding
Dark UI cinematográfica. Paleta fixa:
- Background principal: `#000000`
- Texto principal: `#FFFFFF`
- Texto secundário: `#8E8E93` (cinza iOS)
- Acento primário: `#00FF41` (hacker green)
- Acento secundário: `#1C1C1E` (dark surface iOS)
- Danger/urgência: `#FF3B30` (red iOS)

Fontes: **Space Mono** (monospace — elementos de código/hacker) + **Inter** (interface, corpo de texto) + **SF Pro Display** (fallback iOS para simulações)

### Target Device and Platforms
Mobile Only (390px–430px). Layout não deve quebrar em tablets mas não é prioridade de design.

---

## 4. Technical Assumptions

### Repository Structure
Monorepo simples — projeto único sem subpacotes.

### Service Architecture
SPA (Single Page Application) puro. Sem backend no MVP. Toda a lógica roda no browser. Checkout é link externo configurável via variável de ambiente.

### Testing Requirements
- Testes unitários para: Stage Router (Zustand store), Typewriter Engine, Audio Engine trigger system, Message Queue delay system
- Testes de integração: fluxo completo Stage 1→5 (happy path)
- Testes visuais manuais em: iOS Safari 15+ (iPhone SE, iPhone 14 Pro), Android Chrome 90+ (Samsung Galaxy A32, Pixel 6)
- Sem E2E automatizado no MVP (custo/benefício desfavorável para SPA de funnel)

### Additional Technical Assumptions
- **Framework:** Vite 5+ com React 19 e TypeScript 5 strict mode
- **Styling:** Tailwind CSS 3.4+ com CSS Custom Properties para temas; nenhum framework CSS externo além do Tailwind
- **Animações:** Framer Motion 11+ exclusivamente para todas as animações e transições (não usar CSS keyframes para animações complexas)
- **Áudio:** Howler.js 2.x para gerenciamento de áudio; sprites de áudio para reduzir requests HTTP
- **Estado:** Zustand 5+ para state management; sem Redux ou Context API para estado global
- **Deploy:** Vercel (free tier suficiente para MVP); domínio personalizado configurado pelo cliente
- **Variáveis de ambiente:** `VITE_CHECKOUT_URL` para URL do checkout externo
- **Assets de vídeo (Stage 4):** MP4 H.264 otimizados, máximo 10MB cada, hospedados no projeto ou CDN externo via URL configurável
- **Fontes:** Google Fonts (Space Mono, Inter) com font-display: swap
- **Analytics:** Google Tag Manager snippet no index.html (injeção de GTM ID via env var `VITE_GTM_ID`)

---

## 5. Epic List

1. **Epic 1 — Fundação & Core Engine:** Configurar projeto, implementar stage router, audio engine, mobile frame e design tokens
2. **Epic 2 — Stage 1: CODE INTERCEPTION:** Simulação de ligação iPhone recebida com typewriter dialogue, sistema de áudio e transição para Stage 2
3. **Epic 3 — Stage 2: DARKGIRL CALL:** Ligação de saída com DarkGirl, glitch overlay crescente e transição para Stage 3
4. **Epic 4 — Stage 3: ENCRYPTED WHATSAPP:** Chat WhatsApp simulado com message queue, audio messages e reveal de credenciais
5. **Epic 5 — Stage 4: SECRET TIKTOK:** Feed TikTok vertical simulado com 4 vídeos, scroll snap e price reveal
6. **Epic 6 — Stage 5: SALES PAGE:** Página de vendas completa com todas as seções e CTA para checkout
7. **Epic 7 — Polish, Testes & Deploy:** Otimização de performance, testes mobile, analytics e deploy Vercel

---

## 6. Epic Details

---

### Epic 1 — Fundação & Core Engine

**Objetivo:** Estabelecer toda a infraestrutura do projeto: setup Vite+React+TS, design tokens do dark theme, Mobile Frame wrapper (390px), Stage Router com Zustand, e Audio Engine com Howler.js. Ao final deste epic, existe uma estrutura navegável com placeholders para os 5 stages e sistema de áudio funcional.

---

#### Story 1.1 — Setup do Projeto

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

#### Story 1.2 — Design Tokens & Dark Theme

**Como** designer/desenvolvedor,
**Quero** que os design tokens (cores, fontes, espaçamentos) estejam definidos no Tailwind config e como CSS Custom Properties,
**Para que** todos os componentes usem o sistema visual consistente do PROJECT INVISIBLE.

**Acceptance Criteria:**
1. CSS Custom Properties definidas em `src/styles/tokens.css`: `--color-bg`, `--color-surface`, `--color-text-primary`, `--color-text-secondary`, `--color-accent-green`, `--color-danger`
2. Tailwind config extendido com as cores do projeto: `hacker-green: #00FF41`, `surface: #1C1C1E`, `danger: #FF3B30`
3. Google Fonts importadas (Space Mono, Inter) com `font-display: swap`
4. Classe global `body` com `background: #000`, `color: #fff`, `font-family: Inter`
5. Componente `<MobileFrame>` criado em `src/components/ui/MobileFrame.tsx`: wrapper com `max-w-[390px]`, centralizado, `min-h-screen`, overflow hidden
6. `src/styles/globals.css` importado no `main.tsx`
7. Storybook ou página de demo visual mostrando os tokens (opcional, não bloqueia)

---

#### Story 1.3 — Stage Router (Zustand)

**Como** sistema,
**Quero** uma máquina de estados gerenciando a progressão entre os 5 stages,
**Para que** a navegação seja linear, controlada e com suporte a persistência de sessão.

**Acceptance Criteria:**
1. Store Zustand em `src/store/funnelStore.ts` com estado: `currentStage: 1 | 2 | 3 | 4 | 5`, `isTransitioning: boolean`, `sessionStarted: boolean`
2. Actions: `advanceStage()`, `setTransitioning(bool)`, `startSession()`
3. `advanceStage()` incrementa stage apenas se `!isTransitioning` e `currentStage < 5`
4. Persistência em `sessionStorage` via middleware Zustand persist (chave: `project-invisible-session`)
5. Componente `<StageRouter>` em `src/components/StageRouter.tsx` renderiza o stage correto baseado em `currentStage`
6. Placeholders funcionais para todos os 5 stages (componentes stub com texto do stage)
7. `<App>` usa `<StageRouter>` dentro de `<MobileFrame>`
8. Testes unitários para `advanceStage()`, `setTransitioning()`, e persistência

---

#### Story 1.4 — Audio Engine

**Como** sistema,
**Quero** um Audio Engine centralizado que gerencie todos os sons do funil,
**Para que** os stages possam disparar sons de forma precisa e o bloqueio de autoplay iOS seja resolvido.

**Acceptance Criteria:**
1. `src/utils/audioEngine.ts` exporta classe `AudioEngine` usando Howler.js
2. Métodos: `initialize()` (resolve iOS unlock), `play(soundId)`, `stop(soundId)`, `setVolume(soundId, vol)`, `fadeIn(soundId, duration)`, `fadeOut(soundId, duration)`, `stopAll()`
3. `initialize()` deve ser chamado após primeira interação do usuário (resolve iOS autoplay policy)
4. Hook `useAudio()` em `src/hooks/useAudio.ts` expondo os métodos do engine
5. Sons definidos em `src/assets/audio/` com placeholder de arquivo vazio e mapeados em `src/utils/audioManifest.ts`
6. Testes unitários para `play()`, `stop()`, `fadeIn()`, `fadeOut()` com Howler mockado

---

#### Story 1.5 — "Tap to Start" Screen

**Como** usuário,
**Quero** ver uma tela inicial convidativa antes do Stage 1,
**Para que** o áudio seja desbloqueado antes de começar a experiência e eu seja preparado para a imersão.

**Acceptance Criteria:**
1. Componente `<TapToStart>` em `src/stages/TapToStart.tsx`
2. Visual: fundo preto, texto em verde hacker "▶ TAP TO START" pulsando (animação Framer Motion)
3. Texto secundário: "Ative o som para uma experiência completa" em branco 70% opacidade
4. Ao tap/click: chama `audioEngine.initialize()` e depois `funnelStore.startSession()`
5. Após `startSession()`, StageRouter renderiza Stage 1 automaticamente
6. Animação de transição: fade out de TapToStart → fade in Stage 1 (Framer Motion AnimatePresence)
7. Screen reader: botão com `aria-label="Iniciar experiência PROJECT INVISIBLE"`

---

### Epic 2 — Stage 1: CODE INTERCEPTION

**Objetivo:** Implementar a simulação completa da ligação do hacker CODE, com interface iOS realística, typewriter dialogue, sistema de áudio com trigger points precisos, animação de "chamada encerrada" e reveal do número para o Stage 2. Ao final, o usuário vivencia o choque narrativo completo e é direcionado ao Stage 2.

---

#### Story 2.1 — iPhone Call UI Component

**Como** usuário,
**Quero** ver uma interface de ligação iPhone realística,
**Para que** a ilusão de estar recebendo uma chamada real seja mantida.

**Acceptance Criteria:**
1. Componente `<IPhoneCallScreen>` em `src/components/simulators/IPhoneCallScreen.tsx`
2. Props: `callerName: string`, `callerNumber: string`, `callStatus: 'ringing' | 'active' | 'ended'`, `callDuration?: string`, `variant: 'incoming' | 'outgoing'`
3. Status bar iOS simulada no topo: hora (09:41 estático), ícones de sinal, WiFi, bateria — em branco sobre preto
4. Avatar circular do chamador com ícone default de pessoa
5. Nome do chamador em branco, tamanho `text-3xl font-semibold`
6. Número do chamador em cinza `text-secondary text-sm`
7. Status de chamada: "Chamada recebida" / "Chamada ativa" / "Chamada encerrada"
8. Contador de tempo de chamada ativo quando `callStatus === 'active'`
9. Botões inferiores: ✕ Desligar (vermelho, circular) e 🔇 Mudo (cinza, circular) — somente visuais, sem funcionalidade real no MVP
10. Animação de ondas de voz verdes (3 ondas pulsando) quando chamada ativa

---

#### Story 2.2 — Typewriter Dialogue Engine

**Como** sistema,
**Quero** um engine de typewriter que renderize diálogos linha a linha com timing preciso,
**Para que** os textos apareçam de forma dramática e controlada durante as chamadas.

**Acceptance Criteria:**
1. Hook `useTypewriter` em `src/hooks/useTypewriter.ts`
2. Parâmetros: `lines: DialogueLine[]`, `onLineComplete?: (index: number) => void`, `onComplete?: () => void`
3. Tipo `DialogueLine`: `{ text: string; delay: number; speed?: number; audioTrigger?: string }`
4. `speed` padrão: 40ms por caractere
5. `delay` define pausa antes de iniciar a linha (em ms)
6. `audioTrigger` é string de ID de som disparado quando a linha inicia
7. Hook retorna: `displayedLines: string[]`, `isComplete: boolean`, `currentLineIndex: number`
8. Cada linha completa antes de iniciar a próxima
9. Testes unitários: sequência de 3 linhas com timing, callback onLineComplete, audioTrigger dispatch

---

#### Story 2.3 — Stage 1 Completo (CODE INTERCEPTION)

**Como** usuário,
**Quero** vivenciar o Stage 1 completo com diálogo do CODE, sons imersivos e animação final,
**Para que** eu entre no estado de choque, curiosidade e urgência.

**Acceptance Criteria:**
1. Componente `<Stage1CodeInterception>` em `src/stages/Stage1CodeInterception/index.tsx`
2. Usa `<IPhoneCallScreen variant="incoming">` com caller "CÓDIGO" e número genérico
3. Diálogo do CODE implementado com `useTypewriter` com todas as linhas do script (PT-BR conforme briefing)
4. Sistema de áudio com trigger points mapeados:
   - Início: teclado mecânico em loop (baixo volume, ambiente)
   - ~45s (linha "Mesmo postando todo dia..."): sirenes distantes entram com fade in 3s
   - ~1:10 (linha "Porque o sistema foi construído..."): passos correndo (panning L→R)
   - ~1:20 (linha "...me encontraram."): dois tiros disparados
5. Animação de "CHAMADA ENCERRADA": fullscreen preto, texto branco centralizado "CHAMADA ENCERRADA" com Framer Motion
6. Após 1.5s: número pulsa na tela com animação de fade-in e escala (Framer Motion)
7. Número exibido: formatado como número de telefone brasileiro
8. Botão "LIGAR" sob o número com CTA "Ligar para o número" — ao pressionar, avança para Stage 2
9. Todos os sons param ao sair do Stage 1

---

### Epic 3 — Stage 2: DARKGIRL CALL

**Objetivo:** Implementar a ligação de saída para DarkGirl, com diálogo analítico e calmo, glitch overlay visual crescente representando a interferência do sistema, e transição dramática para o Stage 3 (WhatsApp). Ao final, o usuário passou por lógica e confiança.

---

#### Story 3.1 — DarkGirl Call Screen & Glitch Overlay

**Como** usuário,
**Quero** ligar para o número do CODE e ser atendido pela DarkGirl,
**Para que** a narrativa de descoberta e confiança se aprofunde.

**Acceptance Criteria:**
1. Componente `<Stage2DarkgirlCall>` em `src/stages/Stage2DarkgirlCall/index.tsx`
2. Usa `<IPhoneCallScreen variant="outgoing">` com caller "???" evoluindo para "DARKGIRL" após atendimento
3. Sequência inicial: tom de discagem (3s) → atende → status muda para "ativa"
4. Diálogo da DarkGirl implementado com `useTypewriter` — tom calmo, letras menos apressadas (speed: 55ms)
5. Componente `<GlitchOverlay>` em `src/components/ui/GlitchOverlay.tsx`: overlay sobre toda a tela com glitch visual (deslocamento de pixels, ruído CSS) com prop `intensity: 0–1`
6. Glitch inicia com intensity=0 no começo do diálogo
7. Glitch aumenta progressivamente para intensity=0.4 durante "Estão tentando rastrear esta chamada"
8. Áudio: estática eletrônica cresce em volume junto com glitch intensity
9. Última linha "Vou te mandar algo seguro": glitch sobe para intensity=1, tela fragmenta
10. Transição: dissolve glitch → slide up → Stage 3 (Framer Motion AnimatePresence)
11. Tom de discagem e áudio de chamada ativa usando AudioEngine

---

### Epic 4 — Stage 3: ENCRYPTED WHATSAPP

**Objetivo:** Implementar o chat WhatsApp simulado com message queue cronometrada, 3 audio messages interativos, e reveal das credenciais TikTok. Ao final, o usuário sente intimidade e exclusividade — foi escolhido para receber algo secreto.

---

#### Story 4.1 — WhatsApp UI Simulator

**Como** usuário,
**Quero** ver uma interface WhatsApp iPhone realística,
**Para que** a sensação de comunicação privada e segura seja estabelecida.

**Acceptance Criteria:**
1. Componente `<WhatsAppSimulator>` em `src/components/simulators/WhatsAppSimulator.tsx`
2. Header: foto de perfil (ícone), "DarkGirl", "Online" em verde, ícones de chamada/vídeo/menu (decorativos)
3. Background: padrão de bolhas de fundo WhatsApp em tom escuro (não o branco padrão — adaptar para dark)
4. Mensagens recebidas: bolhas cinza escuro, lado esquerdo
5. Indicador "Digitando..." com três pontos animados (Framer Motion) antes de cada mensagem
6. Timestamps em cada mensagem (hora fictícia progressiva)
7. Double checkmark (✓✓) verde após entrega de mensagem
8. Scroll automático para última mensagem

---

#### Story 4.2 — Message Queue & Audio Messages

**Como** usuário,
**Quero** receber as mensagens da DarkGirl com delay realístico e poder ouvir as mensagens de voz,
**Para que** a experiência de conversa íntima e reveladora se complete.

**Acceptance Criteria:**
1. Hook `useMessageQueue` em `src/hooks/useMessageQueue.ts`
2. Parâmetro: `messages: QueuedMessage[]` com tipo `{ content: string | AudioMessage; delay: number; type: 'text' | 'audio' }`
3. Mensagens aparecem em sequência respeitando delay individual (2–4s entre texto, mais entre áudios)
4. "Digitando..." aparece 1.5s antes de cada mensagem de texto
5. Mensagens implementadas conforme briefing: "Conexão iniciada.", "Ativando criptografia.", "Estamos seguros agora."
6. Componente `<AudioMessageBubble>` com ícone de play/pause, waveform SVG animada (verde durante reprodução), duração do áudio
7. Os 3 áudios reproduzem o conteúdo do briefing (texto narrado via TTS ou arquivo real — usar placeholder por enquanto)
8. Após último áudio: mensagem especial com credenciais em container destacado
9. Container de credenciais: borda `--color-accent-green` com animação pulse, `user: code_access` e `pass: C0NNECT` em `Space Mono`
10. Botão "ACESSAR TIKTOK SECRETO" com glow verde — ao pressionar, avança para Stage 4

---

### Epic 5 — Stage 4: SECRET TIKTOK

**Objetivo:** Implementar o feed TikTok vertical simulado com 4 vídeos, scroll snap behavior, contador de likes, e price reveal no quarto vídeo. Ao final, o usuário tem prova social e desejo, e o preço revelado parece acessível após toda a jornada.

---

#### Story 5.1 — TikTok Feed UI & VideoCard

**Como** usuário,
**Quero** ver um feed TikTok vertical com comportamento nativo (scroll snap, autoplay),
**Para que** a prova em vídeo seja consumida no formato mais familiar para o público-alvo.

**Acceptance Criteria:**
1. Componente `<TikTokFeedSimulator>` em `src/components/simulators/TikTokFeedSimulator.tsx`
2. Header: ícone de cadeado 🔒, "@code.system", "• privado" em vermelho
3. Scroll vertical com `scroll-snap-type: y mandatory` e cada vídeo com `scroll-snap-align: start`
4. Componente `<VideoCard>` com props `videoSrc: string`, `title: string`, `description: string`, `likeCount: number`, `isActive: boolean`
5. Vídeo autoplay muted quando `isActive === true`; pause quando fora do viewport
6. Overlay inferior: ícone de like ❤ com contador animado, ícone de comentário 🗨, ícone de share ↗
7. Username "@code.system" e descrição do vídeo no overlay inferior
8. Barra de progresso verde no topo (progresso do vídeo ativo)
9. 4 VideoCards com conteúdo conforme briefing (placeholders de vídeo aceitáveis no MVP)
10. Intersection Observer detecta qual vídeo está visível e atualiza `isActive`

---

#### Story 5.2 — Price Reveal & Stage 4 CTA

**Como** usuário,
**Quero** que o quarto vídeo revele o preço com efeito dramático e um CTA claro,
**Para que** a decisão de testar seja tomada em estado emocional positivo.

**Acceptance Criteria:**
1. `<VideoCard>` do quarto vídeo tem overlay especial após fim do vídeo (ou após 80% de progresso)
2. Price reveal: texto "R$89,90/mês" aparece com efeito glitch (Framer Motion keyframes de deslocamento rápido seguido de estabilização)
3. Sub-texto: "Sem fidelidade. Cancele quando quiser." em branco opacity 80%
4. CTA button: "TESTAR AGORA →" com background verde hacker, texto preto, `rounded-full`
5. Animação pulse no botão após price reveal
6. Ao pressionar CTA: transição fade para Stage 5
7. Like counter incrementa automaticamente de forma aleatória durante reprodução do vídeo (simulado)

---

### Epic 6 — Stage 5: SALES PAGE

**Objetivo:** Implementar a sales page completa que consolida a decisão de compra. O usuário chegou emocionalmente preparado pela narrativa — a página deve confirmar a decisão com prova social, remover objeções e facilitar o checkout.

---

#### Story 6.1 — Sales Page: Hero, Problema e Solução

**Como** usuário,
**Quero** ver a proposta de valor do Conectagram apresentada de forma clara e impactante,
**Para que** minha decisão de compra seja confirmada racionalmente.

**Acceptance Criteria:**
1. Componente `<Stage5SalesPage>` em `src/stages/Stage5SalesPage/index.tsx`
2. **Seção Hero:** Headline principal ("O algoritmo não quer que você saiba disso."), subheadline (1 linha sobre Conectagram), CTA acima da dobra ("Ativar Conectagram" → link checkout), badge "Tecnologia usada por +X criadores"
3. **Seção Problema:** Texto empático sobre invisibilidade no Instagram, lista de "sinais que você enfrenta" com ícones, estatística de crescimento bloqueado
4. **Seção O Sistema (Antagonista):** Explicação de como o algoritmo funciona, visual de diagrama simples (CSS/SVG), frase: "O sistema foi construído para esconder quem tenta crescer sozinho."
5. **Seção A Solução:** "O que é o Conectagram" (1 parágrafo), "Como funciona" (3 passos com ícones: 1. Conecta sua conta → 2. Configura público-alvo → 3. O sistema trabalha 24h), animação de fluxo (Framer Motion fade-in ao scroll)
6. Scroll reveal: seções entram com fade-up ao entrar no viewport (Framer Motion InView)

---

#### Story 6.2 — Sales Page: Prova Social, Oferta, FAQ e CTA Final

**Como** usuário,
**Quero** ver prova social, entender a oferta claramente e ter minhas dúvidas respondidas,
**Para que** as últimas objeções sejam removidas e eu clique no checkout com confiança.

**Acceptance Criteria:**
1. **Seção Prova Social:** Mínimo 3 cards de depoimento com avatar (placeholder), nome, nicho, e resultado ("Ganhei 2.300 seguidores no primeiro mês"), seção de números ("Mais de X seguidores gerados" — placeholders)
2. **Seção Oferta:** Preço R$89,90/mês em destaque com efeito de "risco" no preço original (se houver), "Sem fidelidade — cancele quando quiser", lista de benefícios incluídos, CTA secundário
3. **Seção FAQ:** Mínimo 5 perguntas em accordion (expand/collapse com Framer Motion): "É seguro para minha conta?", "Quanto tempo para ver resultado?", "Funciona para qualquer nicho?", "Como funciono com o Conectagram?", "Como cancelo?", "Tem garantia?"
4. **CTA Final:** Botão grande "Ativar Conectagram" com cor verde hacker, efeito glow, `onClick` abre `VITE_CHECKOUT_URL` em nova aba
5. Texto de urgência opcional abaixo do CTA: "Vagas limitadas por servidor" (configurável como toggle em env var)
6. Footer mínimo: "© 2026 Conectagram. Todos os direitos reservados." + links para Termos e Privacidade (URLs configuráveis)

---

### Epic 7 — Polish, Testes & Deploy

**Objetivo:** Otimizar performance, validar a experiência em dispositivos reais, integrar analytics e fazer deploy em produção via Vercel. Ao final deste epic, o funil está em produção pronto para receber tráfego.

---

#### Story 7.1 — Performance & Asset Optimization

**Como** produto,
**Quero** que a experiência carregue rápido e rode suavemente em devices mid-range,
**Para que** nenhum usuário abandone por lentidão técnica.

**Acceptance Criteria:**
1. Bundle inicial (Stage 1 assets) ≤ 500KB gzipped (auditar com `vite-bundle-visualizer`)
2. Lazy loading implementado: cada stage é importado dinamicamente (`React.lazy` + `Suspense`)
3. Preload do próximo stage: quando Stage N é exibido, os assets do Stage N+1 são pré-carregados
4. Arquivos de áudio convertidos para MP3 128kbps e OGG como fallback (Howler.js suporta ambos)
5. Imagens (avatares, prova social) convertidas para WebP com fallback JPEG
6. Lighthouse score em mobile: Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 90
7. Teste manual em iPhone SE (2020) Safari — animações 60fps, sem travamentos

---

#### Story 7.2 — Analytics & Deploy

**Como** produto,
**Quero** ter analytics de funil ativo e a aplicação deployada em produção,
**Para que** possamos medir conversão e otimizar com dados reais.

**Acceptance Criteria:**
1. Google Tag Manager snippet injetado via `vite-plugin-html` usando `VITE_GTM_ID`
2. Eventos customizados disparados: `stage_start` (com `stage_number`), `stage_complete` (com `stage_number`), `audio_play` (com `audio_id`), `cta_click` (com `stage_number`)
3. Hook `useAnalytics()` em `src/hooks/useAnalytics.ts` abstraindo `window.dataLayer.push()`
4. Arquivo `vercel.json` configurado com headers de cache para assets estáticos
5. Deploy realizado via `vercel --prod` com variáveis de ambiente configuradas no dashboard Vercel
6. URL de produção testada em iOS Safari e Android Chrome — fluxo completo Stage 1→5 funcional
7. `README.md` atualizado com instruções de setup, variáveis de ambiente e deploy

---

## 7. Checklist Results Report

*A ser preenchido após execução do PM Checklist.*

**Status pré-checklist:**
- ✅ Goals alinhados com brief
- ✅ Todos os FRs mapeados para stories
- ✅ Todos os NFRs têm critérios mensuráveis
- ✅ Epics são logicamente sequenciais
- ✅ Cada story é completável em sessão única de dev
- ✅ Technical assumptions cobrem todo o stack
- ✅ Sem dependências externas não documentadas

---

## 8. Next Steps

### Prompt para UX Expert
PRD do PROJECT INVISIBLE pronto em `docs/prd.md`. Criar especificação frontend completa (`front-end-spec.md`) usando `front-end-spec-tmpl`. Foco em: sistema de componentes completo por stage, especificações de animação Framer Motion, audio UX pattern, design tokens, e responsividade mobile. O design é dark UI cinematográfico — cada stage simula uma interface nativa diferente (iOS call, WhatsApp, TikTok, Sales Page).

### Prompt para Architect
PRD e front-end-spec disponíveis. Criar arquitetura frontend completa (`front-end-architecture.md`) usando `front-end-architecture-tmpl`. Stack definida: Vite + React 19 + TypeScript + Tailwind + Framer Motion + Howler.js + Zustand. Foco especial em: estrutura de componentes, stage lazy loading strategy, audio engine architecture, mobile performance patterns, e deployment pipeline Vercel.

---

*— Morgan, planejando o futuro 📊*
