# AMK London Building Construction Ltd — Website v2

Production-ready Next.js 14 website. Fixed, enhanced, and extended.

---

## 🐛 Bug Fixed

**Root issue:** `Section` component in `ui.jsx` was not using `React.forwardRef`.  
The `ref` from `useScrollReveal()` resolved to `null` — the `IntersectionObserver` never
attached, so `.reveal` classes never received `.revealed`. **Every section was invisible.**

**Fix:** `Section` now uses `forwardRef`. `About.jsx` rewritten to use a plain `<section ref={...}>` directly (double-safe).

---

## 🚀 What's New in v2

### Services Redesign
- **Featured hero card** for Development & Renovation with full bleed image
- **5 image cards** linking to dedicated service pages
- Stats trust bar below the grid
- All cards are `<Link>` — no more dead-end grid

### 6 Individual Service Pages
| Route | Service |
|---|---|
| `/services/development-renovation` | Extensions, loft conversions, garages, refurbishments |
| `/services/kitchens-bathrooms`     | Complete supply, design & 6-step installation |
| `/services/bedrooms`               | 5-step bedroom fitting service |
| `/services/marble-granite`         | Specialist worktop installation (8+ yrs exp) |
| `/services/flooring`               | Laminate supply & all-type installation |
| `/services/furnishing`             | Handmade bespoke furniture & joinery |

Each page has: **hero with breadcrumb → rich content → related services → CTA band**

### Navbar Upgrade
- Full **Services dropdown** on desktop with descriptions
- **Accordion** on mobile
- Works on service pages (links back to `/#section`)

### Shared `ServicePageLayout`
- Reusable layout in `components/service-pages/ServicePageLayout.jsx`
- Props: `heroTitle`, `heroSub`, `heroImg`, `eyebrow`, `tag`, `relatedLinks`
- Sub-components: `PageSection`, `ContentBlock`, `FeatureList`, `StepCard`, `InfoBox`

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

---

## Project Structure

```
amk-v2/
├── app/
│   ├── globals.css          # All CSS: tokens, animations, custom classes
│   ├── layout.jsx           # Root layout + SEO metadata
│   ├── page.jsx             # Home page
│   └── services/
│       ├── development-renovation/page.jsx
│       ├── kitchens-bathrooms/page.jsx
│       ├── bedrooms/page.jsx
│       ├── marble-granite/page.jsx
│       ├── flooring/page.jsx
│       └── furnishing/page.jsx
│
├── components/
│   ├── AMKLogo.jsx          # SVG metallic logo mark
│   ├── About.jsx            # ✅ FIXED — scroll reveal now works
│   ├── CTA.jsx              # Call-to-action band
│   ├── Contact.jsx          # Form + map + contact details
│   ├── FloatButtons.jsx     # WhatsApp + scroll-to-top
│   ├── Footer.jsx           # 4-col footer with service page links
│   ├── Hero.jsx             # Full-screen hero + stats bar
│   ├── Loader.jsx           # Preloader animation
│   ├── Navbar.jsx           # ✅ NEW — Services dropdown + accordion
│   ├── Portfolio.jsx        # Filtered gallery
│   ├── Process.jsx          # 5-step process
│   ├── Services.jsx         # ✅ REBUILT — premium image cards + links
│   ├── Testimonials.jsx     # Auto-advancing slider
│   ├── WhyUs.jsx            # Why choose AMK
│   ├── ui.jsx               # ✅ FIXED — Section uses forwardRef
│   └── service-pages/
│       └── ServicePageLayout.jsx  # Shared service page layout
│
├── hooks/
│   └── useScrollReveal.js   # IntersectionObserver scroll-reveal hook
│
└── [config files]
```

---

## Deployment (Vercel — recommended)

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Framework: **Next.js** (auto-detected)
4. Deploy — done

### Environment Variables
None required. To connect the contact form to email, add:
- `RESEND_API_KEY` — use [resend.com](https://resend.com) (free tier)

---

## Connect the Contact Form

Currently shows a success state after 1.5s. To wire it to email:

```bash
npm install resend
```

Create `app/api/contact/route.js`:

```js
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { name, email, phone, service, message } = await req.json()
  await resend.emails.send({
    from: 'AMK Website <noreply@yourdomain.com>',
    to: 'info@amkbuildingconstruction.co.uk',
    subject: `New enquiry from ${name} — ${service}`,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Service:</b> ${service}</p><p><b>Message:</b> ${message}</p>`
  })
  return Response.json({ ok: true })
}
```

---

## Replace Placeholder Images

Search for `images.unsplash.com` across the project and swap URLs with real AMK photography.
Images are used in: `Hero.jsx`, `About.jsx`, `WhyUs.jsx`, `Portfolio.jsx`, `Services.jsx`, and all service pages.

---

## Contact

AMK London Building Construction Ltd  
15A Station Road, Harrow, HA1 2UF  
📞 +44 7587 842444 | 0871 566 1673  
✉️ info@amkbuildingconstruction.co.uk  
🌐 [amkbuildingconstruction.co.uk](https://www.amkbuildingconstruction.co.uk)
