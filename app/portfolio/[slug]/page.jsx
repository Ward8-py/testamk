import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'
import ProjectGallery from '@/components/portfolio/ProjectGallery'
import PortfolioCard from '@/components/portfolio/PortfolioCard'
import { Container, Divider, GoldTag, BtnGold } from '@/components/ui'
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
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
                {project.name}
              </span>
            </nav>

            <GoldTag className="mb-5">{project.category}</GoldTag>
            <h1
              className="mt-5 font-display font-light leading-[0.98]"
              style={{ color: '#fff', fontSize: 'clamp(44px,7vw,96px)' }}
            >
              {project.name}
            </h1>
            <Divider className="my-7" />
            <p className="max-w-2xl leading-[1.85]" style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(14px,1.15vw,17px)' }}>
              {project.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <BtnGold href="/#contact">
                Discuss a Similar Project
                <Icon name="arrow-right" size={13} />
              </BtnGold>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2.5 border px-8 py-[17px] text-[10.5px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}
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
                <h2 className="font-display font-light leading-[1.08]" style={{ color: 'var(--color-ink)', fontSize: 'clamp(30px,4vw,56px)' }}>
                  Browse the Details
                </h2>
              </div>
              <p className="max-w-md leading-[1.75]" style={{ color: 'var(--color-muted)', fontSize: '14px' }}>
                {beforeCount} before, {progressCount} in progress, and {afterCount} after images. Select a stage, then choose any image to view it full screen.
              </p>
            </div>
            <ProjectGallery
              beforeImages={beforeImages}
              progressImages={progressImages}
              afterImages={afterImages}
              photos={photos}
              areaCategories={project.areaCategories}
              projectName={project.name}
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
