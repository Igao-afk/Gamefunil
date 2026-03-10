# Epic 4 — Stage 3: ENCRYPTED WHATSAPP

**Referência PRD:** `docs/prd.md` → Epic 4
**Status:** Pendente
**Depende de:** Epic 3 completo

## Objetivo
Chat WhatsApp simulado com message queue cronometrada, 3 audio messages e reveal das credenciais TikTok.
**Emoção alvo:** Intimidade + Exclusividade

---

## Story 4.1 — WhatsApp UI Simulator

**Como** usuário,
**Quero** ver uma interface WhatsApp iPhone dark realística,
**Para que** a sensação de comunicação privada seja estabelecida.

**Acceptance Criteria:**
1. Componente `<WhatsAppSimulator>` com header: foto de perfil, "DarkGirl", "Online"
2. Background dark (adaptado do padrão WhatsApp)
3. Mensagens recebidas: bolhas `#1F2C34`, lado esquerdo, border-radius `0 12px 12px 12px`
4. Indicador "Digitando..." com três pontos animados (Framer Motion)
5. Timestamps e double checkmark verde em cada mensagem
6. Scroll automático para última mensagem

---

## Story 4.2 — Message Queue & Audio Messages

**Como** usuário,
**Quero** receber mensagens com delay realístico e ouvir mensagens de voz,
**Para que** a experiência de conversa íntima e reveladora se complete.

**Acceptance Criteria:**
1. Hook `useMessageQueue` com fila de mensagens e delays individuais
2. "Digitando..." 1.5s antes de cada mensagem de texto
3. Mensagens: "Conexão iniciada.", "Ativando criptografia.", "Estamos seguros agora."
4. `<AudioMessageBubble>`: ícone play/pause, waveform SVG animada (verde), duração
5. 3 mensagens de voz (placeholders aceitáveis no MVP)
6. `<CredentialsCard>`: borda verde pulsando, `user: code_access`, `pass: C0NNECT`, Space Mono
7. Botão "ACESSAR TIKTOK SECRETO" com glow verde → Stage 4
