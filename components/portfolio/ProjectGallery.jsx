'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import ImageLightbox from './ImageLightbox'

export default function ProjectGallery({
  beforeImages = [],
  progressImages = [],
  afterImages = [],
  photos = [],
  areaCategories = [],
  projectName,
}) {
  const [activeStage, setActiveStage] = useState('after')
  const [activeArea, setActiveArea] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const tabPrefix = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const legacyPhotos = [
    ...beforeImages.map((src, index) => ({
      src,
      stage: 'before',
      area: null,
      alt: `${projectName} before image ${index + 1}`,
    })),
    ...progressImages.map((src, index) => ({
      src,
      stage: 'progress',
      area: null,
      alt: `${projectName} in progress image ${index + 1}`,
    })),
    ...afterImages.map((src, index) => ({
      src,
      stage: 'after',
      area: null,
      alt: `${projectName} after image ${index + 1}`,
    })),
  ]
  const allPhotos = [...legacyPhotos, ...photos]
  const stageCounts = {
    before: allPhotos.filter((photo) => photo.stage === 'before').length,
    progress: allPhotos.filter((photo) => photo.stage === 'progress').length,
    after: allPhotos.filter((photo) => photo.stage === 'after').length,
  }
  const stagePhotos = allPhotos.filter((photo) => photo.stage === activeStage)
  const availableAreas = areaCategories.filter((area) =>
    stagePhotos.some((photo) => photo.area === area)
  )
  const areaFilters = availableAreas.length ? ['All', ...availableAreas] : []
  const visiblePhotos = activeArea === 'All'
    ? stagePhotos
    : stagePhotos.filter((photo) => photo.area === activeArea)

  const changeStage = (stage) => {
    setActiveStage(stage)
    setActiveArea('All')
    setSelectedIndex(0)
    setIsOpen(false)
  }

  const changeArea = (area) => {
    setActiveArea(area)
    setSelectedIndex(0)
    setIsOpen(false)
  }

  const openLightbox = (index) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <div
        role="tablist"
        aria-label={`${projectName} project stages`}
        className="mb-8 grid grid-cols-3 border"
        style={{ borderColor: 'var(--color-line-strong)' }}
      >
        {[
          { id: 'before', label: 'Before', count: stageCounts.before },
          { id: 'progress', label: 'In Progress', count: stageCounts.progress },
          { id: 'after', label: 'After', count: stageCounts.after },
        ].map(({ id, label, count }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${tabPrefix}-${id}-tab`}
            aria-selected={activeStage === id}
            aria-controls={`${tabPrefix}-${id}-panel`}
            onClick={() => changeStage(id)}
            className="flex items-center justify-center gap-2 px-2 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors sm:gap-3 sm:px-5 sm:text-[10px] sm:tracking-[0.22em] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            style={{
              color: activeStage === id ? 'var(--color-on-accent)' : 'var(--color-muted)',
              background: activeStage === id ? 'var(--color-accent)' : 'var(--color-panel)',
            }}
          >
            {label}
            <span className="text-[9px] opacity-70">{count}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tabPrefix}-${activeStage}-panel`}
        aria-labelledby={`${tabPrefix}-${activeStage}-tab`}
      >
        {areaFilters.length ? (
          <div className="mb-8 overflow-x-auto pb-2" aria-label={`${projectName} work areas`}>
            <div className="flex w-max min-w-full gap-2" role="group" aria-label="Filter photos by work area">
              {areaFilters.map((area) => {
                const count = area === 'All'
                  ? stagePhotos.length
                  : stagePhotos.filter((photo) => photo.area === area).length

                return (
                  <button
                    key={area}
                    type="button"
                    aria-pressed={activeArea === area}
                    onClick={() => changeArea(area)}
                    className="flex flex-shrink-0 items-center gap-2 border px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    style={{
                      color: activeArea === area ? 'var(--color-on-accent)' : 'var(--color-muted)',
                      background: activeArea === area ? 'var(--color-accent)' : 'var(--color-panel)',
                      borderColor: activeArea === area ? 'var(--color-accent)' : 'var(--color-line-strong)',
                    }}
                  >
                    {area}
                    <span className="text-[8px] opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {visiblePhotos.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePhotos.map((photo, index) => (
              <button
                key={photo.src}
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
                aria-label={`Open ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
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
                    {activeStage}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        ) : (
          <div className="border px-8 py-12 text-center" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
            <h3 className="font-display text-[30px] font-light capitalize" style={{ color: 'var(--color-ink)' }}>
              {activeStage} photos coming soon
            </h3>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-muted)' }}>
              Images for this stage are being prepared.
            </p>
          </div>
        )}
      </div>

      <ImageLightbox
        images={visiblePhotos}
        isOpen={isOpen}
        initialIndex={selectedIndex}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
