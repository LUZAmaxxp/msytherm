import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function ProductHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-viewport background image */}
      <img
        src="/images/products/product-wave-panel.jpg"
        alt="Large mycelium panel with organic wave texture in a natural wood display stand"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Gradient overlay — obsidian tint bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(42,35,24,0.80) 0%, rgba(42,35,24,0.35) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom-left text content */}
      <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-20 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="font-display font-light italic text-bone leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
        >
          Grown, not made.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease }}
          className="font-body text-straw text-sm tracking-[0.08em] max-w-md leading-relaxed"
        >
          Isolation biosourcée en mycélium — thermique, acoustique, résistante au feu.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-straw/50 font-body uppercase tracking-[0.18em]">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-straw/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
