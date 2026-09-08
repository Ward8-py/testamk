import { PROJECT_X_PHOTOS } from './project-x-photos'
import { PROJECT_Y_PHOTOS } from './project-y-photos'
import { PROJECT_Z_PHOTOS } from './project-z-photos'
import { PROJECT_W_PHOTOS } from './project-w-photos'

export const PROJECT_AREAS = ['Kitchen', 'Bathroom', 'Rooms', 'Porch', 'Roof', 'Exterior', 'Structural & Groundworks']

export const PROJECTS = [
  {
    slug: 'project-x',
    cover: '/gallery/project-x/after/exterior/after-exterior-rear-extension-02.jpg',
    img: '/gallery/project-x/after/exterior/after-exterior-rear-extension-02.jpg',
    cardCover: '/gallery/project-covers/project-x-cover.webp',
    cardAlt: 'Completed two-storey rear extension at sunset with wide glazing and a dark side wing',
    alt: 'Completed rear extension with wide sliding doors and dark cladding',
    name: 'Hollyden, Broomfield Park, Sunningdale, SL5',
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
    cardCover: '/gallery/project-covers/project-y-cover.webp',
    cardAlt: 'Completed open-plan kitchen with a large island, bar seating, and pendant lights',
    alt: 'Completed open-plan kitchen with large island and pendant lighting',
    name: '20 Chasewood Park, Harrow, HA1',
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
    cardCover: '/gallery/project-covers/project-z-cover.webp',
    cardAlt: 'Completed dark kitchen with a marble-effect island and brass pendant lights',
    alt: 'Completed brick rear extension with steel-framed doors and a stepped garden patio',
    name: '34 Boileau Road, W5',
    category: 'Renovation',
    featured: true,
    description: 'A completed London home renovation spanning a rear extension, open-plan kitchen, restored rooms, loft spaces, bathrooms, roof work, and entrance details.',
    areaCategories: PROJECT_AREAS,
    photos: PROJECT_Z_PHOTOS,
    beforeImages: [],
    progressImages: [],
    afterImages: []
  },
  {
    slug: 'project-w',
    cover: '/gallery/project-w/after/kitchen/after-kitchen-vaulted-open-plan-01.jpg',
    img: '/gallery/project-w/after/kitchen/after-kitchen-vaulted-open-plan-01.jpg',
    cardCover: '/gallery/project-covers/project-w-cover.webp',
    cardAlt: 'Completed vaulted open-plan kitchen, dining, and living space facing the garden',
    alt: 'Completed vaulted open-plan kitchen, dining, and living space facing the garden',
    name: '290 Windmill Road, W5 4DL',
    category: 'Renovation',
    featured: true,
    description: 'A rear extension and interior renovation with a vaulted open-plan kitchen, utility space, refreshed living rooms, hallway, and staircase.',
    areaCategories: PROJECT_AREAS,
    photos: PROJECT_W_PHOTOS,
    beforeImages: [],
    progressImages: [],
    afterImages: []
  }
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}
