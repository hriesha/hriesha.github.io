# Hriesha Popat - Personal Portfolio

A minimalistic, interactive personal portfolio website showcasing my work in data science, quantitative research, and software engineering.

## Features

### Interactive 3D Cube
- Pure CSS 3D transforms (no Three.js/WebGL)
- Cursor-responsive rotation with math-driven 2D transforms
- Displays hiking photos on each face
- Automatic reduced-motion fallback for accessibility

### Dynamic Favicon
- Real-time favicon updates based on cube rotation
- Canvas-based image generation
- Shows mini version of currently visible cube face

### Smart Dark Mode
- Respects system color scheme preferences
- Persists user choice in localStorage
- Smooth theme transitions with CSS variables

### Smooth Scroll Animations
- Framer Motion integration
- Intersection Observer for performance
- Full reduced-motion accessibility support

### Floating Navigation
- Auto-hide/show based on scroll position
- Active section detection
- Keyboard accessible with ARIA labels

### Sections
1. **Hero** - Interactive cube with intro
2. **Projects** - Grid of 2 real + 4 placeholder projects
3. **Timeline** - Work experience & research (newest first)
4. **Contact** - Email, phone, LinkedIn, GitHub links
5. **Dev Notes** - Technical features showcase

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Styling**: CSS Modules + CSS Variables
- **Typography**: Raleway (body) + Space Grotesk (headings)
- **Deployment**: GitHub Pages

## Color Palette

- Butter Yellow: `#FFE66D`
- Bright Blue: `#4ECDC4`
- Grey: `#95A3B3`
- Dark Grey: `#2D3142`

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup GitHub Pages
1. Go to repository Settings > Pages
2. Source: GitHub Actions
3. The workflow will automatically build and deploy

## Project Structure

```
src/
├── components/       # React components
│   ├── Hero/        # Interactive cube & hero section
│   ├── Projects/    # Project grid & cards
│   ├── Timeline/    # Experience timeline
│   ├── Contact/     # Contact section
│   ├── DevNotes/    # Technical features showcase
│   ├── Navigation/  # Floating navigation
│   └── common/      # Dark mode toggle
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── data/            # Content data
└── styles/          # Global styles & theme
```

## Atomic Git Commits

This project follows atomic commit practices - each commit represents a single logical change:
- One feature/fix per commit
- Clear, descriptive messages
- Easy to review and revert

## TODO

- [ ] Add real GitHub URLs for projects
- [ ] Replace placeholder images with actual hiking photos
- [ ] Add HeartBeats GitHub repository link

## License

MIT

---

Made with ♥ by Hriesha Popat
