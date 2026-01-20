export interface DevNote {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  codeSnippet?: string;
  icon: string;
}

export const devNotes: DevNote[] = [
  {
    id: 'cube',
    title: 'Interactive 3D Cube',
    description: 'Built using pure CSS 3D transforms with no Three.js or WebGL dependencies. Features cursor-responsive rotation calculated with 2D transform math and automatic reduced-motion fallback.',
    techStack: ['CSS 3D Transforms', 'React Hooks', 'TypeScript'],
    icon: '🎲',
    codeSnippet: `const rotation = {
  x: cursorY * sensitivity,
  y: cursorX * sensitivity
};`
  },
  {
    id: 'favicon',
    title: 'Dynamic Favicon System',
    description: 'Real-time favicon updates based on which cube face is currently visible. Uses canvas API to generate mini versions of each face image on-the-fly with debounced updates for performance.',
    techStack: ['Canvas API', 'TypeScript', 'RAF Throttling'],
    icon: '🎨',
    codeSnippet: `canvas.toDataURL('image/png');
link.href = dataUrl; // Update favicon`
  },
  {
    id: 'dark-mode',
    title: 'Smart Dark Mode',
    description: 'Respects system color scheme preferences, persists user choice in localStorage, and provides smooth theme transitions. Theme state synced across all components via custom hook.',
    techStack: ['CSS Variables', 'localStorage', 'React Context'],
    icon: '🌓',
    codeSnippet: `document.documentElement
  .setAttribute('data-theme', theme);`
  },
  {
    id: 'animations',
    title: 'Scroll Animations',
    description: 'Framer Motion integration with Intersection Observer for performant scroll-triggered animations. Fully respects prefers-reduced-motion accessibility setting.',
    techStack: ['Framer Motion', 'Intersection Observer', 'A11y'],
    icon: '✨',
    codeSnippet: `const isInView = useInView(ref, {
  once: true,
  margin: '-100px'
});`
  },
  {
    id: 'navigation',
    title: 'Floating Navigation',
    description: 'Context-aware dot navigation that auto-hides on hero section and highlights active section based on scroll position. Fully keyboard accessible with ARIA labels.',
    techStack: ['Intersection Observer', 'ARIA', 'Smooth Scroll'],
    icon: '🧭',
    codeSnippet: `element.scrollIntoView({
  behavior: 'smooth'
});`
  },
  {
    id: 'git',
    title: 'Atomic Git Commits',
    description: 'Clean, linear git history with each commit representing a single logical unit of work. Makes codebase easy to review, debug, and revert when needed.',
    techStack: ['Git', 'Version Control', 'Best Practices'],
    icon: '📝',
    codeSnippet: `git commit -m "Add feature X"
# One feature, one commit`
  }
];
