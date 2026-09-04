import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import ProofStrip   from '@/components/ProofStrip'
import About        from '@/components/About'
import Services     from '@/components/Services'
import Process      from '@/components/Process'
import Portfolio    from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import CTA          from '@/components/CTA'
import Footer       from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <FloatButtons />
    </>
  )
}
