import React, { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectsSection from './components/ProjectsSection'
import TreksSection from './components/TreksSection'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  // spotlight uses CSS variables --mx and --my; we update them on mouse move.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      document.documentElement.style.setProperty('--mx', x + 'px')
      document.documentElement.style.setProperty('--my', y + 'px')
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div className="min-h-screen bg-neutralSoft text-gray-900 font-sans">
      {/* Spotlight overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500 opacity-100"
        style={{
          background: 'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(108,122,235,0.10), transparent 40%)'
        }}
      />

      <Header />
      <main className="max-w-6xl mx-auto px-6 md:px-10">
        <Hero />
        <ProjectsSection />
        <TreksSection />
        <About />
      </main>
      <Footer />
    </div>
  )
}
