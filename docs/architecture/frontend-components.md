# Arquitetura Frontend — Referência de Componentes

**Referência:** `docs/front-end-architecture.md`

## Componentes UI (src/components/ui/)

| Componente | Arquivo | Props Principais | Usado Em |
|------------|---------|-----------------|----------|
| MobileFrame | MobileFrame.tsx | children | App.tsx |
| StatusBarIOS | StatusBarIOS.tsx | — | IPhoneCallScreen |
| CTAButton | CTAButton.tsx | variant, onClick, children | Todos os stages |
| GlitchOverlay | GlitchOverlay.tsx | intensity: 0–1 | Stage2 |
| TypewriterDisplay | TypewriterDisplay.tsx | lines, variant | Stage1, Stage2 |
| PriceReveal | PriceReveal.tsx | price, subtitle | Stage4 |
| SalesPageSection | SalesPageSection.tsx | children | Stage5 seções |
| FAQAccordion | FAQAccordion.tsx | items: {q,a}[] | Stage5 FAQ |
| StageRouter | StageRouter.tsx | — | App.tsx |

## Simulators (src/components/simulators/)

| Componente | Arquivo | Props Principais | Usado Em |
|------------|---------|-----------------|----------|
| IPhoneCallScreen | IPhoneCallScreen.tsx | callerName, callStatus, variant | Stage1, Stage2 |
| WhatsAppSimulator | WhatsAppSimulator.tsx | messages, isTyping | Stage3 |
| AudioMessageBubble | AudioMessageBubble.tsx | audioId, duration | Stage3 |
| CredentialsCard | CredentialsCard.tsx | username, password, onAccess | Stage3 |
| TikTokFeedSimulator | TikTokFeedSimulator.tsx | videos[] | Stage4 |
| VideoCard | VideoCard.tsx | videoSrc, title, likeCount, isActive | Stage4 |

## Hooks (src/hooks/)

| Hook | Arquivo | Retorno |
|------|---------|---------|
| useTypewriter | useTypewriter.ts | displayedLines, isComplete, currentLineIndex |
| useAudio | useAudio.ts | play, stop, fadeIn, fadeOut, stopAll |
| useMessageQueue | useMessageQueue.ts | visibleMessages, isTyping, isComplete |
| useAnalytics | useAnalytics.ts | track(event) |

## Store (src/store/)

| Store | State | Actions |
|-------|-------|---------|
| funnelStore | currentStage, isTransitioning, sessionStarted, audioUnlocked | startSession, advanceStage, setTransitioning, unlockAudio, resetFunnel |
