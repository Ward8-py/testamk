'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AMKLogo from './AMKLogo'
import { BtnGold } from './ui'
import { Icon } from './icons'

const SERVICE_LINKS = [
  { href: '/services/development-renovation', label: 'Development & Renovation', desc: 'Extensions, loft conversions & refurbishments' },
  { href: '/services/kitchens-bathrooms',     label: 'Kitchens & Bathrooms',     desc: 'Supply, design & installation'                },
  { href: '/services/bedrooms',               label: 'Bedrooms',                 desc: 'Complete bedroom fitting service'              },
  { href: '/services/marble-granite',         label: 'Marble & Granite',         desc: 'Specialist worktop installation'               },
  { href: '/services/flooring',               label: 'Flooring',                 desc: 'All types - supply & installation'             },
  { href: '/services/furnishing',             label: 'Furnishing',               desc: 'Handmade bespoke furniture'                    },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [svcOpen,       setSvcOpen]       = useState(false)
  const [mobSvcOpen,    setMobSvcOpen]    = useState(false)
  const pathname = usePathname()
  const dropRef  = useRef(null)
  const isHome   = pathname === '/'
  // The home hero is a dark, full-bleed video. Start true on home so the first
  // paint is already light-on-dark rather than flashing dark text over it.
  const [overHero, setOverHero] = useState(isHome)

  useEffect(() => {
    const NAV_H = 70
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // The hero is a tall pinned section, so scrollY alone can't say whether the
      // bar is still over it — measure the section's own bottom edge instead.
      const hero = isHome ? document.querySelector('#hero') : null
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > NAV_H)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setSvcOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setMobSvcOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    if (isHome) {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/${id}`
    }
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  // NB: the previous `bg-black/88` / `bg-black/96` emitted no CSS at all —
  // Tailwind's opacity scale has no 88 or 96 step — so the bar was always fully
  // transparent. Set the surface explicitly instead.
  const navStyle = overHero
    ? { background: 'transparent', borderColor: 'rgba(255,255,255,0.12)' }
    : { background: 'rgba(255,255,255,0.94)', borderColor: 'var(--color-line)' }

  // Over the dark hero the light-theme ink tokens are unreadable, so flip them.
  const inkStrong = overHero ? '#ffffff'                  : 'var(--color-ink)'
  const inkSoft   = overHero ? 'rgba(255,255,255,0.72)'   : 'var(--color-muted)'
  const linkIdle  = overHero ? 'rgba(255,255,255,0.86)'   : 'var(--color-text)'
  const linkHover = overHero ? '#ffffff'                  : 'var(--color-ink)'
  const barColor  = overHero ? '#ffffff'                  : 'var(--color-ink-soft)'

  return (
    <>
      <nav
        style={navStyle}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 backdrop-blur-xl border-b"
      >
        <div className="flex items-center justify-between h-[70px] px-5 sm:px-8 lg:px-14 max-w-site mx-auto">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none" aria-label="AMK London - Home"
                style={{ color: inkStrong }}>
            <AMKLogo size={40} />
            <div className="leading-tight hidden sm:block">
              <div className="font-body text-[13px] font-semibold tracking-[0.12em] uppercase" style={{ color: inkStrong }}>AMK London</div>
              <div className="font-body text-[9px] tracking-[0.22em] uppercase" style={{ color: inkSoft }}>Building Construction Ltd</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 list-none">
            {/* Home */}
            <li>
              <Link href="/" className="font-body text-[10.5px] font-medium tracking-[0.18em] uppercase gold-link transition-colors" style={{ color: linkIdle }}
                onMouseEnter={e => e.currentTarget.style.color = linkHover}
                onMouseLeave={e => e.currentTarget.style.color = linkIdle}
              >
                Home
              </Link>
            </li>

            {/* Services dropdown */}
            <li className="relative" ref={dropRef}>
              <button
                type="button"
                onClick={() => setSvcOpen(v => !v)}
                onMouseEnter={() => setSvcOpen(true)}
                className="flex items-center gap-1.5 font-body text-[10.5px] font-medium tracking-[0.18em] uppercase focus:outline-none gold-link transition-colors"
                style={{ color: linkIdle }}
              >
                Services
                <Icon name="chevron-down" size={9} className={`transition-transform duration-200 ${svcOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              <div
                onMouseLeave={() => setSvcOpen(false)}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] border shadow-[0_24px_70px_rgba(37,31,24,0.16)] transition-all duration-300 ${svcOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line-strong)' }}
              >
                {/* Header */}
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-line)', background: 'var(--color-panel-strong)' }}>
                  <span className="text-[9px] font-semibold tracking-[0.28em] uppercase" style={{ color: 'var(--color-accent)' }}>Our Services</span>
                  <Link href="/#services" onClick={() => setSvcOpen(false)} className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-gold" style={{ color: 'var(--color-muted)' }}>
                    <span>View All</span><Icon name="arrow-right" size={11} />
                  </Link>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-px p-px" style={{ background: 'var(--color-line-soft)' }}>
                  {SERVICE_LINKS.map(({ href, label, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setSvcOpen(false)}
                      className="group flex flex-col gap-1 p-4 transition-all duration-200 hover:bg-cream/[0.04]"
                      style={{ background: 'var(--color-panel)' }}
                    >
                      <span className="text-[11.5px] font-semibold tracking-[0.06em] uppercase transition-colors group-hover:text-[var(--color-ink)]" style={{ color: 'var(--color-ink-soft)' }}>
                        {label}
                      </span>
                      <span className="text-[11px] leading-[1.5]" style={{ color: 'var(--color-subtle)' }}>{desc}</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }}>
                        View Service <Icon name="arrow-right" size={10} />
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="px-5 py-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--color-line)', background: 'var(--color-panel-strong)' }}>
                  <span className="text-[12px]" style={{ color: 'var(--color-muted)' }}>All workmanship guaranteed 12 months</span>
                  <Link
                    href="/#contact"
                    onClick={() => setSvcOpen(false)}
                    className="text-[9px] font-semibold tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 hover:brightness-110"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/portfolio"
                className="font-body text-[10.5px] font-medium tracking-[0.18em] uppercase gold-link transition-colors focus:outline-none"
                style={{ color: linkIdle }}
              >
                Portfolio
              </Link>
            </li>

            {['#process', '#contact'].map((href) => (
              <li key={href}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="font-body text-[10.5px] font-medium tracking-[0.18em] uppercase gold-link transition-colors focus:outline-none"
                  style={{ color: linkIdle }}
                >
                  {href.replace('#', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+447587842444" className="flex items-center gap-2 text-[11px] transition-colors" style={{ color: linkIdle }}>
              <Icon name="phone" size={12} />+44 7587 842444
            </a>
            {/* The accent is graphite, which sinks into the dark hero footage —
                the CTA inverts to a light fill while it sits over the video. */}
            <BtnGold
              href="/#contact"
              className={`!py-2.5 !px-5 !text-[10px] ${overHero ? '!bg-white !text-[#0b0b0c] hover:!bg-white/85' : ''}`}
            >
              Get a Quote
            </BtnGold>
          </div>

          {/* Hamburger */}
          <button type="button" onClick={toggleMenu} className="lg:hidden flex flex-col gap-[5px] p-1 focus:outline-none" aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span className={`block w-[22px] h-[1.5px] transition-all duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} style={{ background: barColor }} />
            <span className={`block w-[22px] h-[1.5px] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: barColor }} />
            <span className={`block w-[22px] h-[1.5px] transition-all duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} style={{ background: barColor }} />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        className={`lg:hidden fixed top-[70px] left-0 right-0 z-[999] border-b overflow-y-auto transition-transform duration-400 ${menuOpen ? 'translate-y-0' : '-translate-y-[110%]'}`}
        style={{ background: 'rgba(253, 250, 244, 0.98)', backdropFilter: 'blur(20px)', borderColor: 'var(--color-line)', maxHeight: 'calc(100vh - 70px)' }}
      >
        <ul className="list-none">
          <li className="border-b" style={{ borderColor: 'var(--color-line)' }}>
            <Link href="/" className="block px-6 py-4 text-[11px] font-medium tracking-[0.22em] uppercase" style={{ color: 'var(--color-text)' }}>Home</Link>
          </li>

          {/* Services accordion */}
          <li className="border-b" style={{ borderColor: 'var(--color-line)' }}>
            <button
              type="button"
              onClick={() => setMobSvcOpen(v => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-medium tracking-[0.22em] uppercase text-left focus:outline-none"
              style={{ color: 'var(--color-text)' }}
            >
              Services
              <Icon name="chevron-down" size={12} className={`transition-transform duration-200 ${mobSvcOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobSvcOpen && (
              <div className="border-t" style={{ borderColor: 'var(--color-line-soft)', background: 'var(--color-panel-strong)' }}>
                {SERVICE_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 pl-10 pr-6 py-3 text-[11px] tracking-[0.18em] uppercase transition-colors hover:text-gold"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    <span className="w-3 h-px flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li className="border-b" style={{ borderColor: 'var(--color-line)' }}>
            <Link href="/portfolio" className="block px-6 py-4 text-[11px] font-medium tracking-[0.22em] uppercase" style={{ color: 'var(--color-text)' }}>
              Portfolio
            </Link>
          </li>

          {[{ label: 'Process', href: '#process' }, { label: 'Contact', href: '#contact' }].map(({ label, href }) => (
            <li key={href} className="border-b" style={{ borderColor: 'var(--color-line)' }}>
              <button type="button" onClick={() => scrollTo(href)} className="block w-full text-left px-6 py-4 text-[11px] font-medium tracking-[0.22em] uppercase focus:outline-none" style={{ color: 'var(--color-text)' }}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 px-6 py-6 flex-wrap">
          <a href="tel:+447587842444" className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] uppercase border px-5 py-3 transition-colors hover:border-cream/30" style={{ color: 'var(--color-ink-soft)', borderColor: 'var(--color-line-emphasis)' }}>
            <Icon name="phone" size={13} /> Call Now
          </a>
          <a href="https://wa.me/447587842444" className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--color-on-accent)] px-5 py-3" style={{ background: 'var(--color-accent)' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
