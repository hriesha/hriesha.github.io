import HexIsland from '@/components/HexIsland'
import Wave from '@/components/Wave'

export default function Home() {
  return (
    <div>
      <p className="max-w-prose text-muted">
        I build the systems behind startup sourcing at Two Ravens, help run DubHacks NEXT, and
        study honors in Data Science at UW. Everything I&apos;ve built is on the island below, very much inspired by Catan, my favourite board game.
      </p>

      <Wave className="mt-8" />

      <HexIsland />
    </div>
  )
}
