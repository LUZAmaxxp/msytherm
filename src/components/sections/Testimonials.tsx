import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/constants/content'
import type { Testimonial } from '@/types'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="text-celadon"
          width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="bg-raw-linen rounded-sm p-8 border border-straw/40 flex flex-col gap-4"
    >
      <span className="font-display font-light italic text-kiln-red/60 leading-none select-none" style={{ fontSize: '4rem' }} aria-hidden="true">“</span>
      <p className="font-display font-light italic text-dark-oak leading-relaxed text-[1.05rem] -mt-4">{testimonial.quote}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-straw/40">
        <div>
          <p className="font-body text-dark-oak text-sm uppercase tracking-[0.1em]">{testimonial.author}</p>
          <p className="text-xs text-umber">{testimonial.role} — {testimonial.company}</p>
        </div>
        <Stars rating={testimonial.rating} />
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-24 bg-bone">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-celadon text-sm font-body uppercase tracking-widest mb-3">
            Témoignages
          </span>
          <h2 className="font-display font-light text-3xl md:text-4xl text-dark-oak">
            Ils nous font confiance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
