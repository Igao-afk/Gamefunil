import { motion, AnimatePresence } from 'framer-motion'
import type { VideoComment } from '../../types/funnel'

interface CommentsSheetProps {
  isOpen: boolean
  comments: VideoComment[]
  totalCount: number
  onClose: () => void
}

const formatLikes = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

const CommentsSheet = ({ isOpen, comments, totalCount, onClose }: CommentsSheetProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Sheet */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-2xl bg-[#1C1C1C]"
          style={{ maxHeight: '72%' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="h-[4px] w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold text-white">
              {totalCount.toLocaleString('pt-BR')} comentários
            </span>
            <button
              onClick={onClose}
              aria-label="Fechar comentários"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" />
                <line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          </div>

          <div className="h-px bg-white/8" />

          {/* Lista de comentários */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="flex flex-col gap-5">
              {comments.map((comment, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  {/* Avatar */}
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-black"
                    style={{ backgroundColor: comment.avatarColor }}
                  >
                    {comment.username.replace('@', '').charAt(0).toUpperCase()}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <span className="text-[12px] font-semibold text-white/70">
                      {comment.username}
                    </span>
                    <p className="mt-0.5 text-[13px] leading-snug text-white">{comment.text}</p>
                    <div className="mt-1.5 flex items-center gap-4">
                      <span className="text-[11px] text-white/30">agora</span>
                      <button className="text-[11px] font-semibold text-white/40">Responder</button>
                    </div>
                  </div>

                  {/* Like */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-[10px] text-white/30">{formatLikes(comment.likes)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Input simulado */}
          <div className="border-t border-white/8 px-4 py-3">
            <div className="flex items-center gap-3 rounded-full bg-white/8 px-4 py-2.5">
              <div className="h-6 w-6 flex-shrink-0 rounded-full bg-hacker-green/40" />
              <span className="text-[13px] text-white/30">Adicionar comentário...</span>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default CommentsSheet
