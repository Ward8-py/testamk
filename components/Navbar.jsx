'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AMKLogo from './AMKLogo'
import { useQuote } from './QuoteProvider'

const NAV_ITEMS = [
  { label: 'Services', target: '#services' },
  { label: 'Projects', href: '/portfolio' },
  { label: 'Process', target: '#process' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [overHero, setOverHero] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { openQuote } = useQuote()

  useEffect(() => {
    const update = () => {
      const hero = isHome ? document.getElementById('hero') : null
      setOverHero(Boolean(hero && hero.getBoundingClientRect().bottom > 70))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const goToSection = (target) => {
    setMenuOpen(false)
    if (!isHome) {
      window.location.assign(`/${target}`)
      return
    }

    const element = document.querySelector(target)
    if (!element) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = element.getBoundingClientRect().top + window.scrollY - 68
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  const launchQuote = (source) => {
    setMenuOpen(false)
    openQuote({ source })
  }

  const foreground = overHero ? '#ffffff' : 'var(--color-ink)'
  const muted = overHero ? 'rgba(255,255,255,0.72)' : 'var(--color-muted)'

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[1000] border-b backdrop-blur-lg transition-[background-color,border-color] duration-200"
        style={{
          background: overHero ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.94)',
          borderColor: overHero ? 'rgba(255,255,255,0.18)' : 'var(--color-line)',
        }}
      >
        <div className="mx-auto flex h-[70px] w-full max-w-site items-center justify-between px-5 sm:px-8 lg:px-14">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-4 focus-visible:outline-offset-4"
            aria-label="AMK London home"
            style={{ color: foreground }}
          >
            <AMKLogo size={38} />
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13px] font-bold uppercase tracking-[0.12em]">AMK London</span>
              <span className="block text-[9px] uppercase tracking-[0.2em]" style={{ color: muted }}>Building Construction Ltd</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => item.href ? (
              <Link key={item.label} href={item.href} className="nav-link" style={{ color: foreground }}>
                {item.label}
              </Link>
            ) : (
              <button key={item.label} type="button" onClick={() => goToSection(item.target)} className="nav-link" style={{ color: foreground }}>
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => launchQuote('header')}
              className={`amk-button !min-h-11 !px-6 ${overHero ? 'bg-white text-black hover:bg-white/90' : 'amk-button-dark'}`}
            >
              Get a Free Quote
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{ color: foreground }}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-[2px] w-6 bg-current transition-opacity duration-150 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] w-6 bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="mobile-nav fixed inset-x-0 top-[70px] z-[999] border-b border-black/15 bg-[var(--color-page)] px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-3 lg:hidden"
        >
          <nav aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => item.href ? (
              <Link key={item.label} href={item.href} className="mobile-nav-link">
                {item.label}
              </Link>
            ) : (
              <button key={item.label} type="button" onClick={() => goToSection(item.target)} className="mobile-nav-link w-full text-left">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => launchQuote('mobile-menu')} className="amk-button amk-button-dark mt-3 w-full">
              Get a Free Quote
            </button>
          </nav>
        </div>
      ) : null}
    </>
  )
}
