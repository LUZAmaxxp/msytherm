import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HERO_CONTENT } from '@/constants/content'

const HeroCanvas = lazy(() => import('@/components/three/HeroCanvas'))

const ease = [0.25, 0.1, 0.25, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  }
}

function CanvasSkeleton() {
  return (
    <div className="w-full h-full min-h-[320px] md:min-h-[480px] bg-obsidian/30 rounded-sm animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-kiln-red border-t-transparent animate-spin" role="status" aria-label="Chargement de la scène 3D" />
    </div>
  )
}

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToProduct = () => {
    document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' })
  }

  const trustItems = ['🌿 100% Biosourcé', '🔥 Ignifuge', '🇫🇷 Fabriqué en France']

  return (
    <section className="relative min-h-screen bg-dark-oak flex items-center pt-16 overflow-hidden">

      {/* Background gradient blobs */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(122,79,58,0.22)_0%,_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(92,112,104,0.10)_0%,_transparent_50%)]"
        aria-hidden="true"
      />

      {/* Animated top edge shimmer */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-[64px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-straw/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            <motion.div {...fadeUp(0.1)}>
              <Badge
                variant="outline"
                className="self-start border-straw/40 text-straw text-xs rounded-sm tracking-widest uppercase font-body px-3 py-1"
              >
                {HERO_CONTENT.badge}
              </Badge>
            </motion.div>

            {/* Headline line 1 */}
            <motion.h1
              {...fadeUp(0.28)}
              className="font-display font-light italic text-bone leading-[1.08] m-0"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}
            >
              {HERO_CONTENT.headline}
            </motion.h1>

            {/* Headline accent line */}
            <motion.span
              {...fadeUp(0.44)}
              className="block font-display font-light italic text-kiln-red leading-[1.08] -mt-3"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}
            >
              {HERO_CONTENT.subheadline}
            </motion.span>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease }}
              style={{ transformOrigin: 'left' }}
              className="w-12 h-px bg-straw/50 -mt-1"
              aria-hidden="true"
            />

            {/* Description */}
            <motion.p
              {...fadeUp(0.62)}
              className="text-straw/70 font-body text-[0.97rem] leading-relaxed max-w-[480px] -mt-1"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.76)}
              className="flex flex-col sm:flex-row gap-3 mt-1"
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                aria-label="Demander un devis gratuit"
                className="rounded-sm"
              >
                {HERO_CONTENT.cta_primary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToProduct}
                className="border-bone/25 text-bone hover:bg-obsidian/40 rounded-sm"
                aria-label="Découvrir notre produit"
              >
                {HERO_CONTENT.cta_secondary}
              </Button>
            </motion.div>

            {/* Trust badges — individually staggered */}
            <div className="flex flex-wrap gap-5 mt-1">
              {trustItems.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.95 + i * 0.14, ease }}
                  className="text-[0.82rem] text-umber/70 font-body"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Right: 3D Canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.05, delay: 0.35, ease }}
            className="w-full h-[320px] md:h-[480px] rounded-sm overflow-hidden"
          >
            <Suspense fallback={<CanvasSkeleton />}>
              <HeroCanvas />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToProduct}
        aria-hidden="true"
      >
        <span className="text-[10px] text-umber/40 font-body uppercase tracking-[0.18em]">Découvrir</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-straw/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
