'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import clsx from 'clsx'

const photos: string[] = [
  '/photos/IMG_8951.jpeg',
  '/photos/IMG_8033.jpeg',
  '/photos/IMG_7983.jpeg',
]

export default function FloatingPhotoPane() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openImage, setOpenImage] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  // Duplicate for seamless loop
  const duplicatedItems = [...photos, ...photos]

  return (
    <>
      <div
        className="relative mt-12 -mx-6 md:-mx-8 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setHoveredIndex(null)
        }}
      >
        <motion.div
          className="flex gap-6"
          animate={
            shouldReduceMotion || isHovered
              ? { x: 0 }
              : { x: ['0%', '-50%'] }
          }
          transition={{
            x: {
              duration: 18,
              ease: 'linear',
              repeat: Infinity,
            },
          }}
        >
          {duplicatedItems.map((src, i) => (
            <motion.div
              key={i}
              className={clsx(
                'relative flex-shrink-0 h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-xl transition-all duration-500 cursor-pointer',
                'bg-muted/20',
                isHovered && hoveredIndex === i ? 'blur-0' : isHovered ? 'blur-[2px]' : 'blur-[3px]',
                hoveredIndex === i && 'z-10 shadow-2xl'
              )}
              style={{
                opacity: isHovered ? (hoveredIndex === i ? 0.95 : 0.4) : 0.35,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setOpenImage(src)}
              animate={
                hoveredIndex === i
                  ? { scale: 1.03 }
                  : { scale: 1 }
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
        </motion.div>
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
