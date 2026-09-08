import LegalPage, { LegalSection } from '@/components/LegalPage'
import { CONTACT_EMAIL } from '@/lib/contact'

export const metadata = {
  title: 'Cookie Policy',
  description: 'Information about cookies and similar technologies on the AMK London Building Construction Ltd website.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" intro="This website currently uses no optional analytics, advertising, personalisation, or marketing cookies.">
      <LegalSection title="1. Our current use of cookies">
        <p>AMK London Building Construction Ltd does not currently place non-essential cookies or use browser storage for analytics, advertising, remarketing, or behavioural profiling. The quote form’s server-side security and rate limiting do not require a tracking cookie in your browser.</p>
      </LegalSection>
      <LegalSection title="2. Why there is no cookie banner">
        <p>Because the current website does not use non-essential cookies or similar tracking technologies, there is no optional consent choice to present. We therefore do not display a cookie banner that would add unnecessary friction.</p>
      </LegalSection>
      <LegalSection title="3. External services">
        <p>Maps, WhatsApp, Instagram, and Facebook are provided as ordinary external links and are not embedded. If you choose to visit one of those services, it may place cookies under its own policy. You can review that service’s settings and policy before continuing.</p>
      </LegalSection>
      <LegalSection title="4. Future changes">
        <p>If we introduce optional analytics, advertising, or other non-essential technologies, we will update this policy and obtain consent before loading them where required. Optional tracking will remain disabled until a visitor makes a valid choice.</p>
      </LegalSection>
      <LegalSection title="5. Browser controls and contact">
        <p>You can use your browser settings to view, block, or delete cookies created by websites you visit. Blocking essential browser features may affect how some websites work. Questions about this policy can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>
    </LegalPage>
  )
}
