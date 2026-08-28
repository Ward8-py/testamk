import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { PROJECTS } from '@/lib/projects'
import { Container, Divider, BtnGold } from '@/components/ui'
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
              filter: 'grayscale(14%) brightness(1.06) opacity(0.42)',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-page) 0%, rgba(248, 244, 236, 0.76) 62%, rgba(248, 244, 236, 0.38) 100%)' }} />

          <Container className="relative z-10 pb-12 pt-28 sm:pb-14 sm:pt-36">
            <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
              <Link href="/" className="text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-gold" style={{ color: 'var(--color-muted)' }}>
                Home
              </Link>
              <span style={{ color: 'var(--color-subtle)' }}>/</span>
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
                Portfolio
              </span>
            </nav>
            <h1
              className="font-display font-light leading-[0.98]"
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(44px,7vw,96px)' }}
            >
              Project Galleries<br />
              <em className="italic">with Real Detail</em>
            </h1>
            <Divider className="my-7" />
            <p className="max-w-2xl leading-[1.85]" style={{ color: 'var(--color-text)', fontSize: 'clamp(14px,1.15vw,17px)' }}>
              Explore completed AMK projects by category, then open each gallery to see the workmanship,
              finishes, and practical decisions behind the finished space.
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
            <h2 className="font-display font-light leading-[1.08]" style={{ color: 'var(--color-ink)', fontSize: 'clamp(32px,4vw,58px)' }}>
              Let us look at your property<br />
              <em className="italic">and advise the next step.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-[1.85]" style={{ color: 'var(--color-muted)', fontSize: '15px' }}>
              A senior consultant can review your ideas, explain what is feasible, and provide a clear quote.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <BtnGold href="/#contact">
                Request a Free Quote
                <Icon name="arrow-right" size={13} />
              </BtnGold>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2.5 border px-9 py-[17px] text-[10.5px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30"
                style={{ color: 'var(--color-text)', borderColor: 'var(--color-line-strong)' }}
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
