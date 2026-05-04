import { motion } from 'framer-motion'

interface Property {
  icon: React.ReactNode
  label: string
  value: string
}

function ThermometerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A4F3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  )
}
function SoundWaveIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A4F3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12h2M6 8v8M10 5v14M14 8v8M18 10v4M22 12h-2" />
    </svg>
  )
}
function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A4F3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
function RecycleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A4F3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  )
}
function FlameIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A4F3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

const properties: Property[] = [
  { icon: <ThermometerIcon />, label: 'Isolation thermique',  value: 'λ 0.04 W/m·K' },
  { icon: <SoundWaveIcon />,  label: 'Isolation acoustique', value: 'Rw 42 dB' },
  { icon: <LeafIcon />,       label: 'Léger & résistant',    value: '≥ 150 kPa' },
  { icon: <RecycleIcon />,    label: 'Écologique biosourcé', value: 'CO₂ négatif' },
  { icon: <FlameIcon />,      label: 'Résistant au feu',     value: 'Euroclasse E' },
]

export default function PropertiesStrip() {
  return (
    <section
      className="bg-raw-linen py-10"
      style={{ borderTopWidth: '0.5px', borderTopColor: '#C4B49A', borderTopStyle: 'solid' }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-center items-stretch">
          {properties.map((prop, i) => (
            <motion.div
              key={prop.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center text-center px-6 py-4 flex-1 min-w-[160px] relative"
            >
              {/* Vertical divider */}
              {i > 0 && (
                <div
                  className="hidden md:block absolute left-0 top-1/4 bottom-1/4"
                  style={{ width: '0.5px', backgroundColor: '#C4B49A' }}
                  aria-hidden="true"
                />
              )}
              <div className="mb-3">{prop.icon}</div>
              <span className="font-body text-umber uppercase tracking-[0.12em] text-[10px] mb-1.5 leading-snug">
                {prop.label}
              </span>
              <span className="font-body font-normal text-dark-oak text-sm">
                {prop.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
