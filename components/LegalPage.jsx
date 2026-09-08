import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'

export default function LegalPage({ title, intro, children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-white pb-24 pt-[70px] outline-none">
        <header className="border-b border-black/15 bg-[var(--color-panel)]">
          <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 md:py-24">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">Legal information</p>
            <h1 className="mt-4 font-display text-[clamp(48px,8vw,88px)] font-semibold leading-[0.95] tracking-[-0.035em] text-[var(--color-ink)]">{title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text)]">{intro}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--color-muted)]">Effective 8 September 2026</p>
          </div>
        </header>
        <article className="legal-content mx-auto w-full max-w-4xl px-5 py-14 sm:px-8 md:py-20">{children}</article>
      </main>
      <Footer />
      <FloatButtons />
    </>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
