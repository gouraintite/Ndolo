import { useTranslation } from 'react-i18next'
import { AuthLayout, PanelShieldIcon, PanelCheckIcon, PanelStarIcon } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/features/auth/LoginForm'

function LoginPanel() {
  const { t } = useTranslation()
  return (
    <div className="auth-panel__body">
      <p className="auth-panel__tagline">
        {t('auth.panel_login_tagline_pre')}{' '}
        <em>{t('auth.panel_login_tagline_em')}</em>
      </p>
      <div className="auth-panel__pills">
        <div className="auth-pill">
          <div className="auth-pill__icon"><PanelShieldIcon /></div>
          {t('auth.pill_verified')}
        </div>
        <div className="auth-pill">
          <div className="auth-pill__icon"><PanelCheckIcon /></div>
          {t('auth.pill_traceable')}
        </div>
        <div className="auth-pill">
          <div className="auth-pill__icon"><PanelStarIcon /></div>
          {t('auth.pill_transparent')}
        </div>
      </div>
      <p className="auth-panel__sub">{t('auth.panel_sub')}</p>
    </div>
  )
}

export function LoginPage() {
  return (
    <AuthLayout panel={<LoginPanel />}>
      <LoginForm />
    </AuthLayout>
  )
}
