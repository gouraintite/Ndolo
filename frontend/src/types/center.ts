export type TrustLevel = 'L0' | 'L1' | 'L2' | 'L3'
export type CenterType = 'Orphanage' | 'Charity' | 'AidCenter'
export type CagnotteStatus = 'Draft' | 'Active' | 'Funded' | 'Suspended' | 'Closed'

export interface Center {
  id: string
  name: string
  type: CenterType
  description: string
  region: string
  trustLevel: TrustLevel
  heroImageUrl?: string
  childrenCount?: number
  activeCagnotteId?: string
  activeCagnotteTitle?: string
  activeCagnotteGoal?: number
  activeCagnotteRaised?: number
}

export interface Cagnotte {
  id: string
  centerId: string
  title: string
  purpose: string
  goalAmount: number
  raisedAmount: number
  currency: string
  status: CagnotteStatus
}
