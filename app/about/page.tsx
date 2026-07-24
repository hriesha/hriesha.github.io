'use client'

import { aboutContent } from '@/data/about'
import FloatingPhotoPane from '@/components/FloatingPhotoPane'
import Wave from '@/components/Wave'

// Terms highlighted in the About copy, each linking out to the thing it names.
// Longest first so a shorter term never swallows part of a longer one.
const highlightLinks: Record<string, string> = {
  'AgentReady': 'https://shopagentready.vercel.app',
  'HeartBeats': 'https://heartbeatswaitlist.vercel.app',
  'Two Ravens': 'https://www.tworavens.vc',
  'IT-Mobile': 'https://github.com/hriesha/IT-Mobile',
  'LARCH Lab': 'https://larchlab.org',
  'QiCap.AI': 'https://qicap.ai/home',
  'QiCap': 'https://qicap.ai/home',
  'Zolve': 'https://zolve.com',
}

function highlightText(text: string) {
  const regex = new RegExp(`(${Object.keys(highlightLinks).join('|')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) => {
    const term = Object.keys(highlightLinks).find(
      (word) => word.toLowerCase() === part.toLowerCase()
    )
    if (term) {
      return (
        <a
          key={i}
          href={highlightLinks[term]}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded hover:underline hover:underline-offset-4"
        >
          {part}
        </a>
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
