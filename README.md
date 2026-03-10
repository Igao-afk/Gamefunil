# PROJECT INVISIBLE — Conectagram

Funil interativo cinematográfico de 5 stages para o produto **Conectagram**.

## Stack

- Vite 6 + React 19 + TypeScript 5 strict
- Tailwind CSS 3.4 + Framer Motion 12
- Howler.js 2.x (áudio)
- Zustand 5 (estado global)
- Vitest + Testing Library (testes)

## Setup local

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Editar .env.local com seus valores:
# VITE_CHECKOUT_URL=https://seu-checkout.com
# VITE_GTM_ID=GTM-XXXXXXX

# Iniciar servidor de desenvolvimento
npm run dev
```

## Comandos

```bash
npm run dev          # Dev server (localhost:5173)
npm run build        # Build de produção
npm run preview      # Preview do build local
npm run test         # Testes unitários (watch)
npm test -- --run    # Testes unitários (CI, sem watch)
npm run lint         # ESLint
npm run type-check   # Verificação TypeScript
```

## Assets necessários

Antes de publicar, adicione os arquivos em `public/`:

### Áudio (`public/audio/`)

| Arquivo | Uso |
|---------|-----|
| `keyboard-loop.mp3` + `.ogg` | Stage 1 — loop teclado mecânico |
| `sirens.mp3` + `.ogg` | Stage 1 — sirenes crescentes |
| `footsteps.mp3` + `.ogg` | Stage 1 — passos |
| `gunshot-1.mp3` + `.ogg` | Stage 1 — tiro |
| `gunshot-2.mp3` + `.ogg` | Stage 1 — tiro 2 |
| `dialing-tone.mp3` + `.ogg` | Stage 2 — tom de discagem |
| `call-connected.mp3` + `.ogg` | Stage 2 — chamada conectada |
| `static-noise.mp3` + `.ogg` | Stage 2 — estática eletrônica |
| `voice-message-1.mp3` + `.ogg` | Stage 3 — voz DarkGirl 1 |
| `voice-message-2.mp3` + `.ogg` | Stage 3 — voz DarkGirl 2 |
| `voice-message-3.mp3` + `.ogg` | Stage 3 — voz DarkGirl 3 |

**Specs:** MP3 128kbps + OGG fallback. Máx 500KB por arquivo.

### Vídeos (`public/videos/`)

| Arquivo | Uso |
|---------|-----|
| `proof-1.mp4` | Stage 4 — prova de crescimento 1 |
| `proof-2.mp4` | Stage 4 — prova de crescimento 2 |
| `proof-3.mp4` | Stage 4 — prova de crescimento 3 |
| `proof-4.mp4` | Stage 4 — prova de crescimento 4 |

**Specs:** MP4 H.264, 720p, vertical 9:16, máx 10MB por arquivo.

## Deploy (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy de produção
vercel --prod

# Configurar variáveis de ambiente no dashboard:
# https://vercel.com/seu-projeto/settings/environment-variables
# VITE_CHECKOUT_URL, VITE_GTM_ID
```

O arquivo `vercel.json` já está configurado com:
- Cache imutável para assets (1 ano)
- Cache de 7 dias para áudio e vídeo
- Headers de segurança (X-Frame-Options, CSP básico)
- SPA rewrite (`/*` → `index.html`)

## Analytics

Eventos disparados automaticamente via GTM + `useAnalytics`:

| Evento | Quando |
|--------|--------|
| `stage_start` | Usuário entra em cada stage |
| `stage_complete` | Stage concluído |
| `audio_play` | Som reproduzido |
| `cta_click` | Botão de CTA clicado |

## Estrutura

```
src/
├── stages/           # Um diretório por stage
│   ├── TapToStart/
│   ├── Stage1CodeInterception/
│   ├── Stage2DarkgirlCall/
│   ├── Stage3WhatsApp/
│   ├── Stage4TikTok/
│   └── Stage5SalesPage/
├── components/
│   ├── ui/           # Componentes genéricos
│   └── simulators/   # iPhone, WhatsApp, TikTok
├── hooks/            # useTypewriter, useAudio, useMessageQueue, useAnalytics
├── store/            # Zustand funnelStore
├── utils/            # audioEngine, audioManifest
├── types/            # funnel.ts, audio.ts
└── styles/           # tokens.css, globals.css
```

## Testes

```bash
npm test -- --run
```

34 testes unitários cobrindo:
- `funnelStore` — machine de estados
- `audioEngine` — engine de áudio
- `useTypewriter` — engine de diálogo
- `useMessageQueue` — fila de mensagens WhatsApp
