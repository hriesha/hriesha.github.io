import type { Project } from '../types'

// How to add projects:
// - Add another object to the exported `projects` array following the Project interface.
// - Provide a unique `id`, `title`, short `description`, `tags` array and a `link`.

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Example Data Tool',
    description: 'A small data-processing web app that analyzes and visualizes user datasets.',
    tags: ['Python', 'Data Science', 'Web App'],
    link: 'https://example.com'
  },
  {
    id: 'p2',
    title: 'Trek Planner',
    description: 'An interactive route planner for multi-day treks with elevation profiles and packing lists.',
    tags: ['React', 'TypeScript', 'GIS'],
    link: 'https://example.com'
  },
  {
    id: 'p3',
    title: 'Portfolio Backend',
    description: 'A lightweight API to serve portfolio content and images securely.',
    tags: ['Node', 'Express', 'API'],
    link: 'https://example.com'
  }
]
