import { useTranslation } from 'react-i18next'

function fcfa(n: number) {
  return n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' FCFA'
}

interface CagnotteProps {
  raised: number
  goal: number
  onDark?: boolean
}

export function Cagnotte({ raised, goal, onDark }: CagnotteProps) {
  const { t } = useTranslation()
  const pct = Math.min(100, Math.round((raised / goal) * 100))

  return (
    <div className={`cagnotte${onDark ? ' cagnotte--ondark' : ''}`}>
      <div className="cagnotte__row">
        <span className="cagnotte__raised">
          <span>{fcfa(raised)}</span> {t('cag.raised')}
        </span>
        <span className="cagnotte__pct">{pct}%</span>
      </div>
      <div className="cagnotte__track">
        <div className="cagnotte__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="cagnotte__goal">{t('cag.goal')} · {fcfa(goal)}</div>
    </div>
  )
}
