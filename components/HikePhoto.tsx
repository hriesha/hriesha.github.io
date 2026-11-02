'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import HikeLoader from './HikeLoader'

interface Props {
  src: string
  index: number
}

// A grid photo that shows the trail loader until the image has actually arrived.
export default function HikePhoto({ src, index }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const ref = useRef<HTMLImageElement>(null)

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  // Keep the loader under the photo until the fade-in has finished.
  useEffect(() => {
    if (!loaded) return
    const id = window.setTimeout(() => setShowLoader(false), 600)
    return () => window.clearTimeout(id)
  }, [loaded])

  return (
    <>
      {showLoader && <HikeLoader index={index} />}
      <img
        ref={ref}
        src={src}
        alt=""
        loading={index < 3 ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={clsx(
          'relative h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  )
}
