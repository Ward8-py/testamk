'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import ImageLightbox from './ImageLightbox'

export default function ProjectGallery({ images = [], projectName }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = (index) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  if (!images.length) {
    return (
      <div className="border px-8 py-12 text-center" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
        <h2 className="font-display text-[30px] font-light" style={{ color: 'var(--color-ink)' }}>
          Gallery coming soon
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--color-muted)' }}>
          Project images are being prepared for this gallery.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => openLightbox(index)}
            className={`group relative overflow-hidden border text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_var(--color-line-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${
              index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
            style={{
              aspectRatio: index === 0 ? '16 / 10' : '4 / 3',
              background: 'var(--color-panel-strong)',
              borderColor: 'var(--color-line)',
            }}
            aria-label={`Open ${projectName} gallery image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${projectName} gallery image ${index + 1}`}
              fill
              sizes={index === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'}
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-[var(--color-ink)]/0 transition duration-300 group-hover:bg-[var(--color-ink)]/24" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 border border-white/20 bg-[var(--color-ink)]/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
              View
              <Icon name="arrow-right" size={12} />
            </div>
            {index === 0 ? (
              <div className="absolute left-4 top-4 border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--color-ink)', background: 'rgba(253, 250, 244, 0.92)', borderColor: 'rgba(255,252,245,0.5)' }}>
                Featured
              </div>
            ) : null}
          </button>
        ))}
      </div>

      <ImageLightbox
        images={images}
        isOpen={isOpen}
        initialIndex={selectedIndex}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
