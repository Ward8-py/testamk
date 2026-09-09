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
npm run build        # Next.js production/static build (including Vercel checks)
npm run build:ionos  # build and assemble the IONOS PHP release package
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
Copy `.env.example` to `.env.local` for development and configure the same server-only values in Vercel:

- `RESEND_API_KEY` — Resend API key for the verified AMK sending domain.
- `QUOTE_FROM_EMAIL` — verified sender, for example `AMK London <quotes@amkbuildingconstruction.co.uk>`.
- `QUOTE_TO_EMAIL` — quote recipient (`info@amkbuildingconstruction.co.uk`).
- `SITE_URL` — canonical production origin.
- `QUOTE_ALLOWED_ORIGINS` — comma-separated exact origins allowed to post the form.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — rate-limit and duplicate-suppression store.
- `QUOTE_HASH_SALT` — private random value of at least 24 characters used for one-way request fingerprints.

Do not prefix any credential with `NEXT_PUBLIC_`.

---

## Quote Delivery

The browser posts to `POST /api/quote`. The server validates and normalises every field, checks consent and anti-bot controls, rate-limits hashed IPs with Upstash, suppresses duplicate submissions for ten minutes, and sends a plain-text email through Resend. Enquiries are not stored in an application database. If delivery or a security dependency is unavailable, the endpoint fails closed and the quote dialog offers a prefilled WhatsApp enquiry.

---

## Replace Placeholder Images

Search for `images.unsplash.com` across the project and swap URLs with real AMK photography.
Images are used in: `Hero.jsx`, `About.jsx`, `WhyUs.jsx`, `Portfolio.jsx`, `Services.jsx`, and all service pages.

---

## Contact

AMK London Building Construction Ltd

15A Station Road, Harrow, HA1 2UF

📞 +44 7970 798313

✉️ info@amkbuildingconstruction.co.uk

🌐 [amkbuildingconstruction.co.uk](https://www.amkbuildingconstruction.co.uk)
