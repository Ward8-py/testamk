'use client'

export default function AMKLogo({ size = 44 }) {
  const id = `metal-${size}`
  const width = Math.round(size * 1.55)

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 124 62"
      aria-label="AMK London Building Construction"
      className="overflow-visible flex-shrink-0"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8f7a4a" />
          <stop offset="40%"  stopColor="var(--color-accent-light)" />
          <stop offset="70%"  stopColor="#9a7c35" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>

      {/* Pure AMK lettermark - no house */}
      <text
        x="2"
        y="54"
        fontFamily="Georgia, serif"
        fontSize="58"
        fontWeight="bold"
        fill={`url(#${id})`}
        letterSpacing="-4"
      >
        AMK
      </text>
    </svg>
  )
}
