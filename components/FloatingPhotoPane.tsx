'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import clsx from 'clsx'

const photos: string[] = [
  '/photos/heartbeats-showcase.png',
  '/photos/presentation.png',
  '/photos/railroad.png',
  '/photos/driving.png',
]

const AUTO_ADVANCE_MS = 4000

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default function FloatingPhotoPane() {
  const [index, setIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openImage, setOpenImage] = useState<string | null>(null)
  const [manualControl, setManualControl] = useState(false)
  const [step, setStep] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const measureStep = useCallback(() => {
    const slide = trackRef.current?.querySelector('[data-slide]') as HTMLElement | null
    if (!slide) return
    setStep(slide.offsetWidth + 24)
  }, [])

  useEffect(() => {
    measureStep()
    window.addEventListener('resize', measureStep)
    return () => window.removeEventListener('resize', measureStep)
  }, [measureStep])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isHovered = hoveredIndex !== null
  const isPaused = isHovered || manualControl || reduceMotion

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [isPaused])

  useEffect(() => {
    if (!manualControl) return
    const id = setTimeout(() => setManualControl(false), 8000)
    return () => clearTimeout(id)
  }, [manualControl, index])

  const goNext = () => {
    setManualControl(true)
    setIndex((i) => (i + 1) % photos.length)
  }

  const goPrev = () => {
    setManualControl(true)
    setIndex((i) => (i - 1 + photos.length) % photos.length)
  }

  return (
    <>
      <motion.div
        ref={trackRef}
        className="relative mt-12 -mx-6 md:-mx-8"
        initial={false}
      >
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className={clsx(
            'absolute left-2 md:left-4 top-1/2 z-20 -translate-y-1/2',
            'flex h-9 w-9 items-center justify-center rounded-full',
            'bg-background/80 text-muted backdrop-blur-sm',
            'border border-border shadow-sm',
            'transition-colors hover:text-foreground'
          )}
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className={clsx(
            'absolute right-2 md:right-4 top-1/2 z-20 -translate-y-1/2',
            'flex h-9 w-9 items-center justify-center rounded-full',
            'bg-background/80 text-muted backdrop-blur-sm',
            'border border-border shadow-sm',
            'transition-colors hover:text-foreground'
          )}
        >
          <ChevronRight />
        </button>

        <motion.div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: step ? -index * step : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'tween', duration: 0.5, ease: 'easeInOut' }
            }
          >
            {photos.map((src, i) => (
              <motion.div
                key={src}
                data-slide
                className={clsx(
                  'relative flex-shrink-0 h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-xl cursor-pointer',
                  'bg-muted/20',
                  hoveredIndex === i && 'z-10 shadow-2xl'
                )}
                style={{
                  filter: isHovered && hoveredIndex === i ? 'blur(0px)' : isHovered ? 'blur(1px)' : 'blur(2px)',
                  opacity: isHovered ? (hoveredIndex === i ? 0.95 : 0.5) : 0.6,
                  transition: 'filter 0.3s, opacity 0.3s, transform 0.2s',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setOpenImage(src)}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
            onClick={() => setOpenImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={openImage}
              alt=""
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
