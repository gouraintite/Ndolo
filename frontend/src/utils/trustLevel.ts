import type { TrustLevel } from '@/types/center'

const LEVEL_ORDER: Record<TrustLevel, number> = { L0: 0, L1: 1, L2: 2, L3: 3 }

export function canCreateCagnotte(level: TrustLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER['L2']
}

export function labelFor(level: TrustLevel): string {
  const labels: Record<TrustLevel, string> = {
    L0: 'Non vérifié',
    L1: 'Identité confirmée',
    L2: 'Vérifié',
    L3: 'Certifié transparent',
  }
  return labels[level]
}
