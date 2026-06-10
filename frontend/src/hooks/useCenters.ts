import { useQuery } from '@tanstack/react-query'
import { centersApi, apiResponseToCenter, MOCK_CENTRES } from '@/api/centers'
import type { Center } from '@/types/center'
import type { FilterKey } from '@/types/center'

const FILTER_MAP: Record<FilterKey, string | undefined> = {
  all: undefined,
  urgent: 'urgent',
  certified: 'certified',
  verified: 'verified',
}

export function useCenters(filter: FilterKey) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['centers', filter],
    queryFn: () => centersApi.list({ filter: FILTER_MAP[filter], pageSize: 12 }),
    // Fall back gracefully to mock data if API is unreachable
    retry: 1,
    staleTime: 60_000,
  })

  const centers: Center[] = isError || !data
    ? filterMock(filter)
    : data.items.map(apiResponseToCenter)

  return { centers, isLoading: isLoading && !isError }
}

function filterMock(filter: FilterKey): Center[] {
  return MOCK_CENTRES.filter((c) => {
    if (filter === 'all') return true
    if (filter === 'urgent') return !!c.urgent
    if (filter === 'certified') return c.trust === 'certified'
    if (filter === 'verified') return c.trust === 'verified' || c.trust === 'certified'
    return true
  })
}
