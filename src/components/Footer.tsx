import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="mt-16 border-t border-gray-100 bg-white/60">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">© {year} Hriesha Popat</div>
        <div className="flex items-center gap-4">
          <a href="mailto:hi@example.com" className="text-gray-700 hover:text-accent">Email</a>
          <a href="https://linkedin.com" className="text-gray-700 hover:text-accent">LinkedIn</a>
          <a href="https://github.com" className="text-gray-700 hover:text-accent">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
