'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import clsx from 'clsx'

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

export default function HikesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openImage, setOpenImage] = useState<string | null>(null)

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
            onClick={() => setOpenImage(src)}
            animate={
              hoveredIndex === i
                ? { scale: 1.02 }
                : hoveredIndex !== null
                ? { opacity: 0.7 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.2 }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
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
    </div>
  )
}
