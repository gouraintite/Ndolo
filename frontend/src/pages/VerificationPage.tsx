import { useTranslation } from 'react-i18next'
import { AuthLayout, PanelLockIcon, PanelCheckIcon, PanelZapIcon } from '@/components/layout/AuthLayout'
import { VerificationForm } from '@/features/verification/VerificationForm'

function VerifyPanel() {
  const { t } = useTranslation()
  return (
    <div className="auth-panel__body">
      <p className="auth-panel__tagline">
        {t('auth.panel_verify_tagline_pre')}{' '}
        <em>{t('auth.panel_verify_tagline_em')}</em>
      </p>
      <div className="auth-panel__pills">
        <div className="auth-pill">
          <div className="auth-pill__icon"><PanelLockIcon /></div>
          {t('auth.pill_unlocked')}
        </div>
        <div className="auth-pill">
          <div className="auth-pill__icon"><PanelZapIcon /></div>
          {t('auth.pill_features')}
        </div>
        <div className="auth-pill">
          <div className="auth-pill__icon"><PanelCheckIcon /></div>
          {t('auth.pill_transparent')}
        </div>
      </div>
      <p className="auth-panel__sub">{t('auth.panel_sub')}</p>
    </div>
  )
}

export function VerificationPage() {
  const { t } = useTranslation()
  const steps = [
    { label: t('auth.step_register'), active: false },
    { label: t('auth.step_verify'), active: true },
  ]

  return (
    <AuthLayout steps={steps} panel={<VerifyPanel />}>
      <VerificationForm />
    </AuthLayout>
  )
}
