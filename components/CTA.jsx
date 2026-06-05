'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Section, Container, Eyebrow, Divider, BtnGold, BtnGhost, ArrowRight } from './ui'
import { Icon } from './icons'

export default function CTA() {
  const ref = useScrollReveal()

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Section id="cta" className="py-[clamp(80px,10vw,120px)] overflow-hidden relative bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(rgba(248, 244, 236, 0.88), rgba(248, 244, 236, 0.88)),
            url('/gallery/cta.png') center/cover no-repeat
          `,
        }}
      />

      {/* Grid overlay */}
      <div className="arch-grid absolute inset-0 pointer-events-none" />

      <div ref={ref}>
        <Container>
          <div className="relative z-10 text-center max-w-[660px] mx-auto">
            <Eyebrow className="reveal mb-6">Ready to Begin?</Eyebrow>

            <h2
              className="font-display font-light text-cream leading-[1.05] reveal"
              style={{ fontSize: 'clamp(34px,4.5vw,64px)', transitionDelay: '80ms' }}
            >
              Start Your Project<br />
              <em className="italic">Today</em>
            </h2>

            <Divider centered className="my-7 reveal" style={{ transitionDelay: '120ms' }} />

            <p
              className="text-silver leading-[1.85] reveal mb-12"
              style={{ fontSize: 'clamp(13px,1.1vw,15px)', transitionDelay: '160ms' }}
            >
              Contact us for a free, no-obligation consultation. One of our senior consultants will
              visit your property and advise on the best way to bring your vision to life.
              All workmanship guaranteed for 12 months.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center reveal"
              style={{ transitionDelay: '200ms' }}
            >
              <BtnGold onClick={() => scrollTo('#contact')}>
                Request a Free Quote
                <ArrowRight />
              </BtnGold>
              <BtnGhost href="tel:+447587842444">
                Call +44 7587 842444
              </BtnGhost>
            </div>

            {/* Trust signals */}
            <div
              className="flex flex-wrap justify-center gap-8 mt-14 reveal"
              style={{ transitionDelay: '280ms' }}
            >
              {[
                { icon: 'lock', label: '12-Month Guarantee' },
                { icon: 'money', label: 'No Hidden Costs' },
                { icon: 'phone', label: 'Free Consultation' },
                { icon: 'star', label: '400+ Happy Clients' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-silver-mid">
                  <Icon name={icon} size={16} className="text-gold" />
                  <span className="text-[11px] font-medium tracking-[0.12em] uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
