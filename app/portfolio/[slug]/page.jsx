import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'
import ProjectGallery from '@/components/portfolio/ProjectGallery'
import PortfolioCard from '@/components/portfolio/PortfolioCard'
import QuoteTrigger from '@/components/QuoteTrigger'
import { Container } from '@/components/ui'
import { Icon } from '@/components/icons'
import { PROJECTS, getProjectBySlug } from '@/lib/projects'

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.name} Portfolio`,
    description: project.description,
  }
}

export default function PortfolioProjectPage({ params }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = PROJECTS.filter(
    (item) => item.slug !== project.slug && item.category === project.category
  ).slice(0, 2)
  const heroImage = project.cover || project.img
  const beforeImages = project.beforeImages || []
  const progressImages = project.progressImages || []
  const afterImages = project.afterImages || project.images || []
  const photos = project.photos || []
  const beforeCount = beforeImages.length + photos.filter((photo) => photo.stage === 'before').length
  const progressCount = progressImages.length + photos.filter((photo) => photo.stage === 'progress').length
  const afterCount = afterImages.length + photos.filter((photo) => photo.stage === 'after').length

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[58vh] items-end overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: heroImage ? `url('${heroImage}')` : undefined,
              backgroundColor: heroImage ? undefined : 'var(--color-panel-strong)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,9,0.86) 0%, rgba(8,8,9,0.48) 60%, rgba(8,8,9,0.20) 100%)' }} />

          <Container className="relative z-10 pb-12 pt-28 sm:pb-14 sm:pt-36">
            <nav className="mb-8 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
              <Link href="/" className="text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white">
                Home
              </Link>
              <span className="text-white/35">/</span>
              <Link href="/portfolio" className="text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white">
                Portfolio
              </Link>
              <span className="text-white/35">/</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white">
                {project.name}
              </span>
            </nav>

            <h1
              className="font-display font-semibold leading-[0.95] tracking-[-0.035em]"
              style={{ color: '#fff', fontSize: 'clamp(44px,7vw,96px)' }}
            >
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              {project.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <QuoteTrigger source={`portfolio-${project.slug}`} className="amk-button rounded-full bg-white text-black hover:bg-white/90">
                Discuss a Similar Project
                <Icon name="arrow-right" size={13} />
              </QuoteTrigger>
              <Link
                href="/portfolio"
                className="amk-button rounded-full border border-white/45 bg-transparent text-white hover:bg-white hover:text-black"
              >
                <Icon name="arrow-left" size={13} />
                Back to Portfolio
              </Link>
            </div>
          </Container>
        </section>

        <section className="py-[clamp(70px,9vw,120px)]" style={{ background: 'var(--color-page)' }}>
          <Container>
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display font-semibold leading-[1.02] tracking-[-0.025em]" style={{ color: 'var(--color-ink)', fontSize: 'clamp(36px,4vw,56px)' }}>
                  Browse the Details
                </h2>
              </div>
              <p className="max-w-md leading-[1.75]" style={{ color: 'var(--color-muted)', fontSize: '14px' }}>
                {project.showStageTabs === false
                  ? `${afterCount} completed project images. Choose a work area, then select any image to view it full screen.`
                  : `${beforeCount} before, ${progressCount} in progress, and ${afterCount} after images. Select a stage, then choose any image to view it full screen.`}
              </p>
            </div>
            <ProjectGallery
              beforeImages={beforeImages}
              progressImages={progressImages}
              afterImages={afterImages}
              photos={photos}
              areaCategories={project.areaCategories}
              projectName={project.name}
              showStageTabs={project.showStageTabs !== false}
            />
          </Container>
        </section>

        {relatedProjects.length ? (
          <section className="py-[clamp(70px,8vw,110px)]" style={{ background: 'var(--color-panel)' }}>
            <Container>
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display font-light leading-[1.08]" style={{ color: 'var(--color-ink)', fontSize: 'clamp(30px,4vw,52px)' }}>
                    Related Projects
                  </h2>
                </div>
                <Link href="/portfolio" className="inline-flex w-fit items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                  View All Work
                  <Icon name="arrow-right" size={13} />
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {relatedProjects.map((item) => (
                  <PortfolioCard key={item.slug} project={item} compact />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
      <FloatButtons />
    </>
  )
}
