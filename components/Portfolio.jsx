'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { PROJECTS } from '@/lib/projects'
import { Container } from './ui'
import { Icon } from './icons'
import PortfolioGrid from './portfolio/PortfolioGrid'

export default function Portfolio() {
  const ref = useScrollReveal()

  return (
    <section id="portfolio" ref={ref} className="section-space bg-[var(--color-page)]">
      <Container>
        <div className="mb-10 grid gap-6 border-t-2 border-black pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <h2 className="reveal section-title max-w-4xl">Real projects. Every stage visible.</h2>
            <p className="reveal mt-5 max-w-xl text-base leading-7 text-[var(--color-text)]">
              See how AMK turns active building work into finished London homes.
            </p>
          </div>
          <Link href="/portfolio" className="reveal amk-button amk-button-light w-fit">
            Explore projects
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>

        <div className="reveal">
          <PortfolioGrid projects={PROJECTS} />
        </div>
      </Container>
    </section>
  )
}
