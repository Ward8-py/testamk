import ServicePageLayout, { PageSection, ContentBlock, InfoBox, FeatureIconCard, ImageGallery } from '@/components/service-pages/ServicePageLayout'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Marble & Granite Worktops',
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
                <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-ink-soft)' }}>
                  Quick, clean, and professional — we deliver a flawless finish on every stone installation,
                  backed by our full 12-month workmanship guarantee.
                </p>
              </InfoBox>
            </ContentBlock>

            <div>
              <div className="grid gap-3">
                {WORKTOP_TYPES.map(({ icon, t, d }) => (
                  <FeatureIconCard key={t} icon={icon} title={t} text={d} compact />
                ))}
              </div>
            </div>
          </div>

          {/* Add the new Image Gallery here */}
          <ImageGallery images={[
            { src: '/gallery/m1.jpg', alt: 'White stone surface with broad grey marble-effect veining' },
            { src: '/gallery/m2.jpg', alt: 'White stone surface with fine diagonal grey veins' },
            { src: '/gallery/m3.jpg', alt: 'White stone surface with branching pale grey veins' },
            { src: '/gallery/m4.jpg', alt: 'Pale grey stone surface with subtle mottled detail' },
            { src: '/gallery/m5.jpg', alt: 'White stone surface with a soft clouded pattern' },
            { src: '/gallery/m6.jpg', alt: 'White marble surface with bold black and grey veining' },
            { src: '/gallery/m7.jpg', alt: 'Dark brown marble surface with fine cream veining' },
            { src: '/gallery/m8.jpg', alt: 'Warm beige quartz surface with reflective aggregate' },
            { src: '/gallery/m9.jpg', alt: 'White quartz surface with small grey aggregate pieces' },
            { src: '/gallery/m10.jpg', alt: 'Black terrazzo-style surface with white aggregate pieces' },
            { src: '/gallery/m11.jpg', alt: 'Pale grey quartz surface with mixed aggregate pieces' },
            { src: '/gallery/m12.jpg', alt: 'Dark brown quartz surface with reflective mineral flecks' },
            { src: '/gallery/m13.jpg', alt: 'Red quartz surface with reflective mineral flecks' },
            { src: '/gallery/m14.jpg', alt: 'White stone surface with fine pale grey speckling' },
            { src: '/gallery/m15.jpg', alt: 'Warm grey stone surface with softly mottled markings' },
            { src: '/gallery/m16.jpg', alt: 'Pale grey stone surface with a cloudy natural pattern' },
            { src: '/gallery/m17.jpg', alt: 'White stone surface with wide angular grey veining' },
            { src: '/gallery/m18.jpg', alt: 'Black granite-style surface with contrasting white flecks' },
            { src: '/gallery/m19.jpg', alt: 'Mid-grey granite-style surface with dark mineral flecks' },
            { src: '/gallery/m20.jpg', alt: 'White stone surface with very subtle pale clouding' },
            { src: '/gallery/m21.jpg', alt: 'Bright white stone surface with soft grey clouding' },
            { src: '/gallery/m22.jpg', alt: 'Dark grey stone surface with a fine mottled texture' }

          ]} />
        </Container>
      </PageSection>

      {/* ── Why Stone? ── */}
      <PageSection dark>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
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
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-accent)' }}>Amanda · Kensington, London</div>
            </div>
          </div>
        </Container>
      </PageSection>
    </ServicePageLayout>
  )
}
