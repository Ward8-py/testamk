import LegalPage, { LegalSection } from '@/components/LegalPage'
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '@/lib/contact'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How AMK London Building Construction Ltd collects, uses, protects, and retains personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" intro="This policy explains how AMK London Building Construction Ltd handles personal information when you use this website or ask us about a project.">
      <LegalSection title="1. Who is responsible for your data">
        <p>AMK London Building Construction Ltd is the data controller for enquiries made through this website. You can contact us at {CONTACT_ADDRESS}, by email at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or by telephone at <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE_DISPLAY}</a>.</p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>When you request a quote, we collect the service required, project postcode, your name, phone number, any optional project note, the page or control used to start the enquiry, your privacy acknowledgement, and the time the form was opened. We also process a one-way hash of the requesting IP address to prevent spam, enforce rate limits, and suppress accidental duplicate submissions.</p>
        <p>We do not collect payment details, create marketing profiles, or add quote requesters to a mailing list through this website.</p>
      </LegalSection>

      <LegalSection title="3. Why we use it and our lawful basis">
        <ul>
          <li>To answer your enquiry, discuss requirements, arrange a site visit, and prepare a quote. This is necessary to take steps at your request before entering a contract.</li>
          <li>To protect the form and website from abuse, fraud, and repeated submissions. We rely on our legitimate interest in operating a secure service.</li>
          <li>To manage customer records, contracts, tax, and legal obligations if you become a customer.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Service providers and international transfers">
        <p>We use Vercel to host the website, Resend to deliver quote emails, and Upstash Redis to operate rate limiting and duplicate suppression. These providers act under their own security and data-processing terms. Where processing occurs outside the United Kingdom, we rely on the provider’s applicable contractual safeguards or another lawful transfer mechanism.</p>
        <p>Google Maps, WhatsApp, Instagram, and Facebook are external destinations only. Their services are not embedded on this website; their own privacy terms apply after you choose to follow a link.</p>
      </LegalSection>

      <LegalSection title="5. How long we retain information">
        <ul>
          <li>Unsuccessful or unconverted enquiries: up to 12 months.</li>
          <li>Customer and transaction records: up to six years after the relevant relationship or accounting period.</li>
          <li>Security and abuse-prevention logs: up to 30 days.</li>
        </ul>
        <p>We may retain information longer when required to establish, exercise, or defend legal claims, or to meet a legal obligation.</p>
      </LegalSection>

      <LegalSection title="6. Security">
        <p>Quote requests are validated on the server, protected by rate limiting and duplicate suppression, and delivered without being stored in an application database. Provider credentials remain on the server. No internet transmission is completely risk-free, but we use proportionate technical and organisational safeguards and limit access to people who need it.</p>
      </LegalSection>

      <LegalSection title="7. Your rights">
        <p>Depending on the circumstances, you may ask for access to your personal information, correction, erasure, restriction, objection, or portability. You may also complain to the UK Information Commissioner’s Office. Contact us first using the details above, or visit <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk/make-a-complaint <span className="sr-only">(opens in a new tab)</span></a>.</p>
      </LegalSection>

      <LegalSection title="8. Changes to this policy">
        <p>We may update this policy when our website, suppliers, or legal obligations change. The effective date shown at the top identifies the current version.</p>
      </LegalSection>
    </LegalPage>
  )
}
