import type { TrustLevel } from '@/types/center'

// L2 (verified) and L3 (certified) can both create cagnottes — CLAUDE.md §6
export function canCreateCagnotte(level: TrustLevel): boolean {
  return level === 'verified' || level === 'certified'
}

export function labelFor(level: TrustLevel): string {
  const labels: Record<TrustLevel, string> = {
    unverified: 'Non vérifié',
    verified: 'Vérifié',
    certified: 'Certifié transparent',
  }
  return labels[level]
}
