import ServicePageLayout, { PageSection, ContentBlock, FeatureList, StepCard, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Kitchens & Bathrooms — AMK London Building Construction',
  description: 'Complete kitchen and bathroom supply, design and installation service across London. 12-month workmanship guarantee.',
}

const STEPS = [
  { n: '01', t: 'Prepare Your Plans', d: 'Have a copy of your kitchen layout plan and the number of units and appliances to be installed.' },
  { n: '02', t: 'Email Us', d: 'Email your plans to info@amkbuildingconstruction.co.uk and we will calculate the cost for you.' },
  { n: '03', t: 'Free Quotation', d: 'If you are happy with the quotation, a member of our survey team will visit to carry out a full survey.' },
  { n: '04', t: 'Survey & Confirm', d: 'Our surveyor confirms your requirements and the final cost. We then book your installation date.' },
  { n: '05', t: 'Safe Installation', d: 'All work is carried out to safety standards by our skilled, qualified kitchen fitters.' },
  { n: '06', t: '12-Month Guarantee', d: 'On completion, your kitchen installation carries a 12-month workmanship guarantee as standard.' },
]

const RELATED = [
  { href: '/services/marble-granite', label: 'Marble & Granite', desc: 'Premium worktop installation' },
  { href: '/services/bedrooms', label: 'Bedrooms', desc: 'Complete installation service' },
  { href: '/services/development-renovation', label: 'Full Renovation', desc: 'Extensions & refurbishments' },
]

export default function KitchensBathroomsPage() {
  return (
    <ServicePageLayout
      eyebrow="Kitchens & Bathrooms"
      heroTitle={'Kitchens &\nBathrooms'}
      heroSub="Whether you want us to supply the items or bring it yourself, the choice is yours. We offer a complete supply, design and installation service — turning your dream kitchen or bathroom into reality."
      heroImg="/gallery/kitchengover.png"
      tag="AMK London · 12-Month Guarantee"
      relatedLinks={RELATED}
    >
      {/* ── Overview ── */}
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ContentBlock eyebrow="Complete Kitchen Service" title={"Expert Installation,\nEvery Time"}>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Whether you buy your new kitchen from us or elsewhere, we offer a complete installation service.
                Our team of fitters are highly skilled and qualified craftsmen with many years of kitchen
                installation experience.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                By using our own kitchen fitting team, we take great care to turn your dream kitchen into reality.
                We can even create a customised design to suit your individual requirements.
              </p>
              <InfoBox gold>
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>Important Note</p>
                <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  A <strong>£30 fee</strong> is payable in advance for the site survey, which will be deducted
                  from your invoice should you proceed. A deposit of <strong>30%</strong> of the final fee will
                  be required when booking your installation date.
                </p>
              </InfoBox>
            </ContentBlock>

            {/* Supply & Design */}
            <div>
              <ContentBlock eyebrow="Supply & Design" title="Customised to Your Needs">
                <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                  One of our designers will visit your premises to carry out full measurements of the area and
                  space available. They will discuss your requirements and design preferences to create a design
                  that is customised and suited to your individual needs.
                </p>
                <p className="leading-[1.85]" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                  We are a supplier for a major kitchen fixture company with an excellent reputation for
                  producing high quality, well-designed kitchens. These kitchens are only available through
                  fully qualified building contractors, and we offer highly competitive prices.
                </p>
              </ContentBlock>

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: 'home', t: 'Supply or Bring Your Own', d: 'The choice is always yours.' },
                  { icon: 'measure', t: 'Custom Design Service', d: 'Measured and designed for you.' },
                  { icon: 'lock', t: '12-Month Guarantee', d: 'On all workmanship.' },
                  { icon: 'check', t: 'Safety Compliant', d: 'All work to safety standards.' },
                ].map(({ icon, t, d }) => (
                  <FeatureIconCard key={t} icon={icon} title={t} text={d} compact />
                ))}
              </div>
            </div>
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            '/gallery/kitchen1.jpg',
            '/gallery/kitchen2.jpg',
            '/gallery/kitchen3.jpg',
            '/gallery/kitchen4.jpg',
            '/gallery/kitchen5.jpeg',
            '/gallery/kitchen6.jpeg',
            '/gallery/kitchen7.jpeg',
            '/gallery/bathroom1.jpg',
            '/gallery/bathroom2.jpg',
            '/gallery/bathroom3.jpg',
            '/gallery/bathroom4.jpg',
            '/gallery/bathroom5.jpg',
            '/gallery/bathroom6.jpeg',
            '/gallery/bathroom7.jpeg',
            '/gallery/bathroom8.jpeg',
            '/gallery/bathroom9.jpeg',
            '/gallery/bathroom10.jpeg'

          ]} />
        </Container>
      </PageSection>

      {/* ── 6-Step Process ── */}
      <PageSection dark>
        <Container>
          <div className="text-center mb-14">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>How It Works</p>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
              6 Simple Steps to<br /><em className="italic">Your Perfect Kitchen</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {STEPS.map(({ n, t, d }) => <StepCard key={n} number={n} title={t} text={d} />)}
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}
