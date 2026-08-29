'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Container, ArrowRight } from './ui'

const EASE = 0.2              // higher = snappier, lower = smoother
const SEEK_DEADBAND = 0.02    // ~half a frame at 24fps — skip redundant seeks
const IDLE_EPSILON = 0.0004   // below this delta, park the rAF loop
const FRAME_DURATION = 1 / 24 // keep the held state on the final decoded frame
const TRAVEL = 20             // px a beat rises as it enters/leaves

/* Scrims are explicit rgba, NOT Tailwind `black` — in this codebase the `black`
   token maps to --rgb-page (248 244 236), so `from-black/85` renders as an 85%
   CREAM wash that bleaches the video. */
const SCRIM_SIDE =
  'linear-gradient(100deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.31) 66%, rgba(0,0,0,0.26) 100%)'
const SCRIM_FOOT = 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 34%)'
const SCRIM_MOBILE =
  'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 34%, rgba(0,0,0,0.08) 66%, rgba(0,0,0,0.40) 100%)'
/** Carries legibility that would otherwise need a heavier scrim. */
const TEXT_SHADOW = '0 1px 26px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.32)'

/** Scroll progress → fraction of the selected clip, piecewise-linear through
 *  the storyboard's control points. Both the five-second portrait source and the
 *  ten-second landscape source finish at 92%, then hold on their final frame. */
const TIME_MAP = [
  [0, 0], [0.10, 0.08], [0.32, 0.30], [0.55, 0.52],
  [0.78, 0.75], [0.88, 0.92], [0.92, 1], [1, 1],
]

function clipFractionAt(p) {
  for (let i = 1; i < TIME_MAP.length; i++) {
    const [p1, t1] = TIME_MAP[i]
    if (p <= p1) {
      const [p0, t0] = TIME_MAP[i - 1]
      const span = p1 - p0
      return span <= 0 ? t1 : t0 + ((p - p0) / span) * (t1 - t0)
    }
  }
  return TIME_MAP[TIME_MAP.length - 1][1]
}

const BEATS = [
  { lead: true, line: 'From shell to signature.' },
  { step: '01', label: 'Prepare', line: 'Every detail coordinated.' },
  { step: '02', label: 'Build',   line: 'One experienced team, fully managed.' },
  { step: '03', label: 'Finish',  line: 'Installed with absolute precision.' },
  { step: '04', label: 'Refine',  line: 'Inspected down to the final detail.' },
  { line: 'From concept to completion.' },
]

/** [fadeInStart, fullFrom, fullUntil, fadeOutEnd] in 0–1 progress space, matching
 *  the storyboard's bands. Beat 0 starts below 0 so it is already at rest on load.
 *  Small gaps between windows keep one beat prominent at a time. */
const WINDOWS = [
  [-1, -0.5, 0.075, 0.10],
  [0.105, 0.14, 0.30, 0.325],
  [0.33, 0.365, 0.53, 0.555],
  [0.56, 0.595, 0.755, 0.78],
  [0.785, 0.815, 0.855, 0.878],
  [0.883, 0.905, 0.95, 0.985],
]

/** Where the services panel starts rising over the held final frame. */
const PANEL_FROM = 0.92

const SERVICES = [
  { href: '/services/development-renovation', label: 'Development & Renovation', desc: 'Extensions, lofts & refurbishments' },
  { href: '/services/kitchens-bathrooms',     label: 'Kitchens & Bathrooms',     desc: 'Supply, design & installation'      },
  { href: '/services/bedrooms',               label: 'Bedrooms',                 desc: 'Complete fitting service'           },
  { href: '/services/marble-granite',         label: 'Marble & Granite',         desc: 'Specialist worktop installation'    },
  { href: '/services/flooring',               label: 'Flooring',                 desc: 'All types, supplied & fitted'       },
  { href: '/services/furnishing',             label: 'Furnishing',               desc: 'Handmade bespoke furniture'         },
]

const smooth = (x) => x * x * (3 - 2 * x)
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n)

/** Presence 0→1 plus signed travel, so beats rise in and rise out. */
function bandAt(p, [a, b, c, d]) {
  if (p <= a || p >= d) return { t: 0, y: p <= a ? TRAVEL : -TRAVEL }
  if (p < b) { const t = smooth((p - a) / (b - a)); return { t, y: (1 - t) * TRAVEL } }
  if (p > c) { const t = smooth((d - p) / (d - c)); return { t, y: -(1 - t) * TRAVEL } }
  return { t: 1, y: 0 }
}

const HERO_BEAT_CLASS =
  'absolute inset-0 z-10 flex items-end pb-[12lvh] will-change-[opacity,transform] md:items-center md:pb-0'

/* On the dark hero the shared BtnPrimary is graphite-on-dark and sinks into the
   footage, so the primary CTA inverts to a light fill here. */
function BtnLight({ children, onClick, href, className = '' }) {
  const cls = `inline-flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[#0b0b0c] bg-white px-9 py-4 cursor-pointer border-none transition-colors duration-300 hover:bg-white/88 ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type="button" onClick={onClick} className={cls}>{children}</button>
}

function BtnGhostDark({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 text-[10.5px] font-medium tracking-[0.2em] uppercase text-white bg-transparent border border-white/30 px-9 py-[15px] cursor-pointer transition-all duration-300 hover:text-white hover:border-white/60 hover:bg-white/[0.06] hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  )
}

function BeatBody({ beat, scrollTo, immersive = false }) {
  return (
    <div className={`max-w-3xl ${immersive ? 'max-md:max-w-[320px]' : ''}`}>
      {/* The step marker stays: this sequence is the build order, so the numbers
          carry information. Toned to white — the accent is graphite now and
          would disappear against the footage. */}
      {beat.step && (
        <div className="flex items-center gap-4 mb-5">
          <span className="font-display font-light text-white/55 leading-none"
                style={{ fontSize: 'clamp(26px, 3.4vw, 42px)' }}>
            {beat.step}
          </span>
          <span className="h-px w-8 bg-white/25" />
          <span className="font-body text-[10px] font-semibold tracking-[0.28em] uppercase text-white/70">
            {beat.label}
          </span>
        </div>
      )}

      {beat.lead ? <h1
        className="font-display font-light text-white leading-[1.04]"
        style={{ fontSize: beat.step ? 'clamp(30px, 4.6vw, 68px)' : 'clamp(36px, 6vw, 96px)' }}
      >
        {beat.line}
      </h1> : <p
        className="font-display font-light text-white leading-[1.04]"
        style={{ fontSize: beat.step ? 'clamp(30px, 4.6vw, 68px)' : 'clamp(36px, 6vw, 96px)' }}
      >
        {beat.line}
      </p>}

      {beat.lead && (
        <div className="flex gap-4 flex-wrap mt-10">
          <BtnLight onClick={() => scrollTo('#contact')}>
            Get a Free Quote
            <ArrowRight />
          </BtnLight>
          <BtnGhostDark onClick={() => scrollTo('#portfolio')}>
            View Our Work
          </BtnGhostDark>
        </div>
      )}
    </div>
  )
}

function ServicesPanelBody() {
  // Kept short enough to fit a small phone without internal scrolling, which
  // would fight the page scroll while the section is still pinned.
  return (
    <Container className="py-8 sm:py-12">
      <h2 className="font-display font-light text-white leading-[1.05] mb-7 sm:mb-10"
          style={{ fontSize: 'clamp(28px, 4.6vw, 62px)' }}>
        One call covers the whole project.
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px"
           style={{ background: 'rgba(255,255,255,0.10)' }}>
        {SERVICES.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-1.5 p-3.5 sm:p-5 transition-colors duration-300"
            style={{ background: '#0d0b09' }}
          >
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.06em] uppercase text-white/85 transition-colors group-hover:text-white">
              {label}
            </span>
            <span className="hidden sm:block text-[11.5px] leading-[1.5] text-white/55">{desc}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5 flex-wrap mt-7 sm:mt-10">
        <BtnLight href="/#contact">
          Start Your Project
          <ArrowRight />
        </BtnLight>
        <span className="text-[11px] tracking-[0.14em] uppercase text-white/50">
          All workmanship guaranteed 12 months
        </span>
      </div>
    </Container>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const beatRefs = useRef([])
  const panelRef = useRef(null)
  const progressRef = useRef(null)
  const scrollCueRef = useRef(null)
  const debugRef = useRef(null)
  const [reduced, setReduced] = useState(false)
  const [mediaReady, setMediaReady] = useState(false)

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const advanceHero = () => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const scrollable = section.offsetHeight - pin.offsetHeight
    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    window.scrollTo({
      top: sectionTop + scrollable * 0.14,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Responsive <source> candidates are selected when load() runs. Reload only
  // when the viewport crosses the same breakpoint used by the mobile layout.
  useEffect(() => {
    // The fractional upper bound closes the sub-pixel gap below Tailwind's
    // `md` min-width: 768px query on scaled displays.
    const mq = window.matchMedia('(max-width: 767.98px)')
    const reloadSource = () => {
      const video = videoRef.current
      if (!video) return
      setMediaReady(false)
      video.pause()
      video.load()
    }
    reloadSource()
    mq.addEventListener('change', reloadSource)
    return () => mq.removeEventListener('change', reloadSource)
  }, [reduced])

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const video = videoRef.current
    if (!section || !pin || !video || reduced) return

    video.pause()          // it is never played on a timer

    let raf = 0, running = false
    let target = 0, eased = 0, duration = 0
    let primed = false, ticks = 0, primeAttempts = 0

    const dbg = debugRef.current
    const showDebug = dbg && new URLSearchParams(location.search).has('debug')
    if (showDebug) dbg.hidden = false

    // Measured against the PINNED CHILD, not window.innerHeight: on mobile the two
    // disagree while browser chrome shows, desyncing progress from the release.
    const readProgress = () => {
      const scrollable = section.offsetHeight - pin.offsetHeight
      if (scrollable <= 0) return 0
      return clamp01(-section.getBoundingClientRect().top / scrollable)
    }

    const paint = (p) => {
      WINDOWS.forEach((win, i) => {
        const el = beatRefs.current[i]
        if (!el) return
        const { t, y } = bandAt(p, win)
        el.style.opacity = String(t)
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
        // Keep faded beats out of the tab order and the a11y tree.
        el.style.visibility = t < 0.02 ? 'hidden' : 'visible'
        el.style.pointerEvents = t > 0.5 ? 'auto' : 'none'
      })

      // The services panel rises over the held final frame.
      const panel = panelRef.current
      if (panel) {
        const pp = clamp01((p - PANEL_FROM) / (1 - PANEL_FROM))
        const e = smooth(pp)
        panel.style.transform = `translate3d(0, ${((1 - e) * 100).toFixed(2)}%, 0)`
        panel.style.visibility = pp <= 0.002 ? 'hidden' : 'visible'
        panel.style.pointerEvents = pp > 0.85 ? 'auto' : 'none'
      }

      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${p.toFixed(4)})`

      const cue = scrollCueRef.current
      if (cue) {
        const cueOpacity = 1 - clamp01((p - 0.01) / 0.05)
        cue.style.opacity = cueOpacity.toFixed(3)
        cue.style.visibility = cueOpacity < 0.02 ? 'hidden' : 'visible'
        cue.style.pointerEvents = p < 0.06 ? 'auto' : 'none'
      }

      if (showDebug && dbg) {
        const buf = video.buffered.length
          ? video.buffered.end(video.buffered.length - 1).toFixed(1) + 's' : 'none'
        dbg.textContent =
          `ticks    ${ticks}\nprogress ${p.toFixed(3)}\n` +
          `time     ${video.currentTime.toFixed(2)} / ${duration.toFixed(2)}\n` +
          `ready    ${video.readyState}  seeking ${video.seeking}\n` +
          `buffered ${buf}\nprimed   ${primed} (tries ${primeAttempts})\n` +
          `err      ${video.error?.code ?? '-'}`
      }
    }

    /** Storyboard time for a progress value, scaled to the selected source. */
    const videoTimeFor = (p) => {
      const playableDuration = Math.max(0, duration - FRAME_DURATION)
      return clipFractionAt(p) * playableDuration
    }

    const tick = () => {
      ticks++
      const delta = target - eased
      eased += Math.abs(delta) < IDLE_EPSILON ? delta : delta * EASE
      paint(eased)

      // Never queue a seek while one is in flight — that is what produces black
      // frames and decoder stalls on iOS. Skip; the next frame catches up.
      if (duration > 0 && !video.seeking) {
        const t = videoTimeFor(eased)
        if (Math.abs(t - video.currentTime) > SEEK_DEADBAND) {
          try { video.currentTime = t } catch { /* not seekable yet */ }
        }
      }

      const settled =
        Math.abs(target - eased) <= IDLE_EPSILON && !video.seeking &&
        (duration === 0 ||
          Math.abs(videoTimeFor(eased) - video.currentTime) <= SEEK_DEADBAND)
      if (!settled) raf = requestAnimationFrame(tick)
      else running = false      // park until the next scroll
    }

    const kick = () => {
      target = readProgress()
      if (!running) { running = true; raf = requestAnimationFrame(tick) }
    }

    const resync = () => {
      if (duration > 0) { try { video.currentTime = videoTimeFor(eased) } catch {} }
    }

    // iOS/Android will not render a seeked frame from a video that has never
    // played — they keep showing the poster. A muted play()/pause() wakes the
    // decoder. Only mark primed on SUCCESS: autoplay policy rejects the first
    // attempt, and setting the flag there permanently blocks the gesture retry.
    const prime = () => {
      if (primed) return
      primeAttempts++
      let p
      try { p = video.play() } catch { return }
      if (p?.then) {
        p.then(
          () => { primed = true; video.pause(); resync(); detachGestures() },
          () => { /* blocked — stay unprimed so the next gesture retries */ },
        )
      } else { primed = true; video.pause(); resync(); detachGestures() }
    }

    const onGesture = () => { if (primed) detachGestures(); else prime() }
    const detachGestures = () => {
      for (const ev of ['pointerdown', 'touchstart', 'touchend'])
        window.removeEventListener(ev, onGesture)
    }

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0
      eased = target = readProgress()
      resync()
      prime()
    }

    if (video.readyState >= 1) onMeta()
    else video.addEventListener('loadedmetadata', onMeta)

    // NOT { once: true } — the first attempt is expected to fail.
    for (const ev of ['pointerdown', 'touchstart', 'touchend'])
      window.addEventListener(ev, onGesture, { passive: true })

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    window.addEventListener('orientationchange', kick)
    kick()

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', onMeta)
      detachGestures()
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      window.removeEventListener('orientationchange', kick)
    }
  }, [reduced])

  const backdrop = (
    <>
      <picture
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${mediaReady ? 'opacity-0' : 'opacity-100'}`}
      >
        <source media="(max-width: 767.98px)" srcSet="/video/hero-scroll-portrait-poster.jpg" />
        <img
          alt=""
          src="/video/hero-scroll-poster.jpg"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <video
        ref={videoRef}
        aria-hidden
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
        muted playsInline preload="auto" controls={false}
        disablePictureInPicture disableRemotePlayback
        onLoadedData={() => setMediaReady(true)}
      >
        <source src="/video/hero-scroll-portrait.mp4" type="video/mp4"
                media="(max-width: 767.98px)" />
        <source src="/video/hero-scroll.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 hidden md:block" style={{ background: SCRIM_SIDE }} />
      <div className="absolute inset-0 hidden md:block" style={{ background: SCRIM_FOOT }} />
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: SCRIM_MOBILE }}
      />
    </>
  )

  // Reduced motion: no pin, no scrub. Every beat stated plainly in normal flow.
  if (reduced) {
    return (
      <section id="hero" className="relative text-white"
               style={{ backgroundColor: '#000', textShadow: TEXT_SHADOW }}>
        <div className="relative w-full aspect-[9/16] md:aspect-[21/9]">
          {backdrop}
        </div>
        <Container className="py-14">
          <div className="space-y-14">
            {BEATS.map((beat, i) => (
              <BeatBody key={i} beat={beat} scrollTo={scrollTo} />
            ))}
          </div>
        </Container>
        <div className="border-t border-white/10" style={{ background: '#0d0b09' }}>
          <ServicesPanelBody />
        </div>
      </section>
    )
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ backgroundColor: '#000' }}
      className="relative h-[400lvh] text-white md:h-[560lvh]"
    >
      <div ref={pinRef} className="sticky top-0 h-lvh w-full overflow-hidden">
        <div className="absolute inset-0 h-full">{backdrop}</div>

        {BEATS.map((beat, i) => (
          <div
            key={i}
            ref={(el) => { beatRefs.current[i] = el }}
            // Inline initial styles so the SSR/first paint is already correct.
            style={i === 0
              ? { opacity: 1, textShadow: TEXT_SHADOW }
              : { opacity: 0, visibility: 'hidden', textShadow: TEXT_SHADOW }}
            className={HERO_BEAT_CLASS}
          >
            <Container>
              <BeatBody beat={beat} scrollTo={scrollTo} immersive />
            </Container>
          </div>
        ))}

        <button
          ref={scrollCueRef}
          type="button"
          onClick={advanceHero}
          aria-label="Advance to the first transformation step"
          className="hero-scroll-cue"
        >
          <span className="hidden md:inline">Scroll to transform the space</span>
          <span className="md:hidden">Swipe to transform the space</span>
          <span className="hero-scroll-cue__mark" aria-hidden="true" />
        </button>

        {/* Rises over the held final frame across the last 8% of the runway. */}
        <div
          ref={panelRef}
          style={{ transform: 'translate3d(0,100%,0)', visibility: 'hidden' }}
          className="absolute inset-0 z-20 will-change-transform"
        >
          <div className="h-full w-full overflow-y-auto flex items-center border-t border-white/10"
               style={{ background: 'rgba(13,11,9,0.97)' }}>
            <ServicesPanelBody />
          </div>
        </div>

        {/* A pinned section must signal it has an end, or readers feel stuck. */}
        <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/20">
          <div ref={progressRef} style={{ transform: 'scaleX(0)' }}
               className="h-full origin-left bg-white" />
        </div>

        {/* Diagnostics — un-hidden imperatively only when ?debug=1 is present. */}
        <pre ref={debugRef} hidden dir="ltr"
             className="pointer-events-none absolute left-3 top-3 z-40 bg-black/85
                        px-3 py-2 text-left font-mono text-[11px] text-white" />
      </div>
    </section>
  )
}
