import React from 'react'
import { treks } from '../data/treks'
import TrekCard from './TrekCard'
import Section from './Section'

export default function TreksSection() {
  return (
    <Section id="treks" className="py-16">
      <h2 className="text-2xl font-display font-semibold">Treks</h2>
      <p className="mt-2 text-gray-600">Stories and highlights from memorable hikes and treks.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {treks.map((t) => (
          <TrekCard key={t.id} trek={t} />
        ))}
      </div>
    </Section>
  )
}
