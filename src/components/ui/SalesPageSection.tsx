import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SalesPageSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

// Wrapper com scroll reveal: fade-up ao entrar no viewport
const SalesPageSection = ({ children, className = '', delay = 0 }: SalesPageSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default SalesPageSection
