import { PROJECT_X_PHOTOS } from './project-x-photos'
import { PROJECT_Y_PHOTOS } from './project-y-photos'
import { PROJECT_Z_PHOTOS } from './project-z-photos'
import { PROJECT_W_PHOTOS } from './project-w-photos'

export const PROJECT_AREAS = ['Kitchen', 'Bathroom', 'Rooms', 'Porch', 'Roof', 'Exterior', 'Structural & Groundworks']

// Explicit editorial selections, resolved against the existing gallery metadata.
function comparisonPhoto(photos, filename, caption, objectPosition = '50% 50%') {
  const photo = photos.find((item) => item.src.endsWith(`/${filename}`))
  if (!photo) throw new Error(`Missing comparison photo: ${filename}`)
  return { ...photo, caption, objectPosition }
}

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
    comparisonPairs: [
      {
        id: 'rear-elevation',
        before: comparisonPhoto(PROJECT_X_PHOTOS, 'before-exterior-rear-elevation-01.jpg', 'The original rear elevation'),
        after: comparisonPhoto(PROJECT_X_PHOTOS, 'after-exterior-rear-elevation-01.jpg', 'New glazing and a renewed rear elevation', '50% 53%'),
      },
      {
        id: 'rear-extension',
        before: comparisonPhoto(PROJECT_X_PHOTOS, 'before-exterior-rear-elevation-angled-02.jpg', 'The house and patio before renovation'),
        after: comparisonPhoto(PROJECT_X_PHOTOS, 'after-exterior-rear-extension-02.jpg', 'The completed extension and terrace'),
      },
      {
        id: 'side-elevation',
        before: comparisonPhoto(PROJECT_X_PHOTOS, 'before-exterior-rear-outbuilding-04.jpg', 'The original rear outbuilding'),
        after: comparisonPhoto(PROJECT_X_PHOTOS, 'after-exterior-side-extension-03.jpg', 'The finished side elevation and porcelain terrace'),
      },
      {
        id: 'garden-terrace',
        before: comparisonPhoto(PROJECT_X_PHOTOS, 'before-exterior-rear-elevation-garden-05.jpg', 'The original patio, viewed from the garden', '50% 58%'),
        after: comparisonPhoto(PROJECT_X_PHOTOS, 'after-exterior-porcelain-patio-04.jpg', 'The new porcelain terrace along the house', '50% 62%'),
      },
    ],
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
    comparisonPairs: [
      {
        id: 'kitchen',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-kitchen-timber-cabinetry-01.jpg', 'The original timber kitchen', '50% 42%'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-kitchen-island-overview-01.jpg', 'A new open-plan kitchen and island'),
      },
      {
        id: 'hallway',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-rooms-hallway-01.jpg', 'The original carpeted hallway'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-rooms-finished-hallway-02.jpg', 'Herringbone flooring and recessed lighting'),
      },
      {
        id: 'bedroom',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-rooms-bedroom-02.jpg', 'The bedroom before refurbishment', '50% 42%'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-rooms-feature-bedroom-angle-08.jpg', 'The furnished bedroom with a feature wall'),
      },
      {
        id: 'living-room',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-rooms-living-area-04.jpg', 'The original carpeted living area', '50% 45%'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-rooms-lounge-billiards-06.jpg', 'The finished lounge and billiards area', '50% 42%'),
      },
      {
        id: 'second-bedroom',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-rooms-small-bedroom-03.jpg', 'The second bedroom before refurbishment', '50% 42%'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-rooms-second-bedroom-window-13.jpg', 'The furnished second bedroom', '50% 42%'),
      },
      {
        id: 'bathroom',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-bathroom-white-suite-01.jpg', 'The original bathroom and white suite', '50% 48%'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-bathroom-stone-suite-02.jpg', 'Stone finishes and fitted vanity storage', '50% 52%'),
      },
      {
        id: 'kitchen-breakfast-bar',
        before: comparisonPhoto(PROJECT_Y_PHOTOS, 'before-kitchen-breakfast-bar-02.jpg', 'The original breakfast bar and cabinetry', '50% 48%'),
        after: comparisonPhoto(PROJECT_Y_PHOTOS, 'after-kitchen-open-plan-island-02.jpg', 'Island seating in the new open-plan kitchen', '50% 45%'),
      },
    ],
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
    comparisonPairs: [
      {
        id: 'rooflight',
        before: comparisonPhoto(PROJECT_Z_PHOTOS, 'before-roof-flat-rooflight-01.jpg', 'The original flat roof and rooflight', '50% 55%'),
        after: comparisonPhoto(PROJECT_Z_PHOTOS, 'after-roof-slate-extension-rooflight-01.jpg', 'The completed slate extension roof', '50% 70%'),
      },
      {
        id: 'roof-views',
        before: comparisonPhoto(PROJECT_Z_PHOTOS, 'before-roof-weathered-slate-slope-02.jpg', 'Weathered roof slates before renovation', '50% 60%'),
        after: comparisonPhoto(PROJECT_Z_PHOTOS, 'after-roof-slate-extension-garden-02.jpg', 'A wider view of the new roof and garden', '50% 60%'),
      },
      {
        id: 'roof-to-extension',
        before: comparisonPhoto(PROJECT_Z_PHOTOS, 'before-roof-weathered-valley-05.jpg', 'Roof valley detail before the work'),
        after: comparisonPhoto(PROJECT_Z_PHOTOS, 'after-exterior-rear-extension-patio-01.jpg', 'The completed rear extension, viewed from the garden', '50% 40%'),
      },
    ],
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
    name: '290 Windmill Road, W5',
    category: 'Renovation',
    featured: true,
    description: 'A rear extension and interior renovation with a vaulted open-plan kitchen, utility space, refreshed living rooms, hallway, and staircase.',
    areaCategories: PROJECT_AREAS,
    photos: PROJECT_W_PHOTOS,
    comparisonPairs: [
      {
        id: 'vaulted-extension',
        before: comparisonPhoto(PROJECT_W_PHOTOS, 'before-structural-insulated-extension-shell-01.jpg', 'The vaulted extension during construction'),
        after: comparisonPhoto(PROJECT_W_PHOTOS, 'after-kitchen-vaulted-open-plan-01.jpg', 'The finished kitchen, dining and living space', '50% 42%'),
      },
      {
        id: 'entrance-hall',
        before: comparisonPhoto(PROJECT_W_PHOTOS, 'before-rooms-insulated-hall-floor-01.jpg', 'The entrance hall during refurbishment'),
        after: comparisonPhoto(PROJECT_W_PHOTOS, 'after-rooms-fitted-hallway-storage-01.jpg', 'The finished hallway with fitted storage'),
      },
      {
        id: 'staircase',
        before: comparisonPhoto(PROJECT_W_PHOTOS, 'before-rooms-exposed-brick-stairwell-01.jpg', 'Exposed brickwork during the staircase renovation'),
        after: comparisonPhoto(PROJECT_W_PHOTOS, 'after-rooms-striped-runner-staircase-01.jpg', 'The completed staircase and striped runner'),
      },
      {
        id: 'kitchen-structure',
        before: comparisonPhoto(PROJECT_W_PHOTOS, 'before-structural-steel-supports-interior-01.jpg', 'Steel supports inside the extension during construction', '50% 48%'),
        after: comparisonPhoto(PROJECT_W_PHOTOS, 'after-kitchen-island-vaulted-ceiling-01.jpg', 'The completed island beneath the vaulted ceiling', '50% 44%'),
      },
    ],
    beforeImages: [],
    progressImages: [],
    afterImages: []
  }
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug)
}
