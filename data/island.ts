// The island on the home page: ten projects, laid out 3-4-3 in this order.
// Hover a tile for its tagline. Click it, or roll its number, to open the blurb.

export interface IslandTile {
  id: string
  /** The number token. 6 and 8 are the hot ones, like a real board. */
  n: number
  /** Short name that fits inside the hex. */
  label: string
  /** Full name, shown in the panel. */
  title: string
  year: string
  /** Tile colour. The fill is a tint of it, the outline is the full colour. */
  color: string
  /** One line, shown on hover. */
  tagline: string
  /** A short explanation, shown when the tile opens. */
  blurb: string
  /** A small stroke doodle drawn in a 16x16 box centred on 0,0. */
  icon: string
  link?: string
}

export const islandTiles: IslandTile[] = [
  // row one
  {
    id: 'qicap',
    n: 3,
    label: 'qicap',
    title: 'QiCap.ai',
    year: '2025',
    color: '#e9b949',
    tagline: 'a divergence in indian equities.',
    blurb:
      'Quantitative research on Indian equities. I built trading signals, and a mean-reversion engine around a market divergence I spotted and could not stop thinking about.',
    icon: 'M-7 5 L-3 -1 L0 1 L4 -5 L7 -3 M3 -5 H7 V-1',
    link: 'https://qicap.ai/home',
  },
  {
    id: 'dubhacks',
    n: 6,
    label: 'startups',
    title: 'DubHacks NEXT',
    year: '2026',
    color: '#d9748a',
    tagline: '40 founders, one incubator.',
    blurb:
      "UW's student-run startup incubator. I'm a director on the exec team: I help lead and mentor a community of 40 founders, and connect them with the experienced founders, investors, and operators who can help turn an idea into a real company. I also built the website, end to end :)",
    icon: 'M0 -7 C4 -4 4 2 2 5 H-2 C-4 2 -4 -4 0 -7 Z M-2 5 L-4 8 M2 5 L4 8 M-1 -1 A1 1 0 1 0 1 -1 A1 1 0 1 0 -1 -1',
    link: 'https://next.dubhacks.co',
  },
  {
    id: 'nlp',
    n: 11,
    label: 'nlp',
    title: 'NLP Project',
    year: '2026',
    color: '#6b7a8f',
    tagline: 'how do you prompt a model to read a contract?',
    blurb:
      'Evaluating LLM prompting strategies, chain of thought, tree of thought and program of thought, for text classification on legal document corpora, and benchmarking how accuracy shifts across model scales.',
    icon: 'M-7 -5 H7 V2 H-2 L-5 5 V2 H-7 Z M-4 -2 H4 M-4 0 H1',
  },
  // row two
  {
    id: 'itmobile',
    n: 2,
    label: 'it-mobile',
    title: 'IT-Mobile',
    year: 'DubHacks',
    color: '#5b9bd5',
    tagline: 'wi-fi diagnostics, no wi-fi required.',
    blurb:
      'An offline Wi-Fi diagnostics tool with speech accessibility, so you can work out what is wrong with the network even when the network is the problem. It won awards at DubHacks.',
    icon: 'M-7 -1 A10 10 0 0 1 7 -1 M-4 2 A6 6 0 0 1 4 2 M-0.5 5.5 A0.5 0.5 0 1 0 0.5 5.5 A0.5 0.5 0 1 0 -0.5 5.5',
    link: 'https://github.com/hriesha/IT-Mobile',
  },
  {
    id: 'larch',
    n: 4,
    label: 'research',
    title: 'Accessibility Research',
    year: '2026',
    color: '#2f6b4f',
    tagline: 'documents everyone can read.',
    blurb:
      'At the UW iSchool I work on making complex documents accessible when the existing remediation tools fall short, as part of wider research on accessible AI language systems for healthcare, science, and enterprise.',
    icon: 'M-5 -7 H3 L6 -4 V7 H-5 Z M-2 -1 H3 M-2 2 H3 M-2 5 H1',
    link: 'https://larchlab.org',
  },
  {
    id: 'tworavens',
    n: 8,
    label: 'two ravens',
    title: 'Two Ravens',
    year: '2026',
    color: '#e07a2f',
    tagline: 'startup sourcing, automated.',
    blurb:
      'A pre-seed venture firm. I build the systems behind how it finds and understands companies: data pipelines, automated research and evaluation, and turning scattered information into something the team can actually search, connect, and use.',
    icon: 'M-7 -2 Q-4 -6 -1 -2 Q2 -6 5 -2 M-5 4 Q-2 0 1 4 Q4 0 7 4',
    link: 'https://www.tworavens.vc',
  },
  {
    id: 'zolve',
    n: 10,
    label: 'zolve',
    title: 'Zolve',
    year: '2026',
    color: '#7c6bb0',
    tagline: 'replaced a vendor with a model.',
    blurb:
      'A fintech for international students. On risk and analytics I found we were paying a vendor to guarantee ACH transfers, and built an in-house model to replace it. More recently: AI-powered analytics and agentic tooling to automate financial operations across lending products.',
    icon: 'M-7 -4 H7 V4 H-7 Z M-7 -1 H7 M-5 2 H-1',
    link: 'https://zolve.com',
  },
  // row three
  {
    id: 'agentready',
    n: 5,
    label: 'agentready',
    title: 'Shop AgentReady',
    year: '2026',
    color: '#3e9c9c',
    tagline: 'can an ai agent shop your catalog?',
    blurb:
      'Audits ecommerce catalogs for how well AI shopping agents can understand them. It scores product data against a weighted attribute rubric, simulates agent queries, and ranks the gaps that are quietly suppressing a store from being found.',
    icon: 'M-5 -3 H5 L6 7 H-6 Z M-3 -3 V-5 A3 3 0 0 1 3 -5 V-3',
    link: 'https://shopagentready.vercel.app',
  },
  {
    id: 'teaching',
    n: 12,
    label: 'teaching',
    title: 'Teaching',
    year: 'UW',
    color: '#4f8a5b',
    tagline: 'sql, algorithms, charts, and why.',
    blurb:
      "I've TA'd databases, data structures, and data visualization and design at UW, and explored the problem-solving within each, from SQL and algorithms to visual design. Explaining something is still the fastest way I know to find out whether I actually understand it.",
    icon: 'M-8 -2 L0 -6 L8 -2 L0 2 Z M-4 0 V4 Q0 6 4 4 V0 M8 -2 V3',
  },
  {
    id: 'heartbeats',
    n: 9,
    label: 'heartbeats',
    title: 'HeartBeats',
    year: '2025–2026',
    color: '#c8473a',
    tagline: 'music that keeps up with your heart.',
    blurb:
      'BPM-synced music that adapts to your heart rate and pace, so the track keeps up with the effort instead of the other way round. The waitlist is live.',
    icon: 'M0 6 C-8 0 -7 -7 0 -3 C7 -7 8 0 0 6 Z',
    link: 'https://heartbeatswaitlist.vercel.app',
  },
]

/** What the line says when the dice come up 7. */
export const robberNote = "the robber. everyone discards. i'm keeping the chai."

/** The ports around the island. */
export const islandPorts = [
  { label: 'Email', href: 'mailto:hriesha.p@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hrieshapopat' },
  { label: 'GitHub', href: 'https://github.com/hriesha' },
  { label: 'X', href: 'https://x.com/hriesha_p' },
]
