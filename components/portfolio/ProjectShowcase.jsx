'use client'

import { useCallback, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import usePairedSlideshow from '@/hooks/usePairedSlideshow'
import ImageLightbox from './ImageLightbox'
import styles from './ProjectShowcase.module.css'

function ComparisonImage({ photo, previous = false, animate = false }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className={`${styles.imageLayer} ${animate ? styles.entering : ''}`} aria-hidden={previous || undefined}>
      {failed ? <span className={styles.imageFallback}>Photograph unavailable</span> : null}
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc((100vw - 88px) / 2), (max-width: 1319px) calc((100vw - 136px) / 2), 592px"
        className={failed ? styles.failedImage : styles.photo}
        style={{ objectPosition: photo.objectPosition }}
        loading="eager"
        onError={() => setFailed(true)}
      />
    </span>
  )
}

export default function ProjectShowcase({ pairs, projectName, children }) {
  const id = useId()
  const comparisonRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [hasExpanded, setHasExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const slideshow = usePairedSlideshow(pairs, comparisonRef, lightboxIndex !== null)
  const pair = pairs[slideshow.index]
  const previousPair = slideshow.previousIndex === null ? null : pairs[slideshow.previousIndex]
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const openLightbox = (index) => {
    slideshow.cancelPending()
    setLightboxIndex(index)
  }

  return (
    <>
      <section
        ref={comparisonRef}
        className={styles.comparison}
        aria-labelledby={`${id}-comparison-heading`}
        aria-roledescription="carousel"
        data-comparison-index={slideshow.index}
        data-comparison-playing={slideshow.playing}
        onFocusCapture={(event) => slideshow.setFocused(event.target.matches(':focus-visible'))}
        onKeyDownCapture={() => slideshow.setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) slideshow.setFocused(false)
        }}
      >
        <div className={styles.headingRow}>
          <h2 id={`${id}-comparison-heading`} className={styles.heading}>Before &amp; After</h2>
          <div className={styles.controls} role="group" aria-label="Comparison playback controls">
            <span className={styles.counter} aria-live="off" aria-label={`Comparison ${slideshow.index + 1} of ${pairs.length}`}>
              {String(slideshow.index + 1).padStart(2, '0')}
              <span aria-hidden="true"> / </span>
              <span className={styles.total}>{String(pairs.length).padStart(2, '0')}</span>
            </span>
            <button className={styles.iconButton} type="button" aria-label="Previous comparison" disabled={slideshow.pending} onClick={() => slideshow.goTo(-1)}>
              <Icon name="arrow-left" size={16} />
            </button>
            <button className={styles.playbackButton} type="button" aria-label={`${slideshow.paused ? 'Play' : 'Pause'} comparison slideshow`} onClick={slideshow.togglePlayback}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                {slideshow.paused ? <path d="M4 2.5 13 8l-9 5.5z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
              </svg>
              {slideshow.paused ? 'Play' : 'Pause'}
            </button>
            <button className={styles.iconButton} type="button" aria-label="Next comparison" disabled={slideshow.pending} onClick={() => slideshow.goTo(1)}>
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>

        <div className={styles.cards} aria-live="off">
          {['before', 'after'].map((stage, index) => (
            <figure key={stage} className={styles.card}>
              <figcaption className={styles.caption}>
                <span className={styles.stage}>{stage === 'before' ? 'Before' : 'After'}</span>
                <span className={styles.captionStack}>
                  {pairs.map((item, captionIndex) => (
                    <span key={item.id} className={captionIndex === slideshow.index ? '' : styles.hiddenCaption} aria-hidden={captionIndex !== slideshow.index || undefined}>
                      {item[stage].caption}
                    </span>
                  ))}
                </span>
              </figcaption>
              <button
                className={styles.imageButton}
                type="button"
                aria-label={`View ${stage} photo: ${pair[stage].alt}`}
                onClick={() => openLightbox(index)}
              >
                {previousPair && !slideshow.reducedMotion ? (
                  <ComparisonImage key={`previous-${slideshow.revision}`} photo={previousPair[stage]} previous />
                ) : null}
                <ComparisonImage key={`current-${slideshow.revision}`} photo={pair[stage]} animate={Boolean(previousPair) && !slideshow.reducedMotion} />
                <span className={styles.enlarge} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
                  </svg>
                </span>
              </button>
            </figure>
          ))}
        </div>
        <div className={styles.status} role="status">
          {slideshow.pending ? 'Loading comparison…' : null}
          {slideshow.error ? (
            <>
              <span>This comparison couldn’t load.</span>
              <button type="button" onClick={slideshow.retry}>Try again</button>
            </>
          ) : null}
        </div>
      </section>

      <div className={styles.disclosure}>
        <button
          id={`${id}-details-toggle`}
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-details`}
          className={`amk-button amk-button-dark rounded-full ${styles.detailsButton}`}
          onClick={() => {
            setHasExpanded(true)
            setExpanded((current) => !current)
          }}
        >
          {expanded ? 'Hide the Details' : 'Browse the Details'}
          <Icon name="chevron-down" size={14} className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} />
        </button>
        <p>Before, in progress and after.</p>
      </div>

      <div id={`${id}-details`} hidden={!expanded} className={styles.details}>
        {hasExpanded ? children : null}
      </div>

      <ImageLightbox
        images={['before', 'after'].map((stage) => ({
          ...pair[stage],
          alt: `${projectName} — ${stage === 'before' ? 'Before' : 'After'}: ${pair[stage].alt}`,
        }))}
        isOpen={lightboxIndex !== null}
        initialIndex={lightboxIndex ?? 0}
        onClose={closeLightbox}
      />
    </>
  )
}
