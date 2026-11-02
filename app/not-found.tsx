import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1 className="text-lg font-medium">7.</h1>
      <p className="mt-4 max-w-prose text-muted">
        The robber took this page. Everyone discards.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        ← back to the island
      </Link>
    </div>
  )
}
