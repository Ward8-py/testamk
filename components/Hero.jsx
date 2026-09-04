'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from './ui'
import { Icon } from './icons'
import { useQuote } from './QuoteProvider'

const DESKTOP_POSTER = '/video/hero-scroll-poster.jpg'
const MOBILE_POSTER = '/video/hero-scroll-portrait-poster.jpg'
const PLAYBACK_CAPTIONS = [
  { start: 0, text: 'From shell to signature.' },
  { start: 0.18, text: 'Plan every detail.' },
  { start: 0.36, text: 'Build with precision.' },
  { start: 0.54, text: 'Bring every trade together.' },
  { start: 0.72, text: 'Finish with care.' },
  { start: 0.88, text: 'Ready for handover.' },
]

function ResponsivePoster({ visible }) {
  return (
    <picture
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <source media="(max-width: 767.98px)" srcSet={MOBILE_POSTER} />
      <img alt="" src={DESKTOP_POSTER} className="h-full w-full object-cover object-center" />
    </picture>
  )
}

function PlaybackIcon({ state }) {
  if (state === 'replay') {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 11a8 8 0 1 0-2.3 5.7" />
        <path d="M20 4v7h-7" />
      </svg>
    )
  }

  if (state === 'pause') {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
      </svg>
    )
  }

  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4v16l13-8z" />
    </svg>
  )
}

export default function Hero() {
  const videoRef = useRef(null)
  const retryRef = useRef(0)
  const retryCountRef = useRef(0)
  const reducedRef = useRef(false)
  const userPausedRef = useRef(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mediaReady, setMediaReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  const [playbackFailed, setPlaybackFailed] = useState(false)
  const [activeCaption, setActiveCaption] = useState(0)
  const { openQuote } = useQuote()

  const clearRetry = useCallback(() => {
    if (!retryRef.current) return
    window.clearTimeout(retryRef.current)
    retryRef.current = 0
  }, [])

  const attemptPlay = useCallback(() => {
    const video = videoRef.current
    if (!video || reducedRef.current || userPausedRef.current || video.ended) return

    video.defaultMuted = true
    video.muted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')

    let promise
    try {
      promise = video.play()
    } catch {
      setPlaybackFailed(true)
      return
    }
    if (!promise?.then) return

    promise.catch(() => {
      if (reducedRef.current) return
      if (retryRef.current || retryCountRef.current >= 4) {
        setPlaybackFailed(true)
        return
      }
      const delays = [200, 600, 1400, 2800]
      const delay = delays[retryCountRef.current]
      retryCountRef.current += 1
      retryRef.current = window.setTimeout(() => {
        retryRef.current = 0
        attemptPlay()
      }, delay)
    })
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      reducedRef.current = query.matches
      setReducedMotion(query.matches)
      if (query.matches) {
        clearRetry()
        videoRef.current?.pause()
      } else {
        attemptPlay()
      }
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [attemptPlay, clearRetry])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767.98px)')
    const changeSource = () => {
      const video = videoRef.current
      if (!video) return
      clearRetry()
      retryCountRef.current = 0
      userPausedRef.current = false
      setMediaReady(false)
      setHasEnded(false)
      setPlaybackFailed(false)
      setIsPlaying(false)
      setActiveCaption(0)
      video.load()
      window.setTimeout(attemptPlay, 0)
    }
    query.addEventListener('change', changeSource)
    return () => query.removeEventListener('change', changeSource)
  }, [attemptPlay, clearRetry])

  useEffect(() => {
    const resume = () => {
      const video = videoRef.current
      if (document.hidden || !video || video.ended || reducedRef.current) return
      retryCountRef.current = 0
      attemptPlay()
    }

    resume()
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('pageshow', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('pageshow', resume)
      clearRetry()
    }
  }, [attemptPlay, clearRetry])

  const handlePlaying = () => {
    clearRetry()
    retryCountRef.current = 0
    setMediaReady(true)
    setHasEnded(false)
    setPlaybackFailed(false)
    setIsPlaying(true)
  }

  const handleEnded = () => {
    clearRetry()
    setMediaReady(true)
    setHasEnded(true)
    setIsPlaying(false)
  }

  const updateCaption = (event) => {
    const video = event.currentTarget
    if (!Number.isFinite(video.duration) || video.duration <= 0) return
    const progress = video.currentTime / video.duration
    let next = 0
    for (let index = PLAYBACK_CAPTIONS.length - 1; index >= 0; index -= 1) {
      if (progress >= PLAYBACK_CAPTIONS[index].start) {
        next = index
        break
      }
    }
    setActiveCaption((current) => current === next ? current : next)
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (hasEnded || playbackFailed) {
      userPausedRef.current = false
      if (playbackFailed) video.load()
      else video.currentTime = 0
      setHasEnded(false)
      setPlaybackFailed(false)
      setActiveCaption(0)
      window.setTimeout(attemptPlay, 0)
      return
    }

    if (video.paused) {
      userPausedRef.current = false
      attemptPlay()
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  const showFinalMessage = reducedMotion || hasEnded || playbackFailed

  return (
    <section id="hero" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black text-white">
      <ResponsivePoster visible={!mediaReady || reducedMotion} />

      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 motion-reduce:hidden ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={attemptPlay}
        onLoadedData={attemptPlay}
        onCanPlay={attemptPlay}
        onPlaying={handlePlaying}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={updateCaption}
        onEnded={handleEnded}
        onError={() => {
          clearRetry()
          setMediaReady(false)
          setIsPlaying(false)
          setPlaybackFailed(true)
        }}
      >
        <source src="/video/hero-scroll-portrait.mp4" type="video/mp4" media="(max-width: 767.98px)" />
        <source src="/video/hero-scroll.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.24)_72%,rgba(0,0,0,.18))] md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.78),rgba(0,0,0,.08)_68%,rgba(0,0,0,.32))] md:hidden" />
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-black transition-opacity duration-[900ms] ${showFinalMessage ? 'opacity-[0.58]' : 'opacity-0'}`}
      />

      {!showFinalMessage ? (
        <Container className="pointer-events-none absolute inset-x-0 bottom-[max(116px,calc(84px+env(safe-area-inset-bottom)))] z-10 md:bottom-14">
          <p key={activeCaption} className="hero-caption max-w-[86vw] font-display text-[clamp(27px,4.2vw,54px)] font-medium leading-none tracking-[-0.025em] text-white">
            {PLAYBACK_CAPTIONS[activeCaption].text}
          </p>
        </Container>
      ) : null}

      <Container className={`relative z-10 flex h-full items-end pb-[max(112px,calc(82px+env(safe-area-inset-bottom)))] pt-28 transition-[opacity,transform] duration-500 md:items-center md:pb-0 md:pt-20 ${showFinalMessage ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-3 opacity-0 delay-0'}`}>
        <div className="max-w-[830px]">
          <h1 className="font-display text-[clamp(52px,8.2vw,118px)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            From concept<br className="hidden sm:block" /> to completion.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] font-normal leading-7 text-white/85 sm:text-[18px] sm:leading-8">
            One experienced London team to plan, build and finish your home—without the usual hand-offs.
          </p>
          <div className="mt-8 hidden flex-wrap items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => openQuote({ source: 'hero' })}
              disabled={!showFinalMessage}
              className="amk-button bg-white text-black hover:bg-white/90"
            >
              Get a Free Quote
              <Icon name="arrow-right" size={15} />
            </button>
            <a
              href="https://wa.me/447587842444"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={showFinalMessage ? 0 : -1}
              aria-hidden={!showFinalMessage}
              className="inline-flex min-h-12 items-center gap-2 border-b border-white/55 px-1 text-sm font-semibold text-white transition-colors duration-150 hover:border-white"
            >
              <Icon name="whatsapp" size={17} />
              Prefer WhatsApp?
            </a>
          </div>
        </div>
      </Container>

      {!reducedMotion ? (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute right-5 top-[88px] z-20 flex min-h-11 items-center gap-2 rounded-full border border-white/35 bg-black/35 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/65 md:bottom-8 md:right-8 md:top-auto"
          aria-label={hasEnded ? 'Replay hero video' : isPlaying ? 'Pause hero video' : 'Play hero video'}
        >
          <PlaybackIcon state={hasEnded ? 'replay' : isPlaying ? 'pause' : 'play'} />
          <span className="hidden sm:inline">{hasEnded ? 'Replay' : isPlaying ? 'Pause' : 'Play'}</span>
        </button>
      ) : null}
    </section>
  )
}
