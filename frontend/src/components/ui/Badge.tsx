import { useTranslation } from 'react-i18next'
import type { TrustLevel } from '@/types/center'

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const DotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
  </svg>
)

interface TrustBadgeProps {
  level: TrustLevel
  onDark?: boolean
}

export function TrustBadge({ level, onDark }: TrustBadgeProps) {
  const { t } = useTranslation()
  const map: Record<TrustLevel, { cls: string; icon: React.ReactNode }> = {
    certified:  { cls: `badge badge--certified${onDark ? ' badge--ondark' : ''}`, icon: <ShieldIcon /> },
    verified:   { cls: 'badge badge--verified',   icon: <CheckIcon /> },
    unverified: { cls: 'badge badge--unverified', icon: <DotIcon /> },
  }
  const { cls, icon } = map[level]
  return <span className={cls}>{icon}{t(`trust.${level}`)}</span>
}

export function UrgentBadge() {
  const { t } = useTranslation()
  return (
    <span className="badge badge--urgent">
      <span className="dot" />
      {t('trust.urgent')}
    </span>
  )
}
