'use client'
import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Section, Container, Divider } from './ui'
import { Icon } from './icons'

const BEDROOM_STEPS = [
  { n: '01', text: 'Have a copy of your bedroom layout plan and product list ready.' },
  { n: '02', text: 'Email plans to info@amkbuildingconstruction.co.uk — we calculate your cost.' },
  { n: '03', text: 'A surveyor visits your premises to carry out a full installation survey.' },
  { n: '04', text: 'Your surveyor confirms requirements and final cost; a date is then booked.' },
  { n: '05', text: 'On completion, your installation carries a 12-month workmanship guarantee.' },
]

const FURNISHING_ITEMS = [
  'Kitchens', 'Bedrooms', 'Radiator Covers',
  'Book Cases', 'Drawer Units', 'Partition Walls',
  'Custom Made & Fitted Furniture',
]

const FLOORING_TYPES = [
  { icon: 'wood', title: 'Laminate Supply',     desc: 'A wide variety of colours and designs -- choose from wood-style or ceramic-look panels that click together without glue.' },
  { icon: 'home', title: 'Full Installation',   desc: 'We can install all types of flooring supplied from our range, or provide floor installation only -- the choice is yours.' },
  { icon: 'stone', title: 'Marble & Granite',    desc: 'Our marble and granite installers have at least 8 years of experience. We fit all types of worktops and bathroom unit tops.' },
]

const TABS = [
  { id: 'bedrooms',   label: 'Bedrooms'       },
  { id: 'flooring',   label: 'Flooring'        },
  { id: 'marble',     label: 'Marble & Granite'},
  { id: 'furnishing', label: 'Furnishing'      },
]

export default function Specialisms() {
  const [active, setActive] = useState('bedrooms')
  const ref = useScrollReveal()

  return (
    <Section
      id="specialisms"
      className="py-[clamp(80px,10vw,140px)] bg-black section-top-border"
    >
      <div ref={ref}>
        <Container>
          <div className="text-center mb-14">
            <h2
              className="font-display font-light text-cream leading-[1.05] reveal"
              style={{ fontSize: 'clamp(32px,4.5vw,64px)', transitionDelay: '80ms' }}
            >
              Premium Craftsmanship,<br />
              <em className="italic">Tailored to You</em>
            </h2>
            <Divider centered className="mt-7 reveal" style={{ transitionDelay: '160ms' }} />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 justify-center mb-12 reveal" style={{ transitionDelay: '200ms' }}>
            {TABS.map(({ id, label }) => (
              <button
                type="button"
                key={id}
                onClick={() => setActive(id)}
                className={`
                  text-[10px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full
                  border transition-all duration-300 cursor-pointer focus:outline-none
                  ${active === id
                    ? 'text-gold border-gold/40 bg-gold/[0.06]'
                    : 'text-silver-mid border-cream/[0.06] hover:text-gold hover:border-gold/30 hover:bg-gold/[0.04]'}
                `}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div className="reveal" style={{ transitionDelay: '280ms' }}>
            {active === 'bedrooms'   && <BedroomsPanel />}
            {active === 'flooring'   && <FlooringPanel />}
            {active === 'marble'     && <MarblePanel />}
            {active === 'furnishing' && <FurnishingPanel />}
          </div>
        </Container>
      </div>
    </Section>
  )
}

/* ─── BEDROOMS ─────────────────────────────── */
function BedroomsPanel() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <h3 className="font-display text-[clamp(24px,2.5vw,38px)] font-light text-cream mb-4 leading-tight">
          Complete Bedroom<br /><em className="italic">Installation Service</em>
        </h3>
        <Divider className="mb-6" />
        <p className="text-silver leading-[1.85] mb-4 text-sm">
          Whether we make your new bedroom or you buy elsewhere, we offer a complete bedroom
          installation service. Our team of bedroom fitters are highly skilled and qualified craftsmen
          with many years of installation experience.
        </p>
        <p className="text-silver leading-[1.85] text-sm">
          By using our own fitting team, we take great care to turn your dream bedroom into a reality.
          All installations carry a <strong className="text-silver-bright font-medium">12-month workmanship guarantee.</strong>
        </p>
        <div
          className="mt-6 p-5 border border-gold/20 text-[12px] text-silver-mid"
          style={{ background: 'var(--color-accent-tint)' }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2 font-semibold">Note</p>
          A £30 fee is payable in advance for the site survey, deducted from your invoice if you
          proceed. A 30% deposit is required when booking the installation date.
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold mb-5">5-Step Process</p>
        <ol className="space-y-0 border-t border-cream/[0.06]">
          {BEDROOM_STEPS.map(({ n, text }) => (
            <li
              key={n}
              className="flex gap-5 items-start py-5 border-b border-cream/[0.06] group hover:pl-2 transition-all duration-300"
            >
              <span className="font-display text-[28px] font-light text-silver-dark leading-none flex-shrink-0 group-hover:text-gold transition-colors duration-300">
                {n}
              </span>
              <p className="text-[13px] text-silver leading-[1.7] pt-1">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ─── FLOORING ─────────────────────────────── */
function FlooringPanel() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-10">
        {FLOORING_TYPES.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="border border-cream/[0.06] p-7 hover:border-cream/12 transition-colors duration-300 cursor-default"
            style={{ background: 'var(--color-panel)' }}
          >
            <span className="block text-gold mb-4"><Icon name={icon} size={28} /></span>
            <h4 className="text-[12px] font-semibold tracking-[0.1em] uppercase text-silver-bright mb-3">{title}</h4>
            <p className="text-[12.5px] text-silver-mid leading-[1.65]">{desc}</p>
          </div>
        ))}
      </div>
      <div
        className="border border-cream/[0.06] p-7 max-w-2xl"
        style={{ background: 'var(--color-surface)' }}
      >
        <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-3">Laminate Flooring</p>
        <p className="text-[13px] text-silver leading-[1.8]">
          Do you dream of an exquisite floor that is quick and easy to install? All panels simply
          click together without glue, offering a stylish and durable effect. Even if you move home,
          laminate can be dismantled and re-installed up to <strong className="text-silver-light font-medium">three times.</strong>
        </p>
      </div>
    </div>
  )
}

/* ─── MARBLE & GRANITE ─────────────────────── */
function MarblePanel() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <h3 className="font-display text-[clamp(24px,2.5vw,38px)] font-light text-cream mb-4 leading-tight">
          Marble &amp; Granite<br /><em className="italic">Worktop Specialists</em>
        </h3>
        <Divider className="mb-6" />
        <p className="text-silver leading-[1.85] mb-4 text-sm">
          We can install all types of granite and marble worktops and bathroom unit tops for your
          kitchens and bathrooms.
        </p>
        <p className="text-silver leading-[1.85] text-sm">
          Our marble and granite installers have at least{' '}
          <strong className="text-silver-bright font-medium">8 years of experience</strong> and are
          fully qualified craftsmen. We guarantee all our workmanship for{' '}
          <strong className="text-silver-bright font-medium">12 months</strong>, and are quick, clean
          and professional.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[
          { icon: 'stone', label: 'Granite Worktops',      desc: 'Durable, heat-resistant, and naturally beautiful -- perfect for high-use kitchen surfaces.' },
          { icon: 'sparkle', label: 'Marble Worktops',        desc: 'Timeless elegance with unique veining -- transformed into functional art for your home.' },
          { icon: 'bath', label: 'Bathroom Unit Tops',    desc: 'Bespoke marble and granite tops for vanity units, wet rooms, and en-suites.' },
          { icon: 'clock', label: '8+ Years Experience',   desc: 'Our specialist installers bring a minimum of eight years of dedicated craftsmanship.' },
        ].map(({ icon, label, desc }) => (
          <div
            key={label}
            className="flex gap-4 items-start p-5 border border-cream/[0.06] hover:border-cream/12 transition-colors duration-300 cursor-default"
            style={{ background: 'var(--color-panel)' }}
          >
            <span className="text-gold flex-shrink-0 mt-0.5"><Icon name={icon} size={24} /></span>
            <div>
              <div className="text-[12px] font-semibold tracking-[0.09em] uppercase text-silver-bright mb-1">{label}</div>
              <div className="text-[12px] text-silver-mid leading-[1.6]">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── FURNISHING ───────────────────────────── */
function FurnishingPanel() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <h3 className="font-display text-[clamp(24px,2.5vw,38px)] font-light text-cream mb-4 leading-tight">
          Bespoke Handmade<br /><em className="italic">Furniture &amp; Joinery</em>
        </h3>
        <Divider className="mb-6" />
        <p className="text-silver leading-[1.85] mb-4 text-sm">
          Ever fancied kitchen, bedroom or other items of furniture made exactly the way you want,
          or in a wood of your choosing? We secure the finest timber and produce handmade,
          made-to-measure items in our own workshop for each individual customer.
        </p>
        <p className="text-silver leading-[1.85] text-sm">
          Let us make your furniture to the size, style, and colour you want. Our carpenters can build
          almost anything you can dream of — all guaranteed for{' '}
          <strong className="text-silver-bright font-medium">12 months.</strong>
        </p>
      </div>
      <div>
        <p className="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold mb-5">We Build</p>
        <ul className="space-y-0 border-t border-cream/[0.06]">
          {FURNISHING_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 py-4 border-b border-cream/[0.06] group hover:pl-2 transition-all duration-300"
            >
              <span
                className="w-8 h-px flex-shrink-0 transition-all duration-300 group-hover:w-12"
                style={{ background: 'linear-gradient(90deg, var(--color-accent), transparent)' }}
              />
              <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-silver-bright group-hover:text-[var(--color-ink)] transition-colors duration-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
