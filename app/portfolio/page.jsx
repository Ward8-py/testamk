import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import QuoteTrigger from '@/components/QuoteTrigger'
import { PROJECTS } from '@/lib/projects'
import { Container } from '@/components/ui'
import { Icon } from '@/components/icons'

export const metadata = {
  title: 'Portfolio',
  description: 'Explore AMK London construction, renovation, extension, and new build project galleries.',
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[54vh] items-end overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/gallery/dr14.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,9,0.86) 0%, rgba(8,8,9,0.48) 60%, rgba(8,8,9,0.20) 100%)' }} />

          <Container className="relative z-10 pb-12 pt-28 sm:pb-14 sm:pt-36">
            <nav className="mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link href="/" className="text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white">
                Home
              </Link>
              <span className="text-white/35">/</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white">
                Portfolio
              </span>
            </nav>
            <h1 className="font-display text-[clamp(52px,8vw,108px)] font-semibold leading-[0.95] tracking-[-0.035em] text-white">
              Projects, shown honestly.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Before, in progress and after photography from two AMK renovations.
            </p>
          </Container>
        </section>

        <section className="py-[clamp(70px,9vw,120px)]" style={{ background: 'var(--color-page)' }}>
          <Container>
            <PortfolioGrid projects={PROJECTS} />
          </Container>
        </section>

        <section className="relative overflow-hidden py-24" style={{ background: 'var(--color-panel)' }}>
          <Container className="relative z-10 text-center">
            <h2 className="font-display text-[clamp(38px,5vw,68px)] font-semibold leading-none tracking-[-0.03em] text-[var(--color-ink)]">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--color-text)]">
              Share the essentials and we’ll arrange the next practical step.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <QuoteTrigger source="portfolio-page" className="amk-button amk-button-dark">
                Get a Free Quote
                <Icon name="arrow-right" size={13} />
              </QuoteTrigger>
              <Link
                href="/"
                className="amk-button amk-button-light"
              >
                Back Home
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatButtons />
    </>
  )
}
