import ServicePageLayout, { PageSection, ContentBlock, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Marble & Granite Worktops — AMK London Building Construction',
  description: 'Expert marble and granite worktop installation in London. 8+ years specialist experience. 12-month workmanship guarantee.',
}

const WORKTOP_TYPES = [
  { icon: 'stone', t: 'Granite Worktops', d: 'Incredibly durable and heat resistant -- an investment that adds lasting value and beauty to your kitchen.' },
  { icon: 'sparkle', t: 'Marble Worktops', d: 'Timeless, luxurious, and unique -- every marble slab is one-of-a-kind, adding elegance to any kitchen.' },
  { icon: 'bath', t: 'Bathroom Unit Tops', d: 'Bespoke marble and granite tops for vanity units, wet rooms, and en-suites -- measured and fitted to perfection.' },
  { icon: 'pan', t: 'Kitchen Worktops', d: 'From island tops to full runs -- we measure, cut and install to millimetre precision in any kitchen layout.' },
  { icon: 'home', t: 'Any Room', d: 'Marble and granite surfaces can be used throughout the home -- from utility rooms to home bars and offices.' },
  { icon: 'wrench', t: 'Splashbacks & Upstands', d: 'Complete the look with matching or complementary stone splashbacks and upstands for a seamless finish.' },
]

const RELATED = [
  { href: '/services/kitchens-bathrooms', label: 'Kitchens & Bathrooms', desc: 'Complete installation service' },
  { href: '/services/flooring', label: 'Flooring', desc: 'All types supply & installation' },
  { href: '/services/furnishing', label: 'Furnishing', desc: 'Bespoke fitted furniture' },
]

export default function MarbleGranitePage() {
  return (
    <ServicePageLayout
      eyebrow="Marble & Granite"
      heroTitle={'Marble &\nGranite'}
      heroSub="We can install all types of granite and marble worktops and bathroom unit tops. Our specialist installers have at least 8 years of experience and are fully qualified craftsmen."
      heroImg="/gallery/marblee.png"
      tag="AMK London · 8+ Years Specialist Experience"
      relatedLinks={RELATED}
    >
      {/* ── Overview ── */}
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ContentBlock eyebrow="The Service" title={"Premium Stone\nInstallation Specialists"}>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                We can install all types of granite and marble worktops and bathroom unit tops for your
                kitchens and bathrooms. Our marble and granite installers have at least{' '}
                <strong style={{ color: 'var(--color-ink-soft)' }}>8 years of experience</strong> and are fully qualified craftsmen.
              </p>
              <p className="leading-[1.85] mb-5" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
                We guarantee all our workmanship for <strong style={{ color: 'var(--color-ink-soft)' }}>12 months</strong>, and are
                quick, clean, and professional. From initial measurement to final polish, every detail is
                handled with precision and care.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { n: '8+', l: 'Years Experience' },
                  { n: '12mo', l: 'Guarantee' },
                  { n: '100%', l: 'Qualified Craftsmen' },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center p-4 border" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
                    <div className="font-display text-[32px] font-light leading-none mb-1" style={{ color: 'var(--color-accent)' }}>{n}</div>
                    <div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--color-muted)' }}>{l}</div>
                  </div>
                ))}
              </div>

              <InfoBox gold>
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--color-accent)' }}>Our Promise</p>
                <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  Quick, clean, and professional — we deliver a flawless finish on every stone installation,
                  backed by our full 12-month workmanship guarantee.
                </p>
              </InfoBox>
            </ContentBlock>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>What We Install</p>
              <div className="grid gap-3">
                {WORKTOP_TYPES.map(({ icon, t, d }) => (
                  <FeatureIconCard key={t} icon={icon} title={t} text={d} compact />
                ))}
              </div>
            </div>
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            '/gallery/m1.jpg',
            '/gallery/m2.jpg',
            '/gallery/m3.jpg',
            '/gallery/m4.jpg',
            '/gallery/m5.jpg',
            '/gallery/m6.jpg',
            '/gallery/m7.jpg',
            '/gallery/m8.jpg',
            '/gallery/m9.jpg',
            '/gallery/m10.jpg',
            '/gallery/m11.jpg',
            '/gallery/m12.jpg',
            '/gallery/m13.jpg',
            '/gallery/m14.jpg',
            '/gallery/m15.jpg',
            '/gallery/m16.jpg',
            '/gallery/m17.jpg',
            '/gallery/m18.jpg',
            '/gallery/m19.jpg',
            '/gallery/m20.jpg',
            '/gallery/m21.jpg',
            '/gallery/m22.jpg'

          ]} />
        </Container>
      </PageSection>

      {/* ── Why Stone? ── */}
      <PageSection dark>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Why Choose Stone?</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--color-ink)' }}>
                An Investment That<br /><em className="italic">Lasts a Lifetime</em>
              </h2>
              <div className="space-y-4">
                {[
                  'Unmatched durability — granite is one of the hardest natural materials available.',
                  'Each slab is unique — marble and granite are entirely natural, no two pieces are identical.',
                  'Heat and scratch resistant — ideal for high-use kitchen surfaces.',
                  'Adds significant value to your property and elevates any interior.',
                  'Hygienic and easy to clean with the correct sealant and care.',
                ].map(txt => (
                  <div key={txt} className="flex gap-4 items-start text-[14px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
                    <span className="w-6 h-px mt-3 flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                    {txt}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="p-10 border text-center"
              style={{ background: 'var(--color-accent-tint)', borderColor: 'var(--color-accent-line)' }}
            >
              <div className="font-display text-[80px] font-light leading-none mb-4" style={{ color: 'var(--color-accent-ghost)' }}>"</div>
              <p className="font-display italic text-[20px] font-light leading-[1.65] mb-6" style={{ color: 'var(--color-ink-soft)' }}>
                The marble worktop installation in our kitchen is a masterpiece. Eight years of experience
                really shows — perfectly cut, seamlessly fitted.
              </p>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-accent)' }}>Amanda Clarke · Kensington, London</div>
            </div>
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}
