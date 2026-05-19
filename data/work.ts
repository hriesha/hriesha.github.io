export interface WorkEntry {
  id: string
  title: string
  description: string
  year: string
  link?: string
}

export const workEntries: WorkEntry[] = [
  {
    id: '1',
    title: 'LARCH Lab',
    year: '2026–present',
    description:
      'Designing and evaluating accessible AI language systems for healthcare, science, and enterprise',
    link: 'https://larchlab.org',
  },
  {
    id: '2',
    title: 'HeartBeats',
    year: '2025–present',
    description: 'BPM-synced music adapting to heart rate/pace for optimised performance',
    link: 'https://heartbeatswaitlist.vercel.app',
  },
  {
    id: '3',
    title: 'DubHacks NEXT',
    description: 'Competitive startup incubator program in the PNW for early-stage cracked founders · ~2 YC companies per batch',
    year: '2026',
  },
  {
    id: '4',
    title: 'CSEED',
    description: 'UW program supporting student entrepreneurship and early-stage ventures',
    year: '2025',
  },
  {
    id: '5',
    title: 'QiCap.ai',
    description: 'ML-based alpha research + strategies for Indian equities',
    year: '2025',
  },
  {
    id: '6',
    title: 'F1 Qualifying Predictor',
    description: 'ML predictor for qualifying order',
    year: '2025',
  },
  {
    id: '7',
    title: 'Drug Adverse Event Research',
    description: 'Clustering + analysis for scoliosis research',
    year: '2024',
  },
]
