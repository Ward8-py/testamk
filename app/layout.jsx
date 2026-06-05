import './globals.css'

export const metadata = {
  title: {
    default: 'AMK London Building Construction Ltd - Premium Property Development',
    template: '%s | AMK London Building Construction',
  },
  description:
    'AMK London Building Construction Ltd - well established building company covering London and surrounding regions. Specialists in extensions, loft conversions, kitchens, bathrooms, marble worktops, flooring, and full refurbishments. 12-month workmanship guarantee.',
  keywords: [
    'construction London',
    'building company London',
    'property development',
    'renovation London',
    'extensions London',
    'loft conversion',
    'kitchen installation London',
    'marble worktops London',
    'flooring London',
    'Harrow builder',
    'AMK London',
  ],
  authors: [{ name: 'AMK London Building Construction Ltd' }],
  openGraph: {
    title: 'AMK London Building Construction Ltd',
    description: 'Premium property development, renovation and construction across London. 12-month workmanship guarantee.',
    url: 'https://www.amkbuildingconstruction.co.uk',
    siteName: 'AMK London Building Construction',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMK London Building Construction Ltd',
    description: 'Premium property development, renovation and construction across London.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: 'var(--color-page)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
