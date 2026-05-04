import { useEffect, useRef, useState } from 'react'

interface ThicknessSelectorProps {
  value: number
  onChange: (v: number) => void
}

const OPTIONS = [40, 60, 80, 100, 120]

export default function ThicknessSelector({ value, onChange }: ThicknessSelectorProps) {
  const [displayR, setDisplayR] = useState(() => value / 1000 / 0.04)
  const rafRef = useRef<number>(0)
  const prevRef = useRef<number>(displayR)

  useEffect(() => {
    const target = value / 1000 / 0.04
    const from = prevRef.current
    const start = performance.now()
    const duration = 400

    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = from + (target - from) * eased
      setDisplayR(Math.round(current * 10) / 10)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        prevRef.current = target
      }
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return (
    <div className="flex flex-col gap-3">
      <span className="font-body text-loam-mid uppercase tracking-[0.12em] text-[10px]">Épaisseur</span>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={[
              'font-body text-[13px] px-3 py-1.5 rounded-sm border transition-colors duration-150',
              opt === value
                ? 'bg-resin text-parchment border-resin'
                : 'text-loam border-sage hover:border-resin hover:text-resin bg-transparent',
            ].join(' ')}
            aria-pressed={opt === value}
          >
            {opt} mm
          </button>
        ))}
      </div>
      <p className="font-body text-loam text-sm">
        <span className="text-loam-mid text-[10px] uppercase tracking-[0.1em] mr-1">R =</span>
        <span className="font-medium">{displayR.toFixed(1)}</span>
        <span className="text-loam-mid text-xs ml-1">m²·K/W</span>
      </p>
    </div>
  )
}
