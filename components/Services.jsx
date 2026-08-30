'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container, Divider } from './ui'

const SERVICE_PAGES = [
  { slug: 'development-renovation', label: 'Development &\nRenovation', img: '/gallery/dr2.jpeg' },
  { slug: 'kitchens-bathrooms', label: 'Kitchens &\nBathrooms', img: '/gallery/kitchen3.jpg' },
  { slug: 'bedrooms', label: 'Bedrooms', img: '/gallery/service-cards/bedroom.png' },
  { slug: 'marble-granite', label: 'Marble &\nGranite', img: '/gallery/dr17.jpeg' },
  { slug: 'flooring', label: 'Flooring', img: '/gallery/service-cards/flooring.png' },
  { slug: 'furnishing', label: 'Furnishing', img: '/gallery/service-cards/furnishing.png' },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function Services() {
  const sectionRef = useScrollReveal()
  const runwayRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const animationFrameRef = useRef(0)
  const paintFallbackRef = useRef(0)
  const scrollStateRef = useRef({ distance: 0, reducedMotion: false })
  const [reducedMotion, setReducedMotion] = useState(false)

  const revealFocusedCard = (event) => {
    const card = event.currentTarget
    const runway = runwayRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!card || !runway || !viewport || !track) return

    if (scrollStateRef.current.reducedMotion) {
      card.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' })
      return
    }

    const cardRect = card.getBoundingClientRect()
    const viewportRect = viewport.getBoundingClientRect()
    const fullyVisible = cardRect.left >= viewportRect.left && cardRect.right <= viewportRect.right
    if (fullyVisible) return

    const maxTravel = scrollStateRef.current.distance
    if (maxTravel <= 0) return

    const targetTravel = clamp(card.offsetLeft - track.offsetLeft, 0, maxTravel)
    const verticalTravel = Math.max(1, runway.offsetHeight - window.innerHeight)
    const targetTop = runway.offsetTop + (targetTravel / maxTravel) * verticalTravel
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }

  useEffect(() => {
    const runway = runwayRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!runway || !viewport || !track) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const paint = () => {
      animationFrameRef.current = 0
      if (paintFallbackRef.current) {
        window.clearTimeout(paintFallbackRef.current)
        paintFallbackRef.current = 0
      }
      if (scrollStateRef.current.reducedMotion) {
        track.style.transform = 'none'
        return
      }

      const scrollableHeight = Math.max(1, runway.offsetHeight - window.innerHeight)
      const progress = clamp(-runway.getBoundingClientRect().top / scrollableHeight, 0, 1)
      const translateX = progress * scrollStateRef.current.distance
      track.style.transform = `translate3d(${-translateX}px, 0, 0)`
    }

    const schedulePaint = () => {
      if (!animationFrameRef.current && !paintFallbackRef.current) {
        animationFrameRef.current = window.requestAnimationFrame(paint)
        paintFallbackRef.current = window.setTimeout(() => {
          if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = 0
          paintFallbackRef.current = 0
          paint()
        }, 50)
      }
    }

    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      scrollStateRef.current.distance = distance
      runway.style.height = scrollStateRef.current.reducedMotion
        ? 'auto'
        : `${window.innerHeight + distance}px`
      schedulePaint()
    }

    const applyMotionPreference = () => {
      const isReduced = motionQuery.matches
      scrollStateRef.current.reducedMotion = isReduced
      setReducedMotion(isReduced)
      measure()
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(viewport)
    resizeObserver.observe(track)
    motionQuery.addEventListener('change', applyMotionPreference)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', schedulePaint, { passive: true })

    applyMotionPreference()

    return () => {
      resizeObserver.disconnect()
      motionQuery.removeEventListener('change', applyMotionPreference)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', schedulePaint)
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current)
      if (paintFallbackRef.current) window.clearTimeout(paintFallbackRef.current)
      animationFrameRef.current = 0
      paintFallbackRef.current = 0
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-[clamp(80px,10vw,140px)]"
      style={{ background: 'var(--color-panel)' }}
    >
      <Container>
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <h2
            className="reveal font-display font-light leading-[1.02]"
            style={{ fontSize: 'clamp(36px,5vw,70px)', color: 'var(--color-ink)', transitionDelay: '80ms' }}
          >
            Everything You Need,<br />
            <em className="italic" style={{ color: 'var(--color-ink-soft)' }}>Under One Roof</em>
          </h2>
          <p
            className="reveal mx-auto mt-5 max-w-lg leading-[1.9]"
            style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'var(--color-muted)', transitionDelay: '160ms' }}
          >
            From just one call, we coordinate your entire project — concept to completion,
            planning permission to final installation, with zero hidden costs.
          </p>
          <Divider centered className="reveal mt-8" style={{ transitionDelay: '200ms' }} />
        </div>
      </Container>

      <div ref={runwayRef} className="relative">
        <div
          ref={viewportRef}
          className={reducedMotion
            ? 'relative w-full overflow-x-auto overscroll-x-contain py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'sticky top-0 flex h-svh w-full items-center overflow-hidden'
          }
        >
          <div
            ref={trackRef}
            className={`flex w-max gap-4 px-4 md:gap-6 md:px-6 lg:px-8 ${reducedMotion ? 'snap-x snap-mandatory' : 'will-change-transform'}`}
          >
            {SERVICE_PAGES.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                priority={index < 2}
                onFocus={revealFocusedCard}
              />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div
          className="reveal mt-12 grid grid-cols-2 gap-px sm:mt-16 sm:grid-cols-4"
          style={{ background: 'var(--color-line-soft)', border: '1px solid var(--color-line)', transitionDelay: '200ms' }}
        >
          {[
            { n: '15+', l: 'Years Experience' },
            { n: '400+', l: 'Projects Completed' },
            { n: '12mo', l: 'Workmanship Guarantee' },
            { n: '£0', l: 'Hidden Costs' },
          ].map(({ n, l }) => (
            <div key={l} className="px-4 py-8 text-center" style={{ background: 'var(--color-panel)' }}>
              <div className="mb-1.5 font-display font-light leading-none" style={{ fontSize: 'clamp(28px,3vw,42px)', color: 'var(--color-ink)' }}>
                {n}
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--color-muted)' }}>{l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServiceCard({ service, priority, onFocus }) {
  const labelText = service.label.replace('\n', ' ')

  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`${labelText} — Learn more`}
      onFocus={onFocus}
      className="group flex h-[min(72svh,620px)] min-h-[480px] w-[calc(100vw-32px)] shrink-0 snap-start flex-col overflow-hidden border-2 transition-shadow duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/50 md:h-[min(70svh,700px)] md:w-[calc((100vw-72px)/2)] lg:w-[calc((100vw-88px)/2)]"
      style={{ background: '#fff', borderColor: '#111' }}
    >
      <div className="flex min-h-[170px] flex-col items-start justify-between gap-6 bg-white px-6 py-7 sm:min-h-[162px] sm:flex-row sm:items-center sm:px-8 lg:px-10">
        <h3
          className="font-body font-bold leading-[0.92] tracking-[-0.045em] text-[#111]"
          style={{ fontSize: 'clamp(34px,3.7vw,56px)', fontWeight: 700, whiteSpace: 'pre-line' }}
        >
          {service.label}
        </h3>
        <span
          className="inline-flex shrink-0 items-center gap-2 border-2 border-[#111] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#111] transition-colors duration-300 group-hover:bg-[#111] group-hover:text-white"
        >
          Learn More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={service.img}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 767px) calc(100vw - 32px), 50vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.025]"
        />
      </div>
    </Link>
  )
}
