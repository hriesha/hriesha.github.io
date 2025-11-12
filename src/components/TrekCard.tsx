import React from 'react'
import type { Trek } from '../types'

export default function TrekCard({ trek }: { trek: Trek }) {
  return (
    <article className="card-hover border border-transparent rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{trek.name}</h4>
          <div className="text-xs text-gray-500">{trek.location} {trek.year ? `• ${trek.year}` : ''}</div>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{trek.description}</p>
    </article>
  )
}
