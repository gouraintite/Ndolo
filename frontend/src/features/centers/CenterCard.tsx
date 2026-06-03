import { useTranslation } from 'react-i18next'
import type { Center } from '@/types/center'
import { TrustBadge, UrgentBadge } from '@/components/ui/Badge'
import { Cagnotte } from '@/components/ui/Cagnotte'
import { ImageSlot } from '@/components/ui/ImageSlot'

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function CenterCard({ center, src }: { center: Center; src?: string }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr'

  return (
    <article className="card reveal">
      <div className="card__media">
        <ImageSlot
          placeholder={lang === 'en' ? 'Drop a photo' : 'Déposez une photo'}
          className="card__image_in"
          src={src}
        />
        <div className="card__tags">
          <TrustBadge level={center.trust} />
          {center.urgent ? <UrgentBadge /> : <span />}
        </div>
      </div>
      <div className="card__body">
        <span className="card__region">
          <PinIcon />
          {center.region[lang]}
        </span>
        <h3 className="h-card">{center.name[lang]}</h3>
        <Cagnotte raised={center.raised} goal={center.goal} />
        <a
          className="btn btn--ghosted btn--sm card__cta border-amber-50"
          href={`/centres/${center.id}`}
        >
          {t('card.cta')} <ArrowIcon />
        </a>
      </div>
    </article>
  )
}
