'use client'

import Loader       from '@/components/Loader'
import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import About        from '@/components/About'
import Services     from '@/components/Services'
import WhyUs        from '@/components/WhyUs'
import Process      from '@/components/Process'
import Portfolio    from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import CTA          from '@/components/CTA'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Portfolio />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatButtons />
    </>
  )
}
