import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { LoginRequest } from '@/types/auth'

export function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<Partial<LoginRequest>>({})

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data)
      navigate('/dashboard')
    },
  })

  function validate(): boolean {
    const errs: Partial<LoginRequest> = {}
    if (!form.email) errs.email = t('auth.email_required')
    if (!form.password) errs.password = t('auth.password_required')
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) mutate(form)
  }

  const apiError = error instanceof Error ? error.message : null

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">{t('auth.login_title')}</h1>
      <p className="auth-form__subtitle">{t('auth.login_subtitle')}</p>

      {apiError && <p className="auth-error">{apiError}</p>}

      <div className="auth-form__fields">
        <Input
          id="email"
          type="email"
          label={t('auth.email')}
          placeholder="vous@exemple.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          error={fieldErrors.email}
          autoComplete="email"
          dark
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Input
            id="password"
            type="password"
            label={t('auth.password')}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            error={fieldErrors.password}
            autoComplete="current-password"
            dark
          />
          <Link to="/forgot-password" className="auth-forgot">
            {t('auth.forgot_password')}
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="gradient"
        loading={isPending}
        className="btn--block"
        style={{ marginTop: 28 }}
      >
        {t('auth.login_submit')}
      </Button>

      <p className="auth-foot">
        {t('auth.no_account')}{' '}
        <Link to="/register">{t('auth.register_submit')}</Link>
      </p>
    </form>
  )
}
