'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container } from './ui'
import { Icon } from './icons'

const TESTIMONIALS = [
  {
    name: 'James Mitchell',
    location: 'Harrow, London',
    text: 'AMK transformed our Victorian terrace beyond all expectations. The team was professional, efficient, and kept us informed throughout. The quality of craftsmanship is simply outstanding — we would not hesitate to recommend them to anyone.',
  },
  {
    name: 'Sarah Rahman',
    location: 'Wembley, London',
    text: 'We had our loft converted and a rear kitchen extension added simultaneously. AMK managed the entire project flawlessly — on time, on budget, with zero hidden costs. The result is absolutely beautiful. Truly professional service from start to finish.',
  },
  {
    name: 'David Kowalski',
    location: 'Ealing, London',
    text: 'From the initial consultation right through to final handover, AMK London was exceptional. Their consultant understood our vision immediately, and their team delivered it with incredible precision. Our home is unrecognisable — in the best possible way.',
  },
  {
    name: 'Amanda Clarke',
    location: 'Kensington, London',
    text: 'The marble worktop installation in our kitchen is a masterpiece. Eight years of experience really shows — perfectly cut, seamlessly fitted, and finished beautifully. The 12-month guarantee gave us complete peace of mind too.',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useScrollReveal()
  const testimonial = TESTIMONIALS[current]

  const change = (direction) => {
    setCurrent((index) => (index + direction + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section id="testimonials" ref={ref} className="section-space bg-[var(--color-panel)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(220px,.55fr)_minmax(0,1.45fr)] lg:gap-20">
          <div>
            <h2 className="reveal section-title">Trusted with the whole home.</h2>
            <div className="reveal mt-8 flex items-center gap-3">
              <button type="button" onClick={() => change(-1)} className="rail-control" aria-label="Previous testimonial">
                <Icon name="arrow-left" size={18} />
              </button>
              <button type="button" onClick={() => change(1)} className="rail-control" aria-label="Next testimonial">
                <Icon name="arrow-right" size={18} />
              </button>
              <span className="ml-2 text-sm font-bold tabular-nums text-[var(--color-muted)]" aria-live="polite">
                {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <figure className="reveal border-t-2 border-black pt-7" aria-live="polite">
            <blockquote className="font-display text-[clamp(30px,4vw,56px)] font-medium leading-[1.12] tracking-[-0.025em] text-[var(--color-ink)]">
              “{testimonial.text}”
            </blockquote>
            <figcaption className="mt-8 border-t border-black/15 pt-5 text-sm text-[var(--color-muted)]">
              <span className="font-bold text-[var(--color-ink)]">{testimonial.name}</span>
              <span className="mx-2" aria-hidden="true">—</span>
              {testimonial.location}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
