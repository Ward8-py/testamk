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
  showStageTabs = true,
}) {
  const [activeStage, setActiveStage] = useState('after')
  const [activeArea, setActiveArea] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
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
  const filteredPhotos = activeArea === 'All'
    ? stagePhotos
    : stagePhotos.filter((photo) => photo.area === activeArea)
  const displayedPhotos = filteredPhotos.slice(0, visibleCount)

  const changeStage = (stage) => {
    setActiveStage(stage)
    setActiveArea('All')
    setSelectedIndex(0)
    setVisibleCount(12)
    setIsOpen(false)
  }

  const changeArea = (area) => {
    setActiveArea(area)
    setSelectedIndex(0)
    setVisibleCount(12)
    setIsOpen(false)
  }

  const handleStageKeyDown = (event, stage) => {
    const stages = ['before', 'progress', 'after']
    const currentIndex = stages.indexOf(stage)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % stages.length
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + stages.length) % stages.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = stages.length - 1
    else return

    event.preventDefault()
    const nextStage = stages[nextIndex]
    changeStage(nextStage)
    window.setTimeout(() => document.getElementById(`${tabPrefix}-${nextStage}-tab`)?.focus(), 0)
  }

  const openLightbox = (index) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      {showStageTabs ? (
        <div
          role="tablist"
          aria-label={`${projectName} project stages`}
          className="mb-8 grid grid-cols-3 gap-1 rounded-full border p-1"
          style={{ borderColor: 'var(--color-line-strong)', background: 'var(--color-panel)' }}
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
              tabIndex={activeStage === id ? 0 : -1}
              onClick={() => changeStage(id)}
              onKeyDown={(event) => handleStageKeyDown(event, id)}
              className="flex items-center justify-center gap-2 rounded-full px-2 py-3.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors sm:gap-3 sm:px-5 sm:text-[10px] sm:tracking-[0.22em] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              style={{
                color: activeStage === id ? 'var(--color-on-accent)' : 'var(--color-muted)',
                background: activeStage === id ? 'var(--color-accent)' : 'transparent',
              }}
            >
              {label}
              <span className="text-[9px] opacity-70">{count}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div
        role={showStageTabs ? 'tabpanel' : undefined}
        id={showStageTabs ? `${tabPrefix}-${activeStage}-panel` : undefined}
        aria-labelledby={showStageTabs ? `${tabPrefix}-${activeStage}-tab` : undefined}
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
                    className="flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
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

        {filteredPhotos.length ? (
          <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
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
                  className="object-cover"
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-[var(--color-ink)]/0 transition duration-300 group-hover:bg-[var(--color-ink)]/24" />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-[var(--color-ink)]/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  View
                  <Icon name="arrow-right" size={12} />
                </div>
                {index === 0 && showStageTabs ? (
                  <div className="absolute left-4 top-4 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--color-ink)', background: 'rgba(255,255,255,0.92)', borderColor: 'rgba(255,255,255,0.5)' }}>
                    {activeStage}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
          {displayedPhotos.length < filteredPhotos.length ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 12)}
                className="amk-button amk-button-light rounded-full"
              >
                Show More
                <span className="text-xs text-[var(--color-muted)]">
                  {Math.min(12, filteredPhotos.length - displayedPhotos.length)} more
                </span>
              </button>
            </div>
          ) : null}
          </>
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
        images={filteredPhotos}
        isOpen={isOpen}
        initialIndex={selectedIndex}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
