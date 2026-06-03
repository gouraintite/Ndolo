import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function LangToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('en') ? 'en' : 'fr'
  return (
    <div className="lang" role="group" aria-label="Langue">
      {(['fr', 'en'] as const).map((l) => (
        <button key={l} data-lang={l} aria-pressed={current === l} onClick={() => i18n.changeLanguage(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function BrandLogo({ light }: { light?: boolean }) {
  return (
    <Link className="brand" to="/" aria-label="Ndolo — accueil">
      <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={light ? '#fff' : '#131110'} />
        <path d="M9 14a7 7 0 0 0 14 0" fill="none" stroke={light ? '#E74202' : '#FCAE52'} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="16" cy="11" r="2.4" fill={light ? '#FCAE52' : '#E74202'} />
      </svg>
      <span><b>Ndolo</b><span className="dot">.</span></span>
    </Link>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#centres', key: 'nav.centres' },
    { href: '#comment', key: 'nav.how' },
    { href: '#impact',  key: 'nav.trust' },
    { href: '#signaler', key: 'nav.report' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <BrandLogo />
          <nav className="nav" aria-label="Navigation principale">
            {navLinks.map(({ href, key }) => (
              <a key={key} href={href}>{t(key)}</a>
            ))}
          </nav>
          <div className="header-actions">
            <LangToggle />
            <a className="btn btn--primary btn--sm header-cta" href="#centres">{t('cta.support')}</a>
            <button className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {navLinks.map(({ href, key }) => (
            <a key={key} href={href} onClick={() => setMenuOpen(false)}>{t(key)}</a>
          ))}
          <a className="btn btn--primary" href="#centres" onClick={() => setMenuOpen(false)}>{t('cta.support')}</a>
        </div>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <BrandLogo light />
              <p>{t('foot.mission')}</p>
              <div className="footer__support">
                <span className="label">{t('foot.supportlabel')}</span>
                <a className="phone" href="tel:+237600000000">
                  <PinIcon />
                  +237 6 00 00 00 00
                </a>
              </div>
            </div>
            <div className="footer__cols">
              <div className="footer__col">
                <h4>{t('foot.explore')}</h4>
                <a href="#centres">{t('nav.centres')}</a>
                <a href="#comment">{t('nav.how')}</a>
                <a href="#impact">{t('foot.trust')}</a>
              </div>
              <div className="footer__col">
                <h4>{t('foot.about')}</h4>
                <a href="#signaler">{t('foot.report')}</a>
                <a href="#">{t('foot.partners')}</a>
                <a href="#">{t('foot.faq')}</a>
              </div>
              <div className="footer__col">
                <h4>{t('foot.help')}</h4>
                <a href="#">{t('foot.contact')}</a>
                <a href="#">{t('foot.faq')}</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Ndolo. {t('foot.rights')}</span>
            <div className="legal">
              <a href="#">{t('foot.privacy')}</a>
              <a href="#">{t('foot.terms')}</a>
              <a href="#">{t('foot.legal')}</a>
            </div>
            <LangToggle />
          </div>
        </div>
      </footer>
    </div>
  )
}
