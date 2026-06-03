import { PublicLayout } from '@/components/layout/PublicLayout'
import { FeaturedCenter } from '@/features/centers/FeaturedCenter'
import { CenterFilters } from '@/features/centers/CenterFilters'

export function HomePage() {
  return (
    <PublicLayout>
      <FeaturedCenter />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <CenterFilters />
        <div>{/* TODO: map MOCK_CENTERS to CenterCard */}</div>
      </div>
    </PublicLayout>
  )
}
