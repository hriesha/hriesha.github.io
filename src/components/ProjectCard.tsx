import React from 'react'
import type { Project } from '../types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-hover border border-transparent rounded-lg p-5 bg-white">
      <h3 className="font-semibold text-lg">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{t}</span>
        ))}
      </div>
      <div className="mt-4">
        <a href={project.link} target="_blank" rel="noreferrer" className="text-sm text-accent font-medium">View Project →</a>
      </div>
    </article>
  )
}
