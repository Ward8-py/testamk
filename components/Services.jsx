'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { SERVICES } from '@/lib/services'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container } from './ui'
import { Icon } from './icons'
import { useQuote } from './QuoteProvider'

export default function Services() {
  const revealRef = useScrollReveal()
  const railRef = useRef(null)
  const animationFrameRef = useRef(0)
  const [position, setPosition] = useState(0)
  const { openQuote } = useQuote()

  const updatePosition = useCallback(() => {
    animationFrameRef.current = 0
    const rail = railRef.current
    if (!rail) return
    const cards = Array.from(rail.querySelectorAll('[data-service-card]'))
    if (!cards.length) return

    const closest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - rail.scrollLeft)
      return distance < best.distance ? { index, distance } : best
    }, { index: 0, distance: Number.POSITIVE_INFINITY })
    setPosition(closest.index)
  }, [])

  const handleScroll = () => {
    if (animationFrameRef.current) return
    animationFrameRef.current = window.requestAnimationFrame(updatePosition)
  }

  const moveTo = (nextPosition) => {
    const rail = railRef.current
    const cards = rail ? Array.from(rail.querySelectorAll('[data-service-card]')) : []
    if (!rail || !cards.length) return
    const clamped = Math.min(SERVICES.length - 1, Math.max(0, nextPosition))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rail.scrollTo({ left: cards[clamped].offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
    setPosition(clamped)
  }

  return (
    <section id="services" ref={revealRef} className="section-space overflow-hidden bg-[var(--color-page)]">
      <Container>
        <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:items-end md:gap-12">
          <h2 className="reveal section-title max-w-3xl">
            One team for the whole home.
          </h2>
          <p className="reveal max-w-md text-base leading-7 text-[var(--color-text)]">
            Choose where your project starts. We’ll ask for the details in one short quote request.
          </p>
        </div>

        <div className="reveal flex items-end justify-between gap-5 border-t border-black/15 pt-5">
          <p className="text-sm font-semibold text-[var(--color-ink)]" aria-live="polite">
            <span className="tabular-nums">{String(position + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-[var(--color-subtle)]">/</span>
            <span className="tabular-nums text-[var(--color-muted)]">{String(SERVICES.length).padStart(2, '0')}</span>
          </p>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => moveTo(position - 1)}
              disabled={position === 0}
              className="rail-control"
              aria-label="Previous service"
            >
              <Icon name="arrow-left" size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveTo(position + 1)}
              disabled={position === SERVICES.length - 1}
              className="rail-control"
              aria-label="Next service"
            >
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] md:hidden">
            Swipe to explore
          </span>
        </div>
      </Container>

      <div className="mx-auto mt-6 w-full max-w-[1440px]">
        <div
          ref={railRef}
          onScroll={handleScroll}
          className="service-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:gap-6 lg:px-[max(56px,calc((100vw-1320px)/2+56px))]"
          aria-label="Services"
        >
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              type="button"
              data-service-card
              onClick={() => openQuote({ service: service.label, source: 'service-card' })}
              className="service-card group snap-start border-2 border-black bg-white text-left focus-visible:ring-4 focus-visible:ring-black/25"
              aria-label={`Request a quote for ${service.label}`}
            >
              <span className="flex min-h-[116px] items-end justify-between gap-4 border-b-2 border-black bg-white p-5 sm:min-h-[132px] sm:p-7">
                <span className="max-w-[85%] font-body text-[clamp(30px,3.3vw,52px)] font-bold leading-[0.92] tracking-[-0.045em] text-black">
                  {service.label}
                </span>
                <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center border-2 border-black text-black transition-[background-color,color] duration-150 group-hover:bg-black group-hover:text-white" aria-hidden="true">
                  <Icon name="arrow-right" size={18} />
                </span>
              </span>
              <span className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-panel)] sm:aspect-[5/6]">
                <Image
                  src={service.image}
                  alt={`${service.label} by AMK London`}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 767px) 84vw, (max-width: 1199px) 48vw, 31vw"
                  className="object-cover"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
