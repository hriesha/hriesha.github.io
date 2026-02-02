'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import clsx from 'clsx'

const photos: string[] = [
  '/photos/IMG_8951.jpeg',
  '/photos/IMG_8033.jpeg',
  '/photos/IMG_7983.jpeg',
]

export default function FloatingPhotoPane() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openImage, setOpenImage] = useState<string | null>(null)

  const isHovered = hoveredIndex !== null

  // Triple the photos for seamless infinite loop
  const tripleItems = [...photos, ...photos, ...photos]

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .carousel {
          animation: scroll 28s linear infinite;
        }
        .carousel.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative mt-12 -mx-6 md:-mx-8 overflow-hidden">
        <div className={`carousel flex gap-6 ${isHovered ? 'paused' : ''}`}>
          {tripleItems.map((src, i) => (
            <motion.div
              key={i}
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
        </div>
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
    </>
  )
}
