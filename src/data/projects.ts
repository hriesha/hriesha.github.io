export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  dateRange: string;
  isPlaceholder?: boolean;
}

export const projects: Project[] = [
  {
    id: 'premier-league',
    title: 'Premier League Predictor Model',
    description: 'Developed a match-prediction pipeline using API ingestion, JSON caching, and retry logic, maintaining 99% data availability across 25k+ match records. Constructed 12+ engineered features and trained multinomial logistic models with walk-forward evaluation, improving baseline accuracy by 14%.',
    techStack: ['Python', 'pandas', 'requests', 'Matplotlib', 'NumPy'],
    githubUrl: '#', // TODO: Replace with actual GitHub URL
    dateRange: 'Aug 2025 - Present'
  },
  {
    id: 'drug-ae',
    title: 'Drug AE Comparison Model',
    description: 'Performed unsupervised clustering on 50k+ UCI adverse-event records using K-Means and hierarchical linkage. Determined optimal cluster count through Elbow scores and dendrogram analysis, improving cluster cohesion by 22% and enabling clearer High/Medium/Low risk segmentation.',
    techStack: ['Python', 'K-Means', 'ML', 'SciPy', 'sklearn'],
    githubUrl: '#', // TODO: Replace with actual GitHub URL
    dateRange: 'April 2025 - June 2025'
  },
  // Placeholder projects for future additions
  {
    id: 'stock-sentiment',
    title: 'Real-time Stock Sentiment Analyzer',
    description: 'NLP-powered sentiment analysis on trending stocks with live dashboard and Twitter API integration for real-time market sentiment tracking.',
    techStack: ['Python', 'NLP', 'Twitter API', 'React', 'D3.js'],
    githubUrl: '#',
    dateRange: 'Coming Soon',
    isPlaceholder: true
  },
  {
    id: 'study-scheduler',
    title: 'AI-Powered Study Scheduler',
    description: 'Smart study session planner using ML-based time optimization and spaced repetition algorithms to maximize learning retention.',
    techStack: ['React', 'Python', 'ML', 'Calendar API'],
    githubUrl: '#',
    dateRange: 'Coming Soon',
    isPlaceholder: true
  },
  {
    id: 'data-viz',
    title: 'Interactive Data Viz Dashboard',
    description: 'Customizable analytics dashboard with real-time data streaming, interactive visualizations, and export capabilities for business intelligence.',
    techStack: ['D3.js', 'React', 'WebSocket', 'TypeScript'],
    githubUrl: '#',
    dateRange: 'Coming Soon',
    isPlaceholder: true
  },
  {
    id: 'workout-analyzer',
    title: 'Workout Form Analyzer',
    description: 'Computer vision-powered mobile app providing real-time feedback on exercise form using pose estimation and machine learning.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'React Native'],
    githubUrl: '#',
    dateRange: 'Coming Soon',
    isPlaceholder: true
  }
];
