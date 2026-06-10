import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import missionImg from '@/assets/images/mission.jpg'

function LangToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('en') ? 'en' : 'fr'
  return (
    <div className="lang" role="group" aria-label="Langue">
      {(['fr', 'en'] as const).map((l) => (
        <button key={l} aria-pressed={current === l} onClick={() => i18n.changeLanguage(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

interface AuthStep {
  label: string
  active: boolean
}

interface AuthLayoutProps {
  children: React.ReactNode
  steps?: AuthStep[]
  panel: React.ReactNode
}

export function AuthLayout({ children, steps, panel }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      {/* ── Left: form panel ── */}
      <div className="auth-layout__form">
        <div className="auth-layout__top">
          <Link to="/" className="brand" aria-label="Ndolo — accueil">
            <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="9" fill="#fff" />
              <path
                d="M9 14a7 7 0 0 0 14 0"
                fill="none"
                stroke="#E74202"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="16" cy="11" r="2.4" fill="#FCAE52" />
            </svg>
            <span style={{ color: '#fff' }}>
              <b>Ndolo</b>
              <span style={{ color: 'var(--primary-light)' }}>.</span>
            </span>
          </Link>
          <LangToggle />
        </div>

        {steps && steps.length > 0 && (
          <div className="auth-steps" role="list" aria-label="Étapes">
            {steps.map((step, i) => (
              <div
                key={i}
                role="listitem"
                className={`auth-step${step.active ? ' auth-step--active' : ''}`}
                aria-current={step.active ? 'step' : undefined}
              >
                <span className="auth-step__num">{i + 1}</span>
                {step.label}
              </div>
            ))}
          </div>
        )}

        <div className="auth-layout__content">{children}</div>
      </div>

      {/* ── Right: decorative panel ── */}
      <div className="auth-layout__panel" aria-hidden="true">
        <div className="auth-panel__glow" />
        <div className="auth-panel__image">
          <img src={missionImg} alt="" />
        </div>
        {panel}
      </div>
    </div>
  )
}

/* ── Shared panel icons ─────────────────────────────────── */
export function PanelShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  )
}
export function PanelCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
export function PanelStarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
export function PanelLockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
export function PanelZapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
