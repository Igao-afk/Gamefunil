# Epic 2 — Stage 1: CODE INTERCEPTION

**Referência PRD:** `docs/prd.md` → Epic 2
**Status:** Pendente
**Depende de:** Epic 1 completo

## Objetivo
Simulação completa da ligação do hacker CODE: interface iOS realística, typewriter dialogue, sistema de áudio com trigger points, animação de "chamada encerrada" e reveal do número para Stage 2.

**Emoção alvo:** Choque + Curiosidade + Urgência

---

## Story 2.1 — iPhone Call UI Component

**Como** usuário,
**Quero** ver uma interface de ligação iPhone realística,
**Para que** a ilusão de estar recebendo uma chamada real seja mantida.

**Acceptance Criteria:**
1. Componente `<IPhoneCallScreen>` com props: `callerName`, `callerNumber`, `callStatus`, `variant`
2. Status bar iOS simulada: hora 09:41, ícones sinal/WiFi/bateria
3. Avatar circular 80px, nome `text-3xl font-semibold`, número `text-sm text-secondary`
4. Status: "Chamada recebida" / "Chamada ativa" / "Chamada encerrada"
5. Contador de tempo ativo quando `callStatus === 'active'`
6. Botões visuais: ✕ Desligar (vermelho) e 🔇 Mudo (cinza)
7. Animação de ondas de voz verdes (3 ondas pulsando) quando ativa

---

## Story 2.2 — Typewriter Dialogue Engine

**Como** sistema,
**Quero** um engine typewriter que renderize diálogos linha a linha com timing,
**Para que** os textos apareçam dramaticamente durante as chamadas.

**Acceptance Criteria:**
1. Hook `useTypewriter` em `src/hooks/useTypewriter.ts`
2. Parâmetros: `lines: DialogueLine[]`, `onLineComplete?`, `onComplete?`
3. Tipo `DialogueLine`: `{ text, delay, speed?, audioTrigger? }`
4. Speed padrão: 40ms/char. Delay: pausa antes da linha
5. `audioTrigger`: ID de som disparado quando a linha inicia
6. Retorna: `displayedLines`, `isComplete`, `currentLineIndex`
7. Testes unitários com `vi.useFakeTimers()`

---

## Story 2.3 — Stage 1 Completo

**Como** usuário,
**Quero** vivenciar o Stage 1 completo com diálogo, sons e animação final,
**Para que** eu entre no estado psicológico de choque e curiosidade.

**Acceptance Criteria:**
1. Componente `<Stage1CodeInterception>` em `src/stages/Stage1CodeInterception/`
2. Diálogo completo do CODE em `dialogue.ts` com timing e audioTriggers
3. Áudio: teclado mecânico (loop desde início), sirenes (fade in ~45s), passos (~1:10), tiros (~1:20)
4. "CHAMADA ENCERRADA": fullscreen preto + texto branco (Framer Motion)
5. Número revela após 1.5s com fade + scale animation
6. Botão "LIGAR" → avança para Stage 2
7. Todos os sons param ao sair do Stage 1
