import { PROJECT_X_PHOTOS } from './project-x-photos'
import { PROJECT_Y_PHOTOS } from './project-y-photos'
import { PROJECT_Z_PHOTOS } from './project-z-photos'

export const PROJECT_AREAS = ['Kitchen', 'Bathroom', 'Rooms', 'Porch', 'Roof', 'Exterior', 'Structural & Groundworks']

export const PROJECTS = [
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
  },
  {
    slug: 'project-z',
    cover: '/gallery/project-z/after/exterior/after-exterior-rear-extension-patio-01.jpg',
    img: '/gallery/project-z/after/exterior/after-exterior-rear-extension-patio-01.jpg',
    alt: 'Completed brick rear extension with steel-framed doors and a stepped garden patio',
    name: 'Project Z',
    category: 'Renovation',
    featured: true,
    description: 'A completed London home renovation spanning a rear extension, open-plan kitchen, restored rooms, loft spaces, bathrooms, roof work, and entrance details.',
    areaCategories: PROJECT_AREAS,
    photos: PROJECT_Z_PHOTOS,
    showStageTabs: false,
    beforeImages: [],
    progressImages: [],
    afterImages: []
  }
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}
