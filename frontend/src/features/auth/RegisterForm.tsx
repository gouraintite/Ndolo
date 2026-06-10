import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { RegisterRequest } from '@/types/auth'

type FormState = RegisterRequest & { confirmPassword: string }

export function RegisterForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      setAuth(data)
      navigate('/verification')
    },
  })

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (!form.email) errs.email = t('auth.email_required')
    if (form.password.length < 8) errs.password = t('auth.password_min')
    if (form.password !== form.confirmPassword) errs.confirmPassword = t('auth.password_mismatch')
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const { confirmPassword: _, ...payload } = form
    mutate({ ...payload, locale: navigator.language.startsWith('en') ? 'en' : 'fr' })
  }

  const apiError = error instanceof Error ? error.message : null

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">{t('auth.register_title')}</h1>
      <p className="auth-form__subtitle">{t('auth.register_subtitle')}</p>

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
        <Input
          id="phone"
          type="tel"
          label={t('auth.phone')}
          placeholder="+237 6 00 00 00 00"
          value={form.phone ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          autoComplete="tel"
          dark
        />
        <Input
          id="password"
          type="password"
          label={t('auth.password')}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          error={fieldErrors.password}
          autoComplete="new-password"
          dark
        />
        <Input
          id="confirmPassword"
          type="password"
          label={t('auth.confirm_password')}
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          dark
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        loading={isPending}
        className="btn--block"
        style={{ marginTop: 28 }}
      >
        {t('auth.register_submit_next')}
      </Button>

      <p className="auth-foot">
        {t('auth.has_account')}{' '}
        <Link to="/login">{t('auth.login_submit')}</Link>
      </p>
    </form>
  )
}
