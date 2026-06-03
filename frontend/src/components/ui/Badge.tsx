import type { TrustLevel } from '@/types/center'
import { labelFor } from '@/utils/trustLevel'

const levelClasses: Record<TrustLevel, string> = {
  L0: 'bg-gray-100 text-gray-600',
  L1: 'bg-blue-100 text-blue-700',
  L2: 'bg-green-100 text-green-700',
  L3: 'bg-yellow-100 text-yellow-700',
}

export function TrustBadge({ level }: { level: TrustLevel }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${levelClasses[level]}`}>
      {labelFor(level)}
    </span>
  )
}
