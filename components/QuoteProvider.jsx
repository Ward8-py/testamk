'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { QUOTE_SERVICES } from '@/lib/services'
import { Icon } from './icons'

const QuoteContext = createContext(null)
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
const EMPTY_FORM = {
  service: '',
  postcode: '',
  name: '',
  phone: '',
  note: '',
}

function whatsappEnquiry(form) {
  const message = [
    'Hello AMK London, I would like a free quote.',
    '',
    `Service: ${form.service || 'Not selected'}`,
    `Postcode: ${form.postcode || 'Not provided'}`,
    `Name: ${form.name || 'Not provided'}`,
    `Phone: ${form.phone || 'Not provided'}`,
    form.note ? `Project note: ${form.note}` : null,
  ].filter(Boolean).join('\n')

  return `https://wa.me/447587842444?text=${encodeURIComponent(message)}`
}

export function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [source, setSource] = useState('website')
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)
  const triggerRef = useRef(null)
  const submittingRef = useRef(false)

  const openQuote = useCallback(({ service = '', source: nextSource = 'website' } = {}) => {
    triggerRef.current = document.activeElement
    setForm((current) => ({ ...current, service: service || current.service }))
    setSource(nextSource)
    setStatus('idle')
    setError('')
    setIsOpen(true)
  }, [])

  const closeQuote = useCallback(() => {
    if (submittingRef.current) return
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 0)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeQuote()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus?.()
    }
  }, [closeQuote, isOpen])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (status === 'error') {
      setStatus('idle')
      setError('')
    }
  }

  const submitQuote = async (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity() || submittingRef.current) return

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      setError('Online submission is not configured yet. Your details are ready to send securely in WhatsApp.')
      return
    }

    submittingRef.current = true
    setStatus('sending')
    setError('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          source,
          _subject: `New AMK quote request — ${form.service}`,
        }),
      })

      if (!response.ok) throw new Error('Quote submission failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('We could not send this online. Your details are ready in the WhatsApp option below.')
    } finally {
      submittingRef.current = false
    }
  }

  const startAnother = () => {
    setForm(EMPTY_FORM)
    setStatus('idle')
    setError('')
    window.setTimeout(() => firstFieldRef.current?.focus(), 0)
  }

  const contextValue = useMemo(() => ({ openQuote, closeQuote }), [closeQuote, openQuote])

  return (
    <QuoteContext.Provider value={contextValue}>
      {children}
      {isOpen ? (
        <div
          className="quote-backdrop fixed inset-0 z-[4000] flex items-end justify-center bg-black/65 p-0 md:items-center md:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeQuote()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            aria-describedby="quote-description"
            className="quote-dialog relative max-h-[92dvh] w-full overflow-y-auto border border-black/15 bg-[var(--color-surface)] px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-6 md:max-w-[680px] md:px-10 md:py-9"
          >
            <button
              type="button"
              onClick={closeQuote}
              disabled={status === 'sending'}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-black/15 bg-transparent text-[28px] leading-none text-[var(--color-ink)] transition-colors duration-150 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Close quote form"
            >
              <span aria-hidden="true">×</span>
            </button>

            {status === 'success' ? (
              <div className="flex min-h-[420px] flex-col justify-center pr-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-black bg-black text-white">
                  <Icon name="check" size={24} />
                </div>
                <h2 id="quote-title" className="font-display text-[clamp(42px,7vw,64px)] font-semibold leading-none text-[var(--color-ink)]">
                  Request received.
                </h2>
                <p id="quote-description" className="mt-5 max-w-md text-base leading-7 text-[var(--color-text)]">
                  Thank you, {form.name}. The AMK team will use {form.phone} to discuss your project.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <button type="button" onClick={closeQuote} className="amk-button amk-button-dark">
                    Done
                  </button>
                  <button type="button" onClick={startAnother} className="amk-button amk-button-light">
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="pr-14">
                  <h2 id="quote-title" className="font-display text-[clamp(42px,7vw,64px)] font-semibold leading-none text-[var(--color-ink)]">
                    Get a free quote.
                  </h2>
                  <p id="quote-description" className="mt-4 max-w-lg text-base leading-7 text-[var(--color-text)]">
                    Five quick details so we can arrange the right next step.
                  </p>
                </div>

                <form onSubmit={submitQuote} className="mt-8 space-y-5" noValidate={false}>
                  <span className="sr-only" aria-live="polite">
                    {status === 'sending' ? 'Sending your quote request.' : status === 'error' ? 'Quote request could not be sent.' : ''}
                  </span>
                  <div>
                    <label htmlFor="quote-service" className="quote-label">Service required</label>
                    <select
                      ref={firstFieldRef}
                      id="quote-service"
                      name="service"
                      value={form.service}
                      onChange={updateField}
                      className="form-field"
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      {QUOTE_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                    </select>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="quote-postcode" className="quote-label">Project postcode</label>
                      <input
                        id="quote-postcode"
                        name="postcode"
                        value={form.postcode}
                        onChange={updateField}
                        autoComplete="postal-code"
                        className="form-field"
                        placeholder="e.g. HA1 2UF"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-name" className="quote-label">Name</label>
                      <input
                        id="quote-name"
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        autoComplete="name"
                        className="form-field"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className="quote-label">Phone number</label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={updateField}
                      autoComplete="tel"
                      inputMode="tel"
                      className="form-field"
                      placeholder="+44 7xxx xxxxxx"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-note" className="quote-label">Project note <span className="font-normal normal-case tracking-normal">(optional)</span></label>
                    <textarea
                      id="quote-note"
                      name="note"
                      value={form.note}
                      onChange={updateField}
                      className="form-field min-h-24 resize-y"
                      placeholder="What would you like to change?"
                    />
                  </div>

                  {error ? (
                    <div role="alert" className="border border-black/20 bg-[var(--color-panel)] p-4 text-sm leading-6 text-[var(--color-text)]">
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="amk-button amk-button-dark flex-1 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Request my quote'}
                    </button>
                    {status === 'error' ? (
                      <a
                        href={whatsappEnquiry(form)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="amk-button amk-button-whatsapp flex-1"
                      >
                        <Icon name="whatsapp" size={18} />
                        Send on WhatsApp
                      </a>
                    ) : null}
                  </div>
                  <p className="text-sm leading-6 text-[var(--color-muted)]">
                    AMK will use these details only to respond to your enquiry.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) throw new Error('useQuote must be used inside QuoteProvider')
  return context
}
