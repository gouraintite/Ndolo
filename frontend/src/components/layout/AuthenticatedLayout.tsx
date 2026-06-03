import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const { clearAuth } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold text-primary">Ndolo</Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-primary">{t('nav.dashboard')}</Link>
            <button onClick={clearAuth} className="text-sm text-gray-500 hover:text-red-600">
              Déconnexion
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
