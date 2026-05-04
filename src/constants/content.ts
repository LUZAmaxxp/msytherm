import type { NavLink, Stat, Benefit, Testimonial, Step, Product, Layer } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Comment ça marche', href: '#how-it-works' },
  { label: 'Notre Produit', href: '#product' },
  { label: 'Avantages', href: '#benefits' },
  { label: 'Produits', href: '/produits', isRoute: true },
  { label: 'Panneau Sandwich', href: '/panneau-sandwich', isRoute: true },
  { label: 'Contact', href: '#contact' },
]

export const STATS: Stat[] = [
  { value: 0.038, suffix: ' W/m·K', label: 'Conductivité thermique' },
  { value: 45, suffix: ' dB', label: 'Réduction acoustique' },
  { value: 100, suffix: '%', label: 'Biosourcé & Écologique' },
]

export const STEPS: Step[] = [
  {
    id: 'assessment',
    number: '01',
    title: 'Diagnostic Énergétique',
    description: 'Nos experts évaluent votre bâtiment et identifient les zones de déperdition thermique pour une solution sur mesure.',
    sceneType: 'assessment',
  },
  {
    id: 'installation',
    number: '02',
    title: 'Pose des Panneaux',
    description: 'Installation rapide et propre de nos panneaux sandwich mycélium. Compatible avec toutes les structures existantes.',
    sceneType: 'installation',
  },
  {
    id: 'certification',
    number: '03',
    title: 'Certification & Garantie',
    description: 'Contrôle qualité final et délivrance du certificat de performance thermique. Garantie 25 ans.',
    sceneType: 'certification',
  },
]

export const BENEFITS: Benefit[] = [
  {
    id: 'thermal',
    icon: '🌡️',
    title: 'Isolation Thermique Supérieure',
    description: 'Conductivité λ = 0,038 W/m·K — performance équivalente aux isolants synthétiques sans les impacts environnementaux.',
    accentColor: 'terracotta',
  },
  {
    id: 'acoustic',
    icon: '🔇',
    title: 'Confort Acoustique',
    description: 'Réduction du bruit jusqu\'à 45 dB grâce à la structure alvéolaire naturelle du mycélium.',
    accentColor: 'moss',
  },
  {
    id: 'fire',
    icon: '🔥',
    title: 'Résistance au Feu',
    description: 'Classement au feu B-s1,d0 — ignifuge naturellement sans traitement chimique additif.',
    accentColor: 'slate',
  },
  {
    id: 'eco',
    icon: '🌿',
    title: '100% Biosourcé',
    description: 'Fabriqué à partir de substrats agricoles locaux. Empreinte carbone négative sur l\'ensemble du cycle de vie.',
    accentColor: 'moss',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'Les panneaux MysTherm ont transformé notre maison. Consommation chauffage réduite de 60% dès le premier hiver. La pose était simple et le résultat bluffant.',
    author: 'Jean-Pierre Moreau',
    role: 'Propriétaire',
    company: 'Rénovation Maison Ancienne, Lyon',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'En tant qu\'architecte, je cherche des matériaux biosourcés performants. MysTherm répond à toutes nos exigences techniques tout en étant parfaitement écologique.',
    author: 'Sophie Blanc',
    role: 'Architecte DPLG',
    company: 'Cabinet Blanc & Associés, Paris',
    rating: 5,
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'standard',
    name: 'MysTherm Standard',
    thickness: '40–80 mm',
    lambda: '0,038 W/m·K',
    description: 'Panneau sandwich mycélium pour rénovation intérieure et isolation de combles.',
    applications: ['Murs intérieurs', 'Combles', 'Planchers'],
  },
  {
    id: 'premium',
    name: 'MysTherm Premium',
    thickness: '80–120 mm',
    lambda: '0,035 W/m·K',
    description: 'Panneau haute performance pour construction neuve et rénovation BBC.',
    applications: ['Façades', 'Toitures', 'Maisons passives'],
  },
]

export const LAYERS: Layer[] = [
  {
    id: 'exterior',
    name: 'Parement Extérieur',
    material: 'OSB / Fibre de bois',
    color: '#8B6914',
    description: 'Protection mécanique et pare-pluie. Rigidité structurelle du panneau.',
    properties: ['Résistance mécanique', 'Étanchéité à l\'air', 'Perméabilité à la vapeur'],
  },
  {
    id: 'mycelium',
    name: 'Âme Mycélium',
    material: 'Mycélium de champignon + substrat agricole',
    color: '#C8956C',
    description: 'Le cœur isolant biosourcé. Structure alvéolaire naturelle pour performance thermique et acoustique.',
    properties: ['Isolation thermique λ=0,038', 'Absorption acoustique', 'Ignifuge naturel'],
  },
  {
    id: 'vapor',
    name: 'Film Pare-vapeur',
    material: 'Membrane polyéthylène biosourcée',
    color: '#5B8DB8',
    description: 'Contrôle de la diffusion de vapeur d\'eau pour éviter la condensation.',
    properties: ['Contrôle hygrométrique', 'Sd > 10 m', 'Prévention condensation'],
  },
  {
    id: 'interior',
    name: 'Parement Intérieur',
    material: 'Plaque de plâtre / Fibre de bois',
    color: '#D4C5A9',
    description: 'Finition intérieure prête à peindre ou carreler. Bon comportement au feu.',
    properties: ['Finition directe', 'Résistance feu A2-s1', 'Pose rapide'],
  },
]

export const HERO_CONTENT = {
  badge: 'ISOLATION BIOSOURCÉE NOUVELLE GÉNÉRATION',
  headline: 'Isolez avec le vivant.',
  subheadline: 'Panneau sandwich en mycélium',
  description: 'MysTherm révolutionne l\'isolation thermique avec des panneaux biosourcés à base de mycélium. Performance équivalente aux isolants synthétiques, empreinte carbone négative.',
  cta_primary: 'Demander un devis',
  cta_secondary: 'Découvrir le produit',
}

export const CONTACT_CONTENT = {
  headline: 'Parlons de votre projet',
  subheadline: 'Obtenez une étude thermique gratuite',
  description: 'Notre équipe d\'experts vous accompagne de l\'audit énergétique à la pose, partout en France.',
}
