import { notFound } from 'next/navigation'
import { SERVICE_DETAIL_PAGES_ENABLED } from '@/lib/site-flags'

export default function ServicesLayout({ children }) {
  if (!SERVICE_DETAIL_PAGES_ENABLED) {
    notFound()
  }

  return children
}
