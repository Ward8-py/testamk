'use client'
import { useState, useEffect } from 'react'
import { Icon } from './icons'

export default function FloatButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="https://wa.me/447587842444"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact AMK London on WhatsApp"
        className="fixed bottom-7 right-7 z-[900] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_12px_34px_rgba(31,147,86,0.28)] hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(31,147,86,0.36)] transition-all duration-300"
        style={{ background: '#1f9356' }}
      >
        <Icon name="whatsapp" size={28} className="text-white" />
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`
          fixed bottom-[96px] right-7 z-[900]
          w-11 h-11 flex items-center justify-center
          border border-cream/12 text-silver text-[15px]
          hover:text-gold hover:border-gold/40 hover:bg-gold/[0.06]
          transition-all duration-400
          ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}
        `}
        style={{ background: 'var(--color-surface)' }}
      >
        <Icon name="arrow-up" size={15} />
      </button>
    </>
  )
}
