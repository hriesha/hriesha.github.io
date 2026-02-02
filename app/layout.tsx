import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Nav from '@/components/Nav'
import './globals.css'

const font = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hriesha Popat',
  description: 'Personal website of Hriesha Popat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={font.className}>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="mx-auto max-w-2xl px-6 py-12 md:px-8 md:py-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
