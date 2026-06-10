import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  )
}

interface UploadZoneProps {
  id: string
  label: string
  hint: string
  file: File | null
  onChange: (f: File | null) => void
}

function UploadZone({ id, label, hint, file, onChange }: UploadZoneProps) {
  const { t } = useTranslation()
  return (
    <label className={`upload-zone${file ? ' upload-zone--filled' : ''}`} htmlFor={id}>
      <input
        id={id}
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <div className="upload-zone__icon">
        {file ? <CheckCircleIcon /> : <UploadIcon />}
      </div>
      <span className="upload-zone__label">
        {file ? file.name : label}
      </span>
      <span className="upload-zone__hint">
        {file ? t('auth.verify_file_selected') : hint}
      </span>
      {!file && <span className="upload-zone__size">{t('auth.verify_max_size')}</span>}
    </label>
  )
}

export function VerificationForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [idFile, setIdFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!idFile || !selfieFile) return
    setSubmitting(true)
    // Mock — real endpoint wired in Sprint 3 (VerificationDossier)
    setTimeout(() => {
      setSubmitting(false)
      navigate('/dashboard')
    }, 1400)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">{t('auth.verify_title')}</h1>
      <p className="auth-form__subtitle">{t('auth.verify_subtitle')}</p>

      <div className="upload-zones">
        <UploadZone
          id="id-doc"
          label={t('auth.verify_id_label')}
          hint={t('auth.verify_id_hint')}
          file={idFile}
          onChange={setIdFile}
        />
        <UploadZone
          id="selfie-doc"
          label={t('auth.verify_selfie_label')}
          hint={t('auth.verify_selfie_hint')}
          file={selfieFile}
          onChange={setSelfieFile}
        />
      </div>

      <div className="verify-actions">
        <Button
          type="submit"
          variant="gradient"
          loading={submitting}
          disabled={!idFile || !selfieFile}
          className="btn--block"
        >
          {t('auth.verify_submit')}
        </Button>
        <a
          className="verify-skip"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/dashboard')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/dashboard')}
        >
          {t('auth.verify_skip')}
        </a>
      </div>
    </form>
  )
}
