import { motion } from 'framer-motion'
import { STEPS } from '@/constants/content'
import type { Step } from '@/types'

interface StepCardProps {
  step: Step
  index: number
}

function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-bone rounded-sm p-6 border border-straw/40 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <span className="font-display font-light text-5xl text-straw select-none">{step.number}</span>
        <div
          id={`mini-canvas-${step.id}`}
          className="w-24 h-16 rounded-sm bg-raw-linen/60 overflow-hidden flex-shrink-0"
          role="img"
          aria-label={`Animation: ${step.title}`}
        />
      </div>
      <div>
        <h3 className="font-display font-light text-lg text-dark-oak mb-2">{step.title}</h3>
        <p className="text-sm text-umber leading-relaxed font-body">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-celadon text-sm font-body uppercase tracking-widest mb-3">
            Notre processus
          </span>
          <h2 className="font-display font-light text-3xl md:text-4xl text-dark-oak">
            Comment ça marche ?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-umber font-body">
            De l'audit à la certification, nous gérons tout — pour une rénovation sans stress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
