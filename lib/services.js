export const SERVICES = [
  {
    id: 'development-renovation',
    href: '/services/development-renovation',
    label: 'Development & Renovation',
    image: '/gallery/service-cards/development-renovation.png',
  },
  {
    id: 'kitchens',
    href: '/services/kitchens-bathrooms',
    label: 'Kitchens',
    image: '/gallery/service-cards/kitchen.png',
  },
  {
    id: 'bathrooms',
    href: '/services/kitchens-bathrooms',
    label: 'Bathrooms',
    image: '/gallery/service-cards/bathroom.png',
  },
  {
    id: 'bedrooms',
    href: '/services/bedrooms',
    label: 'Bedrooms',
    image: '/gallery/service-cards/bedroom.png',
  },
  {
    id: 'marble-granite',
    href: '/services/marble-granite',
    label: 'Marble & Granite',
    image: '/gallery/dr17.jpeg',
  },
  {
    id: 'flooring',
    href: '/services/flooring',
    label: 'Flooring',
    image: '/gallery/service-cards/flooring.png',
  },
  {
    id: 'furnishing',
    href: '/services/furnishing',
    label: 'Furnishing',
    image: '/gallery/service-cards/furnishing.png',
  },
]

export const QUOTE_SERVICES = [...SERVICES.map(({ label }) => label), 'Other']

