'use client'

import { useQuote } from './QuoteProvider'

export default function QuoteTrigger({
  children,
  service = '',
  source = 'website',
  className = '',
  ariaLabel,
}) {
  const { openQuote } = useQuote()

  return (
    <button
      type="button"
      onClick={() => openQuote({ service, source })}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

