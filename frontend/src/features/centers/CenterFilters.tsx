import { useTranslation } from 'react-i18next'
import type { FilterKey } from '@/types/center'

const FILTERS: FilterKey[] = ['all', 'urgent', 'certified', 'verified']

interface CenterFiltersProps {
  active: FilterKey
  onChange: (f: FilterKey) => void
}

export function CenterFilters({ active, onChange }: CenterFiltersProps) {
  const { t } = useTranslation()
  return (
    <div className="chips" role="group" aria-label="Filtres">
      {FILTERS.map((f) => (
        <button
          key={f}
          className="chip"
          aria-pressed={active === f}
          onClick={() => onChange(f)}
        >
          {t(`chip.${f}`)}
        </button>
      ))}
    </div>
  )
}
