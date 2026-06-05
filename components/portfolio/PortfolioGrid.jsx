'use client'

import { useMemo, useState } from 'react'
import { PROJECT_FILTERS } from '@/lib/projects'
import PortfolioCard from './PortfolioCard'
import PortfolioFilters from './PortfolioFilters'

export default function PortfolioGrid({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const counts = useMemo(() => {
    return projects.reduce(
      (acc, project) => {
        acc.All += 1
        acc[project.category] = (acc[project.category] || 0) + 1
        return acc
      },
      { All: 0 }
    )
  }, [projects])

  const visibleProjects = projects.filter(
    (project) => activeFilter === 'All' || project.category === activeFilter
  )

  return (
    <div>
      <PortfolioFilters
        filters={PROJECT_FILTERS}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
        counts={counts}
      />

      {visibleProjects.length === 0 ? (
        <div className="mx-auto mt-14 max-w-md border px-8 py-12 text-center" style={{ background: 'var(--color-panel)', borderColor: 'var(--color-line)' }}>
          <h2 className="font-display text-[30px] font-light" style={{ color: 'var(--color-ink)' }}>
            No projects found
          </h2>
          <p className="mt-3 text-sm leading-[1.8]" style={{ color: 'var(--color-muted)' }}>
            Try a different category to browse more AMK project galleries.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              featured={project.featured && activeFilter === 'All'}
              delay={`${(index % 3) * 70}ms`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
