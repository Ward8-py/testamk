import ServicePageLayout, { PageSection, ContentBlock, FeatureList, StepCard, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Development & Renovation — AMK London Building Construction',
  description: 'Extensions, loft conversions, garages, kitchens, bathrooms, driveways, brickwork, and all major refurbishments across London.',
}

const SERVICES_LIST = [
  'Extensions', 'Loft Conversions', 'Garages', 'Kitchens', 'Bathrooms',
  'Driveways', 'Brickwork', 'Plumbing', 'Plastering', 'Material Supply',
  'Painting and Decorating', 'All Major Refurbishments',
]

const RELATED = [
  { href: '/services/kitchens-bathrooms', label: 'Kitchens & Bathrooms', desc: 'Complete supply, design & installation' },
  { href: '/services/marble-granite', label: 'Marble & Granite', desc: 'Premium worktop specialists' },
  { href: '/services/flooring', label: 'Flooring', desc: 'All types supply & installation' },
]

export default function DevelopmentRenovationPage() {
  return (
    <ServicePageLayout
      eyebrow="Development & Renovation"
      heroTitle={'Development\n& Renovation'}
      heroSub="We are able to undertake all types of construction work — handling your project from start to finish, from concept and design to planning permission and installation."
      heroImg="/gallery/renovation background.png"
      tag="AMK London · Full-Service Construction"
      relatedLinks={RELATED}
    >
      {/* ── Overview ── */}
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ContentBlock eyebrow="What We Do" title={"Specialists in Property\nDevelopment & Construction"}>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                We are specialists in property development, renovation and construction. We are able to take over a
                full project and give the client peace of mind with exceptional customer service.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                With AMK London Building Construction you can be confident that your entire project will be
                accomplished by highly skilled and experienced craftsmen. We will carry out the work quickly and
                efficiently with the minimum disturbance and inconvenience.
              </p>
              <p className="leading-[1.85]" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                From just one call we will coordinate your entire project and provide all the services you need.
                We endeavour to be cost effective and competitive in all our tenders and guarantee to offer a
                fair price with no hidden extras, so our clients are confident and happy.
              </p>
            </ContentBlock>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>We Undertake</p>
              <FeatureList items={SERVICES_LIST} gold />

              <InfoBox gold>
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>Call Us Now</p>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  Speak to us directly and discuss a new project or arrange a meeting instantly.
                </p>
                <a href="tel:08715661673" className="text-[22px] font-display font-light mt-2 block hover:text-gold transition-colors" style={{ color: 'var(--color-ink)' }}>
                  0871 566 1673
                </a>
              </InfoBox>
            </div>
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            '/gallery/dr1.jpeg',
            '/gallery/dr2.jpeg',
            '/gallery/dr3.jpeg',
            '/gallery/dr4.jpeg',
            '/gallery/dr5.jpeg',
            '/gallery/dr6.jpeg',
            '/gallery/dr7.jpeg',
            '/gallery/dr8.jpeg',
            '/gallery/dr9.jpeg',
            '/gallery/dr10.jpeg',
            '/gallery/dr11.jpeg',
            '/gallery/dr12.jpeg',
            '/gallery/dr13.jpeg',
            '/gallery/dr14.jpeg',
            '/gallery/dr15.jpeg',
            '/gallery/dr16.jpeg',
            '/gallery/dr17.jpeg'
          ]} />
        </Container>
      </PageSection>

      {/* ── Our approach ── */}
      <PageSection dark>
        <Container>
          <div className="text-center mb-14">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Our Approach</p>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(28px,3.5vw,50px)', color: 'var(--color-ink)' }}>
              Handled from Start to Finish
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { n: '01', t: 'Initial Enquiry', d: 'One of our consultants visits you and quickly determines the feasibility of your ideas and plans.' },
              { n: '02', t: 'Your Requirements', d: 'Your specific requirements are discussed with you, and expert advice given on the project you plan to carry out.' },
              { n: '03', t: 'Concept & Design', d: 'We develop detailed plans, coordinating architects, designers, and planning permissions as required.' },
              { n: '04', t: 'Project Coordination', d: 'From just one call, we coordinate your entire project — providing all the services you need.' },
              { n: '05', t: 'Skilled Construction', d: 'Your project is accomplished by highly skilled craftsmen, working efficiently and cleanly.' },
              { n: '06', t: 'Final Delivery', d: 'We deliver on time and on budget, with a thorough snagging process before handover.' },
            ].map(({ n, t, d }) => (
              <StepCard key={n} number={n} title={t} text={d} />
            ))}
          </div>
        </Container>
      </PageSection>

      {/* ── Why AMK ── */}
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-3 gap-3">
            {[
              { icon: 'scissors', t: 'Cut the Middleman', d: 'We deal directly with you -- no agents, no mark-ups, delivering better value every time.' },
              { icon: 'trophy', t: 'High Quality', d: 'Premium workmanship on every project, delivered by our team of trained experts.' },
              { icon: 'money', t: 'Fair, Fixed Pricing', d: 'Transparent quotes with no hidden extras -- so you are always confident and in control.' },
              { icon: 'bolt', t: 'Efficient Delivery', d: 'We work quickly and professionally with minimum disruption to your home and daily life.' },
              { icon: 'lock', t: '12-Month Guarantee', d: 'All our workmanship is guaranteed for 12 full months as standard.' },
              { icon: 'handshake', t: 'Personal Service', d: 'A dedicated consultant manages your project and is available to you throughout.' },
            ].map(({ icon, t, d }) => (
              <FeatureIconCard key={t} icon={icon} title={t} text={d} />
            ))}
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}
