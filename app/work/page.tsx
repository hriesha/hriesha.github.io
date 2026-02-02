'use client'

import { workEntries } from '@/data/work'
import { motion } from 'framer-motion'

export default function WorkPage() {
  return (
    <div>
      <h1 className="text-lg font-medium">Work</h1>

      <div className="mt-10">
        {workEntries.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="group relative border-l border-border py-4 pl-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="absolute -left-[5px] top-6 h-2 w-2 rounded-full bg-border transition-colors group-hover:bg-foreground" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              {entry.link ? (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-all group-hover:-translate-y-px hover:underline hover:underline-offset-4"
                >
                  {entry.title} ↗
                </a>
              ) : (
                <h2 className="font-medium transition-all group-hover:-translate-y-px group-hover:underline group-hover:underline-offset-4">
                  {entry.title}
                </h2>
              )}
              <span className="text-sm text-muted">{entry.year}</span>
            </div>

            <p className="mt-1 text-sm text-muted">{entry.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
