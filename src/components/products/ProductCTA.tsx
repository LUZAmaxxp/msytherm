import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProductCTA() {
  const navigate = useNavigate()

  return (
    <section
      className="bg-bone py-12 px-6"
      style={{ borderTopWidth: '0.5px', borderTopColor: '#C4B49A', borderTopStyle: 'solid' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p
          className="font-display font-light italic text-dark-oak text-center md:text-left"
          style={{ fontSize: '1.4rem' }}
        >
          Intéressé par nos panneaux pour votre projet&nbsp;?
        </p>

        <button
          onClick={() => navigate('/#contact')}
          className="shrink-0 bg-kiln-red text-bone font-body font-normal text-sm tracking-wide px-8 py-3 rounded-sm cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-1 focus-visible:outline-kiln-red focus-visible:outline-offset-2"
        >
          Demander un devis
        </button>
      </motion.div>
    </section>
  )
}
