'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container } from './ui'

const BENEFITS = [
  {
    title: 'Clear from day one',
    text: 'A practical site visit, defined scope and straightforward quote before work begins.',
  },
  {
    title: 'One accountable team',
    text: 'AMK coordinates the trades, schedule and decisions so you are not managing separate contractors.',
  },
  {
    title: 'Finished with care',
    text: 'Detail-led workmanship, a clean handover and support backed by the workmanship guarantee.',
  },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" ref={ref} className="section-space bg-[var(--color-panel)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-16">
          <div className="reveal relative aspect-[4/5] overflow-hidden border border-black/15 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/gallery/why-us-rear-extension.png"
              alt="Completed London rear extension with wide glazed doors"
              fill
              sizes="(max-width: 1023px) 100vw, 56vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="reveal section-title">Built to make a complex project feel simple.</h2>
            <p className="reveal mt-6 max-w-xl text-base leading-7 text-[var(--color-text)] sm:text-lg sm:leading-8">
              AMK manages residential renovation and construction across London—from the first site visit to the final handover—through one experienced point of contact.
            </p>

            <div className="reveal mt-9 border-t-2 border-black">
              {BENEFITS.map((benefit, index) => (
                <div key={benefit.title} className="grid grid-cols-[42px_minmax(0,1fr)] gap-4 border-b border-black/15 py-5 sm:grid-cols-[54px_minmax(0,1fr)] sm:py-6">
                  <span className="font-display text-2xl font-semibold text-[var(--color-ink)]">0{index + 1}</span>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-ink)]">{benefit.title}</h3>
                    <p className="mt-1 text-base leading-7 text-[var(--color-text)]">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
