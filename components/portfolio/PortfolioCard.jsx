import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export default function PortfolioCard({ project, featured = false, compact = false, className = '' }) {
  const image = project.cover || project.img

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group block min-w-0 focus-visible:ring-4 focus-visible:ring-black/30 ${className}`}
      aria-label={`View ${project.name} project gallery`}
    >
      <span
        className="relative block overflow-hidden border-2 border-black bg-[var(--color-panel)]"
        style={{ aspectRatio: compact ? '4 / 3' : featured ? '4 / 5' : '5 / 6' }}
      >
        {image ? (
          <Image
            src={image}
            alt={project.alt}
            fill
            sizes={featured ? '(max-width: 1023px) 100vw, 58vw' : '(max-width: 1023px) 100vw, 42vw'}
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-semibold text-[var(--color-muted)]">
            {project.name}
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-5 p-5 text-white sm:p-7">
          <span className="font-display text-[clamp(36px,4vw,58px)] font-semibold leading-none tracking-[-0.03em]">
            {project.name}
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/55 bg-black/25 transition-[background-color,color] duration-150 group-hover:bg-white group-hover:text-black" aria-hidden="true">
            <Icon name="arrow-right" size={18} />
          </span>
        </span>
      </span>
      <span className="mt-4 flex items-center justify-between gap-4 border-b border-black/20 pb-4 text-sm font-bold text-[var(--color-ink)]">
        {project.showStageTabs === false ? 'Completed renovation details' : 'Before, in progress and after'}
        <span className="whitespace-nowrap text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">View project</span>
      </span>
    </Link>
  )
}
