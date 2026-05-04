import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration])
  return count
}

export default function MaterialStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const count = useCountUp(100, 2200, inView)

  return (
    <section
      ref={ref}
      className="bg-obsidian min-h-[50vh] flex items-center border-t"
      style={{ borderTopColor: '#4A3D2E', borderTopWidth: '0.5px' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 w-full grid grid-cols-1 md:grid-cols-[40%_60%] gap-10 md:gap-20 items-center">

        {/* Left — big number */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-start"
        >
          <span
            className="font-display font-light italic text-straw leading-none"
            style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
          >
            {count}%
          </span>
          <span className="font-body text-umber uppercase tracking-[0.2em] text-[11px] mt-2">
            biosourcé
          </span>
        </motion.div>

        {/* Right — editorial paragraph */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display font-light text-raw-linen max-w-[520px] leading-[1.9]"
          style={{ fontSize: '1.2rem' }}
        >
          Le mycélium — réseau racinaire du champignon — est cultivé sur des substrats agricoles
          locaux. En quelques jours, il colonise le moule, se solidifie, et crée un matériau
          d'isolation naturel, sans colle, sans plastique, sans empreinte carbone excessive.
        </motion.p>
      </div>
    </section>
  )
}
