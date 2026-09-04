/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black:    '#0c0c0b',
        charcoal: {
          DEFAULT: 'rgb(var(--rgb-panel) / <alpha-value>)',
          2: 'rgb(var(--rgb-surface) / <alpha-value>)',
          3: 'rgb(var(--rgb-panel-strong) / <alpha-value>)',
        },
        silver: {
          dark: 'rgb(var(--rgb-subtle) / <alpha-value>)',
          mid: 'rgb(var(--rgb-muted) / <alpha-value>)',
          DEFAULT: 'rgb(var(--rgb-text) / <alpha-value>)',
          light: 'rgb(var(--rgb-ink-muted) / <alpha-value>)',
          bright: 'rgb(var(--rgb-ink-soft) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--rgb-accent) / <alpha-value>)',
          light: 'rgb(var(--rgb-accent-light) / <alpha-value>)',
        },
        cream:    'rgb(var(--rgb-ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-outfit)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { letterSpacing: '0.2em' }],
      },
      maxWidth: {
        site: '1320px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
