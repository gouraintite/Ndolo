import type { Center } from '@/types/center'
import client from './client'

export const ROTATION_INTERVAL_MS = import.meta.env.DEV ? 30_000 : 86_400_000

export const MOCK_CENTERS: Center[] = [
  {
    id: '1',
    name: "Foyer Saint-Joseph de Bafoussam",
    type: 'Orphanage',
    description: "Orphelinat accueillant 47 enfants dans la région de l'Ouest.",
    region: 'Ouest',
    trustLevel: 'L3',
    heroImageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200',
    childrenCount: 47,
    activeCagnotteTitle: "Rénovation des dortoirs",
    activeCagnotteGoal: 2500000,
    activeCagnotteRaised: 1750000,
  },
  {
    id: '2',
    name: "Association Lumière d'Espoir - Ngaoundéré",
    type: 'Charity',
    description: "Association d'aide aux enfants de rue dans l'Adamaoua.",
    region: 'Adamaoua',
    trustLevel: 'L2',
    heroImageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200',
    childrenCount: 32,
    activeCagnotteTitle: 'Scolarisation 2025',
    activeCagnotteGoal: 1800000,
    activeCagnotteRaised: 620000,
  },
  {
    id: '3',
    name: "Centre d'Accueil Beti - Yaoundé",
    type: 'AidCenter',
    description: "Centre d'accueil et d'aide sociale pour familles vulnérables.",
    region: 'Centre',
    trustLevel: 'L2',
    heroImageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200',
    childrenCount: 61,
  },
  {
    id: '4',
    name: "Orphelinat Sainte-Thérèse - Kribi",
    type: 'Orphanage',
    description: "Orphelinat côtier accueillant des enfants en bas âge.",
    region: 'Sud',
    trustLevel: 'L1',
    heroImageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200',
    childrenCount: 28,
  },
]

export const centersApi = {
  list: () => client.get<Center[]>('/api/centers').then((r) => r.data),
  get: (id: string) => client.get<Center>(`/api/centers/${id}`).then((r) => r.data),
}
