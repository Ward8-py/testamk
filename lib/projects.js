import { PROJECT_X_PHOTOS } from './project-x-photos'
import { PROJECT_Y_PHOTOS } from './project-y-photos'

export const PROJECT_AREAS = ['Kitchen', 'Bathroom', 'Rooms', 'Porch', 'Roof', 'Exterior', 'Structural & Groundworks']

export const PROJECTS = [
  {
    slug: 'project-1',
    cover: '/gallery/dr1.jpeg',
    img: '/gallery/dr1.jpeg',
    alt: 'Project 1',
    name: 'Project 1',
    category: 'New Build',
    featured: true,
    description: 'A complete new build project shaped around refined finishes, practical family living, and a calm architectural feel.',
    beforeImages: [],
    progressImages: [],
    afterImages: [
      '/gallery/dr1.jpeg',
      '/gallery/dr2.jpeg',
      '/gallery/dr3.jpeg',
      '/gallery/dr4.jpeg',
      '/gallery/dr5.jpeg',
      '/gallery/dr6.jpeg',
      '/gallery/dr7.jpeg'
    ]
  },
  {
    slug: 'project-2',
    cover: '/gallery/kitchen1.jpg',
    img: '/gallery/kitchen1.jpg',
    alt: 'Project 2',
    name: 'Project 2',
    category: 'Renovation',
    featured: true,
    description: 'A bespoke kitchen renovation with carefully planned storage, premium materials, and a crisp installation finish.',
    beforeImages: [],
    progressImages: [],
    afterImages: [
      '/gallery/kitchen1.jpg',
      '/gallery/kitchen2.jpg',
      '/gallery/kitchen3.jpg',
      '/gallery/kitchen4.jpg',
      '/gallery/kitchen5.jpeg',
      '/gallery/kitchen6.jpeg',
      '/gallery/kitchen7.jpeg'
    ]
  },
  {
    slug: 'project-3',
    cover: '/gallery/m8.jpg',
    img: '/gallery/m8.jpg',
    alt: 'Project 3',
    name: 'Project 3',
    category: 'Extension',
    featured: true,
    description: 'A rear extension designed to create a brighter, more generous living and dining space for everyday use.',
    beforeImages: [],
    progressImages: [],
    afterImages: [
      '/gallery/m1.jpg',
      '/gallery/m2.jpg',
      '/gallery/m3.jpg',
      '/gallery/m4.jpg',
      '/gallery/m5.jpg',
      '/gallery/m6.jpg',
      '/gallery/m7.jpg'
    ]
  },
  {
    slug: 'project-4',
    cover: '/gallery/bathroom1.jpg',
    img: '/gallery/bathroom1.jpg',
    alt: 'Project 4',
    name: 'Project 4',
    category: 'Renovation',
    featured: true,
    description: 'A refined bathroom renovation balancing elegant tiling, clean detailing, and a durable day-to-day finish.',
    beforeImages: [],
    progressImages: [],
    afterImages: [
      '/gallery/bathroom1.jpg',
      '/gallery/bathroom2.jpg',
      '/gallery/bathroom3.jpg',
      '/gallery/bathroom4.jpg',
      '/gallery/bathroom5.jpg',
      '/gallery/bathroom6.jpeg',
      '/gallery/bathroom7.jpeg'
    ]
  },
  {
    slug: 'project-x',
    cover: '/gallery/project-x/after/exterior/after-exterior-rear-extension-02.jpg',
    img: '/gallery/project-x/after/exterior/after-exterior-rear-extension-02.jpg',
    alt: 'Completed rear extension with wide sliding doors and dark cladding',
    name: 'Project X',
    category: 'Renovation',
    featured: true,
    description: 'A renovation project documenting the space before work and the completed result.',
    areaCategories: PROJECT_AREAS,
    photos: PROJECT_X_PHOTOS,
    beforeImages: [],
    progressImages: [],
    afterImages: []
  },
  {
    slug: 'project-y',
    cover: '/gallery/project-y/after/kitchen/after-kitchen-island-overview-01.jpg',
    img: '/gallery/project-y/after/kitchen/after-kitchen-island-overview-01.jpg',
    alt: 'Completed open-plan kitchen with large island and pendant lighting',
    name: 'Project Y',
    category: 'Renovation',
    featured: true,
    description: 'A complete apartment renovation with bespoke living spaces, fitted bedrooms, a new kitchen, and refined bathrooms.',
    areaCategories: PROJECT_AREAS,
    photos: PROJECT_Y_PHOTOS,
    beforeImages: [],
    progressImages: [],
    afterImages: []
  }
]

export const PROJECT_FILTERS = ['All', 'Renovation', 'Extension', 'New Build']

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}
