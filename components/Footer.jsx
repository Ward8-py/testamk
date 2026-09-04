import Link from 'next/link'
import AMKLogo from './AMKLogo'
import { Icon } from './icons'

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
                <span className="block text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-ink)]">AMK London</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">Building Construction Ltd</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-base leading-7 text-[var(--color-text)]">
              Residential construction and renovation managed by one experienced London team.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialLink href="https://www.facebook.com/amklondon" label="Facebook" icon="facebook" />
              <SocialLink href="https://www.instagram.com/amklondon" label="Instagram" icon="instagram" />
              <SocialLink href="https://wa.me/447587842444" label="WhatsApp" icon="whatsapp" />
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-sm font-bold text-[var(--color-ink)]">Explore</h2>
            <ul className="space-y-2.5 text-sm text-[var(--color-text)]">
              <li><Link href="/#services" className="footer-link">Services</Link></li>
              <li><Link href="/portfolio" className="footer-link">Projects</Link></li>
              <li><Link href="/#process" className="footer-link">Process</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-bold text-[var(--color-ink)]">Contact</h2>
            <address className="space-y-2.5 text-sm not-italic leading-6 text-[var(--color-text)]">
              <p><a className="footer-link font-bold" href="tel:+447587842444">+44 7587 842444</a></p>
              <p><a className="footer-link" href="mailto:info@amkbuildingconstruction.co.uk">info@amkbuildingconstruction.co.uk</a></p>
              <p>15A Station Road, Harrow, HA1 2UF</p>
              <p><a className="footer-link" href={MAP_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
              <p className="pt-2 text-xs text-[var(--color-muted)]">Alternative: <a className="footer-link" href="tel:08715661673">0871 566 1673</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-black/15 pt-6 text-xs leading-6 text-[var(--color-muted)]">
          © {new Date().getFullYear()} AMK London Building Construction Ltd. All rights reserved.
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
      className="flex h-11 w-11 items-center justify-center border border-black/25 text-[var(--color-ink)] transition-[background-color,color] duration-150 hover:bg-black hover:text-white"
    >
      <Icon name={icon} size={17} />
    </a>
  )
}
