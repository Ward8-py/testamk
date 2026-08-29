import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export default function PortfolioCard({ project, featured = false, compact = false, delay = '0ms' }) {
  const image = project.cover || project.img

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`pf-card group relative block overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${
        featured ? 'lg:col-span-2' : ''
      }`}
      style={{
        background: 'var(--color-panel-strong)',
        borderColor: 'var(--color-line)',
        transitionDelay: delay,
      }}
      aria-label={`View ${project.name} project gallery`}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: featured ? '16 / 10' : '4 / 3' }}
      >
        {image ? (
          <Image
            src={image}
            alt={project.alt}
            fill
            sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className="object-cover transition duration-700 ease-smooth group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-panel)] px-8 text-center">
            <div>
              <div className="font-display text-[clamp(42px,6vw,76px)] font-light text-[var(--color-subtle)]">
                {project.name}
              </div>
              <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Project photos coming soon
              </div>
            </div>
          </div>
        )}
        <div
          className="absolute inset-0 transition duration-500 group-hover:opacity-90"
          style={{ background: 'linear-gradient(to top, rgba(20,19,17,0.72), var(--color-line-strong) 58%, transparent)' }}
        />
        <span
          className="absolute left-4 top-4 border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: 'var(--color-ink)', background: 'rgba(253, 250, 244, 0.9)', borderColor: 'rgba(255,252,245,0.5)' }}
        >
          {project.category}
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3
              className="font-display font-light leading-tight transition-colors group-hover:text-gold"
              style={{ color: 'var(--color-ink)', fontSize: compact ? 'clamp(24px,2.5vw,34px)' : 'clamp(25px,2.8vw,38px)' }}
            >
              {project.name}
            </h3>
            <p
              className="mt-3 max-w-xl leading-[1.75]"
              style={{ color: 'var(--color-muted)', fontSize: compact ? '13px' : '14px' }}
            >
              {project.description}
            </p>
          </div>
          <span
            className="mt-1 hidden h-10 w-10 flex-shrink-0 items-center justify-center border text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:border-gold/40 sm:flex"
            style={{ borderColor: 'var(--color-line-strong)' }}
            aria-hidden="true"
          >
            <Icon name="arrow-right" size={16} />
          </span>
        </div>
        <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          View Project
          <Icon name="arrow-right" size={12} />
        </div>
      </div>
    </Link>
  )
}
