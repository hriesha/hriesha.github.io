'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import { islandTiles, islandPorts, robberNote, type IslandTile } from '@/data/island'

// Board geometry. Tiles are placed on a 388 x 292 grid, 3-4-3, pointy side up.
const ROWS: [number, number][] = [
  [106.6, 70],
  [63.3, 145],
  [106.6, 220],
]
const COUNTS = [3, 4, 3]
const STEP = 86.6
const BOARD_W = 388
const BOARD_H = 292

// Deterministic jitter so the hexes look hand-drawn but never change between renders.
function rnd(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function hexPath(cx: number, cy: number, r: number, seed: number, jitter: number) {
  const pts: [number, number][] = []
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 180) * (60 * k - 30)
    pts.push([
      cx + r * Math.cos(a) + (rnd(seed + k) - 0.5) * jitter,
      cy + r * Math.sin(a) + (rnd(seed + k + 7) - 0.5) * jitter,
    ])
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let k = 0; k < 6; k++) {
    const p = pts[k]
    const q = pts[(k + 1) % 6]
    const mx = (p[0] + q[0]) / 2 + (rnd(seed + k + 20) - 0.5) * jitter * 1.2
    const my = (p[1] + q[1]) / 2 + (rnd(seed + k + 30) - 0.5) * jitter * 1.2
    d += ` Q${mx.toFixed(1)} ${my.toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`
  }
  return d + ' Z'
}

interface PlacedTile extends IslandTile {
  left: string
  top: string
  width: string
  height: string
  outline: string
  ghost: string
}

const placedTiles: PlacedTile[] = (() => {
  const out: PlacedTile[] = []
  let i = 0
  for (let r = 0; r < ROWS.length; r++) {
    for (let c = 0; c < COUNTS[r]; c++) {
      const tile = islandTiles[i]
      if (!tile) break
      const cx = ROWS[r][0] + c * STEP
      const cy = ROWS[r][1]
      out.push({
        ...tile,
        left: `${(((cx - 50) / BOARD_W) * 100).toFixed(3)}%`,
        top: `${(((cy - 50) / BOARD_H) * 100).toFixed(3)}%`,
        width: `${((100 / BOARD_W) * 100).toFixed(3)}%`,
        height: `${((100 / BOARD_H) * 100).toFixed(3)}%`,
        outline: hexPath(50, 50, 47, i * 13, 3),
        ghost: hexPath(50, 50, 45.5, i * 13 + 3, 3.2),
      })
      i++
    }
  }
  return out
})()

// Dice
const PIP: Record<string, [number, number]> = {
  TL: [8, 8], TR: [20, 8], ML: [8, 14], MR: [20, 14], C: [14, 14], BL: [8, 20], BR: [20, 20],
}
const FACES: Record<number, string[]> = {
  1: ['C'],
  2: ['TL', 'BR'],
  3: ['TL', 'C', 'BR'],
  4: ['TL', 'TR', 'BL', 'BR'],
  5: ['TL', 'TR', 'C', 'BL', 'BR'],
  6: ['TL', 'TR', 'ML', 'MR', 'BL', 'BR'],
}
const DIE_BOXES = [
  'M5 3 Q14 2.2 23 3 Q25 14 23 25 Q14 25.8 5 25 Q3 14 5 3 Z',
  'M4.6 3.4 Q14 2 23.4 3.2 Q24.6 14 23.2 24.8 Q14 26 4.8 24.6 Q3.4 14 4.6 3.4 Z',
]

// The same imperfect squiggle as the wave on the About page.
const SQUIGGLE =
  'M2 13 C 8 10, 14 8, 22 11 C 30 14, 38 16, 48 13 C 56 10, 62 8, 72 12 C 80 15, 88 14, 96 11 C 104 8, 112 10, 118 13'

// Waves sit in the empty corners around the island.
const WAVES = [
  { left: '0%', top: '8%', w: 52, dur: 5.2, delay: 0 },
  { left: '86%', top: '6%', w: 44, dur: 6.1, delay: 1.2 },
  { left: '8%', top: '97%', w: 46, dur: 5.6, delay: 0.6 },
  { left: '84%', top: '92%', w: 54, dur: 6.6, delay: 1.8 },
  { left: '40%', top: '102%', w: 42, dur: 6.3, delay: 1.5 },
]

interface Line {
  mark: string
  text: string
  color?: string
}

export default function HexIsland() {
  const reduceMotion = useReducedMotion()
  const [dice, setDice] = useState<[number, number]>([3, 4])
  const [rolling, setRolling] = useState(false)
  const [lit, setLit] = useState<string | null>(null)
  const [litKey, setLitKey] = useState(0)
  const [open, setOpen] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const [last, setLast] = useState<Line | null>(null)
  const [touched, setTouched] = useState(false)
  const [hintReady, setHintReady] = useState(false)
  const timers = useRef<number[]>([])
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setTimeout(() => setHintReady(true), 1000)
    timers.current.push(id)
    const current = timers.current
    return () => current.forEach(clearTimeout)
  }, [])

  // Bring the panel into view when a tile opens, since it sits below the board.
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }, 50)
    timers.current.push(id)
  }, [open, reduceMotion])

  function produce(tile: IslandTile, mark: string, verb = '') {
    setLit(tile.id)
    setLitKey((k) => k + 1)
    setOpen(tile.id)
    setLast({ mark, text: `${tile.label}${verb} — ${tile.tagline}`, color: tile.color })
    setTouched(true)
  }

  function toggle(tile: IslandTile) {
    if (open === tile.id) {
      setOpen(null)
      setLit(null)
      return
    }
    produce(tile, '⬡')
  }

  function roll() {
    if (rolling) return
    setRolling(true)
    setLit(null)
    setOpen(null)
    setTouched(true)
    let n = 0
    const tick = () => {
      n++
      const d1 = 1 + Math.floor(Math.random() * 6)
      const d2 = 1 + Math.floor(Math.random() * 6)
      setDice([d1, d2])
      if (n < 9) {
        timers.current.push(window.setTimeout(tick, 60 + n * 14))
        return
      }
      setRolling(false)
      const sum = d1 + d2
      if (sum === 7) {
        setLast({ mark: '7', text: robberNote })
        return
      }
      const tile = islandTiles.find((t) => t.n === sum)
      if (tile) produce(tile, String(sum), ' produces')
    }
    timers.current.push(window.setTimeout(tick, 50))
  }

  const hovered = hover ? islandTiles.find((t) => t.id === hover) : undefined
  const line: Line | null = hovered
    ? { mark: '⬡', text: `${hovered.label} — ${hovered.tagline}`, color: hovered.color }
    : last
  const openTile = open ? islandTiles.find((t) => t.id === open) : undefined

  return (
    <div>
      {/* the sea, and the island on it */}
      <div className="island-sea">
        <div
          className="island-board"
          role="group"
          aria-label="A hand-drawn island of ten hex tiles, one for each project"
        >
        {WAVES.map((w, i) => (
          <svg
            key={i}
            viewBox="0 0 120 24"
            className="island-wave"
            style={{
              left: w.left,
              top: w.top,
              width: w.w,
              animationDuration: `${w.dur}s`,
              animationDelay: `${w.delay}s`,
            }}
            aria-hidden="true"
          >
            <path d={SQUIGGLE} />
          </svg>
        ))}

        {/* two ravens, top left */}
        <svg viewBox="0 0 40 16" className="island-doodle island-birds" aria-hidden="true">
          <path d="M2 8 q4 -6 8 0 q4 -6 8 0" />
          <path d="M20 12 q4 -6 8 0 q4 -6 8 0" />
        </svg>

        {/* a compass, top right */}
        <svg viewBox="0 0 32 32" className="island-doodle island-compass" aria-hidden="true">
          <circle cx="16" cy="16" r="11" />
          <path d="M16 6 L18.5 16 L16 26 L13.5 16 Z" className="fill" />
          <path d="M6 16 L16 13.5 L26 16 L16 18.5 Z" />
          <text x="16" y="4" textAnchor="middle" fontSize="5">N</text>
        </svg>

        {/* a boat, sailing across the top */}
        <div className="island-lane island-sail">
          <svg viewBox="0 0 40 28" className="island-doodle island-boat" aria-hidden="true">
            <path d="M4 20 L8 26 H32 L36 20 Z" />
            <path d="M20 20 V4" />
            <path d="M20 5 L31 18 H20 Z" className="fill" />
            <path d="M20 4 L25 6 L20 8" />
          </svg>
        </div>

        {/* a fish, swimming along the bottom */}
        <div className="island-lane island-swim">
          <svg viewBox="0 0 36 18" className="island-doodle island-fish" aria-hidden="true">
            <path d="M4 9 Q14 0 26 9 Q14 18 4 9 Z" />
            <path d="M26 9 L34 3 V15 Z" />
            <circle cx="10" cy="8" r="1" className="dot" />
          </svg>
        </div>

        {/* a shuttlecock, lost at sea, bottom left */}
        <svg viewBox="0 0 24 28" className="island-doodle island-shuttle" aria-hidden="true">
          <circle cx="12" cy="23.5" r="3.5" />
          <path d="M9 20.5 L4 6 M15 20.5 L20 6 M4 6 Q12 2 20 6 M6.5 13.5 Q12 11 17.5 13.5" />
        </svg>

          {placedTiles.map((tile) => {
            const isLit = lit === tile.id
            const isOpen = open === tile.id
            const style = {
              left: tile.left,
              top: tile.top,
              width: tile.width,
              height: tile.height,
              ['--c' as string]: tile.color,
            } as React.CSSProperties
            return (
              <button
                key={`${tile.id}-${isLit ? litKey : 0}`}
                type="button"
                className={clsx('island-tile', isLit && 'lit', isOpen && 'open')}
                style={style}
                aria-label={tile.title}
                aria-expanded={isOpen}
                onClick={() => toggle(tile)}
                onMouseEnter={() => setHover(tile.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(tile.id)}
                onBlur={() => setHover(null)}
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <path className="island-hex" d={tile.outline} />
                  <path className="island-ghost" d={tile.ghost} />
                  <circle className="island-tokc" cx="50" cy="24" r="9" />
                  <path className="island-ico" d={tile.icon} transform="translate(50 47)" />
                </svg>
                <span className={clsx('island-tok', (tile.n === 6 || tile.n === 8) && 'hot')}>
                  {tile.n}
                </span>
                <span className="island-lbl">{tile.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* the dice, the hint, and the line */}
      <div className="mt-4 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Roll the dice"
            onClick={roll}
            className={clsx('island-dice', rolling && 'rolling')}
          >
            {dice.map((v, k) => (
              <svg key={k} viewBox="0 0 28 28" className="island-die" aria-hidden="true">
                <path d={DIE_BOXES[k]} />
                {FACES[v].map((name) => (
                  <circle key={name} cx={PIP[name][0]} cy={PIP[name][1]} r="2" />
                ))}
              </svg>
            ))}
          </button>

          {!touched && (
            <div className={clsx('island-hint', hintReady && 'show')}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12c0-4 3-7 7-7M12 5l-2-2M12 5l2-2" />
              </svg>
              <span>roll me</span>
            </div>
          )}
        </div>

        <div className="island-line" aria-live="polite">
          {line && (
            <>
              {line.mark === '7' ? (
                <svg viewBox="0 0 16 20" className="island-robber" aria-hidden="true">
                  <path d="M8 2 Q12 4 12 9 Q12 12 10 13 L12 18 H4 L6 13 Q4 12 4 9 Q4 4 8 2 Z" />
                </svg>
              ) : (
                <span className="mark" style={line.color ? { color: line.color } : undefined}>
                  {line.mark}
                </span>
              )}
              <span className="text">{line.text}</span>
            </>
          )}
        </div>
      </div>

      {/* the open tile */}
      <AnimatePresence initial={false}>
        {openTile && (
          <motion.div
            key="panel"
            ref={panelRef}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-6 border-l py-1 pl-6"
            style={{ borderColor: openTile.color }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="font-medium">{openTile.title}</h2>
              <span className="text-sm text-muted">{openTile.year}</span>
            </div>
            <p className="mt-2 max-w-prose text-sm text-muted">{openTile.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {openTile.link && (
                <a
                  href={openTile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:underline hover:underline-offset-4"
                >
                  open ↗
                </a>
              )}
              <Link href="/work" className="text-muted transition-colors hover:text-foreground">
                see the whole timeline →
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(null)
                  setLit(null)
                }}
                className="text-muted transition-colors hover:text-foreground"
              >
                close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ports */}
      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="island-ports-label">ports</span>
        {islandPorts.map((port) => (
          <a
            key={port.label}
            href={port.href}
            target={port.href.startsWith('mailto') ? undefined : '_blank'}
            rel={port.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="island-port text-muted transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="3" r="1.5" />
              <path d="M8 4.5 V14 M4 8 H12 M3 10.5 Q8 15 13 10.5" />
            </svg>
            {port.label}
          </a>
        ))}
      </div>
    </div>
  )
}
