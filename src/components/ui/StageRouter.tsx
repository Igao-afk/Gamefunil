import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFunnelStore } from '../../store/funnelStore'
import { useAnalytics } from '../../hooks/useAnalytics'

// Lazy loading por stage — cada chunk é independente
const TapToStart = lazy(() => import('../../stages/TapToStart'))
const Stage1 = lazy(() => import('../../stages/Stage1CodeInterception'))
const Stage2 = lazy(() => import('../../stages/Stage2DarkgirlCall'))
const Stage3 = lazy(() => import('../../stages/Stage3WhatsApp'))
const Stage4 = lazy(() => import('../../stages/Stage4TikTok'))
const Stage5 = lazy(() => import('../../stages/Stage5SalesPage'))

const STAGE_MAP = {
  0: TapToStart,
  1: Stage1,
  2: Stage2,
  3: Stage3,
  4: Stage4,
  5: Stage5,
} as const

// Importações para preload — chamadas antecipadamente para aquecer o chunk
const PRELOAD_MAP: Record<number, () => Promise<unknown>> = {
  0: () => import('../../stages/Stage1CodeInterception'),
  1: () => import('../../stages/Stage2DarkgirlCall'),
  2: () => import('../../stages/Stage3WhatsApp'),
  3: () => import('../../stages/Stage4TikTok'),
  4: () => import('../../stages/Stage5SalesPage'),
}

const StageRouter = () => {
  const currentStage = useFunnelStore((s) => s.currentStage)
  const CurrentStage = STAGE_MAP[currentStage]
  const { trackStageStart } = useAnalytics()

  // Preload do próximo stage enquanto o atual é exibido
  useEffect(() => {
    const preload = PRELOAD_MAP[currentStage]
    if (preload) {
      // Aguarda 2s para não competir com o carregamento do stage atual
      const id = setTimeout(preload, 2000)
      return () => clearTimeout(id)
    }
  }, [currentStage])

  // Analytics: dispara stage_start ao mudar de stage
  useEffect(() => {
    if (currentStage > 0) trackStageStart(currentStage)
  }, [currentStage, trackStageStart])

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-black">
          <div className="h-1 w-32 overflow-hidden rounded bg-surface">
            <motion.div
              className="h-full bg-hacker-green"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <CurrentStage key={currentStage} />
      </AnimatePresence>
    </Suspense>
  )
}

export default StageRouter
