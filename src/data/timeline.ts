export interface TimelineEntry {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  achievements: string[];
  tags: string[];
  githubUrl?: string;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'heartbeats',
    type: 'work',
    title: 'Co-Founder, HeartBeats',
    organization: 'CSeed, University of Washington',
    location: 'Seattle, WA',
    startDate: '2025-10-01',
    endDate: 'Present',
    description: 'Building a BPM-synced music app reducing workout "flow breaks" by 40% through real-time tempo adaptation.',
    achievements: [
      'Engineered a 5D feature vector and implemented K-Means clustering to generate 4 adaptive "vibe spaces," improving personalization accuracy by 30%',
      'Implemented a k-NN ranking engine to identify the most context-relevant track within each vibe cluster, achieving sub-250ms recommendation latency',
      'Integrated Spotify and Apple Music APIs to power real-time audio-feature extraction and adaptive playlist creation'
    ],
    tags: ['Python', 'ML', 'K-Means', 'k-NN', 'Spotify API', 'Apple Music API'],
    githubUrl: '#' // TODO: Replace with actual HeartBeats repo link
  },
  {
    id: 'ta-ischool',
    type: 'work',
    title: 'Teaching Assistant',
    organization: 'iSchool, University of Washington',
    location: 'Seattle, WA',
    startDate: '2025-09-01',
    endDate: 'Present',
    description: 'Lead weekly sections for 30+ students covering ERDs, relational modeling, SQL querying, and database design.',
    achievements: [
      'Develop course materials including slides, assignments, schema reviews, and SQL walkthroughs',
      'Host office hours, assist with debugging & modeling, and provide detailed feedback on database projects'
    ],
    tags: ['SQL', 'Database Design', 'PostgreSQL', 'Teaching']
  },
  {
    id: 'qicap',
    type: 'work',
    title: 'Quantitative Research Intern',
    organization: 'QiCap.AI',
    location: 'Bengaluru, India',
    startDate: '2025-06-01',
    endDate: '2025-09-01',
    description: 'Built 20+ intraday momentum and mean-reversion signals using Python, pandas, and volatility-scaled features.',
    achievements: [
      'Improved 5–60 min prediction stability by 18% and increased team signal test capacity',
      'Developed 110-pair mean-reversion engine with spread statistics and stationarity checks, increasing pair-trade alpha by 42%',
      'Standardized 50+ range-based indicators into contract-agnostic z-scores, reducing feature-tuning overhead by 25%',
      'Trained and evaluated 6 regression and tree-based ML models, applied PCA to 15+ features, reducing multicollinearity by 40%'
    ],
    tags: ['Python', 'pandas', 'ML', 'PCA', 'Quantitative Finance']
  }
];

/**
 * Format date range for display
 */
export const formatDateRange = (startDate: string, endDate: string | 'Present'): string => {
  const start = new Date(startDate);
  const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  if (endDate === 'Present') {
    return `${startMonth} - Present`;
  }

  const end = new Date(endDate);
  const endMonth = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return `${startMonth} - ${endMonth}`;
};
