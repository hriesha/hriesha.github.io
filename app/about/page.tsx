'use client'

import { aboutContent } from '@/data/about'
import FloatingPhotoPane from '@/components/FloatingPhotoPane'
import Wave from '@/components/Wave'

const highlightWords = [
  'HeartBeats',
  'quantitative research intern',
  'IT-Mobile',
  'hackathons',
  'research',
  'teaching',
]

function highlightText(text: string) {
  const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) => {
    const isHighlight = highlightWords.some(
      (word) => word.toLowerCase() === part.toLowerCase()
    )
    if (isHighlight) {
      if (part.toLowerCase() === 'heartbeats') {
        return (
          <a
            key={i}
            href="https://heartbeatswaitlist.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded hover:underline hover:underline-offset-4"
          >
            {part}
          </a>
        )
      }
      return (
        <span key={i} className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">
          {part}
        </span>
      )
    }
    return part
  })
}

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-lg font-medium">{aboutContent.heading}</h1>

      <div className="mt-8 max-w-prose space-y-4 text-muted">
        {aboutContent.paragraphs.map((p, i) => (
          <p key={i}>{highlightText(p)}</p>
        ))}
      </div>

      <Wave className="mt-10" />

      <FloatingPhotoPane />

      <div className="mt-12 flex flex-wrap gap-4 text-sm">
        {aboutContent.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="text-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
