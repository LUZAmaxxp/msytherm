// Shared TypeScript interfaces for MysTherm website

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface NavLink {
  label: string
  href: string
  isRoute?: boolean  // true = React Router Link, false/undefined = hash scroll
}

export interface Benefit {
  id: string
  icon: string
  title: string
  description: string
  accentColor: 'terracotta' | 'moss' | 'slate' | 'sand'
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  rating: number
}

export interface Step {
  id: string
  number: string
  title: string
  description: string
  sceneType: 'assessment' | 'installation' | 'certification'
}

export interface Product {
  id: string
  name: string
  thickness: string
  lambda: string
  description: string
  applications: string[]
}

export interface Layer {
  id: string
  name: string
  material: string
  color: string
  description: string
  properties: string[]
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  city: string
  message?: string
}
