import React from 'react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'My Work' },
  { id: 'treks', label: 'Treks' },
  { id: 'about', label: 'About Me' }
]

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <div className="text-lg font-display font-semibold">Hriesha Popat</div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {navItems.map((it) => (
            <a key={it.id} href={`#${it.id}`} className="hover:text-accent transition-colors">
              {it.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          {/* For simplicity we keep a minimal mobile nav - links are available in the page */}
          <a href="#work" className="text-sm text-gray-700">Work</a>
        </div>
      </nav>
    </header>
  )
}
