'use client'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { PROJECTS } from '@/lib/projects'
import { Section, Container, Divider } from './ui'
import { Icon } from './icons'
import PortfolioCard from './portfolio/PortfolioCard'

export default function Portfolio() {
  const ref = useScrollReveal()
  const featuredProjects = PROJECTS.filter((project) => project.featured).slice(0, 5)

  return (
    <Section id="portfolio" className="section-top-border bg-black py-[clamp(80px,10vw,140px)]">
      <div ref={ref}>
        <Container>
          <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2
                className="reveal font-display font-light leading-[1.05] text-cream"
                style={{ fontSize: 'clamp(34px,4.5vw,64px)', transitionDelay: '80ms' }}
              >
                Recent Work,<br />
                <em className="italic text-silver-bright">Built with Care</em>
              </h2>
              <Divider className="reveal my-6" style={{ transitionDelay: '120ms' }} />
              <p
                className="reveal max-w-xl leading-[1.85] text-silver"
                style={{ fontSize: 'clamp(13px,1.1vw,15px)', transitionDelay: '160ms' }}
              >
                Browse a selection of construction, renovation, and interior projects delivered across London.
                Each gallery shows the practical detail behind the finished result.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="reveal inline-flex w-fit items-center gap-2.5 border px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              style={{ borderColor: 'var(--color-line-strong)', transitionDelay: '220ms' }}
            >
              View Full Portfolio
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <div key={project.slug} className="reveal" style={{ transitionDelay: `${240 + index * 80}ms` }}>
                <PortfolioCard project={project} featured={index === 0} compact />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  )
}
