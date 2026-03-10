# Project Brief: PROJECT INVISIBLE — Funil Cinemático Conectagram

**Versão:** 1.0
**Data:** 2026-03-05
**Autor:** Atlas (Analyst) — Synkra AIOS
**Status:** Aprovado para PRD

---

## Resumo Executivo

O **PROJECT INVISIBLE** é uma experiência interativa cinemática projetada para vender o produto **Conectagram** — um sistema de automação de interações estratégicas no Instagram para geração de crescimento orgânico previsível.

A experiência é estruturada como um funil de 5 estágios imersivos que simulam aplicativos nativos (ligação telefônica, WhatsApp, TikTok) para conduzir o usuário por uma jornada narrativa de "descoberta de tecnologia proibida", nunca revelando que está dentro de um funil de vendas.

**Proposta de valor central:** O usuário deve sentir que descobriu um segredo — não que foi vendido algo.

---

## Declaração do Problema

### Problema do Produto (Conectagram)
Criadores de conteúdo e profissionais do Instagram postam diariamente, estudam estratégias, compram cursos — e continuam invisíveis. O algoritmo favorece interações humanas estratégicas, não apenas conteúdo. Estratégias convencionais (hashtags, trends, reels) não geram o sinal certo para o algoritmo.

**Conectagram** resolve isso automatizando interações estratégicas com pessoas reais, gerando:
- Seguidores reais
- Engajamento orgânico
- Crescimento previsível

### Problema do Funil (Marketing)
Funnels de venda tradicionais são reconhecidos e ignorados pelo público digital atual. O usuário moderno tem alta resistência a marketing explícito. A solução é criar uma experiência que **nunca pareça um funil** — mas que execute perfeitamente a jornada de consciência → decisão.

---

## Solução Proposta

Um **funil cinemático narrativo** com 5 estágios imersivos:

| Estágio | Experiência | Emoção Alvo |
|---------|-------------|-------------|
| 1 — CODE INTERCEPTION | Simulação de ligação iPhone de um hacker | Choque + Curiosidade + Urgência |
| 2 — DARKGIRL CALL | Ligação de personagem analítica e calma | Lógica + Confiança |
| 3 — ENCRYPTED WHATSAPP | Chat WhatsApp simulado com áudios | Intimidade + Exclusividade |
| 4 — SECRET TIKTOK | Feed TikTok privado simulado | Prova + Desejo |
| 5 — SALES PAGE | Página de vendas de consolidação | Decisão |

**Personagens narrativos:**
- **CODE** — Hacker sob ameaça. Introduz o problema. Cria urgência.
- **DARKGIRL** — Analista estratégica. Explica a lógica. Constrói confiança.
- **O SISTEMA** — Antagonista. Representa algoritmos, gurus, estratégias obsoletas.

---

## Usuários-Alvo

### Segmento Primário: Criadores de Conteúdo Profissionais
- **Perfil:** Criadores, freelancers, empreendedores digitais com 1k–50k seguidores
- **Comportamento atual:** Postam consistentemente, seguem tendências, sem resultado proporcional
- **Dor principal:** "Faço tudo certo e continuo invisível"
- **Objetivo:** Crescimento orgânico previsível sem depender de anúncios pagos

### Segmento Secundário: Pequenas Empresas e Profissionais Liberais
- **Perfil:** Negócios locais, profissionais de serviços usando Instagram como canal principal
- **Comportamento atual:** Contratam social media, investem em conteúdo, ROI baixo
- **Dor principal:** Instagram como canal de aquisição não converte de forma previsível
- **Objetivo:** Audiência qualificada que compra

---

## Objetivos e Métricas de Sucesso

### Objetivos de Negócio
- Taxa de conversão funil completo (Stage 1 → Checkout): meta ≥ 3%
- Taxa de conclusão Stage 1→2: meta ≥ 70%
- Taxa de conclusão Stage 2→3: meta ≥ 60%
- Taxa de conclusão Stage 3→4: meta ≥ 55%
- Taxa de conclusão Stage 4→5 (Sales Page): meta ≥ 50%
- MRR gerado via funil: meta definida pelo produto

### Métricas de Experiência do Usuário
- Tempo médio no Stage 1: 90–120 segundos (indica engajamento com narrativa)
- Taxa de reprodução dos áudios no Stage 3: ≥ 85%
- Taxa de scroll completo no Stage 4: ≥ 70%
- NPS da experiência (pesquisa pós-compra): ≥ 8

### KPIs
- **Funil Completion Rate:** % usuários que chegam ao checkout
- **Stage Drop-off Rate:** % abandono por estágio (diagnosticar gargalos)
- **Audio Play Rate (Stage 3):** engajamento com conteúdo de profundidade
- **CTA Click Rate (Stage 4 e 5):** intenção de compra

---

## Escopo MVP

### Funcionalidades Core (Must Have)
- **Stage 1 — CODE INTERCEPTION:** Simulação completa de ligação iPhone com diálogo animado (typewriter), sistema de áudio (teclado + sirenes + tiros), animação de chamada encerrada, reveal do número
- **Stage 2 — DARKGIRL CALL:** Ligação com UI diferenciada, diálogo, efeito de glitch/interferência crescente, transição para WhatsApp
- **Stage 3 — ENCRYPTED WHATSAPP:** Chat simulado com delay realístico entre mensagens, 3 mensagens de voz simuladas (com player visual), reveal de credenciais TikTok
- **Stage 4 — SECRET TIKTOK:** Feed vertical simulado com 4 vídeos, scroll snap, price reveal animado, CTA
- **Stage 5 — SALES PAGE:** Página completa com todas as seções (headline, problema, solução, como funciona, prova social, oferta, FAQ, CTA → checkout)
- **Stage Router:** Máquina de estados gerenciando progressão linear entre estágios
- **Audio Engine:** Sistema de áudio com trigger points por timeline de diálogo
- **Mobile Frame:** Wrapper simulando iPhone (390px), status bar

### Fora do Escopo MVP
- Backend / API própria
- Autenticação real de usuários
- CMS para edição de conteúdo
- A/B testing nativo
- Analytics avançado (usar GTM/pixel externo)
- Versão desktop completa (apenas mobile-first responsivo)
- Integração real com checkout (link externo)

### Critérios de Sucesso do MVP
O MVP está concluído quando todos os 5 estágios funcionam de ponta a ponta em dispositivos iOS/Android (Safari, Chrome mobile), com sistema de áudio funcionando, transições fluidas, e o CTA do Stage 5 direciona para o checkout externo.

---

## Visão Pós-MVP

### Fase 2
- Personalização dinâmica de personagens por nicho (ex: versão para coaches, e-commerce)
- Sistema de A/B testing nativo entre variações de diálogo
- Dashboard de analytics próprio (funil completion por estágio)
- Vídeos reais nos stages 1–2 (substituir animação por vídeo)
- Stage adicional: "Comunidade Secreta" (Discord/Telegram simulado)

### Visão de Longo Prazo (12–24 meses)
- Plataforma white-label para outros produtos venderem via funil cinemático
- Sistema de variações de personagens (banco de personas)
- Integração com CRMs (HubSpot, ActiveCampaign) via webhook
- Mobile app nativo (PWA ou React Native)

### Oportunidades de Expansão
- Funis temáticos para outros mercados (finanças, saúde, educação)
- Versionamento internacional (EN, ES)
- Marketplace de "experiências de funil"

---

## Considerações Técnicas

### Plataforma
- **Target:** Mobile-first web application (390px base)
- **Suporte:** iOS Safari 15+, Android Chrome 90+, outros mobile browsers
- **Performance:** LCP < 2.5s, FID < 100ms, CLS < 0.1

### Preferências Tecnológicas
- **Frontend:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS + CSS Custom Properties (dark theme)
- **Animação:** Framer Motion (transições cinemáticas + micro-interactions)
- **Áudio:** Howler.js (abstração Web Audio API)
- **Estado:** Zustand (máquina de estados do funil)
- **Deploy:** Vercel (CDN global, previews automáticos)

### Considerações de Arquitetura
- **Repositório:** Monorepo simples (projeto único)
- **Arquitetura:** SPA (Single Page Application) com stage routing interno
- **Assets:** Áudios e fontes servidos via CDN (Cloudflare / Vercel)
- **Integração:** Link externo para checkout (Hotmart / Kiwify / nativo)
- **Analytics:** Google Tag Manager + Meta Pixel (injeção no HTML)
- **SEO:** Meta tags OG para compartilhamento, sem indexação (noindex — funil privado)

---

## Restrições e Premissas

### Restrições
- **Budget:** Projeto de baixo custo operacional (sem backend próprio no MVP)
- **Timeline:** MVP em 3–4 sprints de desenvolvimento
- **Recursos:** Time pequeno (1–2 devs frontend)
- **Técnica:** Sem autoplay de áudio em iOS sem interação prévia do usuário (Web Audio API constraint) — resolver com "tap to start" no primeiro estágio

### Premissas-Chave
- O tráfego chegará já segmentado (público que conhece Instagram marketing)
- O usuário está em dispositivo mobile no momento da experiência
- Os vídeos do Stage 4 serão assets estáticos (não streaming externo) no MVP
- O checkout é externo (Hotmart/Kiwify) — funil termina no CTA do Stage 5
- Os textos dos diálogos são finais e aprovados pelo cliente

---

## Riscos e Questões em Aberto

### Riscos
- **Autoplay de áudio (iOS):** Plataformas mobile bloqueiam autoplay sem interação. **Mitigação:** "Tap to start" + animação convidativa antes do Stage 1
- **Tempo de carregamento:** Assets de áudio podem tornar o carregamento lento. **Mitigação:** Lazy loading por estágio + preload do próximo
- **Saturação da narrativa:** Usuário pode abandonar por diálogos longos. **Mitigação:** Opção de "acelerar" (skip typewriter) mantendo imersão
- **Percepção de funil:** Se o design for descuidado, quebra a ilusão. **Mitigação:** Fidelidade máxima às UIs simuladas (iOS, WhatsApp, TikTok)

### Questões em Aberto
- Quais são os vídeos reais do Stage 4? (precisam ser gravados/produzidos)
- Os áudios do Stage 3 serão gravados ou sintetizados (TTS)?
- Existe um sistema de checkout definido? (Hotmart, Kiwify, Stripe?)
- Há prova social real disponível para o Stage 5? (screenshots, depoimentos)
- O preço R$89,90/mês é definitivo?

### Áreas para Pesquisa Adicional
- Benchmarks de conversão de funnels cinemáticos similares
- Melhores práticas de Web Audio API para iOS
- Otimização de Framer Motion para dispositivos low-end Android

---

## Apêndices

### A. Sumário de Pesquisa
**Problema validado:** Criadores com conteúdo de qualidade enfrentam stagnação de crescimento no Instagram devido à natureza do algoritmo que prioriza interações humanas sobre apenas publicações. Estratégia de automação de interações é um espaço crescente e pouco explorado no Brasil.

**Referências de experiência:**
- Black Mirror: Bandersnatch (interatividade narrativa)
- ARGs (Alternate Reality Games) como referência de imersão
- Funnels de alto ticket com múltiplos pontos de contato

### B. Próximos Passos

1. Aprovação deste brief → handoff para PM (Morgan)
2. Criação do PRD completo com stories detalhadas
3. Criação da Especificação Frontend (UX Expert)
4. Arquitetura técnica Frontend (Architect)
5. Validação PO + Sharding
6. Início do ciclo de desenvolvimento por stories

---

*Este Project Brief fornece o contexto completo para o PROJECT INVISIBLE. Iniciar em modo PRD Generation, revisando este brief para criar o PRD seção a seção.*

— Atlas, investigando a verdade 🔎
