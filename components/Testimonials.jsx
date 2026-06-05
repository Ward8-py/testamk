'use client'

import { useState, useEffect, useCallback } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Section, Container, Eyebrow } from './ui'
import { Icon } from './icons'

const TESTIMONIALS = [
  {
    initials: 'JM',
    name:     'James Mitchell',
    location: 'Harrow, London',
    text:     'AMK transformed our Victorian terrace beyond all expectations. The team was professional, efficient, and kept us informed throughout. The quality of craftsmanship is simply outstanding — we would not hesitate to recommend them to anyone.',
  },
  {
    initials: 'SR',
    name:     'Sarah Rahman',
    location: 'Wembley, London',
    text:     'We had our loft converted and a rear kitchen extension added simultaneously. AMK managed the entire project flawlessly — on time, on budget, with zero hidden costs. The result is absolutely beautiful. Truly professional service from start to finish.',
  },
  {
    initials: 'DK',
    name:     'David Kowalski',
    location: 'Ealing, London',
    text:     'From the initial consultation right through to final handover, AMK London was exceptional. Their consultant understood our vision immediately, and their team delivered it with incredible precision. Our home is unrecognisable — in the best possible way.',
  },
  {
    initials: 'AC',
    name:     'Amanda Clarke',
    location: 'Kensington, London',
    text:     'The marble worktop installation in our kitchen is a masterpiece. Eight years of experience really shows — perfectly cut, seamlessly fitted, and finished beautifully. The 12-month guarantee gave us complete peace of mind too.',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useScrollReveal()

  const next = useCallback(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [])

  useEffect(() => {
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next])

  return (
    <Section
      id="testimonials"
      className="py-[clamp(80px,10vw,140px)] overflow-hidden relative"
      style={{ background: 'var(--color-panel)' }}
    >
      {/* Giant decorative quote */}
      <div
        className="absolute top-[-60px] right-[4%] font-display leading-none pointer-events-none select-none hidden lg:block"
        style={{ fontSize: '380px', color: 'var(--color-tint-strong)' }}
        aria-hidden="true"
      >
        "
      </div>

      <div ref={ref}>
        <Container>
          <div className="text-center mb-14">
            <Eyebrow className="reveal mb-4">Testimonials</Eyebrow>
            <h2
              className="font-display font-light text-cream leading-[1.05] reveal"
              style={{ fontSize: 'clamp(34px,4.5vw,64px)', transitionDelay: '80ms' }}
            >
              What Our Clients Say
            </h2>
          </div>

          {/* Slider */}
          <div className="max-w-[840px] mx-auto reveal" style={{ transitionDelay: '160ms' }}>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out-expo"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="flex-shrink-0 w-full px-4">
                    <div
                      className="relative border border-cream/12 p-10 sm:p-12"
                      style={{ background: 'var(--color-surface)' }}
                    >
                      {/* Top gold bar */}
                      <div
                        className="absolute top-0 left-10 h-[2px] w-10"
                        style={{ background: 'var(--color-accent)' }}
                      />

                      {/* Stars */}
                      <div className="flex gap-1.5 mb-6 text-gold">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon key={i} name="star" size={15} />
                        ))}
                      </div>

                      {/* Quote text */}
                      <blockquote
                        className="font-display font-light italic text-silver-bright leading-[1.75] mb-8"
                        style={{ fontSize: 'clamp(17px,1.7vw,22px)' }}
                      >
                        "{t.text}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display text-[17px] font-medium text-[var(--color-ink)]"
                          style={{ background: 'linear-gradient(135deg, var(--color-subtle), var(--color-text))' }}
                        >
                          {t.initials}
                        </div>
                        <div>
                          <div className="text-[12.5px] font-semibold tracking-[0.07em] text-cream">
                            {t.name}
                          </div>
                          <div className="text-[11px] text-silver-mid mt-0.5">{t.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 border border-cream/12 flex items-center justify-center text-silver hover:text-gold hover:border-gold/40 transition-all duration-300 focus:outline-none"
                aria-label="Previous testimonial"
              >
                <Icon name="arrow-left" size={16} />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="h-[2px] transition-all duration-300 focus:outline-none"
                    style={{
                      width: current === i ? 36 : 18,
                      background: current === i ? 'var(--color-accent)' : 'var(--color-line-emphasis)',
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 border border-cream/12 flex items-center justify-center text-silver hover:text-gold hover:border-gold/40 transition-all duration-300 focus:outline-none"
                aria-label="Next testimonial"
              >
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
