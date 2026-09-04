import PortfolioCard from './PortfolioCard'

export default function PortfolioGrid({ projects }) {
  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] lg:items-start lg:gap-10">
      {projects.map((project, index) => (
        <PortfolioCard
          key={project.slug}
          project={project}
          featured={index === 0}
          className={index === 1 ? 'lg:mt-24' : ''}
        />
      ))}
    </div>
  )
}
