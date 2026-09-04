'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container } from './ui'
import { Icon } from './icons'
import { useQuote } from './QuoteProvider'

export default function CTA() {
  const ref = useScrollReveal()
  const { openQuote } = useQuote()

  return (
    <section id="quote" ref={ref} className="relative overflow-hidden bg-[#082749] text-white">
      <div className="absolute inset-0 bg-[url('/gallery/cta-blueprint.png')] bg-cover bg-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-[#061a30]/70" aria-hidden="true" />
      <Container className="relative z-10 flex min-h-[620px] items-center py-24 sm:min-h-[680px]">
        <div className="reveal max-w-4xl">
          <h2 className="font-display text-[clamp(52px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.035em] text-white">
            Ready to make a start?
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
            Tell us what you are planning. We’ll arrange the next practical step and give you a clear quote.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button type="button" onClick={() => openQuote({ source: 'final-cta' })} className="amk-button bg-white text-black hover:bg-white/90">
              Get a Free Quote
              <Icon name="arrow-right" size={15} />
            </button>
            <a
              href="https://wa.me/447587842444"
              target="_blank"
              rel="noopener noreferrer"
              className="amk-button border border-white/55 bg-transparent text-white hover:bg-white hover:text-black"
            >
              <Icon name="whatsapp" size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
