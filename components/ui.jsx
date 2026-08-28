'use client'
import { forwardRef } from 'react'

export function Divider({ centered = false, className = '' }) {
  return (
    <div
      className={`h-px flex-shrink-0 ${centered ? 'mx-auto' : ''} ${className}`}
      style={{
        width: 48,
        background: centered
          ? 'linear-gradient(90deg, transparent, var(--color-accent), transparent)'
          : 'linear-gradient(90deg, var(--color-accent), transparent)',
      }}
    />
  )
}

/* FIX: forwardRef so useScrollReveal()'s ref attaches to the DOM element */
export const Section = forwardRef(function Section({ id, className = '', children, style }, ref) {
  return (
    <section id={id} ref={ref} className={`relative ${className}`} style={style}>
      {children}
    </section>
  )
})

export function Container({ children, className = '' }) {
  return (
    <div className={`w-full max-w-site mx-auto px-5 sm:px-8 lg:px-14 ${className}`}>
      {children}
    </div>
  )
}

/* Text on the accent uses --color-on-accent. The accent is now graphite, so
   --color-ink here would be black-on-black. */
export function BtnPrimary({ children, onClick, href, type = 'button', className = '' }) {
  const cls = `inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[var(--color-on-accent)] px-9 py-4 cursor-pointer border-none transition-colors duration-300 relative overflow-hidden group ${className}`
  const sty = { background: 'var(--color-accent)' }
  if (href) return <a href={href} className={cls} style={sty}>{children}<BtnShine /></a>
  return <button type={type} onClick={onClick} className={cls} style={sty}>{children}<BtnShine /></button>
}

function BtnShine() {
  return <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" style={{ background: 'var(--color-accent-light)' }} />
}

export function BtnGhost({ children, onClick, href, type = 'button', className = '' }) {
  const cls = `inline-flex items-center gap-2.5 text-[10.5px] font-medium tracking-[0.2em] uppercase text-silver-light bg-transparent border border-cream/20 px-9 py-[15px] cursor-pointer transition-all duration-300 hover:text-[var(--color-ink)] hover:border-cream/40 hover:bg-cream/[0.04] hover:-translate-y-0.5 ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}

export function BtnGold({ children, onClick, href, type = 'button', disabled = false, className = '' }) {
  // Background lives in the class list, not inline style — an inline style
  // would outrank the hover: variant and the hover would silently do nothing.
  const cls = `inline-flex items-center justify-center gap-2.5 text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[var(--color-on-accent)] px-11 py-[18px] cursor-pointer border-none transition-colors duration-300 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type={type} disabled={disabled} onClick={onClick} className={cls}>{children}</button>
}

export function ArrowRight({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 flex-shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function GoldTag({ children, className = '' }) {
  return (
    <span className={`inline-block text-[9px] font-semibold tracking-[0.25em] uppercase text-gold border border-gold/30 px-3 py-1.5 ${className}`} style={{ background: 'var(--color-accent-tint)' }}>
      {children}
    </span>
  )
}
