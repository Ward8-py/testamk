import ServicePageLayout, { PageSection, ContentBlock, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'
import { Icon } from '@/components/icons'

export const metadata = {
  title: 'Flooring Installation — AMK London Building Construction',
  description: 'All types of flooring supply and installation in London. Laminate, hardwood, and more. Professional fitting with quality guarantee.',
}

const FLOORING_OPTIONS = [
  {
    icon: 'wood',
    t: 'Laminate Flooring',
    d: 'A popular choice for many rooms. Wide variety of colours and designs -- choose from wood-style or ceramic-look panels that simply click together without glue.',
    tags: ['Click-Lock System', 'Re-installable x3', 'Wide Variety'],
  },
  {
    icon: 'home',
    t: 'Full Installation Only',
    d: 'Already purchased your flooring? No problem. We provide expert installation only -- bringing precision and care to your chosen floor product.',
    tags: ['Any Brand', 'Expert Fitting', 'Clean & Tidy'],
  },
  {
    icon: 'bag',
    t: 'Supply & Installation',
    d: 'Choose from our range of quality flooring products and we handle everything -- from selection through to professional installation.',
    tags: ['Quality Products', 'End-to-End', 'Best Prices'],
  },
]

const RELATED = [
  { href: '/services/marble-granite', label: 'Marble & Granite', desc: 'Premium worktop installation' },
  { href: '/services/kitchens-bathrooms', label: 'Kitchens', desc: 'Complete kitchen installation' },
  { href: '/services/furnishing', label: 'Furnishing', desc: 'Bespoke fitted furniture' },
]

export default function FlooringPage() {
  return (
    <ServicePageLayout
      eyebrow="Flooring"
      heroTitle={'Flooring'}
      heroSub="We can install all types of flooring, supplied from our range of quality products, or provide floor installation only. The choice is yours — and the possibilities are endless."
      heroImg="/gallery/floor.png"
      tag="AMK London · Supply & Installation"
      relatedLinks={RELATED}
    >
      {/* ── Overview ── */}
      <PageSection>
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Our Flooring Services</p>
            <h2 className="font-display font-light mb-5" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
              The Right Floor for<br /><em className="italic">Every Room</em>
            </h2>
            <p className="leading-[1.85]" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
              We can install all types of flooring, supplied from our range of quality products, or can
              provide floor installation only. The choice is yours and the possibilities are endless —
              but we can help you make the decision.
            </p>
          </div>

          {/* Three service cards */}
          <div className="grid md:grid-cols-3 gap-3">
            {FLOORING_OPTIONS.map(({ icon, t, d, tags }) => (
              <div key={t} className="p-8 border transition-all duration-300 hover:border-cream/12 cursor-default" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
                <div className="mb-5 text-gold"><IconFloor name={icon} /></div>
                <h3 className="font-display text-[24px] font-light mb-3" style={{ color: 'var(--color-ink)' }}>{t}</h3>
                <p className="text-[13.5px] leading-[1.7] mb-6" style={{ color: 'var(--color-text)' }}>{d}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="text-[9px] font-semibold tracking-[0.2em] uppercase px-3 py-1 border" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent-line-strong)', background: 'var(--color-accent-tint)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            '/gallery/flooring01.jpg',
            '/gallery/flooring02.jpg',
            '/gallery/flooring03.jpg',
            '/gallery/flooring04.jpeg',
            '/gallery/flooring05.jpeg',
            '/gallery/flooring06.jpeg',
            '/gallery/flooring07.jpeg',
            '/gallery/flooring08.jpeg',
            '/gallery/flooring09.jpeg',
            '/gallery/flooring10.jpeg',
            '/gallery/flooring11.jpeg',
            '/gallery/flooring12.jpeg',
            '/gallery/flooring13.jpeg'

          ]} />
        </Container>
      </PageSection>

      {/* ── Laminate spotlight ── */}
      <PageSection dark>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ContentBlock eyebrow="Laminate Flooring" title={"Quick, Stylish &\nIncredibly Practical"}>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Laminate flooring is a popular choice for many rooms in the home. With such a wide variety
                of colours and designs, there's something to suit any home.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Nowadays, you're not just limited to wood-style — choose from our range of floor tiles that
                give the look of ceramic, but the warmth and practicality of laminate.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Do you dream of an exquisite floor that is quick and easy to install? All the panels just
                click together without glue, with a stylish and durable effect. This dream becomes a reality
                when you choose our range of laminate floors.
              </p>

              <InfoBox gold>
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>Did You Know?</p>
                <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  Even if you decide to move home, laminate flooring is easy to dismantle and can be
                  re-installed up to <strong>three times</strong> — making it a truly smart investment.
                </p>
              </InfoBox>
            </ContentBlock>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'wood', t: 'Wood-Style', d: 'Classic oak, walnut, and pine effects' },
                { icon: 'stone', t: 'Stone-Look', d: 'Ceramic tile appearance, laminate warmth' },
                { icon: 'link', t: 'Click-Lock', d: 'No glue -- panels simply click together' },
                { icon: 'recycle', t: 'Re-installable', d: 'Move home and take your floor with you' },
                { icon: 'broom', t: 'Easy to Clean', d: 'Low maintenance and hygienic surface' },
                { icon: 'money', t: 'Cost Effective', d: 'Premium look at a fraction of the cost' },
              ].map(({ icon, t, d }) => (
                <div key={t} className="p-5 border transition-all hover:border-cream/12" style={{ background: 'var(--color-panel-strong)', borderColor: 'var(--color-line)' }}>
                  <div className="mb-3 text-gold"><IconFloor name={icon} size={22} /></div>
                  <div className="text-[11px] font-semibold tracking-[0.08em] uppercase mb-1" style={{ color: 'var(--color-ink-soft)' }}>{t}</div>
                  <div className="text-[11.5px]" style={{ color: 'var(--color-muted)' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}


function IconFloor({ name, size = 32 }) {
  return <Icon name={name} size={size} />
}
