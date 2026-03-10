# Epic 3 — Stage 2: DARKGIRL CALL

**Referência PRD:** `docs/prd.md` → Epic 3
**Status:** Pendente
**Depende de:** Epic 2 completo

## Objetivo
Ligação de saída para DarkGirl com glitch overlay crescente e transição para WhatsApp.
**Emoção alvo:** Lógica + Confiança

---

## Story 3.1 — DarkGirl Call Screen & Glitch Overlay

**Como** usuário,
**Quero** ligar para o número recebido e ser atendido pela DarkGirl,
**Para que** a narrativa de descoberta e confiança se aprofunde.

**Acceptance Criteria:**
1. Componente `<Stage2DarkgirlCall>` usando `<IPhoneCallScreen variant="outgoing">`
2. Sequência: tom discagem (3s) → atende → status "ativa"
3. Diálogo da DarkGirl em `dialogue.ts` (speed: 55ms, tom calmo)
4. Componente `<GlitchOverlay>` com prop `intensity: 0–1`
5. Glitch: inicia em 0, cresce progressivamente até 0.4 durante "Estão rastreando"
6. Áudio: estática eletrônica cresce com glitch intensity
7. Última linha: glitch sobe a 1, tela fragmenta
8. Transição: dissolve glitch → slide up → Stage 3 (Framer Motion AnimatePresence)
