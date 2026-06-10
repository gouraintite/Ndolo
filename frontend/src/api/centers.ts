import type { FeaturedCenter, Center } from '@/types/center'
import client from './client'
import banner1 from '@/assets/images/banner-1.jpg'
import banner2 from '@/assets/images/banner-2.jpg'
import banner3 from '@/assets/images/banner-3.jpg'
import banner4 from '@/assets/images/banner-4.jpg'
import center1 from '@/assets/images/center-1.jpg'
import center2 from '@/assets/images/center-2.jpg'
import center3 from '@/assets/images/center-3.jpg'
import center4 from '@/assets/images/center-4.jpg'
import center5 from '@/assets/images/center-5.jpg'
import center6 from '@/assets/images/center-6.jpg'

export const ROTATION_INTERVAL_MS = import.meta.env.DEV ? 30_000 : 86_400_000

// ─── Mock data (used until backend is live) ────────────────────────────────

export const MOCK_FEATURED: FeaturedCenter[] = [
  {
    id: 'hero-esperance',
    name: { fr: "Foyer de l'Espérance", en: 'Hope Home' },
    region: { fr: 'Bamenda · Nord-Ouest', en: 'Bamenda · North-West' },
    desc: {
      fr: "Depuis douze ans, le Foyer de l'Espérance accueille, scolarise et accompagne les enfants vers l'autonomie, loin des grands axes d'aide.",
      en: 'For twelve years, Hope Home has welcomed, schooled and guided children toward autonomy, far from the main aid routes.',
    },
    trust: 'certified', children: 64, years: 12, raised: 6800000, goal: 10000000,
    glowX: '20%', glowY: '6%', glowI: 0.92, src: banner1,
  },
  {
    id: 'hero-lumiere',
    name: { fr: 'Maison Lumière', en: 'Light House' },
    region: { fr: 'Maroua · Extrême-Nord', en: 'Maroua · Far North' },
    desc: {
      fr: 'Une équipe locale veille jour et nuit sur 48 enfants. Le centre construit un nouveau dortoir avant la saison des pluies.',
      en: 'A local team watches over 48 children day and night. The centre is building a new dormitory before the rainy season.',
    },
    trust: 'verified', urgent: true, children: 48, years: 8, raised: 3280000, goal: 8000000,
    glowX: '52%', glowY: '0%', glowI: 1.0, src: banner2,
  },
  {
    id: 'hero-sourire',
    name: { fr: "Centre Sourire d'Enfant", en: "Child's Smile Centre" },
    region: { fr: 'Buea · Sud-Ouest', en: 'Buea · South-West' },
    desc: {
      fr: "Vingt ans d'engagement, des centaines de diplômés. Le centre finance les frais de scolarité de sa nouvelle promotion.",
      en: 'Twenty years of commitment, hundreds of graduates. The centre is funding tuition for its newest cohort.',
    },
    trust: 'certified', children: 90, years: 20, raised: 12900000, goal: 15000000,
    glowX: '82%', glowY: '12%', glowI: 0.84, src: banner3,
  },
  {
    id: 'hero-rainsong',
    name: { fr: 'Foyer Rainsong', en: 'Rainsong Home' },
    region: { fr: 'Gazi · Obala', en: 'Gazi · Obala' },
    desc: {
      fr: "Vingt ans d'engagement, des centaines de diplômés. Le centre finance les frais de scolarité de sa nouvelle promotion.",
      en: 'Twenty years of commitment, hundreds of graduates. The centre is funding tuition for its newest cohort.',
    },
    trust: 'certified', children: 90, years: 20, raised: 12900000, goal: 15000000,
    glowX: '82%', glowY: '12%', glowI: 0.84, src: banner4,
  },
]

export const MOCK_CENTRES: Center[] = [
  { id: 'c-graines',  name: { fr: "Les Graines d'Avenir", en: 'Seeds of the Future' }, region: { fr: 'Douala · Littoral', en: 'Douala · Littoral' }, trust: 'certified', raised: 4500000, goal: 6000000, coverImage: center1 },
  { id: 'c-bercail',  name: { fr: 'Le Bercail des Anges', en: "Angels' Shelter" },      region: { fr: 'Yaoundé · Centre', en: 'Yaoundé · Centre' }, trust: 'verified', urgent: true, raised: 1900000, goal: 7000000, coverImage: center2 },
  { id: 'c-kibo',     name: { fr: 'Foyer Kibodi', en: 'Kibodi Home' },                  region: { fr: 'Bafoussam · Ouest', en: 'Bafoussam · West' }, trust: 'verified', raised: 5200000, goal: 6500000, coverImage: center3 },
  { id: 'c-aurore',   name: { fr: 'Association Aurore', en: 'Aurora Association' },      region: { fr: 'Garoua · Nord', en: 'Garoua · North' }, trust: 'certified', urgent: true, raised: 2750000, goal: 9000000, coverImage: center4 },
  { id: 'c-palmiers', name: { fr: 'Centre Les Palmiers', en: 'Palms Centre' },           region: { fr: 'Kribi · Sud', en: 'Kribi · South' }, trust: 'unverified', raised: 820000, goal: 5000000, coverImage: center5 },
  { id: 'c-ndolo',    name: { fr: 'Maison Ndolo Bell', en: 'Ndolo Bell House' },         region: { fr: 'Limbé · Sud-Ouest', en: 'Limbé · South-West' }, trust: 'certified', raised: 8100000, goal: 9500000, coverImage: center6 },
]

// ─── API DTOs (mirrors Ndolo.Api.Dtos.Centers) ─────────────────────────────

export interface CenterApiResponse {
  id: string
  name: string
  type: string
  description: string
  region: string
  trustLevel: 'unverified' | 'verified' | 'certified'
  isUrgent: boolean
  raisedAmount: number | null
  goalAmount: number | null
  activeCagnotteId: string | null
  activeCagnotteTitle: string | null
}

export interface CenterListApiResponse {
  items: CenterApiResponse[]
  totalCount: number
  page: number
  pageSize: number
}

export interface CenterListParams {
  filter?: string
  region?: string
  page?: number
  pageSize?: number
}

// ─── API calls ──────────────────────────────────────────────────────────────

export const centersApi = {
  list: (params?: CenterListParams) =>
    client.get<CenterListApiResponse>('/api/centers', { params }).then((r) => r.data),
  get: (id: string) =>
    client.get<CenterApiResponse>(`/api/centers/${id}`).then((r) => r.data),
}

// Converts a backend response to the frontend Center shape (with mock images as fallback)
const COVER_IMAGES = [center1, center2, center3, center4, center5, center6]

export function apiResponseToCenter(item: CenterApiResponse, idx: number): Center {
  const locale = { fr: item.name, en: item.name } // backend returns single string; i18n will come later
  return {
    id: item.id,
    name: locale,
    region: { fr: item.region, en: item.region },
    trust: item.trustLevel,
    urgent: item.isUrgent,
    raised: item.raisedAmount ?? 0,
    goal: item.goalAmount ?? 1,
    coverImage: COVER_IMAGES[idx % COVER_IMAGES.length],
  }
}
