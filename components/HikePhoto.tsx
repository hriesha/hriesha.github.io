'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import HikeLoader from './HikeLoader'

interface Props {
  src: string
  index: number
}

// The loader is worth seeing, so every tile shows it for at least this long,
// plus a small stagger so the photos arrive one after another.
const MIN_LOADER_MS = 1500
const STAGGER_MS = 80

// A grid photo that shows the trail loader until the image has actually arrived.
export default function HikePhoto({ src, index }: Props) {
  const [arrived, setArrived] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const ref = useRef<HTMLImageElement>(null)
  const mountedAt = useRef(0)

  useEffect(() => {
    mountedAt.current = Date.now()
    // Cached images can finish before React attaches onLoad.
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) setArrived(true)
  }, [])

  // Reveal the photo once it has arrived and the loader has had its moment.
  useEffect(() => {
    if (!arrived) return
    const elapsed = Date.now() - mountedAt.current
    const wait = Math.max(0, MIN_LOADER_MS + index * STAGGER_MS - elapsed)
    const id = window.setTimeout(() => setLoaded(true), wait)
    return () => window.clearTimeout(id)
  }, [arrived, index])

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
        onLoad={() => setArrived(true)}
        onError={() => setArrived(true)}
        className={clsx(
          'relative h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  )
}
