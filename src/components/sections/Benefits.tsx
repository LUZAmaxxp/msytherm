import { motion } from 'framer-motion'
import { BENEFITS } from '@/constants/content'
import type { Benefit } from '@/types'

const accentMap: Record<Benefit['accentColor'], string> = {
  terracotta: 'border-resin',
  moss: 'border-moss-water',
  slate: 'border-resin',
  sand: 'border-sage',
}

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className={`bg-parchment rounded-sm p-6 border-t-4 ${accentMap[benefit.accentColor]} border border-sage/40 flex flex-col gap-3`}
    >
      <span className="text-3xl" aria-hidden="true">{benefit.icon}</span>
      <h3 className="font-display font-light text-lg text-loam">{benefit.title}</h3>
      <p className="text-sm text-loam-mid font-body leading-relaxed">{benefit.description}</p>
    </motion.div>
  )
}

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-24 bg-lichen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sage text-sm font-body uppercase tracking-widest mb-3">
            Pourquoi MysTherm
          </span>
          <h2 className="font-display font-light text-3xl md:text-4xl text-loam">
            Les avantages du mycélium
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-loam-mid font-body">
            Performance technique sans compromis sur l'écologie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.id} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
