import Link from 'next/link'
import Image from 'next/image'
import AMKLogo from './AMKLogo'
import { Icon } from './icons'
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_URL,
} from '@/lib/contact'

const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=15A+Station+Road+Harrow+HA1+2UF'

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-[var(--color-page)] pb-8 pt-12 md:pb-10 md:pt-16">
      <div className="mx-auto w-full max-w-site px-5 sm:px-8 lg:px-14">
        <div className="grid gap-10 md:grid-cols-[minmax(250px,1.1fr)_minmax(180px,.6fr)_minmax(260px,1fr)] md:gap-12">
          <div>
            <Link href="/" className="flex w-fit items-center gap-4" aria-label="AMK London home">
              <AMKLogo size={42} />
              <span className="leading-tight">
                <span className="block text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-ink)]">London</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">Building Construction Ltd</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-base leading-7 text-[var(--color-text)]">
              Residential construction and renovation managed by one experienced London team.
            </p>
            <div className="mt-6 w-full max-w-[320px]">
              <Image
                src="/branding/federation-of-master-builders-badge.png"
                alt="Federation of Master Builders member"
                width={920}
                height={194}
                sizes="(max-width: 767px) calc(100vw - 40px), 320px"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-5 flex gap-2">
              <SocialLink
                href="https://www.instagram.com/amkbuildings?stkn=MnQyaXpjdTVmdnhy&utm_source=qr"
                label="Instagram"
                icon="instagram"
              />
              <SocialLink href={CONTACT_WHATSAPP_URL} label="WhatsApp" icon="whatsapp" />
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-sm font-bold text-[var(--color-ink)]">Explore</h2>
            <ul className="space-y-2.5 text-sm text-[var(--color-text)]">
              <li><Link href="/#services" className="footer-link">Services</Link></li>
              <li><Link href="/portfolio" className="footer-link">Projects</Link></li>
              <li><Link href="/#process" className="footer-link">Process</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="footer-link">Terms &amp; Conditions</Link></li>
              <li><Link href="/cookie-policy" className="footer-link">Cookie Policy</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-bold text-[var(--color-ink)]">Contact</h2>
            <address className="space-y-2.5 text-sm not-italic leading-6 text-[var(--color-text)]">
              <p><a className="footer-link font-bold" href={CONTACT_PHONE_HREF}>{CONTACT_PHONE_DISPLAY}</a></p>
              <p><a className="footer-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              <p>{CONTACT_ADDRESS}</p>
              <p><a className="footer-link" href={MAP_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-black/15 pt-6 text-xs leading-6 text-[var(--color-muted)]">
          © {new Date().getFullYear()} AMK London Building Construction Ltd. All rights reserved. Legal pages effective 8 September 2026.
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-[var(--color-ink)] transition-[background-color,color] duration-150 hover:bg-black hover:text-white"
    >
      <Icon name={icon} size={17} />
    </a>
  )
}
