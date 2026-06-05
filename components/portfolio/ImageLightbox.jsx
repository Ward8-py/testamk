'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'

export default function ImageLightbox({ images, isOpen, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)
  const dialogRef = useRef(null)

  const goToNext = useCallback(() => {
    setIsLoading(true)
    setCurrentIndex((index) => (index + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setIsLoading(true)
    setCurrentIndex((index) => (index - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setIsLoading(true)
      dialogRef.current?.focus()
    }
  }, [initialIndex, isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') goToNext()
      if (event.key === 'ArrowLeft') goToPrevious()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [goToNext, goToPrevious, isOpen, onClose])

  if (!isOpen || !images.length) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project image gallery"
      tabIndex={-1}
      className="fixed inset-0 z-[9999] bg-[var(--color-ink)]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute left-4 top-4 z-20 border border-white/10 bg-black/35 px-4 py-2 text-sm font-medium text-white/90">
        {currentIndex + 1} / {images.length}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center border border-white/10 bg-black/35 text-white/80 transition hover:bg-white hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label="Close gallery"
      >
        <span className="text-2xl leading-none" aria-hidden="true">&times;</span>
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/35 text-white/80 transition hover:bg-white hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label="Previous image"
          >
            <Icon name="arrow-left" size={18} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/35 text-white/80 transition hover:bg-white hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label="Next image"
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </>
      ) : null}

      <div
        className="absolute inset-0 flex items-center justify-center px-4 py-20 sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        {isLoading ? (
          <div className="absolute h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-gold" />
        ) : null}
        <div className="relative h-full w-full max-w-7xl">
          <Image
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Project gallery image ${currentIndex + 1}`}
            fill
            sizes="95vw"
            className="object-contain"
            onLoadingComplete={() => setIsLoading(false)}
            priority
          />
        </div>
      </div>

      {images.length > 1 ? (
        <div className="absolute bottom-0 left-0 right-0 hidden border-t border-white/10 bg-black/35 p-4 md:block">
          <div className="mx-auto flex max-w-5xl justify-center gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setIsLoading(true)
                  setCurrentIndex(index)
                }}
                className={`relative h-16 w-20 flex-shrink-0 overflow-hidden transition ${
                  index === currentIndex ? 'opacity-100 ring-2 ring-gold' : 'opacity-55 hover:opacity-85'
                }`}
                aria-label={`View gallery image ${index + 1}`}
                aria-current={index === currentIndex}
              >
                <Image src={image} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
