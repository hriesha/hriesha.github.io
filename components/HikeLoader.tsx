// A little hand-drawn trail that keeps being walked while a hike photo loads.

const captions = [
  'still climbing…',
  'almost at the top…',
  'catching my breath…',
  'worth the view, promise…',
]

const TRAIL = 'M8 92 Q30 84 38 68 Q48 62 52 50 Q56 40 60 32'

export default function HikeLoader({ index = 0 }: { index?: number }) {
  return (
    <div className="hike-loader" aria-label="Loading photo" role="status">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="hike-sun" cx="78" cy="24" r="6" />
        <path className="hike-mtn" d="M4 80 L26 46 L38 60 L58 30 L78 60 L96 80" />
        <path className="hike-snow" d="M52 40 L58 30 L64 40" />
        <path className="hike-trail" d={TRAIL} />
        <circle className="hike-hiker" r="2.2" style={{ offsetPath: `path('${TRAIL}')` }} />
      </svg>
      <span>{captions[index % captions.length]}</span>
    </div>
  )
}
