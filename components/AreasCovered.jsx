'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container } from './ui'

const AREAS = [
  'Chiswick',
  'Acton',
  'Balham',
  'Battersea',
  'Chelsea',
  'Clapham',
  'Croydon',
]

export default function AreasCovered() {
  const ref = useScrollReveal()

  return (
    <section
      id="areas-we-cover"
      ref={ref}
      aria-labelledby="areas-we-cover-title"
      className="section-space border-y border-black/10 bg-white"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(250px,.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="reveal text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              London coverage
            </p>
            <h2
              id="areas-we-cover-title"
              className="reveal mt-4 max-w-md font-display text-[clamp(48px,6vw,82px)] font-semibold leading-[0.95] tracking-[-0.035em] text-[var(--color-ink)] [text-wrap:balance]"
            >
              Areas we cover.
            </h2>
          </div>

          <ul className="reveal border-t-2 border-black" aria-label="London areas served by AMK">
            {AREAS.map((area) => (
              <li
                key={area}
                className="border-b border-black/20 py-5 sm:py-6"
              >
                <span className="block font-display text-[clamp(34px,4.2vw,58px)] font-medium leading-none tracking-[-0.025em] text-[var(--color-ink)]">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
