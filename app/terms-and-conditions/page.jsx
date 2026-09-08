import LegalPage, { LegalSection } from '@/components/LegalPage'
import { CONTACT_EMAIL } from '@/lib/contact'

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Terms governing use of the AMK London Building Construction Ltd website.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" intro="These terms govern your use of the AMK London Building Construction Ltd website. Project appointments, quotations, and construction contracts are subject to separate written terms.">
      <LegalSection title="1. About this website">
        <p>This website provides general information about AMK London Building Construction Ltd, our services, and selected projects. By using it, you agree to use it lawfully and in accordance with these terms.</p>
      </LegalSection>
      <LegalSection title="2. Information and quotations">
        <p>Website content is provided for general information and is not professional advice for a particular property. A quote request does not create a contract. Any price, programme, scope, or availability becomes binding only when confirmed in a separate written quotation or construction contract accepted by the relevant parties.</p>
      </LegalSection>
      <LegalSection title="3. Permitted use">
        <p>You may browse the website and contact us for legitimate personal or business enquiries. You must not misuse the website, attempt unauthorised access, introduce malicious code, interfere with its operation, scrape it excessively, or submit false or abusive requests.</p>
      </LegalSection>
      <LegalSection title="4. Intellectual property">
        <p>Unless stated otherwise, the website design, written content, branding, and project photography are owned by or licensed to AMK London Building Construction Ltd. You may not reproduce, adapt, publish, or commercially exploit them without prior written permission.</p>
      </LegalSection>
      <LegalSection title="5. External links">
        <p>Links to Maps, WhatsApp, Instagram, Facebook, and other external services are provided for convenience. We do not control their availability, security, content, or privacy practices and are not responsible for your use of them.</p>
      </LegalSection>
      <LegalSection title="6. Availability and liability">
        <p>We aim to keep this website accurate and available but do not guarantee uninterrupted access or that every item is complete or current. To the fullest extent permitted by law, we are not liable for indirect or consequential loss arising solely from use of, or inability to use, this informational website.</p>
        <p>Nothing in these terms excludes or limits liability where it would be unlawful to do so, including liability for death or personal injury caused by negligence, fraud, or fraudulent misrepresentation.</p>
      </LegalSection>
      <LegalSection title="7. Governing law">
        <p>These website terms are governed by the laws of England and Wales. The courts of England and Wales have jurisdiction, subject to any mandatory consumer rights that apply to you.</p>
      </LegalSection>
      <LegalSection title="8. Contact and changes">
        <p>Questions about these terms can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may update these terms when the website or applicable law changes; the effective date shown above identifies the current version.</p>
      </LegalSection>
    </LegalPage>
  )
}
