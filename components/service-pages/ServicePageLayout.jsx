'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'
import { Container, Divider, BtnGold, BtnGhost, GoldTag } from '@/components/ui'
import { Icon } from '@/components/icons'

/**
 * Shared premium layout for all service pages.
 *
 * Props:
 *  - heroTitle: string (supports \n for line breaks)
 *  - heroSub: string
 *  - heroImg: string (unsplash URL)
 *  - eyebrow: string
 *  - tag: string (e.g. "AMK London · Expert Service")
 *  - children: page content
 *  - relatedLinks: [{ href, label }]
 */
export default function ServicePageLayout({
  heroTitle,
  heroSub,
  heroImg,
  eyebrow = 'Our Services',
  tag,
  children,
  relatedLinks = [],
}) {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative flex items-end overflow-hidden" style={{ minHeight: '70vh' }}>
          {/* BG */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${heroImg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(18%) brightness(1.05) opacity(0.44)',
            }}
          />
          {/* Gradient */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-page) 0%, rgba(248, 244, 236, 0.64) 60%, transparent 100%)' }} />
          {/* Arch grid */}
          {/* Vertical line */}
          <div
            className="absolute left-[clamp(20px,5vw,60px)] top-[15%] bottom-[15%] w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent-line-strong) 30%, var(--color-accent-line-strong) 70%, transparent)' }}
          />

          <Container className="relative z-10 pb-20 pt-40">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-gold" style={{ color: 'var(--color-muted)' }}>Home</Link>
              <span style={{ color: 'var(--color-subtle)' }}>/</span>
              <Link href="/#services" className="text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-gold" style={{ color: 'var(--color-muted)' }}>Services</Link>
              <span style={{ color: 'var(--color-subtle)' }}>/</span>
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent)' }}>{eyebrow}</span>
            </nav>

            {tag && <GoldTag className="mb-5 inline-block">{tag}</GoldTag>}
            <h1
              className="font-display font-light leading-[0.96] mb-6"
              style={{ fontSize: 'clamp(44px, 6vw, 90px)', color: 'var(--color-ink)', whiteSpace: 'pre-line' }}
            >
              {heroTitle}
            </h1>
            {heroSub && (
              <p className="max-w-xl leading-[1.85]" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'var(--color-text)' }}>
                {heroSub}
              </p>
            )}
            <div className="flex flex-wrap gap-4 mt-10">
              <BtnGold href="/#contact">
                Get a Free Quote
                <Icon name="arrow-right" size={13} className="relative z-10" />
              </BtnGold>
              <BtnGhost href="tel:08715661673">Call 0871 566 1673</BtnGhost>
            </div>
          </Container>
        </section>

        {/* ── Page content ── */}
        <div className="relative" style={{ background: 'var(--color-page)' }}>
          {children}
        </div>

        {/* ── Related services ── */}
        {relatedLinks.length > 0 && (
          <section className="py-24" style={{ background: 'var(--color-panel)' }}>
            <Container>
              <h2 className="font-display font-light text-center mb-12" style={{ fontSize: 'clamp(28px,3vw,44px)', color: 'var(--color-ink)' }}>
                Related Services
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedLinks.map(({ href, label, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center justify-between border p-6 transition-all duration-300 hover:border-gold/30"
                    style={{ background: 'var(--color-panel-strong)', borderColor: 'var(--color-line)' }}
                  >
                    <div>
                      <div className="text-[12px] font-semibold tracking-[0.08em] uppercase mb-1 group-hover:text-[var(--color-ink)] transition-colors" style={{ color: 'var(--color-ink-soft)' }}>{label}</div>
                      {desc && <div className="text-[12px]" style={{ color: 'var(--color-muted)' }}>{desc}</div>}
                    </div>
                    <Icon name="arrow-right" size={16} className="flex-shrink-0 ml-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="relative py-28 overflow-hidden" style={{ background: 'var(--color-page)' }}>
          <div className="absolute left-0 right-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-line), transparent)' }} />
          <Container className="relative z-10 text-center">
            <h2 className="font-display font-light mb-5" style={{ fontSize: 'clamp(32px,4vw,60px)', color: 'var(--color-ink)' }}>
              Let's Build Something<br /><em className="italic">Exceptional Together</em>
            </h2>
            <Divider centered className="mb-8" />
            <p className="max-w-md mx-auto mb-10 leading-[1.85]" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
              Call us now to speak directly with our team, or request a free, no-obligation quote.
              All workmanship guaranteed for 12 months.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <BtnGold href="/#contact">Request a Free Quote</BtnGold>
              <BtnGhost href="tel:08715661673">Call 0871 566 1673</BtnGhost>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatButtons />
    </>
  )
}

/* ─── Reusable page-section primitives ─────────────────── */

export function PageSection({ children, dark = false, className = '' }) {
  return (
    <section
      className={`py-[clamp(60px,8vw,100px)] relative ${className}`}
      style={{ background: dark ? 'var(--color-panel)' : 'var(--color-page)' }}
    >
      {children}
    </section>
  )
}

export function ContentBlock({ eyebrow, title, children, className = '' }) {
  return (
    <div className={className}>
      {title && (
        <h2 className="font-display font-light leading-[1.08] mb-6" style={{ fontSize: 'clamp(26px,3vw,44px)', color: 'var(--color-ink)' }}>
          {title}
        </h2>
      )}
      <Divider className="mb-8" />
      {children}
    </div>
  )
}

export function FeatureList({ items, gold = false }) {
  return (
    <ul className="border-t mt-6" style={{ borderColor: 'var(--color-line)' }}>
      {items.map(item => (
        <li
          key={item}
          className="flex items-center gap-4 py-3.5 border-b text-[13px] font-medium tracking-[0.06em] uppercase"
          style={{ borderColor: 'var(--color-line)', color: gold ? 'var(--color-accent)' : 'var(--color-ink-soft)' }}
        >
          <span className="w-8 h-px flex-shrink-0" style={{ background: gold ? 'var(--color-accent)' : 'var(--color-line-emphasis)' }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function StepCard({ number, title, text }) {
  return (
    <div
      className="flex gap-5 items-start p-6 border transition-all duration-300 group cursor-default hover:border-cream/12"
      style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}
    >
      <div className="font-display text-[36px] font-light leading-none flex-shrink-0 group-hover:text-gold transition-colors" style={{ color: 'var(--color-subtle)' }}>
        {number}
      </div>
      <div>
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--color-ink-soft)' }}>{title}</div>
        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>{text}</p>
      </div>
    </div>
  )
}

export function InfoBox({ children, gold = false }) {
  return (
    <div
      className="p-6 border mt-6"
      style={{
        background: gold ? 'var(--color-accent-tint)' : 'var(--color-tint)',
        borderColor: gold ? 'var(--color-accent-line)' : 'var(--color-line)',
      }}
    >
      {children}
    </div>
  )
}

export function FeatureIconCard({ icon, title, text, compact = false }) {
  return (
    <div
      className={`border transition-all duration-300 cursor-default group hover:border-cream/12 ${compact ? 'p-5' : 'p-7'}`}
      style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}
    >
      <div className="mb-4 text-gold">
        <Icon name={icon} size={compact ? 22 : 28} />
      </div>
      <div className="text-[11.5px] font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: 'var(--color-ink-soft)' }}>
        {title}
      </div>
      <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--color-muted)' }}>
        {text}
      </p>
    </div>
  )
}

export function ImageGallery({ images = [] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t" style={{ borderColor: 'var(--color-line)' }}>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden group break-inside-avoid border pf-item"
            style={{ borderColor: 'var(--color-line)', background: 'var(--color-panel-strong)' }}
          >
            <img
              src={src}
              alt={`Project feature ${i + 1}`}
              className="w-full h-auto pf-img block"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none transition-colors duration-500 group-hover:bg-[var(--color-accent-tint)]" />
          </div>
        ))}
      </div>
    </div>
  )
}
