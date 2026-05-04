import { motion } from 'framer-motion'

interface LayerDiagramProps {
  activeLayer: string | null
  onLayerClick: (id: string | null) => void
  thickness: number
}

interface Layer {
  id: string
  label: string
  translateZ: number
  height: number | null  // null = dynamic (from thickness)
  style: React.CSSProperties
  textColor: string
}

const BASE_THICKNESS_PX = 80  // px for 80mm reference

export default function LayerDiagram({ activeLayer, onLayerClick, thickness }: LayerDiagramProps) {
  const myceliumHeight = Math.round((thickness / 80) * BASE_THICKNESS_PX)

  const layers: Layer[] = [
    {
      id: 'exterior',
      label: 'Finition extérieure',
      translateZ: 48,
      height: 52,
      style: {
        background: 'linear-gradient(135deg, #C9955C, #A8784A)',
        borderColor: '#8C7355',
      },
      textColor: '#F7F2EB',
    },
    {
      id: 'mycelium',
      label: 'Âme en mycélium',
      translateZ: 0,
      height: myceliumHeight,
      style: {
        backgroundImage: "url('/images/products/product-cubes-stack.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#E8D5B0',
        borderColor: '#C4B49A',
      },
      textColor: '#2A2318',
    },
    {
      id: 'interior',
      label: 'Finition intérieure',
      translateZ: -48,
      height: 52,
      style: {
        background: 'linear-gradient(135deg, #D4B896, #B89A78)',
        borderColor: '#8C7355',
      },
      textColor: '#2A2318',
    },
  ]

  return (
    <div className="flex items-center justify-center py-12 px-4 select-none" style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ rotateX: 0, rotateY: 0, opacity: 0.4, scale: 0.9 }}
        animate={{ rotateX: 10, rotateY: -15, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.3 }}
        style={{ transformStyle: 'preserve-3d', width: 320 }}
        className="flex flex-col gap-0"
      >
        {layers.map((layer) => {
          const isActive = activeLayer === layer.id
          const isDimmed = activeLayer !== null && !isActive
          return (
            <motion.div
              key={layer.id}
              animate={{
                scale: isActive ? 1.05 : isDimmed ? 0.97 : 1,
                opacity: isDimmed ? 0.3 : 1,
                translateY: isActive ? -4 : 0,
                filter: isActive ? 'brightness(1.05)' : 'brightness(1)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              whileHover={{
                filter: 'brightness(1.08)',
                translateY: -2,
              }}
              onClick={() => onLayerClick(activeLayer === layer.id ? null : layer.id)}
              style={{
                ...layer.style,
                height: layer.height ?? myceliumHeight,
                borderWidth: '0.5px',
                borderStyle: 'solid',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
              }}
              className="w-full relative transition-shadow duration-200 overflow-hidden"
              role="button"
              aria-pressed={isActive}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onLayerClick(activeLayer === layer.id ? null : layer.id)}
            >
              {/* Depth side — right edge */}
              <div
                className="absolute top-0 bottom-0 right-0 w-3 opacity-40"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(42,35,24,0.4))',
                }}
                aria-hidden="true"
              />
              {/* Layer label */}
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-[10px] uppercase tracking-[0.12em] pointer-events-none"
                style={{ color: layer.textColor, textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}
              >
                {layer.label}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
