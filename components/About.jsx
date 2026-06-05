'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container, Eyebrow, Divider } from './ui'
import { Icon } from './icons'

const PILLARS = [
  { icon: 'scissors', title: 'Cut the Middleman', text: 'We deal directly with you -- no agents, no mark-ups, no third parties.' },
  { icon: 'trophy', title: 'Premium Workmanship', text: 'A perfect finish every time, delivered by our trained expert team.' },
  { icon: 'smile', title: 'Customer Satisfaction', text: 'Hundreds of satisfied clients and recommended by major suppliers.' },
  { icon: 'lock', title: '12-Month Guarantee', text: 'All our workmanship is guaranteed for 12 full months.' },
]

export default function About() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-[clamp(80px,10vw,140px)] bg-black overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-line-strong), transparent)' }} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Left: Image ── */}
          <div className="reveal-left relative w-full pt-[125%]">
            <div className="absolute -top-4 -left-4 right-4 -bottom-4 border border-gold/20 pointer-events-none z-0" />
            <div className="absolute inset-0 z-10 overflow-hidden">
              <Image
                src="/gallery/new (2).png"
                alt="AMK London — Expert construction craftsmen at work"
                fill
                className="object-cover"
                style={{ filter: 'grayscale(10%) contrast(1.04)' }}
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute bottom-10 -right-6 sm:-right-8 z-20 text-center px-6 py-5 border border-cream/[0.12]"
              style={{ background: 'var(--color-surface)' }}
            >
              <div className="font-display text-[44px] font-light leading-none" style={{ color: 'var(--color-accent)' }}>15</div>
              <div className="text-[9px] tracking-[0.18em] uppercase mt-1 leading-tight" style={{ color: 'var(--color-muted)' }}>
                Years of<br />Excellence
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="reveal-right">
            <Eyebrow className="mb-4">About AMK London</Eyebrow>
            <h2
              className="font-display font-light leading-[1.08] mb-1"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--color-ink)' }}
            >
              A Well-Established<br />
              <em className="italic" style={{ color: 'var(--color-ink-soft)' }}>London Building Company</em>
            </h2>
            <Divider className="my-6" />

            <p className="leading-[1.85] mb-4" style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'var(--color-text)' }}>
              AMK Building Construction Ltd are a well established building company covering the city of
              London and its surrounding regions. We are professional, qualified and with years of experience —
              providing premium workmanship and delivering a perfect finish every time.
            </p>
            <p className="leading-[1.85] mb-4" style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'var(--color-text)' }}>
              With hundreds of satisfied clients, we are also recommended by various suppliers based on
              the feedback received from our clients. We guarantee all our workmanship for{' '}
              <strong className="font-medium" style={{ color: 'var(--color-ink-soft)' }}>12 months</strong>, and are quick, clean
              and professional.
            </p>
            <p className="leading-[1.85] mb-8" style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'var(--color-text)' }}>
              We endeavour to be cost effective and competitive in all tenders, and guarantee to offer a
              fair price with no hidden extras — so our clients are always confident and happy.
            </p>

            {/* Four pillars */}
            <div className="grid grid-cols-2 gap-3">
              {PILLARS.map(({ icon, title, text }) => (
                <div
                  key={title}
                  className="border p-4 transition-all duration-300 cursor-default group"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-line)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-line-strong)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-line)'}
                >
                  <div className="mb-3 text-gold"><Icon name={icon} size={22} /></div>
                  <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-1" style={{ color: 'var(--color-ink-soft)' }}>
                    {title}
                  </div>
                  <div className="text-[11.5px] leading-[1.6]" style={{ color: 'var(--color-muted)' }}>{text}</div>
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="mt-8 flex items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--color-line)' }}>
              <a
                href="tel:08715661673"
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-cream/12 group-hover:border-gold/40 transition-colors" style={{ background: 'var(--color-surface)' }}>
                  <Icon name="phone" size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.2em] uppercase mb-0.5" style={{ color: 'var(--color-accent)' }}>Call Us Now</div>
                  <div className="text-[15px] font-medium tracking-tight" style={{ color: 'var(--color-ink)' }}>0871 566 1673</div>
                </div>
              </a>
              <div className="ml-4 text-[12px] leading-[1.6]" style={{ color: 'var(--color-muted)' }}>
                Speak directly, discuss a new project<br />or arrange a meeting instantly.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
