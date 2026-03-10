import { motion } from 'framer-motion'
import TikTokFeedSimulator from '../../components/simulators/TikTokFeedSimulator'
import { useFunnelStore } from '../../store/funnelStore'
import { useAudio } from '../../hooks/useAudio'
import type { VideoConfig } from '../../types/funnel'

// Configuração dos 4 vídeos — src aponta para placeholders em /videos/
// Substitua pelos vídeos reais de prova social do Conectagram
const VIDEOS: VideoConfig[] = [
  {
    src: '/videos/proof-1.mp4',
    title: 'De 340 para 12k seguidores em 21 dias',
    description: 'Sem comprar seguidores. Sem bot. Só o método.',
    initialLikeCount: 8743,
  },
  {
    src: '/videos/proof-2.mp4',
    title: 'Como o algoritmo funciona de verdade',
    description: 'O que eles não te contam nas aulas de marketing.',
    initialLikeCount: 14201,
  },
  {
    src: '/videos/proof-3.mp4',
    title: 'Perfil nicho saúde: +4.800 em 2 semanas',
    description: 'Resultados reais. Print do painel mostrado ao vivo.',
    initialLikeCount: 6382,
  },
  {
    src: '/videos/proof-4.mp4',
    title: 'Acesso ao sistema completo',
    description: 'Veja o painel e todas as funcionalidades.',
    initialLikeCount: 21056,
  },
]

const Stage4TikTok = () => {
  const advanceStage = useFunnelStore((s) => s.advanceStage)
  const { stopAll } = useAudio()

  const handleCTA = () => {
    stopAll()
    advanceStage()
  }

  return (
    <motion.div
      className="relative h-full w-full bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TikTokFeedSimulator videos={VIDEOS} onCTAClick={handleCTA} />
    </motion.div>
  )
}

export default Stage4TikTok
