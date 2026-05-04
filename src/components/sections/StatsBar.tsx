import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { STATS } from '@/constants/content'

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const isDecimal = target < 1

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(isDecimal ? 3 : 0)))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration])

  return count
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 2200, active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-4xl md:text-5xl font-display font-light italic text-dark-oak">
        {value < 1 ? count.toFixed(3) : Math.round(count)}{suffix}
      </span>
      <span className="mt-2 text-sm md:text-base text-umber font-body uppercase tracking-[0.12em]">{label}</span>
    </motion.div>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-raw-linen py-14 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
