import { motion } from 'framer-motion'
import LayerExplorer from '@/components/sandwich/LayerExplorer'

export default function SandwichPanel() {
  return (
    <main>
      {/* Page header */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ minHeight: '40vh', backgroundColor: '#2A2318' }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(122,79,58,0.18) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          <p className="font-body text-umber uppercase tracking-[0.15em] text-[11px]">
            Explorez la composition couche par couche
          </p>
          <h1
            className="font-display font-light italic text-bone leading-[1.08]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Panneau Sandwich<br />
            <span className="text-straw">en Mycélium</span>
          </h1>
        </motion.div>
      </section>

      {/* Interactive layer explorer */}
      <LayerExplorer />
    </main>
  )
}
