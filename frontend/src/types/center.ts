export type TrustLevel = 'certified' | 'verified' | 'unverified'
export type CenterType = 'Orphanage' | 'Charity' | 'AidCenter'
export type CagnotteStatus = 'Draft' | 'Active' | 'Funded' | 'Suspended' | 'Closed'
export type FilterKey = 'all' | 'urgent' | 'certified' | 'verified'

export interface LocalizedString {
  fr: string
  en: string
}

export interface FeaturedCenter {
  id: string
  name: LocalizedString
  region: LocalizedString
  desc: LocalizedString
  trust: TrustLevel
  urgent?: boolean
  children: number
  years: number
  raised: number
  goal: number
  glowX: string
  glowY: string
  glowI: number
  src: string
}

export interface Center {
  id: string
  name: LocalizedString
  region: LocalizedString
  trust: TrustLevel
  urgent?: boolean
  raised: number
  goal: number
  coverImage?: string
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
