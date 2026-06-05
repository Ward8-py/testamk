'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Section, Container, Eyebrow, Divider } from './ui'
import { Icon } from './icons'

const FEATURES = [
  {
    icon: 'clipboard',
    title: 'End-to-End Project Management',
    text: 'From just one call, we coordinate your entire project and provide all the services you need -- from concept and design to planning permission and installation.',
  },
  {
    icon: 'money',
    title: 'Transparent Pricing',
    text: 'No hidden costs, no surprises. We offer clear, competitive quotes and guarantee a fair price every time.',
  },
  {
    icon: 'hardhat',
    title: 'Experienced Professionals',
    text: 'Our team of trained experts brings years of London construction experience -- recommended by suppliers based on client feedback.',
  },
  {
    icon: 'bolt',
    title: 'Fast & Efficient Delivery',
    text: 'We work quickly and efficiently with the minimum disturbance and inconvenience to you and your property.',
  },
  {
    icon: 'handshake',
    title: 'Personal Consultation',
    text: 'One of our consultants will visit you personally, determine the feasibility of your plans, and advise on your specific requirements.',
  },
]

export default function WhyUs() {
  const ref = useScrollReveal()

  return (
    <Section
      id="why"
      className="py-[clamp(80px,10vw,140px)] bg-black section-top-border"
    >
      <div ref={ref}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-[60px] xl:gap-20 items-start">

            {/* Left — content */}
            <div>
              <Eyebrow className="reveal mb-4">Why Choose AMK</Eyebrow>
              <h2
                className="font-display font-light text-cream leading-[1.05] reveal"
                style={{ fontSize: 'clamp(34px,4.5vw,64px)', transitionDelay: '80ms' }}
              >
                Built on Trust,<br />
                <em className="italic">Delivered with Precision</em>
              </h2>
              <Divider className="my-6 reveal" style={{ transitionDelay: '120ms' }} />
              <p
                className="text-silver leading-[1.85] mb-3 reveal"
                style={{ fontSize: 'clamp(13px,1.1vw,15px)', transitionDelay: '160ms' }}
              >
                We are specialists in property development, renovation and construction. We are able
                to take over a full project and give the client peace of mind with exceptional
                customer service.
              </p>
              <p
                className="text-silver leading-[1.85] mb-8 reveal"
                style={{ fontSize: 'clamp(13px,1.1vw,15px)', transitionDelay: '200ms' }}
              >
                Call us now, speak to us directly and discuss a new project or arrange a meeting
                instantly. We seek customer satisfaction in everything we do.
              </p>

              <div className="border-t border-cream/[0.06] reveal" style={{ transitionDelay: '240ms' }}>
                {FEATURES.map(({ icon, title, text }, i) => (
                  <div
                    key={title}
                    className="flex gap-5 py-5 border-b border-cream/[0.06] group hover:pl-2 transition-all duration-300 cursor-default"
                  >
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[17px] border border-cream/12 transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gold/[0.06]"
                      style={{ background: 'var(--color-surface)' }}
                    >
                      <Icon name={icon} size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-silver-bright mb-1">
                        {title}
                      </div>
                      <p className="text-[12.5px] text-silver-mid leading-[1.65]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="reveal-right relative">
              <Image
                src="/gallery/new3.png"
                alt="AMK London — Professional craftsmen at work"
                width={800}
                height={1067}
                className="w-full object-cover"
                style={{ aspectRatio: '3/4', filter: 'grayscale(10%)' }}
                loading="lazy"
              />
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-left-5 px-7 py-6 border border-cream/12 z-10"
                style={{ background: 'var(--color-surface)' }}
              >
                <div className="font-display text-[32px] font-light text-gold leading-none">400+</div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-silver-mid mt-1 leading-tight">
                  Projects<br />Delivered
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
