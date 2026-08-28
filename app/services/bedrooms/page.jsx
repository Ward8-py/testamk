import ServicePageLayout, { PageSection, ContentBlock, StepCard, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Bedroom Installation',
  description: 'Complete bedroom installation service in London. Whether you buy elsewhere or we supply — expert fitting with a 12-month guarantee.',
}

const STEPS = [
  { n: '01', t: 'Prepare Your Plans', d: 'Have a copy of your bedroom layout plan and your product list ready before contacting us.' },
  { n: '02', t: 'Email Us', d: 'Email your plans to info@amkbuildingconstruction.co.uk and we will calculate the cost for you.' },
  { n: '03', t: 'Free Quotation', d: 'If you are happy with the quotation, a member of our survey team visits to carry out a full survey.' },
  { n: '04', t: 'Survey & Book', d: 'Our surveyor confirms your requirements and the final cost. We then book a convenient installation date.' },
  { n: '05', t: '12-Month Guarantee', d: 'On completion your installation carries a 12-month workmanship guarantee as standard.' },
]

const RELATED = [
  { href: '/services/kitchens-bathrooms', label: 'Kitchens & Bathrooms', desc: 'Complete installation service' },
  { href: '/services/furnishing', label: 'Furnishing', desc: 'Bespoke fitted bedroom furniture' },
  { href: '/services/flooring', label: 'Flooring', desc: 'Bedroom flooring solutions' },
]

export default function BedroomsPage() {
  return (
    <ServicePageLayout
      eyebrow="Bedroom Installation"
      heroTitle={'Bedrooms'}
      heroSub="Whether we make your new bedroom or you buy elsewhere, we offer a complete bedroom installation service — turning your dream bedroom into a reality."
      heroImg="/gallery/bedcover.png"
      tag="AMK London · 12-Month Guarantee"
      relatedLinks={RELATED}
    >
      {/* ── Overview ── */}
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ContentBlock eyebrow="Our Bedroom Service" title={"Expert Fitting,\nDream Results"}>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Our team of bedroom fitters are highly skilled and qualified craftsmen with many years of
                bedroom installation experience. By using our own fitting team, we take great care to turn
                your dream bedroom into a reality.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                Whether you are purchasing a new bedroom from elsewhere and looking for expert installation,
                or want us to handle the full project from supply to completion — we have you covered.
              </p>
              <p className="leading-[1.85]" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                All our workmanship is guaranteed for <strong style={{ color: 'var(--color-ink-soft)' }}>12 months</strong>,
                and we are quick, clean and professional throughout.
              </p>

              <InfoBox gold>
                <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  A <strong>£30 fee</strong> is payable in advance for the site survey, deducted from your invoice
                  on proceeding. A <strong>30% deposit</strong> of the final fee is required when booking the installation date.
                </p>
              </InfoBox>
            </ContentBlock>

            <div>
              {/* USPs */}
              <div className="grid gap-3">
                {[
                  { icon: 'bed', t: 'Supply or Bring Your Own', d: 'We fit bedrooms you purchase from any supplier -- the choice is yours.' },
                  { icon: 'measure', t: 'Expert Survey Team', d: 'A dedicated surveyor visits to confirm requirements and final cost.' },
                  { icon: 'hammer', t: 'Skilled Craftsmen', d: 'Many years of bedroom installation experience on every project.' },
                  { icon: 'lock', t: '12-Month Guarantee', d: 'All installation work backed by our 12-month workmanship guarantee.' },
                  { icon: 'sparkle', t: 'Perfect Finish', d: 'We take great care to turn your dream bedroom into a reality.' },
                  { icon: 'mail', t: 'Easy Process', d: 'Just email your plans -- we calculate cost and handle everything else.' },
                ].map(({ icon, t, d }) => (
                  <FeatureIconCard key={t} icon={icon} title={t} text={d} compact />
                ))}
              </div>
            </div>
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            '/gallery/bed1.jpg',
            '/gallery/bed2.jpg',
            '/gallery/bed3.jpg',
            '/gallery/bed4.jpg',
            '/gallery/bed5.jpeg',
            '/gallery/bed6.jpeg',
            '/gallery/bed7.jpeg',
            '/gallery/bed8.jpeg',
            '/gallery/bed9.jpeg',
            '/gallery/bed10.jpeg',

            '/gallery/bed12.jpeg'

          ]} />
        </Container>
      </PageSection>

      {/* ── 5-Step Process ── */}
      <PageSection dark>
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
              5 Steps to Your<br /><em className="italic">Perfect Bedroom</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {STEPS.map(({ n, t, d }) => <StepCard key={n} number={n} title={t} text={d} />)}
          </div>
          {/* Contact nudge */}
          <div
            className="mt-8 p-8 border text-center"
            style={{ background: 'var(--color-accent-tint)', borderColor: 'var(--color-accent-line)' }}
          >
            <p className="text-[14px] leading-[1.7] mb-3" style={{ color: 'var(--color-ink-soft)' }}>
              Ready to get started? Email your plans today.
            </p>
            <a
              href="mailto:info@amkbuildingconstruction.co.uk"
              className="text-[16px] font-medium tracking-tight hover:text-gold transition-colors"
              style={{ color: 'var(--color-accent)' }}
            >
              info@amkbuildingconstruction.co.uk
            </a>
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}
