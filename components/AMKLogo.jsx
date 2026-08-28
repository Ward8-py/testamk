'use client'

/** Solid monochrome lettermark. Inherits `color` from its container, so the
 *  navbar can flip it to white over the dark hero and back to ink on light
 *  pages without a second asset. */
export default function AMKLogo({ size = 44 }) {
  const width = Math.round(size * 1.55)

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 124 62"
      aria-label="AMK London Building Construction"
      className="overflow-visible flex-shrink-0"
    >
      <text
        x="2"
        y="54"
        fontFamily="Georgia, serif"
        fontSize="58"
        fontWeight="bold"
        fill="currentColor"
        letterSpacing="-4"
      >
        AMK
      </text>
    </svg>
  )
}
