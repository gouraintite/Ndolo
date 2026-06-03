import type { TrustLevel } from '@/types/center'

export function canCreateCagnotte(level: TrustLevel): boolean {
  return level === 'certified'
}

export function labelFor(level: TrustLevel): string {
  const labels: Record<TrustLevel, string> = {
    unverified: 'Non vérifié',
    verified: 'Vérifié',
    certified: 'Certifié transparent',
  }
  return labels[level]
}
