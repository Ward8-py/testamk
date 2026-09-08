import { createHmac, randomUUID } from 'node:crypto'
import { QUOTE_SERVICES } from '@/lib/services'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 16 * 1024
const RATE_WINDOW_SECONDS = 10 * 60
const RATE_LIMIT = 5
const DUPLICATE_WINDOW_SECONDS = 10 * 60

function json(body, status, requestId) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Request-ID': requestId,
    },
  })
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.normalize('NFC').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function isAllowedOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return process.env.NODE_ENV !== 'production'

  if (process.env.NODE_ENV !== 'production') {
    try {
      const { hostname } = new URL(origin)
      if (hostname === 'localhost' || hostname === '127.0.0.1') return true
    } catch {
      return false
    }
  }

  const configured = [process.env.SITE_URL, ...(process.env.QUOTE_ALLOWED_ORIGINS || '').split(',')]
    .map((value) => value?.trim().replace(/\/$/, ''))
    .filter(Boolean)
  return configured.includes(origin.replace(/\/$/, ''))
}

function validate(payload) {
  const originalLengths = Object.fromEntries(
    ['service', 'postcode', 'name', 'phone', 'note', 'source'].map((key) => [
      key,
      typeof payload[key] === 'string' ? payload[key].normalize('NFC').length : 0,
    ])
  )
  const form = {
    service: cleanText(payload.service, 80),
    postcode: cleanText(payload.postcode, 12).toUpperCase(),
    name: cleanText(payload.name, 80),
    phone: cleanText(payload.phone, 30),
    note: cleanText(payload.note, 1500),
    source: cleanText(payload.source, 80) || 'website',
    privacyAccepted: payload.privacyAccepted === true,
    formStartedAt: Number(payload.formStartedAt),
    website: cleanText(payload.website, 200),
  }
  const fieldErrors = {}

  if (!QUOTE_SERVICES.includes(form.service)) fieldErrors.service = 'Choose a service from the list.'
  if (originalLengths.service > 80) fieldErrors.service = 'Choose a service from the list.'
  if (!/^[A-Z0-9][A-Z0-9\s-]{1,10}[A-Z0-9]$/i.test(form.postcode)) fieldErrors.postcode = 'Enter a valid project postcode.'
  if (originalLengths.postcode > 12) fieldErrors.postcode = 'Keep the postcode under 12 characters.'
  if (form.name.length < 2) fieldErrors.name = 'Enter your name.'
  if (originalLengths.name > 80) fieldErrors.name = 'Keep your name under 80 characters.'
  if (!/^[+()\d\s.-]{7,30}$/.test(form.phone)) fieldErrors.phone = 'Enter a valid phone number.'
  if (originalLengths.phone > 30) fieldErrors.phone = 'Keep the phone number under 30 characters.'
  if (originalLengths.note > 1500) fieldErrors.note = 'Keep the project note under 1,500 characters.'
  if (originalLengths.source > 80) fieldErrors.source = 'The form source is invalid.'
  if (!form.privacyAccepted) fieldErrors.privacyAccepted = 'Confirm that you have read the Privacy Policy.'

  const elapsed = Date.now() - form.formStartedAt
  const looksAutomated = form.website || !Number.isFinite(form.formStartedAt) || elapsed < 2000 || elapsed > 24 * 60 * 60 * 1000
  return { form, fieldErrors, looksAutomated }
}

function getClientIp(request) {
  return cleanText(
    request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
    96
  )
}

function secureHash(value, secret) {
  return createHmac('sha256', secret).update(value).digest('hex')
}

async function redisCommand(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '')
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('rate-limit configuration unavailable')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) throw new Error('rate-limit service unavailable')
  const result = await response.json()
  if (result.error) throw new Error('rate-limit service rejected command')
  return result.result
}

async function enforceAbuseControls(request, form) {
  const secret = process.env.QUOTE_HASH_SALT
  if (!secret || secret.length < 24) throw new Error('security configuration unavailable')

  const ipHash = secureHash(getClientIp(request), secret)
  const rateKey = `amk:quote:rate:${ipHash}`
  const rate = Number(await redisCommand(['INCR', rateKey]))
  if (rate === 1) await redisCommand(['EXPIRE', rateKey, RATE_WINDOW_SECONDS])
  if (!Number.isFinite(rate) || rate > RATE_LIMIT) return { rateLimited: true, duplicate: false, duplicateKey: null }

  const fingerprint = secureHash(
    [form.service, form.postcode, form.name.toLowerCase(), form.phone.replace(/\D/g, ''), form.note.toLowerCase()].join('|'),
    secret
  )
  const duplicateKey = `amk:quote:duplicate:${fingerprint}`
  const duplicateResult = await redisCommand(['SET', duplicateKey, '1', 'NX', 'EX', DUPLICATE_WINDOW_SECONDS])
  return { rateLimited: false, duplicate: duplicateResult !== 'OK', duplicateKey }
}

async function deliverEmail(form, requestId) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.QUOTE_FROM_EMAIL
  const to = process.env.QUOTE_TO_EMAIL || 'info@amkbuildingconstruction.co.uk'
  if (!apiKey || !from || !to) throw new Error('email configuration unavailable')

  const lines = [
    'New AMK quote request',
    '',
    `Service: ${form.service}`,
    `Project postcode: ${form.postcode}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Project note: ${form.note || 'Not provided'}`,
    `Source: ${form.source}`,
    `Privacy policy acknowledged: Yes`,
    `Request reference: ${requestId}`,
  ]

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: to,
      subject: `New AMK quote request — ${form.service}`,
      text: lines.join('\n'),
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error('email delivery failed')
}

export async function POST(request) {
  const requestId = randomUUID()
  const report = (outcome) => console.info(`[quote:${requestId}] ${outcome}`)

  if (!isAllowedOrigin(request)) {
    report('origin_rejected')
    return json({ ok: false, code: 'ORIGIN_REJECTED', message: 'This request could not be accepted.' }, 403, requestId)
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    report('payload_rejected')
    return json({ ok: false, code: 'PAYLOAD_TOO_LARGE', message: 'The request is too large.' }, 413, requestId)
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    report('content_type_rejected')
    return json({ ok: false, code: 'VALIDATION', message: 'This request must use JSON.' }, 415, requestId)
  }

  let payload
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) throw new Error('payload too large')
    payload = JSON.parse(raw)
  } catch {
    report('invalid_payload')
    return json({ ok: false, code: 'VALIDATION', message: 'Check the form and try again.' }, 400, requestId)
  }

  const { form, fieldErrors, looksAutomated } = validate(payload || {})
  if (looksAutomated) {
    report('bot_rejected')
    return json({ ok: false, code: 'VALIDATION', message: 'Check the form and try again.' }, 400, requestId)
  }
  if (Object.keys(fieldErrors).length) {
    report('validation_failed')
    return json({ ok: false, code: 'VALIDATION', message: 'Check the highlighted fields.', fieldErrors }, 400, requestId)
  }

  let duplicateReservation = null
  try {
    const abuse = await enforceAbuseControls(request, form)
    if (abuse.rateLimited) {
      report('rate_limited')
      return json({ ok: false, code: 'RATE_LIMITED', message: 'Too many requests. Please wait ten minutes or use WhatsApp.' }, 429, requestId)
    }
    if (abuse.duplicate) {
      report('duplicate_suppressed')
      return json({ ok: true, duplicate: true }, 200, requestId)
    }
    duplicateReservation = abuse.duplicateKey
    await deliverEmail(form, requestId)
    report('delivered')
    return json({ ok: true }, 200, requestId)
  } catch {
    if (duplicateReservation) {
      try {
        await redisCommand(['DEL', duplicateReservation])
      } catch {
        // The public response remains fail-closed even if the reservation cannot be released.
      }
    }
    report('delivery_unavailable')
    return json({ ok: false, code: 'DELIVERY_FAILED', message: 'Online delivery is temporarily unavailable. Please use WhatsApp.' }, 503, requestId)
  }
}
