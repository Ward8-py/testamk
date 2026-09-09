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
  'Ealing',
  'Earlsfield',
  'Elmbridge',
  'Epsom',
  'Fulham',
  'Hammersmith',
  'Hampton',
  'Harrow',
  'Hillingdon',
  'Hounslow',
  'Kensington',
  'Kew',
  'Maida Vale',
  'Mortlake',
  'Putney',
  'Richmond',
  'Sheen',
  'Surrey',
  'Teddington',
  'Tooting',
  'Twickenham',
  'Wandsworth',
  'West London',
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
              London &amp; Surrey coverage
            </p>
            <h2
              id="areas-we-cover-title"
              className="reveal mt-4 max-w-md font-display text-[clamp(48px,6vw,82px)] font-semibold leading-[0.95] tracking-[-0.035em] text-[var(--color-ink)] [text-wrap:balance]"
            >
              Areas we cover.
            </h2>
            <p
              id="areas-scroll-help"
              className="reveal mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]"
            >
              Scroll to browse all {AREAS.length} areas ↓
            </p>
          </div>

          <div
            className="reveal h-[362px] overflow-y-auto overscroll-contain border-t-2 border-black pr-3 [scrollbar-gutter:stable] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:h-[402px]"
            role="region"
            aria-label="Areas served by AMK"
            aria-describedby="areas-scroll-help"
            tabIndex={0}
          >
            <ul>
              {AREAS.map((area) => (
                <li
                  key={area}
                  className="flex h-[72px] items-center border-b border-black/20 sm:h-[80px]"
                >
                  <span className="block font-display text-[clamp(32px,4.2vw,56px)] font-medium leading-none tracking-[-0.025em] text-[var(--color-ink)]">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
