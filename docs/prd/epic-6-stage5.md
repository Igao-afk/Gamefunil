# Epic 6 — Stage 5: SALES PAGE

**Referência PRD:** `docs/prd.md` → Epic 6
**Status:** Pendente
**Depende de:** Epic 5 completo

## Objetivo
Sales page completa que consolida a decisão de compra. Remove objeções, apresenta prova social, facilita checkout.
**Emoção alvo:** Decisão + Segurança

---

## Story 6.1 — Hero, Problema e Solução

**Como** usuário,
**Quero** ver a proposta de valor do Conectagram de forma clara e impactante,
**Para que** minha decisão seja confirmada racionalmente.

**Acceptance Criteria:**
1. `<Stage5SalesPage>` em `src/stages/Stage5SalesPage/`
2. **Hero:** Headline "O algoritmo não quer que você saiba disso.", subheadline, CTA acima da dobra
3. **Problema:** Texto empático, lista "sinais que você enfrenta", estatística
4. **O Sistema:** Explicação algoritmo, diagrama CSS/SVG simples, frase do antagonista
5. **A Solução:** O que é o Conectagram, 3 passos com ícones
6. Scroll reveal: fade-up ao entrar no viewport (Framer Motion InView)

---

## Story 6.2 — Prova Social, Oferta, FAQ e CTA Final

**Como** usuário,
**Quero** ver prova social, entender a oferta e ter minhas dúvidas respondidas,
**Para que** as últimas objeções sejam removidas.

**Acceptance Criteria:**
1. **Prova Social:** Mínimo 3 cards de depoimento (placeholders), números de crescimento
2. **Oferta:** R$89,90/mês em destaque, "Sem fidelidade", lista de benefícios
3. **FAQ:** Mínimo 5 perguntas em `<FAQAccordion>` com Framer Motion
4. **CTA Final:** Botão "Ativar Conectagram" verde, glow, `onClick` → `VITE_CHECKOUT_URL` nova aba
5. Footer: "© 2026 Conectagram" + links Termos e Privacidade
