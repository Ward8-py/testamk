'use client'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container, Divider } from './ui'

const SERVICE_PAGES = [
  {
    slug: 'development-renovation',
    label: 'Development &\nRenovation',
    tagline: 'Extensions, loft conversions, garages & refurbishments',
    img: '/gallery/renovation background.png',
    accent: 'var(--color-accent)',
    featured: true,
    items: ['Extensions', 'Loft Conversions', 'Garages', 'Brickwork', 'Driveways', 'Full Refurbishments'],
  },
  {
    slug: 'kitchens-bathrooms',
    label: 'Kitchens &\nBathrooms',
    tagline: 'Complete supply, design & installation service',
    img: '/gallery/kitchen3.jpg',
    accent: 'var(--color-text)',
    items: ['Kitchen Design', 'Kitchen Installation', 'Bathroom Fitting', '12-Month Guarantee'],
  },
  {
    slug: 'bedrooms',
    label: 'Bedrooms',
    tagline: 'Made-to-measure bedroom installation',
    img: '/gallery/bed4.jpg',
    accent: 'var(--color-text)',
    items: ['Full Installation', 'Custom Design', 'Survey Service', '12-Month Guarantee'],
  },
  {
    slug: 'marble-granite',
    label: 'Marble &\nGranite',
    tagline: 'Premium worktop installation by specialists',
    img: '/gallery/m14.jpg',
    accent: 'var(--color-text)',
    items: ['Granite Worktops', 'Marble Worktops', 'Bathroom Tops', '8+ Yrs Experience'],
  },
  {
    slug: 'flooring',
    label: 'Flooring',
    tagline: 'All types of flooring supply & installation',
    img: '/gallery/woodenfloor.png',
    accent: 'var(--color-text)',
    items: ['Laminate Flooring', 'Full Installation', 'Supply Only', 'All Styles'],
  },
  {
    slug: 'furnishing',
    label: 'Furnishing',
    tagline: 'Handmade bespoke furniture from our workshop',
    img: '/gallery/furniture.png',
    accent: 'var(--color-text)',
    items: ['Custom Kitchens', 'Bespoke Bedrooms', 'Fitted Furniture', '12-Month Guarantee'],
  },
]

export default function Services() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-[clamp(80px,10vw,140px)] overflow-hidden"
      style={{ background: 'var(--color-panel)' }}
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-20">
          <h2
            className="font-display font-light leading-[1.02] reveal"
            style={{ fontSize: 'clamp(36px,5vw,70px)', color: 'var(--color-ink)', transitionDelay: '80ms' }}
          >
            Everything You Need,<br />
            <em className="italic" style={{ color: 'var(--color-ink-soft)' }}>Under One Roof</em>
          </h2>
          <p
            className="max-w-lg mx-auto mt-5 leading-[1.9] reveal"
            style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'var(--color-muted)', transitionDelay: '160ms' }}
          >
            From just one call, we coordinate your entire project — concept to completion,
            planning permission to final installation, with zero hidden costs.
          </p>
          <Divider centered className="mt-8 reveal" style={{ transitionDelay: '200ms' }} />
        </div>

        {/* ── Featured card (Development & Renovation) ── */}
        {SERVICE_PAGES.filter(s => s.featured).map(service => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="reveal group block mb-3"
          >
            <div
              className="relative overflow-hidden border transition-all duration-500 group-hover:border-gold/30"
              style={{ background: 'var(--color-panel-strong)', borderColor: 'var(--color-line)', minHeight: 320 }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${service.img}')`, filter: 'grayscale(18%) brightness(1.08) opacity(0.24)' }}
              />
              {/* Content */}
              <div className="relative z-10 p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 h-full" style={{ minHeight: 320 }}>
                <div className="flex-1">
                  <h3
                    className="font-display font-light leading-[1.0] mb-4"
                    style={{ fontSize: 'clamp(36px,4vw,60px)', color: 'var(--color-ink)', whiteSpace: 'pre-line' }}
                  >
                    {service.label}
                  </h3>
                  <p className="text-[14px] max-w-md leading-[1.8]" style={{ color: 'var(--color-text)' }}>
                    {service.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {service.items.map(item => (
                      <span
                        key={item}
                        className="text-[9px] font-semibold tracking-[0.22em] uppercase px-3 py-1.5 border"
                        style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent-line-strong)', background: 'var(--color-accent-tint)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="flex-shrink-0 flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:gap-5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <span>Explore Service</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* Gold left accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)' }} />
            </div>
          </Link>
        ))}

        {/* ── Service grid (5 cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-3">
          {SERVICE_PAGES.filter(s => !s.featured).map((service, i) => (
            <ServiceCard key={service.slug} service={service} delay={`${i * 60}ms`} />
          ))}
        </div>

        {/* Trust bar */}
        <div
          className="mt-16 reveal grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{ background: 'var(--color-line-soft)', border: '1px solid var(--color-line)', transitionDelay: '200ms' }}
        >
          {[
            { n: '15+', l: 'Years Experience' },
            { n: '400+', l: 'Projects Completed' },
            { n: '12mo', l: 'Workmanship Guarantee' },
            { n: '£0', l: 'Hidden Costs' },
          ].map(({ n, l }) => (
            <div key={l} className="text-center py-8 px-4" style={{ background: 'var(--color-panel)' }}>
              <div className="font-display font-light leading-none mb-1.5" style={{ fontSize: 'clamp(28px,3vw,42px)', color: 'var(--color-ink)' }}>
                {n}
              </div>
              <div className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>{l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServiceCard({ service, delay }) {
  const { slug, label, tagline, img, items } = service

  return (
    <Link href={`/services/${slug}`} className={`reveal group block`} style={{ transitionDelay: delay }}>
      <div
        className="relative overflow-hidden border transition-all duration-500 group-hover:border-cream/20 h-full flex flex-col"
        style={{ background: 'var(--color-panel-strong)', borderColor: 'var(--color-line)' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
            style={{ backgroundImage: `url('${img}')`, filter: 'grayscale(20%) brightness(1.02) opacity(0.62)' }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-panel-strong) 0%, transparent 60%)' }} />
          {/* Arrow on hover */}
          <div
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: 'var(--color-accent-tint-strong)', borderColor: 'var(--color-accent-line-strong)', color: 'var(--color-accent)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3
            className="font-display font-light leading-tight mb-2 group-hover:text-[var(--color-ink)] transition-colors duration-300"
            style={{ fontSize: 'clamp(20px,2vw,26px)', color: 'var(--color-ink-soft)', whiteSpace: 'pre-line' }}
          >
            {label}
          </h3>
          <p className="text-[12px] leading-[1.65] mb-4 flex-1" style={{ color: 'var(--color-muted)' }}>
            {tagline}
          </p>
          <ul className="space-y-1.5 border-t pt-4" style={{ borderColor: 'var(--color-line)' }}>
            {items.slice(0, 3).map(item => (
              <li key={item} className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--color-muted)' }}>
                <span className="w-3 h-px flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                {item}
              </li>
            ))}
          </ul>
          <div
            className="mt-5 text-[10px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
            style={{ color: 'var(--color-accent)' }}
          >
            Learn More
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>

        {/* Bottom gold line reveal */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
          style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))' }}
        />
      </div>
    </Link>
  )
}
