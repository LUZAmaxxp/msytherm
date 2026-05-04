import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema, type ContactSchema } from '@/lib/schemas/contactSchema'
import { CONTACT_CONTENT } from '@/constants/content'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (_data: ContactSchema) => {
    setFormState('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Simulate success (replace with real API call)
    const success = Math.random() > 0.05
    setFormState(success ? 'success' : 'error')
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-humus">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-resin text-sm font-body uppercase tracking-widest mb-3">
            Contactez-nous
          </span>
          <h2 className="font-display font-light italic text-3xl md:text-4xl text-parchment">
            {CONTACT_CONTENT.headline}
          </h2>
          <p className="mt-3 text-loam-mid font-body">{CONTACT_CONTENT.subheadline}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4" aria-hidden="true">✅</div>
              <h3 className="text-2xl font-display font-light text-moss-water mb-3">Demande envoyée !</h3>
              <p className="text-moss-water/80 mb-6">Notre équipe vous contactera dans les 24h.</p>
              <Button variant="outline" onClick={() => { reset(); setFormState('idle') }} className="border-parchment/30 text-parchment hover:bg-loam">
                Envoyer une autre demande
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-parchment/80">Nom complet *</Label>
                <Input
                  id="name"
                  placeholder="Jean Dupont"
                  {...register('name')}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="bg-[#141910] border-sage/50 text-parchment placeholder:text-loam-mid rounded-sm focus-visible:ring-1 focus-visible:ring-resin focus-visible:ring-offset-0"
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-moss-water" role="alert">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-parchment/80">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@exemple.fr"
                  {...register('email')}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="bg-[#141910] border-sage/50 text-parchment placeholder:text-loam-mid rounded-sm focus-visible:ring-1 focus-visible:ring-resin focus-visible:ring-offset-0"
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-moss-water" role="alert">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="text-parchment/80">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  {...register('phone')}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className="bg-[#141910] border-sage/50 text-parchment placeholder:text-loam-mid rounded-sm focus-visible:ring-1 focus-visible:ring-resin focus-visible:ring-offset-0"
                />
                {errors.phone && (
                  <p id="phone-error" className="text-xs text-moss-water" role="alert">{errors.phone.message}</p>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="city" className="text-parchment/80">Ville *</Label>
                <Input
                  id="city"
                  placeholder="Paris"
                  {...register('city')}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                  className="bg-[#141910] border-sage/50 text-parchment placeholder:text-loam-mid rounded-sm focus-visible:ring-1 focus-visible:ring-resin focus-visible:ring-offset-0"
                />
                {errors.city && (
                  <p id="city-error" className="text-xs text-moss-water" role="alert">{errors.city.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="message" className="text-parchment/80">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Décrivez votre projet..."
                  {...register('message')}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="bg-[#141910] border-sage/50 text-parchment placeholder:text-loam-mid rounded-sm focus-visible:ring-1 focus-visible:ring-resin focus-visible:ring-offset-0"
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-moss-water" role="alert">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={formState === 'submitting'}
                  className="w-full bg-resin text-parchment font-body rounded-sm hover:bg-resin/90"
                  aria-label="Envoyer ma demande de devis"
                >
                  {formState === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : 'Envoyer ma demande'}
                </Button>
                {formState === 'error' && (
                  <p className="text-sm text-moss-water" role="alert">
                    Une erreur s'est produite. Veuillez réessayer.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
