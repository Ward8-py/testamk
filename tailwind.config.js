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
        black:    'rgb(var(--rgb-page) / <alpha-value>)',
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
      animation: {
        'hero-zoom':    'heroZoom 22s ease-in-out infinite alternate',
        'loader-pulse': 'loaderPulse 1.5s ease-in-out infinite',
        'loader-slide': 'loaderSlide 1.2s ease-in-out infinite',
        'fade-up':      'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-left':    'fadeLeft 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-right':   'fadeRight 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        heroZoom:    { '0%': { transform: 'scale(1.04)' }, '100%': { transform: 'scale(1.11)' } },
        loaderPulse: { '0%,100%': { opacity: '0.5', transform: 'scale(0.97)' }, '50%': { opacity: '1', transform: 'scale(1)' } },
        loaderSlide: { '0%': { left: '-100%' }, '100%': { left: '100%' } },
        fadeUp:      { '0%': { opacity: '0', transform: 'translateY(28px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeLeft:    { '0%': { opacity: '0', transform: 'translateX(-36px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        fadeRight:   { '0%': { opacity: '0', transform: 'translateX(36px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
