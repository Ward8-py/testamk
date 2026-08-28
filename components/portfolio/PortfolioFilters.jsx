'use client'

export default function PortfolioFilters({ filters, activeFilter, onChange, counts = {} }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" aria-label="Filter portfolio projects">
      {filters.map((filter) => {
        const isActive = activeFilter === filter

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className="border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            style={{
              color: isActive ? 'var(--color-on-accent)' : 'var(--color-muted)',
              background: isActive ? 'var(--color-accent)' : 'transparent',
              borderColor: isActive ? 'var(--color-accent)' : 'var(--color-line-strong)',
            }}
            aria-pressed={isActive}
          >
            {filter}
            {counts[filter] ? <span className="ml-2 opacity-70">{counts[filter]}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
