'use client'

export function Icon({ name, size = 16, className = '' }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': 'true',
  }

  switch (name) {
    case 'arrow-right':
      return (
        <svg {...props}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...props} strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case 'location':
      return (
        <svg {...props}>
          <path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
      )
    case 'pager':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="11" rx="2" />
          <path d="M7 11h5M7 14h2M15 14h2" />
        </svg>
      )
    case 'message':
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-8 8H5l-2 2 1.4-5A8 8 0 1 1 21 12z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9M12 3c-2.2 2.5-3.3 5.5-3.3 9s1.1 6.5 3.3 9" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...props}>
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      )
    case 'money':
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M6 9h.01M18 15h.01" />
        </svg>
      )
    case 'star':
      return (
        <svg {...props}>
          <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.7 2.7L16.5 9" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg {...props}>
          <path d="M9 4h6l1 2h3v15H5V6h3l1-2z" />
          <path d="M9 10h6M9 14h6" />
        </svg>
      )
    case 'hardhat':
      return (
        <svg {...props}>
          <path d="M4 14a8 8 0 0 1 16 0" />
          <path d="M3 14h18v3H3zM9 6v8M15 6v8" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...props}>
          <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8z" />
        </svg>
      )
    case 'handshake':
      return (
        <svg {...props}>
          <path d="m8 12 3 3a2 2 0 0 0 2.8 0L20 9" />
          <path d="m4 9 4-4 4 4M2 14l4 4 3-3M22 14l-4 4-3-3" />
        </svg>
      )
    case 'scissors':
      return (
        <svg {...props}>
          <circle cx="5" cy="7" r="2.5" />
          <circle cx="5" cy="17" r="2.5" />
          <path d="M7 8.5 20 19M7 15.5 20 5" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...props}>
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM12 13v4M9 21h6M10 17h4" />
          <path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4" />
        </svg>
      )
    case 'smile':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14s1.4 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
      )
    case 'wood':
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 5c2 3 2 11 0 14M14 5c2 3 2 11 0 14" />
        </svg>
      )
    case 'home':
      return (
        <svg {...props}>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      )
    case 'stone':
      return (
        <svg {...props}>
          <path d="M5 8 12 3l7 5v8l-7 5-7-5z" />
          <path d="m5 8 7 4 7-4M12 12v9" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...props}>
          <path d="M12 3 9.8 9.8 3 12l6.8 2.2L12 21l2.2-6.8L21 12l-6.8-2.2L12 3z" />
        </svg>
      )
    case 'bath':
      return (
        <svg {...props}>
          <path d="M4 12h17v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3zM7 12V6a3 3 0 0 1 5-2.2" />
          <path d="M8 20v2M18 20v2" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'bed':
      return (
        <svg {...props}>
          <path d="M4 11V6M4 14h16M20 14v-3a3 3 0 0 0-3-3H9v6M4 20v-9h5M20 20v-6" />
          <path d="M7 8h2" />
        </svg>
      )
    case 'measure':
      return (
        <svg {...props}>
          <path d="M4 17 17 4l3 3L7 20z" />
          <path d="m13 8 3 3M10 11l2 2M7 14l3 3" />
        </svg>
      )
    case 'hammer':
      return (
        <svg {...props}>
          <path d="M14 5 5 14l5 5 9-9" />
          <path d="m15 4 5 5M3 21l6-6" />
        </svg>
      )
    case 'ruler':
      return (
        <svg {...props}>
          <path d="M4 20 20 4" />
          <path d="m6 18 2 2M9 15l1.5 1.5M12 12l2 2M15 9l1.5 1.5M18 6l2 2" />
        </svg>
      )
    case 'palette':
      return (
        <svg {...props}>
          <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 1.4-3.4 1.4 1.4 0 0 1 1-2.4H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" />
          <path d="M7.5 10h.01M10 6.5h.01M14 6.5h.01M16.5 10h.01" />
        </svg>
      )
    case 'bag':
      return (
        <svg {...props}>
          <path d="M6 8h12l-1 13H7L6 8z" />
          <path d="M9 8a3 3 0 0 1 6 0" />
        </svg>
      )
    case 'link':
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10.5 5" />
          <path d="M14 11a5 5 0 0 0-7.1 0l-1.4 1.4a5 5 0 0 0 7.1 7.1l.9-.9" />
        </svg>
      )
    case 'recycle':
      return (
        <svg {...props}>
          <path d="m7 7 2-4 2 4M9 3v5a4 4 0 0 1-4 4H3" />
          <path d="m17 17-2 4-2-4M15 21v-5a4 4 0 0 1 4-4h2" />
          <path d="m17 7 4 2-4 2M21 9h-5a4 4 0 0 0-4 4v1" />
        </svg>
      )
    case 'broom':
      return (
        <svg {...props}>
          <path d="M14 4 4 14" />
          <path d="m12 6 6 6" />
          <path d="M5 13c3 0 6 3 6 6l-7 2-1-1 2-7z" />
        </svg>
      )
    case 'pan':
      return (
        <svg {...props}>
          <path d="M5 12a6 6 0 0 0 12 0H5z" />
          <path d="M17 12h4M8 8V5M12 8V4M16 8V6" />
        </svg>
      )
    case 'wrench':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 0 0 4.9 4.9L10 20.8 5.2 16z" />
          <path d="M13 8 6 15" />
        </svg>
      )
    case 'arrow-left':
      return (
        <svg {...props}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      )
    case 'arrow-up':
      return (
        <svg {...props}>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      )
    default:
      return null
  }
}
