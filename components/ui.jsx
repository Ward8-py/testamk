'use client'

import { forwardRef } from 'react'

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`font-body text-[10px] font-semibold tracking-[0.3em] uppercase text-gold ${className}`}>
      {children}
    </p>
  )
}

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

export function BtnPrimary({ children, onClick, href, className = '' }) {
  const cls = `inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[var(--color-ink)] bg-gradient-to-br from-gold-light to-gold border-none px-9 py-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_var(--color-accent-line)] relative overflow-hidden group ${className}`
  if (href) return <a href={href} className={cls}>{children}<BtnShine /></a>
  return <button onClick={onClick} className={cls}>{children}<BtnShine /></button>
}

function BtnShine() {
  return <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))' }} />
}

export function BtnGhost({ children, onClick, href, className = '' }) {
  const cls = `inline-flex items-center gap-2.5 text-[10.5px] font-medium tracking-[0.2em] uppercase text-silver-light bg-transparent border border-cream/20 px-9 py-[15px] cursor-pointer transition-all duration-300 hover:text-[var(--color-ink)] hover:border-cream/40 hover:bg-cream/[0.04] hover:-translate-y-0.5 ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export function BtnGold({ children, onClick, href, type = 'button', className = '' }) {
  const cls = `inline-flex items-center justify-center gap-2.5 text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[var(--color-ink)] px-11 py-[18px] cursor-pointer border-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_var(--color-accent-line-strong)] hover:brightness-110 ${className}`
  const sty = { background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))' }
  if (href) return <a href={href} className={cls} style={sty}>{children}</a>
  return <button type={type} onClick={onClick} className={cls} style={sty}>{children}</button>
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
