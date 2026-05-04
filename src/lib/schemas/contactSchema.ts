import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+33|0)[1-9](\d{2}){4}$/.test(val.replace(/\s/g, '')),
      { message: 'Numéro de téléphone invalide (format: 06 12 34 56 78)' }
    ),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  message: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: 'Le message doit contenir au moins 10 caractères',
    }),
})

export type ContactSchema = z.infer<typeof contactSchema>
