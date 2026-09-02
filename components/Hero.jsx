'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SERVICE_DETAIL_PAGES_ENABLED } from '@/lib/site-flags'
import { Container, ArrowRight } from './ui'

const SCRIM_SIDE =
  'linear-gradient(100deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.31) 66%, rgba(0,0,0,0.26) 100%)'
const SCRIM_FOOT = 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 34%)'
const SCRIM_MOBILE =
  'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 34%, rgba(0,0,0,0.08) 66%, rgba(0,0,0,0.40) 100%)'
const TEXT_SHADOW = '0 1px 26px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.32)'

const BEATS = [
  { lead: true, line: 'From shell to signature.' },
  { step: '01', label: 'Prepare', line: 'Every detail coordinated.' },
  { step: '02', label: 'Build', line: 'One experienced team, fully managed.' },
  { step: '03', label: 'Finish', line: 'Installed with absolute precision.' },
  { step: '04', label: 'Refine', line: 'Inspected down to the final detail.' },
  { line: 'From concept to completion.' },
]

const BEAT_STARTS = [0, 0.105, 0.33, 0.56, 0.785, 0.883]

const SERVICES = [
  { href: '/services/development-renovation', label: 'Development & Renovation', desc: 'Extensions, lofts & refurbishments' },
  { href: '/services/kitchens-bathrooms', label: 'Kitchens & Bathrooms', desc: 'Supply, design & installation' },
  { href: '/services/bedrooms', label: 'Bedrooms', desc: 'Complete fitting service' },
  { href: '/services/marble-granite', label: 'Marble & Granite', desc: 'Specialist worktop installation' },
  { href: '/services/flooring', label: 'Flooring', desc: 'All types, supplied & fitted' },
  { href: '/services/furnishing', label: 'Furnishing', desc: 'Handmade bespoke furniture' },
]

function beatIndexAt(progress) {
  for (let index = BEAT_STARTS.length - 1; index >= 0; index--) {
    if (progress >= BEAT_STARTS[index]) return index
  }
  return 0
}

function BtnLight({ children, href, className = '', tabIndex }) {
  const cls = `inline-flex items-center gap-2.5 bg-white px-9 py-4 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0b0b0c] transition-colors duration-300 hover:bg-white/88 ${className}`
  return <a href={href} className={cls} tabIndex={tabIndex}>{children}</a>
}

function HeroBeat({ beat }) {
  return (
    <div className="max-w-3xl max-md:max-w-[320px]">
      {beat.step && (
        <div className="mb-5 flex items-center gap-4">
          <span className="font-display font-light leading-none text-white/55" style={{ fontSize: 'clamp(26px, 3.4vw, 42px)' }}>
            {beat.step}
          </span>
          <span className="h-px w-8 bg-white/25" />
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
            {beat.label}
          </span>
        </div>
      )}

      {beat.lead ? (
        <h1
          className="font-display font-light leading-[1.04] text-white"
          style={{ fontSize: 'clamp(36px, 6vw, 96px)' }}
        >
          {beat.line}
        </h1>
      ) : (
        <p
          className="font-display font-light leading-[1.04] text-white"
          style={{ fontSize: beat.step ? 'clamp(30px, 4.6vw, 68px)' : 'clamp(36px, 6vw, 96px)' }}
        >
          {beat.line}
        </p>
      )}
    </div>
  )
}

function ServicesPanelBody() {
  return (
    <Container className="py-8 sm:py-12">
      <h2
        className="mb-7 font-display font-light leading-[1.05] text-white sm:mb-10"
        style={{ fontSize: 'clamp(28px, 4.6vw, 62px)' }}
      >
        One call covers the whole project.
      </h2>

      <div className="grid grid-cols-2 gap-px lg:grid-cols-3" style={{ background: 'rgba(255,255,255,0.10)' }}>
        {SERVICES.map(({ href, label, desc }) => {
          const content = (
            <>
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85 transition-colors group-hover:text-white sm:text-[12px]">
                {label}
              </span>
              <span className="hidden text-[11.5px] leading-[1.5] text-white/55 sm:block">{desc}</span>
            </>
          )
          const className = 'group flex flex-col gap-1.5 p-3.5 transition-colors duration-300 sm:p-5'
          const style = { background: '#0d0b09' }

          return SERVICE_DETAIL_PAGES_ENABLED ? (
            <Link key={href} href={href} className={className} style={style}>
              {content}
            </Link>
          ) : (
            <div key={href} className={className} style={style}>
              {content}
            </div>
          )
        })}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-5 sm:mt-10">
        <BtnLight href="/#contact">
          Start Your Project
          <ArrowRight />
        </BtnLight>
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
          All workmanship guaranteed 12 months
        </span>
      </div>
    </Container>
  )
}

function ResponsivePoster({ visible = true }) {
  return (
    <picture
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <source media="(max-width: 767.98px)" srcSet="/video/hero-scroll-portrait-poster.jpg" />
      <img
        alt=""
        src="/video/hero-scroll-poster.jpg"
        className="h-full w-full object-cover object-center"
      />
    </picture>
  )
}

function HeroScrims() {
  return (
    <>
      <div className="absolute inset-0 hidden md:block" style={{ background: SCRIM_SIDE }} />
      <div className="absolute inset-0 hidden md:block" style={{ background: SCRIM_FOOT }} />
      <div className="absolute inset-0 md:hidden" style={{ background: SCRIM_MOBILE }} />
    </>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const panelRef = useRef(null)
  const videoRef = useRef(null)
  const playAttemptRef = useRef(null)
  const retryTimerRef = useRef(0)
  const retryCountRef = useRef(0)
  const attemptPlaybackRef = useRef(null)
  const [reduced, setReduced] = useState(false)
  const [mediaReady, setMediaReady] = useState(false)
  const [activeBeat, setActiveBeat] = useState(0)

  const clearPlaybackRetry = () => {
    if (!retryTimerRef.current) return
    window.clearTimeout(retryTimerRef.current)
    retryTimerRef.current = 0
  }

  const schedulePlaybackRetry = () => {
    if (retryTimerRef.current || retryCountRef.current >= 4) return
    const delays = [250, 750, 1500, 3000]
    const delay = delays[retryCountRef.current]
    retryCountRef.current += 1
    retryTimerRef.current = window.setTimeout(() => {
      retryTimerRef.current = 0
      attemptPlaybackRef.current?.()
    }, delay)
  }

  const playWhenReady = () => {
    const video = videoRef.current
    if (!video || video.ended || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    video.defaultMuted = true
    video.muted = true

    if (!video.paused) {
      clearPlaybackRetry()
      retryCountRef.current = 0
      setMediaReady(true)
      return
    }

    if (playAttemptRef.current) return

    let playAttempt
    try {
      playAttempt = video.play()
    } catch {
      if (video.paused) {
        setMediaReady(false)
        schedulePlaybackRetry()
      }
      return
    }

    if (!playAttempt?.then) {
      setMediaReady(!video.paused)
      if (video.paused) schedulePlaybackRetry()
      return
    }

    playAttemptRef.current = playAttempt
    playAttempt.then(
      () => {
        if (playAttemptRef.current !== playAttempt) return
        playAttemptRef.current = null
        if (!video.paused) {
          clearPlaybackRetry()
          retryCountRef.current = 0
          setMediaReady(true)
        } else {
          schedulePlaybackRetry()
        }
      },
      () => {
        if (playAttemptRef.current !== playAttempt) return
        playAttemptRef.current = null
        if (!video.paused) {
          clearPlaybackRetry()
          retryCountRef.current = 0
          setMediaReady(true)
          return
        }
        setMediaReady(false)
        schedulePlaybackRetry()
      },
    )
  }

  attemptPlaybackRef.current = playWhenReady

  const handlePlaying = () => {
    playAttemptRef.current = null
    clearPlaybackRetry()
    retryCountRef.current = 0
    setMediaReady(true)
  }

  const handleEnded = () => {
    playAttemptRef.current = null
    clearPlaybackRetry()
    setActiveBeat(BEATS.length - 1)

    window.requestAnimationFrame(() => {
      const hero = heroRef.current
      const panel = panelRef.current
      if (!hero || !panel) return
      const rect = hero.getBoundingClientRect()
      const heroStillInView = rect.top > -window.innerHeight * 0.35
        && rect.bottom > window.innerHeight * 0.65
      if (heroStillInView) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)')
    const reloadSource = () => {
      const video = videoRef.current
      if (!video) return
      playAttemptRef.current = null
      clearPlaybackRetry()
      retryCountRef.current = 0
      setMediaReady(false)
      setActiveBeat(0)
      video.load()
    }

    // Do not reload on mount: the server-rendered video must retain its native
    // autoplay lifecycle on iOS. Reload only when crossing the breakpoint.
    mq.addEventListener('change', reloadSource)
    return () => mq.removeEventListener('change', reloadSource)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Native autoplay can begin before React hydrates, especially on cached
    // desktop loads. Reconcile from the element itself instead of depending
    // solely on media events that may already have fired.
    if (video.ended) {
      setMediaReady(true)
      setActiveBeat(BEATS.length - 1)
    } else if (!video.paused && video.readyState >= 2) {
      handlePlaying()
    } else {
      attemptPlaybackRef.current?.()
    }
  }, [])

  useEffect(() => {
    const resumePlayback = () => {
      const video = videoRef.current
      if (document.hidden || !video || video.ended) return
      retryCountRef.current = 0
      attemptPlaybackRef.current?.()
    }

    document.addEventListener('visibilitychange', resumePlayback)
    window.addEventListener('pageshow', resumePlayback)
    return () => {
      document.removeEventListener('visibilitychange', resumePlayback)
      window.removeEventListener('pageshow', resumePlayback)
      clearPlaybackRetry()
      playAttemptRef.current = null
    }
  }, [])

  const updateCaption = (event) => {
    const video = event.currentTarget
    const duration = Number.isFinite(video.duration) ? video.duration : 0
    if (duration <= 0) return
    const nextBeat = beatIndexAt(video.currentTime / duration)
    setActiveBeat((current) => current === nextBeat ? current : nextBeat)
  }

  if (reduced) {
    return (
      <>
        <section ref={heroRef} id="hero" className="relative text-white" style={{ backgroundColor: '#000', textShadow: TEXT_SHADOW }}>
          <div className="relative h-lvh w-full overflow-hidden">
            <ResponsivePoster />
            <HeroScrims />
            <div className="absolute inset-0 z-10 flex items-end pb-[12lvh] md:items-center md:pb-0">
              <Container>
                <HeroBeat beat={BEATS[0]} />
              </Container>
            </div>
          </div>
          <Container className="py-14">
            <div className="space-y-14">
              {BEATS.slice(1).map((beat) => (
                <HeroBeat key={beat.line} beat={beat} />
              ))}
            </div>
          </Container>
        </section>
        <section className="relative flex min-h-lvh w-full items-center overflow-y-auto border-t border-white/10 text-white" style={{ background: '#0d0b09' }}>
          <ServicesPanelBody />
        </section>
      </>
    )
  }

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative h-lvh w-full overflow-hidden text-white"
        style={{ backgroundColor: '#000', textShadow: TEXT_SHADOW }}
      >
        <ResponsivePoster visible={!mediaReady} />
        <video
          ref={videoRef}
          aria-hidden
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 motion-reduce:hidden ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={playWhenReady}
          onCanPlay={playWhenReady}
          onPlaying={handlePlaying}
          onTimeUpdate={updateCaption}
          onSeeked={updateCaption}
          onEnded={handleEnded}
          onError={() => {
            playAttemptRef.current = null
            clearPlaybackRetry()
            setMediaReady(false)
          }}
        >
          <source
            src="/video/hero-scroll-portrait.mp4"
            type="video/mp4"
            media="(max-width: 767.98px)"
          />
          <source src="/video/hero-scroll.mp4" type="video/mp4" />
        </video>

        <HeroScrims />

        {BEATS.map((beat, index) => {
          const active = index === activeBeat
          return (
            <div
              key={beat.line}
              aria-hidden={!active}
              className={`absolute inset-0 z-10 flex items-end pb-[12lvh] transition-[opacity,transform] duration-500 md:items-center md:pb-0 ${active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
            >
              <Container>
                <HeroBeat beat={beat} />
              </Container>
            </div>
          )
        })}
      </section>

      <section
        ref={panelRef}
        className="relative flex min-h-lvh w-full items-center overflow-y-auto border-t border-white/10 text-white"
        style={{ background: '#0d0b09' }}
      >
        <ServicesPanelBody />
      </section>
    </>
  )
}
