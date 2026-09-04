import { Container } from './ui'

const PROOF = [
  { value: '15+', label: 'years in London construction' },
  { value: '400+', label: 'projects completed' },
  { value: '12', suffix: 'months', label: 'workmanship guarantee' },
  { value: 'No', suffix: 'hidden costs', label: 'clear pricing from the start' },
]

export default function ProofStrip() {
  return (
    <section aria-label="AMK at a glance" className="border-b border-black/15 bg-[var(--color-panel)]">
      <Container>
        <dl className="grid grid-cols-2 divide-x divide-y divide-black/15 border-x border-black/15 md:grid-cols-4 md:divide-y-0">
          {PROOF.map(({ value, suffix, label }) => (
            <div key={label} className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-[clamp(36px,4.2vw,62px)] font-semibold leading-none tracking-[-0.03em] text-[var(--color-ink)]">
                {value}
                {suffix ? <span className="ml-2 font-body text-[11px] font-bold uppercase tracking-[0.08em] sm:text-xs">{suffix}</span> : null}
              </dd>
              <p className="mt-2 max-w-[190px] text-[12px] font-semibold leading-5 text-[var(--color-muted)] sm:text-sm">{label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

