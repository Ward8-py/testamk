import ServicePageLayout, { PageSection, ContentBlock, FeatureList, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Bespoke Furnishing & Joinery',
  description: 'Handmade, made-to-measure furniture from our own workshop. Kitchens, bedrooms, fitted furniture and custom joinery. 12-month guarantee.',
}

const ITEMS_WE_BUILD = [
  'Kitchens', 'Bedrooms', 'Radiator Covers', 'Book Cases',
  'Drawer Units', 'Partition Walls', 'Custom Made & Fitted Furniture',
]

const RELATED = [
  { href: '/services/kitchens-bathrooms', label: 'Kitchens & Bathrooms', desc: 'Complete installation service' },
  { href: '/services/bedrooms', label: 'Bedrooms', desc: 'Expert bedroom installation' },
  { href: '/services/flooring', label: 'Flooring', desc: 'All types supply & installation' },
]

export default function FurnishingPage() {
  return (
    <ServicePageLayout
      eyebrow="Bespoke Furnishing"
      heroTitle={'Handmade\nFurniture &\nJoinery'}
      heroSub="Ever fancied kitchen, bedroom, or other items of furniture made exactly the way you want, or in a wood of your choosing? Our craftsmen build it — made to measure in our own workshop."
      heroImg="/gallery/furnish.png"
      tag="AMK London · Workshop Crafted"
      relatedLinks={RELATED}
    >
      {/* ── Overview ── */}
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ContentBlock eyebrow="Our Craft" title={"Made to Measure,\nMade for You"}>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Having secured the best timber available, we produce handmade items of furniture —
                made to measure in our own workshop for each individual customer.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Let us make your furniture to the size, style and colour you want. Our carpenters
                can build almost anything you can dream of — from full kitchen units to bespoke
                bedroom furniture, radiator covers, bookcases, and custom storage solutions.
              </p>
              <p className="leading-[1.85]" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                We guarantee all our workmanship for <strong style={{ color: 'var(--color-ink-soft)' }}>12 months</strong>,
                and we are quick, clean, and professional throughout the entire process.
              </p>

              <InfoBox gold>
                <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  Every piece of furniture is crafted specifically for you — your size, your style,
                  your colour. No compromises, no off-the-shelf shortcuts.
                </p>
              </InfoBox>
            </ContentBlock>

            <div>
              <FeatureList items={ITEMS_WE_BUILD} gold />

              {/* Quality badges */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { n: '100%', l: 'Handmade' },
                  { n: '12mo', l: 'Guarantee' },
                  { n: 'MtM', l: 'Made to Measure' },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center p-4 border" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
                    <div className="font-display text-[28px] font-light leading-none mb-1" style={{ color: 'var(--color-accent)' }}>{n}</div>
                    <div className="text-[10px] tracking-[0.16em] uppercase" style={{ color: 'var(--color-muted)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            '/gallery/furnish1.jpeg',
            '/gallery/furnish2.jpeg',
            '/gallery/furnish3.jpeg',
            '/gallery/furnish4.jpeg',
            '/gallery/furnish5.jpeg',
            '/gallery/furnish6.jpeg',
            '/gallery/furnish7.jpeg',
            '/gallery/furnish8.jpeg',
            '/gallery/furnish9.jpeg'

          ]} />
        </Container>
      </PageSection>

      {/* ── Process ── */}
      <PageSection dark>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--color-ink)' }}>
                Crafted with Care,<br /><em className="italic">Built to Last</em>
              </h2>
              <div className="space-y-0 border-t" style={{ borderColor: 'var(--color-line)' }}>
                {[
                  { n: '01', t: 'Consultation', d: 'We discuss your vision, space, style preferences, and chosen materials.' },
                  { n: '02', t: 'Design & Quote', d: 'We design your piece to exact measurements and provide a clear, fixed quote.' },
                  { n: '03', t: 'Workshop Build', d: 'Our craftsmen build your furniture by hand in our own dedicated workshop.' },
                  { n: '04', t: 'Installation', d: 'We deliver and install with care — clean, professional, and to schedule.' },
                  { n: '05', t: '12-Month Guarantee', d: 'Your furniture is guaranteed for 12 months as standard on all workmanship.' },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-5 py-5 border-b group hover:pl-2 transition-all duration-300 cursor-default" style={{ borderColor: 'var(--color-line)' }}>
                    <span className="font-display text-[28px] font-light leading-none flex-shrink-0 group-hover:text-gold transition-colors" style={{ color: 'var(--color-subtle)' }}>{n}</span>
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: 'var(--color-ink-soft)' }}>{t}</div>
                      <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--color-muted)' }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why bespoke */}
            <div className="space-y-3">
              {[
                { icon: 'ruler', t: 'Perfect Fit', d: 'Made to the exact dimensions of your space -- no awkward gaps or ill-fitting units.' },
                { icon: 'palette', t: 'Your Style', d: 'Your choice of wood, finish, colour, and style -- entirely personalised to you.' },
                { icon: 'wood', t: 'Premium Materials', d: 'We source the finest timber and materials for every project, no compromises.' },
                { icon: 'trophy', t: 'Superior Quality', d: 'Handmade furniture outlasts mass-produced alternatives by years, often decades.' },
                { icon: 'money', t: 'Adds Property Value', d: "Bespoke fitted furniture is a tangible addition to your property's value." },
              ].map(({ icon, t, d }) => (
                <FeatureIconCard key={t} icon={icon} title={t} text={d} compact />
              ))}
            </div>
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}
