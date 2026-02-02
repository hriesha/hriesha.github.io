'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 6 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

const reducedVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()
  const activeVariants = shouldReduceMotion ? reducedVariants : variants

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={activeVariants}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
