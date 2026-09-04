'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container } from './ui'

const STEPS = [
  {
    number: '01',
    title: 'Tell us about the project.',
    text: 'Choose a service, share the postcode and leave the best number to reach you.',
  },
  {
    number: '02',
    title: 'Site visit and clear quote.',
    text: 'We assess the property, define the scope and explain the cost before work begins.',
  },
  {
    number: '03',
    title: 'AMK manages delivery and handover.',
    text: 'One team coordinates the build, keeps you informed and finishes the details properly.',
  },
]

export default function Process() {
  const ref = useScrollReveal()

  return (
    <section id="process" ref={ref} className="section-space bg-black text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(260px,.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="reveal section-title !text-white">A clear route from idea to handover.</h2>
            <p className="reveal mt-6 max-w-sm text-base leading-7 text-white/68">
              Three steps, one accountable team, and no need to coordinate separate trades yourself.
            </p>
          </div>

          <ol className="reveal border-t border-white/35">
            {STEPS.map((step) => (
              <li key={step.number} className="grid gap-4 border-b border-white/20 py-8 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-6 sm:py-10">
                <span className="font-display text-[44px] font-semibold leading-none text-white/45" aria-hidden="true">{step.number}</span>
                <div>
                  <h3 className="font-display text-[clamp(30px,3vw,46px)] font-semibold leading-[1.02] tracking-[-0.025em] text-white">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-white/68">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
