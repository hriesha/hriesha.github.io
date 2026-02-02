'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/hikes', label: 'Hikes' },
]

export default function Nav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/about"
          className="text-base font-medium hover:no-underline"
        >
          Hi I'm Hriesha
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'transition-colors hover:no-underline',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
          >
            {mounted ? (
              theme === 'dark' ? (
                <span className="text-sm">☀</span>
              ) : (
                <span className="text-sm">☾</span>
              )
            ) : (
              <span className="text-sm opacity-0">☾</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
