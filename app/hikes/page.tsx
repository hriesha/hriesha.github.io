'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import HikePhoto from '@/components/HikePhoto'

// Full-size photos live in /hikes; the grid shows the small versions in /hikes/thumbs.
const hikePhotos: string[] = [
  '/hikes/105_0844.jpeg',
  '/hikes/DSC06287.jpeg',
  '/hikes/IMG_0822.jpeg',
  '/hikes/IMG_0843.jpeg',
  '/hikes/IMG_4467.jpeg',
  '/hikes/IMG_6597.jpeg',
  '/hikes/IMG_6598.jpeg',
  '/hikes/IMG_6600.jpeg',
  '/hikes/IMG_6612.jpeg',
  '/hikes/IMG_6616.jpeg',
  '/hikes/IMG_7022.jpeg',
  '/hikes/IMG_7412.jpeg',
]

const thumbOf = (src: string) => src.replace('/hikes/', '/hikes/thumbs/')

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  )
}

export default function HikesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [fullLoaded, setFullLoaded] = useState(false)

  const open = (i: number) => {
    setFullLoaded(false)
    setOpenIndex(i)
  }
  const close = () => setOpenIndex(null)
  const step = (delta: number) => {
    setFullLoaded(false)
    setOpenIndex((i) => (i === null ? i : (i + delta + hikePhotos.length) % hikePhotos.length))
  }

  // Arrow keys move between photos, Escape closes.
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  const openImage = openIndex === null ? null : hikePhotos[openIndex]

  return (
    <div>
      <h1 className="text-lg font-medium">Hikes</h1>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {hikePhotos.map((src, i) => (
          <motion.div
            key={i}
            className={clsx(
              'relative aspect-[4/5] overflow-hidden rounded-lg bg-muted/10 cursor-pointer',
              hoveredIndex === i && 'z-10'
            )}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => open(i)}
            animate={
              hoveredIndex === i
                ? { scale: 1.02 }
                : hoveredIndex !== null
                ? { opacity: 0.7 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.2 }}
          >
            <HikePhoto src={thumbOf(src)} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Lightbox: the small version shows at once, the full photo fades in over it */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white md:left-6"
            >
              <Chevron dir="left" />
            </button>

            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white md:right-6"
            >
              <Chevron dir="right" />
            </button>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
              {(openIndex ?? 0) + 1} / {hikePhotos.length}
            </span>

            <motion.div
              key={openImage}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <img
                src={thumbOf(openImage)}
                alt=""
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
              <img
                src={openImage}
                alt=""
                decoding="async"
                onLoad={() => setFullLoaded(true)}
                className={clsx(
                  'absolute inset-0 h-full w-full rounded-lg object-contain transition-opacity duration-500',
                  fullLoaded ? 'opacity-100' : 'opacity-0'
                )}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
