import { useTranslation } from 'react-i18next'
import { AuthLayout, PanelShieldIcon, PanelCheckIcon, PanelStarIcon } from '@/components/layout/AuthLayout'
import { RegisterForm } from '@/features/auth/RegisterForm'

function RegisterPanel() {
  const { t } = useTranslation()
  return (
    <div className="auth-panel__body">
      <p className="auth-panel__tagline">
        {t('auth.panel_register_tagline_pre')}{' '}
        <em>{t('auth.panel_register_tagline_em')}</em>
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

export function RegisterPage() {
  const { t } = useTranslation()
  const steps = [
    { label: t('auth.step_register'), active: true },
    { label: t('auth.step_verify'), active: false },
  ]

  return (
    <AuthLayout steps={steps} panel={<RegisterPanel />}>
      <RegisterForm />
    </AuthLayout>
  )
}
