import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { FeaturedCenter } from '@/features/centers/FeaturedCenter'
import { CenterCard } from '@/features/centers/CenterCard'
import { CenterFilters } from '@/features/centers/CenterFilters'
import { ImageSlot } from '@/components/ui/ImageSlot'
import { useCenters } from '@/hooks/useCenters'
import type { FilterKey } from '@/types/center'
import mission from '@/assets/images/mission.jpg'

/* ---------- Scroll reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    function reveal() {
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
        if (reduceMotion || el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in')
      })
    }
    reveal()
    window.addEventListener('scroll', reveal, { passive: true })
    window.addEventListener('resize', reveal, { passive: true })
    return () => {
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('resize', reveal)
    }
  }, [])
}

/* ---------- Value prop icons ---------- */
const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)
const ArrowIcon = () => (
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

export function HomePage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<FilterKey>('all')
  useReveal()

  const { centers: filtered, isLoading } = useCenters(filter)

  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <FeaturedCenter />

      {/* ── Value props ── */}
      <section className="section section--tight">
        <div className="wrap">
          <span className="eyebrow">{t('val.eyebrow')}</span>
          <h2 className="h-section reveal" style={{ maxWidth: '18ch', marginBottom: 48 }}>
            {t('val.title')}
          </h2>
          <div className="values">
            {[
              { icon: <EyeIcon />, t: 'val.1.t', p: 'val.1.p' },
              { icon: <LockIcon />, t: 'val.2.t', p: 'val.2.p' },
              { icon: <ShieldIcon />, t: 'val.3.t', p: 'val.3.p' },
            ].map(({ icon, t: tk, p }) => (
              <div key={tk} className="value reveal">
                <div className="value__icon">{icon}</div>
                <h3 className="h-card">{t(tk)}</h3>
                <p>{t(p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust band ── */}
      <section className="band section" id="impact">
        <div className="wrap">
          <div className="band__top">
            <div className="band__head">
              <span className="eyebrow eyebrow--ondark">{t('band.eyebrow')}</span>
              <h2 className="h-section reveal">{t('band.title')}</h2>
            </div>
            <div className="band__media reveal">
              <ImageSlot
                dark
                placeholder="Déposez une photo digne (sourires, cérémonie, fierté)"
                className="band__media-slot"
                src={mission}
              />
            </div>
          </div>
          <div className="band__grid">
            {[
              ['128', 'band.1'],
              ['6 400', 'band.2'],
              ['184M', 'band.3', true],
              ['2 350', 'band.4'],
            ].map(([num, key, em]) => (
              <div key={String(key)} className="stat reveal">
                <div className="stat__num">{em ? <em>{num}</em> : num}</div>
                <div className="stat__label">{t(String(key))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section" id="comment">
        <div className="wrap">
          <span className="eyebrow">{t('how.eyebrow')}</span>
          <h2 className="h-section reveal" style={{ maxWidth: '20ch', marginBottom: 48 }}>
            {t('how.title')}
          </h2>
          <div className="steps">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="step reveal">
                <div className="step__n">{n}</div>
                <h3 className="h-card">{t(`how.${n}.t`)}</h3>
                <p>{t(`how.${n}.p`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Centres grid ── */}
      <section className="section" id="centres" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <div className="centres__head">
            <div>
              <span className="eyebrow">{t('centres.eyebrow')}</span>
              <h2 className="h-section reveal" style={{ maxWidth: '16ch' }}>
                {t('centres.title')}
              </h2>
            </div>
            <a className="linklike" href="#">
              {t('centres.all')} <ArrowIcon />
            </a>
          </div>
          <CenterFilters active={filter} onChange={setFilter} />
          <div className="grid-centres">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card" style={{ minHeight: 320, opacity: 0.5, background: 'var(--surface-2)' }} />
                ))
              : filtered.map((c) => (
                  <CenterCard key={c.id} center={c} src={c.coverImage} />
                ))}
          </div>
          <div className="centres__foot">
            <a className="btn btn--ghost" href="#">
              {t('centres.all')}
            </a>
          </div>
        </div>
      </section>

      {/* ── Signaler ── */}
      <section className="section" id="signaler">
        <div className="wrap">
          <div className="signaler reveal">
            <div className="signaler__glow" />
            <div className="signaler__inner">
              <div>
                <span className="eyebrow eyebrow--ondark">{t('sig.eyebrow')}</span>
                <h2 className="h-section">{t('sig.title')}</h2>
                <p>{t('sig.p')}</p>
              </div>
              <div className="signaler__actions">
                <a className="btn btn--gradient" href="#">
                  {t('sig.cta')}
                </a>
                <a className="btn btn--ghost-dark" href="#">
                  {t('sig.cta2')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
