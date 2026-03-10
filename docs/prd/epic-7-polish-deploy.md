# Epic 7 — Polish, Testes & Deploy

**Referência PRD:** `docs/prd.md` → Epic 7
**Status:** Pendente
**Depende de:** Epics 1–6 completos

## Objetivo
Otimização de performance, testes mobile, analytics e deploy em produção.

---

## Story 7.1 — Performance & Asset Optimization

**Como** produto,
**Quero** carregamento rápido e animações suaves em devices mid-range,
**Para que** nenhum usuário abandone por lentidão técnica.

**Acceptance Criteria:**
1. Bundle Stage 1 ≤ 500KB gzipped (auditado com `vite-bundle-visualizer`)
2. Lazy loading implementado: cada stage é `React.lazy` + `Suspense`
3. Preload do próximo stage enquanto stage atual está ativo
4. Áudio: MP3 128kbps + OGG fallback
5. Imagens: WebP com fallback JPEG
6. Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 90
7. Teste manual iPhone SE (2020) Safari — 60fps

---

## Story 7.2 — Analytics & Deploy

**Como** produto,
**Quero** analytics de funil ativo e aplicação em produção,
**Para que** possamos medir conversão e otimizar.

**Acceptance Criteria:**
1. GTM snippet via `vite-plugin-html` usando `VITE_GTM_ID`
2. Eventos: `stage_start`, `stage_complete`, `audio_play`, `cta_click`
3. Hook `useAnalytics()` abstraindo `window.dataLayer.push()`
4. `vercel.json` com headers de cache corretos
5. Deploy via `vercel --prod` com env vars configuradas
6. URL de produção testada em iOS Safari e Android Chrome
7. `README.md` com instruções de setup e deploy
