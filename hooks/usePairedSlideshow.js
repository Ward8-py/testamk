'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const COMPARISON_INTERVAL = 2500
export const COMPARISON_FADE = 300

export default function usePairedSlideshow(pairs, regionRef, viewerOpen) {
  const [slide, setSlide] = useState({ index: 0, previousIndex: null, revision: 0 })
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [preferencesReady, setPreferencesReady] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [focused, setFocused] = useState(false)
  const [ready, setReady] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const imageCache = useRef(new Map())
  const requestId = useRef(0)
  const retryIndex = useRef(0)

  const loadPair = useCallback((index) => {
    return Promise.all(['before', 'after'].map((stage) => {
      const { src } = pairs[index][stage]
      if (!imageCache.current.has(src)) {
        const promise = new Promise((resolve, reject) => {
          const image = new window.Image()
          const timeout = window.setTimeout(() => finish(new Error('Image timed out')), 15000)
          const finish = (failure) => {
            window.clearTimeout(timeout)
            image.onload = null
            image.onerror = null
            if (failure) reject(failure)
            else resolve()
          }
          image.onload = () => {
            if (image.decode) image.decode().then(() => finish(), finish)
            else finish()
          }
          image.onerror = () => finish(new Error('Image unavailable'))
          image.src = src
        }).catch((failure) => {
          imageCache.current.delete(src)
          throw failure
        })
        imageCache.current.set(src, promise)
      }
      return imageCache.current.get(src)
    }))
  }, [pairs])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReducedMotion(query.matches)
      if (query.matches) setPaused(true)
    }
    update()
    setPreferencesReady(true)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '-80px 0px -80px 0px',
      threshold: 0,
    })
    if (regionRef.current) observer.observe(regionRef.current)
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [regionRef])

  useEffect(() => {
    let cancelled = false
    const initialRequest = requestId.current
    loadPair(0).then(() => {
      if (!cancelled) setReady(true)
    }).catch(() => {
      // A late failure of the opening pair must not interrupt a newer selection.
      if (!cancelled && requestId.current === initialRequest) setError(true)
    })
    return () => { cancelled = true }
  }, [loadPair])

  useEffect(() => {
    // A failed speculative preload is handled only if that pair is requested.
    loadPair((slide.index + 1) % pairs.length).catch(() => {})
  }, [slide.index, pairs.length, loadPair])

  const commitPair = useCallback((index) => {
    setSlide((current) => ({
      index,
      previousIndex: reducedMotion || index === current.index ? null : current.index,
      revision: current.revision + 1,
    }))
  }, [reducedMotion])

  useEffect(() => {
    if (slide.previousIndex === null) return undefined
    const timer = window.setTimeout(() => {
      setSlide((current) => ({ ...current, previousIndex: null }))
    }, COMPARISON_FADE)
    return () => window.clearTimeout(timer)
  }, [slide.revision, slide.previousIndex])

  const playing = preferencesReady && ready && !paused && inView && pageVisible
    && !focused && !viewerOpen && !pending && !error && pairs.length > 1

  useEffect(() => {
    if (!playing) return undefined
    let cancelled = false
    const nextIndex = (slide.index + 1) % pairs.length
    // Start-to-start interval, including the fade. Await both images atomically.
    const timer = window.setTimeout(async () => {
      try {
        await loadPair(nextIndex)
        if (!cancelled) commitPair(nextIndex)
      } catch {
        if (!cancelled) {
          retryIndex.current = nextIndex
          setError(true)
        }
      }
    }, COMPARISON_INTERVAL)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [playing, slide.index, slide.revision, pairs.length, loadPair, commitPair])

  const cancelPending = useCallback(() => {
    requestId.current += 1
    setPending(false)
  }, [])

  useEffect(() => () => { requestId.current += 1 }, [])

  const requestPair = useCallback(async (index) => {
    const id = ++requestId.current
    retryIndex.current = index
    setPending(true)
    setError(false)
    try {
      await loadPair(index)
      if (id !== requestId.current) return
      commitPair(index)
      setReady(true)
    } catch {
      if (id === requestId.current) setError(true)
    } finally {
      if (id === requestId.current) setPending(false)
    }
  }, [loadPair, commitPair])

  return {
    ...slide,
    paused,
    pending,
    error,
    playing,
    reducedMotion,
    setFocused,
    cancelPending,
    togglePlayback: () => setPaused((current) => !current),
    goTo: (offset) => requestPair((slide.index + offset + pairs.length) % pairs.length),
    retry: () => requestPair(retryIndex.current),
  }
}
