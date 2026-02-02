'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useAudio } from './AudioProvider'

// Subtle organic squiggle (default) - imperfect
const squigglePath = "M2 13 C 8 10, 14 8, 22 11 C 30 14, 38 16, 48 13 C 56 10, 62 8, 72 12 C 80 15, 88 14, 96 11 C 104 8, 112 10, 118 13"

// Organic wave (on hover) - imperfect, natural looking
const wavePath = "M2 14 C 9 4, 16 3, 24 10 C 32 18, 38 21, 48 14 C 56 6, 64 4, 74 11 C 82 19, 90 20, 100 13 C 108 7, 114 8, 118 11"

export default function Wave({ className = '' }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const { isPlaying, toggleSound } = useAudio()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <motion.svg
          viewBox="0 0 120 24"
          fill="none"
          className="w-28 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleSound}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -2, 0.5, -1, 0],
                  x: [0, 1, 0, -0.5, 0],
                }
          }
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          role="button"
          aria-label={isPlaying ? 'Pause ocean sounds' : 'Play ocean sounds'}
        >
          <motion.path
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: isHovered ? wavePath : squigglePath,
              stroke: isHovered || isPlaying ? '#3b82f6' : 'currentColor',
            }}
            transition={{
              d: { duration: 0.4, ease: 'easeOut' },
              stroke: { duration: 0.2 },
            }}
            className="text-muted"
          />
        </motion.svg>

        {/* Doodle arrow with click me */}
        {!isPlaying && (
          <motion.div
            className="flex items-center gap-1 text-muted/60"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 -rotate-[135deg]"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12c0-4 3-7 7-7M12 5l-2-2M12 5l2-2" />
            </svg>
            <span className="text-[10px] italic">click me</span>
          </motion.div>
        )}
      </div>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 text-xs text-blue-500"
        >
          <span>♪</span>
          <span className="italic text-muted">what reminds me of home</span>
        </motion.div>
      )}
    </div>
  )
}
