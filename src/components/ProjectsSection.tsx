import React from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Section from './Section'

export default function ProjectsSection() {
  return (
    <Section id="work" className="py-16">
      <h2 className="text-2xl font-display font-semibold">My Work</h2>
      <p className="mt-2 text-gray-600">Selected projects — click through to learn more.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  )
}
