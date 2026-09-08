'use client'

import Link from 'next/link'
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
import { CONTACT_WHATSAPP_URL } from '@/lib/contact'
import { Icon } from './icons'

const QuoteContext = createContext(null)
const EMPTY_FORM = {
  service: '',
  postcode: '',
  name: '',
  phone: '',
  note: '',
  privacyAccepted: false,
  formStartedAt: 0,
  website: '',
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

  return `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

function validateForm(form) {
  const errors = {}
  if (!QUOTE_SERVICES.includes(form.service)) errors.service = 'Choose a service from the list.'
  if (!/^[A-Z0-9][A-Z0-9\s-]{1,10}[A-Z0-9]$/i.test(form.postcode.trim())) errors.postcode = 'Enter a valid project postcode.'
  if (form.name.trim().length < 2) errors.name = 'Enter your name.'
  if (!/^[+()\d\s.-]{7,30}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (form.note.length > 1500) errors.note = 'Keep the project note under 1,500 characters.'
  if (!form.privacyAccepted) errors.privacyAccepted = 'Confirm that you have read the Privacy Policy.'
  return errors
}

const FIELD_IDS = {
  service: 'quote-service',
  postcode: 'quote-postcode',
  name: 'quote-name',
  phone: 'quote-phone',
  note: 'quote-note',
  privacyAccepted: 'quote-privacy',
}

export function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [source, setSource] = useState('website')
  const appContentRef = useRef(null)
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)
  const errorSummaryRef = useRef(null)
  const triggerRef = useRef(null)
  const submittingRef = useRef(false)

  const openQuote = useCallback(({ service = '', source: nextSource = 'website' } = {}) => {
    triggerRef.current = document.activeElement
    setForm((current) => ({
      ...current,
      service: service || current.service,
      formStartedAt: Date.now(),
      website: '',
    }))
    setSource(nextSource)
    setStatus('idle')
    setError('')
    setFieldErrors({})
    setIsOpen(true)
  }, [])

  const closeQuote = useCallback(() => {
    if (submittingRef.current) return
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const appContent = appContentRef.current
    document.body.style.overflow = 'hidden'
    if (appContent) {
      appContent.inert = true
      appContent.setAttribute('aria-hidden', 'true')
    }

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 0)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeQuote()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'
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
      if (appContent) {
        appContent.inert = false
        appContent.removeAttribute('aria-hidden')
      }
      triggerRef.current?.focus?.()
    }
  }, [closeQuote, isOpen])

  const updateField = (event) => {
    const { name, type, checked, value } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setFieldErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    if (status === 'error') {
      setStatus('idle')
      setError('')
    }
  }

  const validateField = (name) => {
    const nextError = validateForm(form)[name]
    setFieldErrors((current) => {
      const next = { ...current }
      if (nextError) next[name] = nextError
      else delete next[name]
      return next
    })
  }

  const submitQuote = async (event) => {
    event.preventDefault()
    if (submittingRef.current) return

    const nextErrors = validateForm(form)
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors)
      setStatus('error')
      setError('Please correct the highlighted fields.')
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
      return
    }

    submittingRef.current = true
    setStatus('sending')
    setError('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) {
        if (result.fieldErrors) setFieldErrors(result.fieldErrors)
        const message = result.code === 'RATE_LIMITED'
          ? 'Too many requests were sent recently. Please wait ten minutes or use WhatsApp.'
          : result.message || 'Online delivery is temporarily unavailable. Please use WhatsApp.'
        throw new Error(message)
      }
      setStatus('success')
    } catch (submissionError) {
      setStatus('error')
      setError(submissionError.message || 'Online delivery is temporarily unavailable. Please use WhatsApp.')
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
    } finally {
      submittingRef.current = false
    }
  }

  const startAnother = () => {
    setForm({ ...EMPTY_FORM, formStartedAt: Date.now() })
    setStatus('idle')
    setError('')
    setFieldErrors({})
    window.setTimeout(() => firstFieldRef.current?.focus(), 0)
  }

  const contextValue = useMemo(() => ({ openQuote, closeQuote }), [closeQuote, openQuote])
  const errorEntries = Object.entries(fieldErrors)

  return (
    <QuoteContext.Provider value={contextValue}>
      <div ref={appContentRef}>{children}</div>
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
            className="quote-dialog relative max-h-[92dvh] w-full overflow-y-auto border border-black/15 bg-[var(--color-surface)] px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-6 md:max-w-[680px] md:rounded-3xl md:px-10 md:py-9"
          >
            <button type="button" onClick={closeQuote} disabled={status === 'sending'} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-transparent text-[28px] leading-none text-[var(--color-ink)] transition-colors duration-150 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Close quote form">
              <span aria-hidden="true">×</span>
            </button>

            {status === 'success' ? (
              <div className="flex min-h-[420px] flex-col justify-center pr-8" aria-live="polite">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-black text-white"><Icon name="check" size={24} /></div>
                <h2 id="quote-title" className="font-display text-[clamp(42px,7vw,64px)] font-semibold leading-none text-[var(--color-ink)]">Request received.</h2>
                <p id="quote-description" className="mt-5 max-w-md text-base leading-7 text-[var(--color-text)]">Thank you, {form.name}. The AMK team will use {form.phone} to discuss your project.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <button type="button" onClick={closeQuote} className="amk-button amk-button-dark">Done</button>
                  <button type="button" onClick={startAnother} className="amk-button amk-button-light">Send another</button>
                </div>
              </div>
            ) : (
              <>
                <div className="pr-14">
                  <h2 id="quote-title" className="font-display text-[clamp(42px,7vw,64px)] font-semibold leading-none text-[var(--color-ink)]">Get a free quote.</h2>
                  <p id="quote-description" className="mt-4 max-w-lg text-base leading-7 text-[var(--color-text)]">Five quick details so we can arrange the right next step.</p>
                </div>

                <form onSubmit={submitQuote} className="mt-8 space-y-5" noValidate aria-busy={status === 'sending'}>
                  <div className="sr-only" aria-live="polite" aria-atomic="true">{status === 'sending' ? 'Sending your quote request.' : status === 'error' ? 'The quote form needs attention.' : ''}</div>

                  {error ? (
                    <div ref={errorSummaryRef} role="alert" tabIndex={-1} className="rounded-2xl border border-red-800/30 bg-red-50 p-4 text-sm leading-6 text-red-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800">
                      <p className="font-bold">{error}</p>
                      {errorEntries.length ? (
                        <ul className="mt-2 list-disc pl-5">
                          {errorEntries.map(([name, message]) => <li key={name}><button type="button" className="underline underline-offset-2" onClick={() => document.getElementById(FIELD_IDS[name])?.focus()}>{message}</button></li>)}
                        </ul>
                      ) : null}
                    </div>
                  ) : null}

                  <QuoteField label="Service required" error={fieldErrors.service} errorId="quote-service-error">
                    <select ref={firstFieldRef} id="quote-service" name="service" value={form.service} onChange={updateField} onBlur={() => validateField('service')} className="form-field" aria-invalid={Boolean(fieldErrors.service)} aria-describedby={fieldErrors.service ? 'quote-service-error' : undefined}>
                      <option value="" disabled>Select a service</option>
                      {QUOTE_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                    </select>
                  </QuoteField>

                  <QuoteField label="Project postcode" error={fieldErrors.postcode} errorId="quote-postcode-error">
                    <input id="quote-postcode" name="postcode" value={form.postcode} onChange={updateField} onBlur={() => validateField('postcode')} autoComplete="postal-code" maxLength={12} className="form-field" placeholder="e.g. HA1 2UF" aria-invalid={Boolean(fieldErrors.postcode)} aria-describedby={fieldErrors.postcode ? 'quote-postcode-error' : undefined} />
                  </QuoteField>

                  <QuoteField label="Name" error={fieldErrors.name} errorId="quote-name-error">
                    <input id="quote-name" name="name" value={form.name} onChange={updateField} onBlur={() => validateField('name')} autoComplete="name" maxLength={80} className="form-field" placeholder="Your name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'quote-name-error' : undefined} />
                  </QuoteField>

                  <QuoteField label="Phone number" error={fieldErrors.phone} errorId="quote-phone-error">
                    <input id="quote-phone" name="phone" type="tel" value={form.phone} onChange={updateField} onBlur={() => validateField('phone')} autoComplete="tel" inputMode="tel" maxLength={30} className="form-field" placeholder="+44 7xxx xxxxxx" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? 'quote-phone-error' : undefined} />
                  </QuoteField>

                  <QuoteField label={<>Project note <span className="font-normal normal-case tracking-normal">(optional)</span></>} error={fieldErrors.note} errorId="quote-note-error">
                    <textarea id="quote-note" name="note" value={form.note} onChange={updateField} onBlur={() => validateField('note')} maxLength={1500} className="form-field min-h-24 resize-y" placeholder="What would you like to change?" aria-invalid={Boolean(fieldErrors.note)} aria-describedby={fieldErrors.note ? 'quote-note-error' : 'quote-note-help'} />
                    <p id="quote-note-help" className="mt-1 text-xs text-[var(--color-muted)]">Up to 1,500 characters.</p>
                  </QuoteField>

                  <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="quote-website">Leave this field empty</label>
                    <input id="quote-website" name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label htmlFor="quote-privacy" className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--color-text)]">
                      <input id="quote-privacy" name="privacyAccepted" type="checkbox" checked={form.privacyAccepted} onChange={updateField} onBlur={() => validateField('privacyAccepted')} className="mt-0.5 h-5 w-5 shrink-0 accent-black" aria-invalid={Boolean(fieldErrors.privacyAccepted)} aria-describedby={fieldErrors.privacyAccepted ? 'quote-privacy-error' : undefined} />
                      <span>I have read the <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">Privacy Policy <span className="sr-only">(opens in a new tab)</span></Link> and agree that AMK may use these details to respond to my enquiry.</span>
                    </label>
                    {fieldErrors.privacyAccepted ? <p id="quote-privacy-error" className="mt-1 text-sm font-medium text-red-800">{fieldErrors.privacyAccepted}</p> : null}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="submit" disabled={status === 'sending'} className="amk-button amk-button-dark flex-1 disabled:cursor-not-allowed disabled:opacity-45">{status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Request my quote'}</button>
                    {status === 'error' ? (
                      <a href={whatsappEnquiry(form)} target="_blank" rel="noopener noreferrer" className="amk-button amk-button-whatsapp flex-1"><Icon name="whatsapp" size={18} /> Send on WhatsApp</a>
                    ) : null}
                  </div>
                  <p className="text-sm leading-6 text-[var(--color-muted)]">AMK uses these details only to handle your enquiry. We do not use them for marketing.</p>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </QuoteContext.Provider>
  )
}

function QuoteField({ label, error, errorId, children }) {
  const input = Array.isArray(children) ? children[0] : children
  return (
    <div>
      <label htmlFor={input?.props?.id} className="quote-label">{label}</label>
      {children}
      {error ? <p id={errorId} className="mt-1 text-sm font-medium text-red-800">{error}</p> : null}
    </div>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) throw new Error('useQuote must be used inside QuoteProvider')
  return context
}
