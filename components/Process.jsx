'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Section, Container, Divider } from './ui'

const STEPS = [
  { num: '01', title: 'Consultation',          desc: 'A senior consultant visits your property to understand your vision, assess requirements, and advise on feasibility.' },
  { num: '02', title: 'Planning & Design',     desc: 'Detailed plans, specifications, and schedules — coordinating architects and designers as required.' },
  { num: '03', title: 'Approval & Preparation',desc: 'We manage planning permissions, building regulations, and site preparation — handling all the paperwork.' },
  { num: '04', title: 'Construction',          desc: 'Our skilled craftsmen execute the build to the highest standards, with regular progress updates provided to you.' },
  { num: '05', title: 'Final Delivery',        desc: 'Thorough snagging, final inspection, and handover — ensuring your project is flawless before completion.' },
]

export default function Process() {
  const ref = useScrollReveal()

  return (
    <Section
      id="process"
      className="py-[clamp(80px,10vw,140px)] overflow-hidden"
      style={{ background: 'var(--color-panel)' }}
    >
      <div ref={ref}>
        <Container>
          <div className="text-center mb-16">
            <h2
              className="font-display font-light text-cream leading-[1.05] reveal"
              style={{ fontSize: 'clamp(34px,4.5vw,64px)', transitionDelay: '80ms' }}
            >
              From Concept to<br />
              <em className="italic">Completion</em>
            </h2>
            <p
              className="text-silver max-w-md mx-auto reveal mt-4"
              style={{ fontSize: 'clamp(13px,1.1vw,15px)', transitionDelay: '160ms' }}
            >
              A clear, structured process that keeps you informed and in control at every stage.
            </p>
            <Divider centered className="mt-7 reveal" style={{ transitionDelay: '200ms' }} />
          </div>

          {/* Desktop: horizontal steps */}
          <div className="hidden md:grid grid-cols-5 relative">
            {/* Connecting line */}
            <div
              className="absolute top-[42px] pointer-events-none"
              style={{
                left: 'calc(10% + 16px)',
                right: 'calc(10% + 16px)',
                height: '1px',
                background: 'linear-gradient(90deg, var(--color-accent), var(--color-line-strong))',
              }}
            />
            {STEPS.map(({ num, title, desc }, i) => (
              <StepCard key={num} num={num} title={title} desc={desc} delay={`${i * 80}ms`} />
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col gap-0 border-t border-cream/[0.06]">
            {STEPS.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className="flex gap-6 py-7 border-b border-cream/[0.06] group hover:pl-2 transition-all duration-300 cursor-default reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-cream/12 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/[0.06]"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <span className="font-display text-[22px] font-light text-silver-bright group-hover:text-gold transition-colors duration-300">
                    {num}
                  </span>
                </div>
                <div>
                  <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-silver-bright mb-2">{title}</div>
                  <p className="text-[12.5px] text-silver-mid leading-[1.65]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  )
}

function StepCard({ num, title, desc, delay }) {
  return (
    <div
      className="flex flex-col items-center text-center px-4 cursor-default group reveal"
      style={{ transitionDelay: delay }}
    >
      <div
        className="w-[84px] h-[84px] flex items-center justify-center border border-cream/12 relative z-10 mb-6 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/[0.06]"
        style={{ background: 'var(--color-panel)' }}
      >
        <span className="font-display text-[28px] font-light text-silver-bright group-hover:text-gold transition-colors duration-300">
          {num}
        </span>
      </div>
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-silver-bright mb-2.5">
        {title}
      </div>
      <p className="text-[12px] text-silver-mid leading-[1.65]">{desc}</p>
    </div>
  )
}
