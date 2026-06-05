'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container, BtnPrimary, BtnGhost, ArrowRight } from './ui'

const STATS = [
  { num: '15+', label: 'Years Experience' },
  { num: '400+', label: 'Projects Completed' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '12mo', label: 'Workmanship Guarantee' },
]

export default function Hero() {
  const ref = useScrollReveal()

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" ref={ref}>

      {/* Background image */}
      <div
        className="hero-bg absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(248, 244, 236, 0.94) 0%, rgba(248, 244, 236, 0.84) 48%, rgba(248, 244, 236, 0.72) 100%),
            linear-gradient(to bottom, rgba(248,244,236,0.5), transparent 42%, rgba(248,244,236,0.74)),
            url('/gallery/cover.png') center/cover no-repeat
          `,
        }}
      />

      {/* Architectural grid */}
      <div className="arch-grid absolute inset-0 pointer-events-none" />

      {/* Vertical accent line */}
      <div
        className="absolute left-5 sm:left-8 lg:left-14 top-[18%] bottom-[18%] w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent-line-strong) 30%, var(--color-accent-line-strong) 70%, transparent)' }}
      />

      {/* AMK watermark */}
      <div className="absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden md:block">
        <svg width="420" height="300" viewBox="0 0 400 280">
          <text x="50%" y="75%" textAnchor="middle" fontFamily="Georgia,serif" fontSize="210" fontWeight="bold" fill="var(--color-ink)" letterSpacing="-6">AMK</text>
        </svg>
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-28 pb-[300px] sm:pb-28">
        <div className="reveal" style={{ transitionDelay: '0ms' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-7 h-px bg-gold" />
            <p className="font-body text-[10px] font-semibold tracking-[0.3em] uppercase text-gold">
              London's Premier Construction Partner
            </p>
          </div>
        </div>

        <div className="reveal mb-7" style={{ transitionDelay: '80ms' }}>
          <h1
            className="font-display font-light leading-[0.96] text-cream"
            style={{ fontSize: 'clamp(46px, 8vw, 118px)' }}
          >
            Building<br />
            <em className="italic text-silver-bright">Excellence.</em><br />
            <span className="metal-text">Crafting Vision.</span>
          </h1>
        </div>

        <div className="reveal mb-12" style={{ transitionDelay: '160ms' }}>
          <p
            className="font-weight-300 text-silver-light leading-[1.9] max-w-[500px]"
            style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}
          >
            Specialists in property development, renovation, and construction across London —
            delivering precision-crafted results from concept to completion. All workmanship
            guaranteed for <strong className="text-silver-light font-medium">12 months.</strong>
          </p>
        </div>

        <div className="reveal flex gap-4 flex-wrap" style={{ transitionDelay: '240ms' }}>
          <BtnPrimary onClick={() => scrollTo('#contact')}>
            <span className="relative z-10">Get a Free Quote</span>
            <ArrowRight />
          </BtnPrimary>
          <BtnGhost onClick={() => scrollTo('#portfolio')}>
            View Our Work
          </BtnGhost>
        </div>
      </Container>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t"
        style={{
          background: 'rgba(253, 250, 244, 0.92)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--color-line-strong)',
        }}
      >
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {STATS.map(({ num, label }, i) => (
              <div
                key={label}
                className="py-6 px-4 text-center border-r border-cream/[0.06] last:border-r-0 reveal"
                style={{ transitionDelay: `${320 + i * 80}ms` }}
              >
                <div
                  className="font-display font-light text-cream leading-none mb-1.5"
                  style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}
                >
                  {num.replace(/\d+/, (n) => n).replace('+', '')}
                  <span className="text-gold" style={{ fontSize: '0.58em' }}>
                    {num.includes('+') ? '+' : num.includes('%') ? '%' : ''}
                  </span>
                  {num === '12mo' && <span className="text-gold" style={{ fontSize: '0.58em' }}>mo</span>}
                </div>
                <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-silver-mid">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
