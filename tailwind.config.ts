import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.6' }],
        sm: ['15px', { lineHeight: '1.6' }],
      },
      maxWidth: {
        prose: '65ch',
      },
      letterSpacing: {
        tight: '-0.015em',
      },
    },
  },
  plugins: [],
}

export default config
