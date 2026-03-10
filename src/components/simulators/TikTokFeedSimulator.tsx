import { useEffect, useRef, useState } from 'react'
import type { VideoConfig } from '../../types/funnel'
import VideoCard from './VideoCard'

interface TikTokFeedSimulatorProps {
  videos: VideoConfig[]
  onCTAClick: () => void
}

const TikTokFeedSimulator = ({ videos, onCTAClick }: TikTokFeedSimulatorProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer detecta vídeo ativo
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) setActiveIndex(index)
          }
        })
      },
      { root: container, threshold: 0.6 },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [videos])

  return (
    <div className="flex h-full w-full flex-col bg-black">
      {/* Header TikTok */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-center gap-2 pt-12 pb-2">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="rgba(0,255,65,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="6" width="10" height="7" rx="1.5" />
          <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
        </svg>
        <span className="font-mono text-xs font-bold tracking-widest text-white">
          @code.system
        </span>
        <span className="font-mono text-[10px] text-white/30">• privado</span>
      </div>

      {/* Feed com scroll snap */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll"
        style={{ scrollSnapType: 'y mandatory', scrollbarWidth: 'none' }}
      >
        {videos.map((video, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el }}
            className="h-full w-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <VideoCard
              {...video}
              isActive={activeIndex === i}
              isLast={i === videos.length - 1}
              onCTAClick={onCTAClick}
            />
          </div>
        ))}
      </div>

      {/* Dots de navegação */}
      <div className="absolute bottom-6 right-3 flex flex-col gap-1.5">
        {videos.map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === activeIndex ? '#00FF41' : 'rgba(255,255,255,0.3)',
              transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default TikTokFeedSimulator
