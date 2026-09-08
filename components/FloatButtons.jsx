'use client'

import { Icon } from './icons'
import { useQuote } from './QuoteProvider'
import { CONTACT_WHATSAPP_URL } from '@/lib/contact'

export default function FloatButtons() {
  const { openQuote } = useQuote()

  return (
    <div data-mobile-conversion-bar className="fixed inset-x-0 bottom-0 z-[900] grid grid-cols-[1fr_auto] border-t border-black/20 bg-[var(--color-surface)] px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 md:hidden">
      <button
        type="button"
        onClick={() => openQuote({ source: 'mobile-bar' })}
        className="amk-button amk-button-dark !min-h-12 w-full !px-4"
      >
        Get a Free Quote
      </button>
      <a
        href={CONTACT_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact AMK London on WhatsApp"
        className="ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#187b48] text-white focus-visible:outline-offset-2"
      >
        <Icon name="whatsapp" size={23} />
      </a>
    </div>
  )
}
