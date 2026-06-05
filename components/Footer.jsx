'use client'

import Link from 'next/link'
import AMKLogo from './AMKLogo'
import { Icon } from './icons'

const QUICK_LINKS = [
  { label: 'About AMK',    href: '/#about'       },
  { label: 'Our Services', href: '/#services'     },
  { label: 'Portfolio',    href: '/portfolio'     },
  { label: 'Our Process',  href: '/#process'      },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact Us',   href: '/#contact'      },
]

const SERVICE_PAGES = [
  { label: 'Development & Renovation', href: '/services/development-renovation' },
  { label: 'Kitchens & Bathrooms',     href: '/services/kitchens-bathrooms'     },
  { label: 'Bedrooms',                 href: '/services/bedrooms'               },
  { label: 'Marble & Granite',         href: '/services/marble-granite'         },
  { label: 'Flooring',                 href: '/services/flooring'               },
  { label: 'Furnishing',               href: '/services/furnishing'             },
]

const CONTACT_DETAILS = [
  { icon: 'phone', label: 'Phone',     value: '+44 7587 842444',                      href: 'tel:+447587842444'                                },
  { icon: 'pager', label: 'Alt Phone', value: '0871 566 1673',                        href: 'tel:08715661673'                                  },
  { icon: 'whatsapp', label: 'WhatsApp',  value: 'Message us now',                       href: 'https://wa.me/447587842444'                       },
  { icon: 'mail', label: 'Email',     value: 'info@amkbuildingconstruction.co.uk',   href: 'mailto:info@amkbuildingconstruction.co.uk'        },
  { icon: 'globe', label: 'Web',       value: 'amkbuildingconstruction.co.uk',        href: 'https://www.amkbuildingconstruction.co.uk'        },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-page)', borderTop: '1px solid var(--color-line)' }}>
      {/* Gold accent line */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent) 70%, transparent)' }} />

      <div className="w-full max-w-site mx-auto px-5 sm:px-8 lg:px-14 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 focus:outline-none" aria-label="AMK London - Home">
              <AMKLogo size={40} />
              <div className="leading-tight">
                <div className="font-body text-[13px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-ink)' }}>AMK London</div>
                <div className="font-body text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>Building Construction Ltd</div>
              </div>
            </Link>

            <p className="text-[12.5px] leading-[1.8] mb-6 max-w-[240px]" style={{ color: 'var(--color-muted)' }}>
              London's trusted specialists in property development, renovation, and construction.
              12-month workmanship guarantee on everything we do.
            </p>

            {/* Guarantee badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-6 border"
              style={{ background: 'var(--color-accent-tint)', borderColor: 'var(--color-accent-line)' }}
            >
              <Icon name="lock" size={16} className="text-gold" />
              <div>
                <div className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent)' }}>12-Month Guarantee</div>
                <div className="text-[10px]" style={{ color: 'var(--color-muted)' }}>All workmanship</div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2.5">
              <SocialBtn href="https://www.facebook.com/amklondon" label="Facebook">
                <Icon name="facebook" size={14} />
              </SocialBtn>
              <SocialBtn href="https://wa.me/447587842444" label="WhatsApp">
                <Icon name="whatsapp" size={14} />
              </SocialBtn>
              <SocialBtn href="https://www.instagram.com/amklondon" label="Instagram">
                <Icon name="instagram" size={14} />
              </SocialBtn>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <FooterCol title="Quick Links">
            {QUICK_LINKS.map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </FooterCol>

          {/* ── Services ── */}
          <FooterCol title="Our Services">
            {SERVICE_PAGES.map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </FooterCol>

          {/* ── Contact ── */}
          <div>
            <ColTitle>Get in Touch</ColTitle>
            <div className="space-y-4">
              {CONTACT_DETAILS.map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon name={icon} size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <div className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ color: 'var(--color-accent)' }}>{label}</div>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[12.5px] leading-[1.5] break-all transition-colors duration-300 hover:text-gold"
                      style={{ color: 'var(--color-ink-soft)' }}
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 border" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
              <div className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>Address</div>
              <div className="text-[12.5px] leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
                15A Station Road<br />Harrow, HA1 2UF<br />London, UK
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center" style={{ borderColor: 'var(--color-line)' }}>
          <p className="text-[11px] tracking-[0.04em]" style={{ color: 'var(--color-subtle)' }}>
            © {new Date().getFullYear()} AMK London Building Construction Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] transition-colors duration-300 hover:text-silver-mid" style={{ color: 'var(--color-subtle)' }}>Privacy Policy</a>
            <a href="#" className="text-[11px] transition-colors duration-300 hover:text-silver-mid" style={{ color: 'var(--color-subtle)' }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Sub-components ─────────────────────────────── */

function SocialBtn({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-gold/30 hover:bg-gold/[0.06] hover:text-gold"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-line)', color: 'var(--color-muted)' }}
    >
      {children}
    </a>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <ColTitle>{title}</ColTitle>
      <ul className="space-y-3 list-none">
        {children}
      </ul>
    </div>
  )
}

function ColTitle({ children }) {
  return (
    <div
      className="text-[10px] font-bold tracking-[0.22em] uppercase pb-3 mb-5 border-b"
      style={{ color: 'var(--color-ink-soft)', borderColor: 'var(--color-line)' }}
    >
      {children}
    </div>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-[12.5px] transition-colors duration-300 hover:text-silver-bright"
        style={{ color: 'var(--color-muted)' }}
      >
        <span
          className="h-px w-0 flex-shrink-0 opacity-0 transition-all duration-300 group-hover:w-2.5 group-hover:opacity-100"
          style={{ background: 'var(--color-accent)' }}
        />
        {children}
      </Link>
    </li>
  )
}
