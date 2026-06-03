import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MOCK_FEATURED, ROTATION_INTERVAL_MS } from '@/api/centers'
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
function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function FeaturedCenter() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr'
  const [idx, setIdx] = useState(0)
  // scrimRef: @property transition runs on this element (inherits: false requires direct property)
  const scrimRef = useRef<HTMLDivElement>(null)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const center = MOCK_FEATURED[idx]

  // Animate gradient glow focal point on the scrim element
  useEffect(() => {
    const el = scrimRef.current
    if (!el) return
    el.style.setProperty('--gx', center.glowX)
    el.style.setProperty('--gy', center.glowY)
    el.style.setProperty('--gi', String(center.glowI))
  }, [center])

  // Auto-rotate
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(
      () => setIdx((i) => (i + 1) % MOCK_FEATURED.length),
      ROTATION_INTERVAL_MS
    )
    return () => clearInterval(id)
  }, [reduceMotion])

  function go(i: number) {
    setIdx(((i % MOCK_FEATURED.length) + MOCK_FEATURED.length) % MOCK_FEATURED.length)
  }

  const pct = Math.round((center.raised / center.goal) * 100)

  return (
    <section className="hero">
      {/* ── Full-bleed image background ── */}
      <div className="hero__stage">
        {MOCK_FEATURED.map((c, i) => (
          <div key={c.id} className={`hero__slide${i === idx ? ' active' : ''}`}>
            <ImageSlot
              src={c.src}
              dark
              placeholder={
                lang === 'en'
                  ? 'Drop a dignified photo of the centre'
                  : 'Déposez une photo digne du centre'
              }
            />
          </div>
        ))}
      </div>

      {/* ── Scrim: animated orange glow + directional gradient ── */}
      <div className="hero__scrim" ref={scrimRef} />

      {/* ── Badges: top-left, over the visible image side ── */}
      <div className="hero__media-top">
        <span className="alaune-pill">
          <span className="live" />
          {t('alaune')}
        </span>
        {center.urgent ? <UrgentBadge /> : <TrustBadge level={center.trust} onDark />}
      </div>

      {/* ── Text content + controls: right side on desktop ── */}
      <div className="wrap hero__foreground">
        <div className="hero__body">
          {/* Location pin */}
          <span className="hero__region">
            <PinIcon />
            {center.region[lang]}
          </span>

          <span className="eyebrow">{t('hero.eyebrow')}</span>
          <h1 className="h-display hero__name">{center.name[lang]}</h1>
          <p className="lead hero__desc">{center.desc[lang]}</p>

          <div className="kpis">
            <div className="kpi">
              <div className="kpi__num">{center.children}</div>
              <div className="kpi__label">{t('kpi.children')}</div>
            </div>
            <div className="kpi">
              <div className="kpi__num">{center.years}</div>
              <div className="kpi__label">{t('kpi.years')}</div>
            </div>
            <div className="kpi">
              <div className="kpi__num">{pct}%</div>
              <div className="kpi__label">{t('kpi.funded')}</div>
            </div>
          </div>

          <div className="hero__cagnotte">
            <Cagnotte raised={center.raised} goal={center.goal} onDark />
          </div>

          <div className="hero__actions">
            <a className="btn btn--gradient" href="#centres">
              {t('hero.support')}
            </a>
            <a className="btn btn--ghost-dark" href={`/centres/${center.id}`}>
              {t('hero.discover')}
            </a>
          </div>
        </div>

        {/* ── Carousel controls ── */}
        <div className="hero__controls">
          <div className="hero__dots">
            {MOCK_FEATURED.map((_, i) => (
              <button
                key={i}
                className={`hero__dot${i === idx ? ' active' : ''}`}
                onClick={() => go(i)}
                aria-label={`${lang === 'en' ? 'Featured centre' : 'Centre à la une'} ${i + 1}`}
              />
            ))}
          </div>
          <div className="hero__arrows">
            <button className="hero__arrow" onClick={() => go(idx - 1)} aria-label="Précédent">
              <ChevronLeft />
            </button>
            <button className="hero__arrow" onClick={() => go(idx + 1)} aria-label="Suivant">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
