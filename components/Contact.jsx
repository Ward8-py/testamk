'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Section, Container, Eyebrow, Divider, BtnGold, ArrowRight } from './ui'
import { Icon } from './icons'

const CONTACT_DETAILS = [
  {
    icon: 'location',
    label: 'Address',
    value: 'AMK London Building Construction Ltd\n15A Station Road, Harrow, HA1 2UF',
    href:  null,
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+44 7587 842444',
    href:  'tel:+447587842444',
  },
  {
    icon: 'pager',
    label: 'Alternative',
    value: '0871 566 1673',
    href:  'tel:08715661673',
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: 'Message us on WhatsApp',
    href:  'https://wa.me/447587842444',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'info@amkbuildingconstruction.co.uk',
    href:  'mailto:info@amkbuildingconstruction.co.uk',
  },
  {
    icon: 'globe',
    label: 'Website',
    value: 'amkbuildingconstruction.co.uk',
    href:  'https://www.amkbuildingconstruction.co.uk',
  },
]

const SERVICES_LIST = [
  'New Build', 'Extension', 'Loft Conversion',
  'Kitchen & Bathroom', 'Driveway', 'Brickwork',
  'Plumbing', 'Electrical', 'Plastering',
  'Painting & Decorating', 'Full Refurbishment',
  'Marble & Granite', 'Flooring', 'Custom Furnishing', 'Other',
]

export default function Contact() {
  const ref = useScrollReveal()
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSubmitted(true) }, 1500)
  }

  return (
    <Section
      id="contact"
      className="py-[clamp(80px,10vw,140px)] section-top-border"
      style={{ background: 'var(--color-panel)' }}
    >
      <div ref={ref}>
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-[60px] xl:gap-20">

            {/* Left — info */}
            <div>
              <Eyebrow className="reveal mb-4">Contact Us</Eyebrow>
              <h2
                className="font-display font-light text-cream leading-[1.05] reveal"
                style={{ fontSize: 'clamp(28px,3.5vw,50px)', transitionDelay: '80ms' }}
              >
                Let's Discuss<br />
                <em className="italic">Your Project</em>
              </h2>
              <Divider className="my-6 reveal" style={{ transitionDelay: '120ms' }} />
              <p
                className="text-silver leading-[1.85] reveal mb-8"
                style={{ fontSize: 'clamp(13px,1.1vw,15px)', transitionDelay: '160ms' }}
              >
                Get in touch and a member of our team will respond promptly.
                We offer free, no-obligation consultations at your property.
                Speak to us directly and arrange a meeting instantly.
              </p>

              {/* Contact details */}
              <div className="border-t border-cream/[0.06] reveal" style={{ transitionDelay: '200ms' }}>
                {CONTACT_DETAILS.map(({ icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex gap-4 items-start py-5 border-b border-cream/[0.06]"
                  >
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[15px] border border-cream/12"
                      style={{ background: 'var(--color-surface)' }}
                    >
                      <Icon name={icon} size={17} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold mb-1">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-[13.5px] text-silver-bright hover:text-gold transition-colors duration-300 whitespace-pre-line"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-[13.5px] text-silver-bright whitespace-pre-line">
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div
                className="mt-9 h-[240px] border border-cream/[0.06] overflow-hidden reveal"
                style={{ transitionDelay: '280ms' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.5!2d-0.3358!3d51.5783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487610b94c66d5b1%3A0xabcdef!2sStation+Rd%2C+Harrow+HA1+2UF!5e0!3m2!1sen!2suk!4v1"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AMK London Building Construction — 15A Station Road, Harrow HA1 2UF"
                  className="map-dark"
                />
              </div>
            </div>

            {/* Right — form */}
            <div
              className="border border-cream/12 p-7 sm:p-10 reveal-right"
              style={{ background: 'var(--color-surface)' }}
            >
              {!submitted ? (
                <>
                  <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-silver-bright border-b border-cream/[0.06] pb-5 mb-7">
                    Send Us a Message
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[9.5px] font-semibold tracking-[0.2em] uppercase text-silver-mid mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          id="name" name="name" type="text"
                          value={form.name} onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="form-field"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] font-semibold tracking-[0.2em] uppercase text-silver-mid mb-2" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          id="email" name="email" type="email"
                          value={form.email} onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="form-field"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[9.5px] font-semibold tracking-[0.2em] uppercase text-silver-mid mb-2" htmlFor="phone">
                          Phone Number
                        </label>
                        <input
                          id="phone" name="phone" type="tel"
                          value={form.phone} onChange={handleChange}
                          placeholder="+44 7xxx xxxxxx"
                          className="form-field"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] font-semibold tracking-[0.2em] uppercase text-silver-mid mb-2" htmlFor="service">
                          Service Required
                        </label>
                        <select
                          id="service" name="service"
                          value={form.service} onChange={handleChange}
                          className="form-field"
                        >
                          <option value="" disabled>Select a service</option>
                          {SERVICES_LIST.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[9.5px] font-semibold tracking-[0.2em] uppercase text-silver-mid mb-2" htmlFor="message">
                        Your Message
                      </label>
                      <textarea
                        id="message" name="message" rows={5}
                        value={form.message} onChange={handleChange}
                        placeholder="Tell us about your project — location, scope, timeline, and any specific requirements…"
                        className="form-field resize-y"
                      />
                    </div>

                    <BtnGold
                      type="submit"
                      className={`w-full justify-center ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {sending ? 'Sending…' : 'Send Enquiry'}
                      {!sending && <ArrowRight />}
                    </BtnGold>

                    <p className="text-[11px] text-silver-dark text-center mt-4">
                      We typically respond within 24 hours.
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4">
                  <div className="text-gold"><Icon name="check" size={52} /></div>
                  <h3 className="font-display text-[28px] font-light text-cream">Message Sent</h3>
                  <p className="text-silver-mid text-[13px] max-w-[280px] leading-[1.7]">
                    Thank you for reaching out. One of our team will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                    className="text-[10px] tracking-[0.18em] uppercase text-gold hover:text-gold-light transition-colors mt-2"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
