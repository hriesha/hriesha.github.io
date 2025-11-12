# Hriesha Popat — Personal Website

This is a light, minimal personal website built with React + TypeScript + Vite and styled using Tailwind CSS.

**Features:**
- Single page layout with smooth scrolling between sections
- Data-driven `My Work` and `Treks` sections (edit `src/data/projects.ts` and `src/data/treks.ts`)
- Subtle cursor-follow spotlight effect
- Fade-in animations as sections scroll into view
- Responsive design (mobile, tablet, desktop)
- Full keyboard navigation and accessibility
- Production-ready, easy to deploy

## Getting Started

### 1. Install dependencies

```bash
cd /Users/hriesha/Desktop/Academics/personal-website
npm install
```

### 2. Start dev server

```bash
npm run dev
```

The site will open at `http://localhost:5173`.

### 3. Build for production

```bash
npm run build
```

This creates optimized static assets in the `dist/` folder.

## Where to Edit Content

- **Projects:** `src/data/projects.ts` — Add or remove project objects from the `projects` array
- **Treks:** `src/data/treks.ts` — Add or remove trek objects from the `treks` array
- **About text:** `src/components/About.tsx`
- **Contact links (email, LinkedIn, GitHub):** `src/components/Footer.tsx`
- **Global styling:** `src/styles/index.css` and `tailwind.config.cjs`
- **Typography & colors:** Fonts are loaded from Google Fonts in `index.html`; accent color is `#6C7AEB`

## Project Structure

```
src/
  components/       # React components
  data/            # Project & trek definitions
  hooks/           # Custom hooks (useInView for animations)
  styles/          # Global CSS and Tailwind
  types.ts         # TypeScript interfaces
  App.tsx          # Main app with spotlight effect
  main.tsx         # Entry point
```

## Deployment

This site builds to static files — deploy anywhere:
- **Vercel:** Connect your GitHub repo and deploy (zero config)
- **Netlify:** Drag-and-drop the `dist/` folder or connect GitHub
- **Any static host:** Push the `dist/` folder to your hosting

## Customization

- **Profile image:** Replace the gradient placeholder in `About.tsx` with an `<img>` tag
- **Colors:** Edit the accent color in `tailwind.config.cjs` and `src/styles/index.css`
- **Fonts:** Change Google Fonts in `index.html` and update `tailwind.config.cjs`
- **Spotlight effect:** Tweak opacity/size in `App.tsx` (line with `radial-gradient`)

## Notes

- All links in the footer are placeholders—update with real URLs
- The spotlight effect works on desktop; it gracefully falls back on touch devices
- Focus states are included for keyboard navigation (Tab to navigate, Enter/Space to activate)

# personal-website