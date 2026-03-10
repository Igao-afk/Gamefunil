# Epic 5 — Stage 4: SECRET TIKTOK

**Referência PRD:** `docs/prd.md` → Epic 5
**Status:** Pendente
**Depende de:** Epic 4 completo

## Objetivo
Feed TikTok vertical simulado com 4 vídeos, scroll snap e price reveal dramático.
**Emoção alvo:** Prova + Desejo

---

## Story 5.1 — TikTok Feed UI & VideoCard

**Como** usuário,
**Quero** ver um feed TikTok vertical com comportamento nativo,
**Para que** a prova em vídeo seja consumida no formato mais familiar.

**Acceptance Criteria:**
1. `<TikTokFeedSimulator>` com header: 🔒 @code.system, "• privado"
2. `scroll-snap-type: y mandatory`, cada vídeo `height: 100vh; scroll-snap-align: start`
3. `<VideoCard>`: `videoSrc`, `title`, `description`, `likeCount`, `isActive`
4. Autoplay muted quando `isActive === true`; pause fora do viewport
5. Overlay: ❤ com contador, 🗨, ↗, username, descrição
6. Barra de progresso verde no topo
7. 4 VideoCards (placeholders de vídeo aceitáveis)
8. Intersection Observer detecta vídeo ativo

---

## Story 5.2 — Price Reveal & Stage 4 CTA

**Como** usuário,
**Quero** que o quarto vídeo revele o preço com efeito dramático e CTA,
**Para que** a decisão seja tomada em estado emocional positivo.

**Acceptance Criteria:**
1. Overlay especial no VideoCard 4 após 80% do vídeo
2. "R$89,90/mês" com efeito glitch (Framer Motion keyframes)
3. Sub-texto: "Sem fidelidade. Cancele quando quiser."
4. CTA "TESTAR AGORA →" verde hacker, rounded-full, com pulse
5. Like counter incrementa aleatoriamente durante reprodução
6. Tap no CTA → fade → Stage 5
