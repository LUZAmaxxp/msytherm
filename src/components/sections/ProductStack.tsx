import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { LAYERS, PRODUCTS } from '@/constants/content'
import type { Layer } from '@/types'

const LayerExploderCanvas = lazy(() => import('@/components/three/LayerExploderCanvas'))

function LayerPanel({ activeId }: { activeId: string | null }) {
  const layer: Layer | undefined = LAYERS.find((l) => l.id === activeId) ?? LAYERS[1]

  return (
    <motion.div
      key={layer.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 p-6 bg-lichen rounded-sm border border-sage/40"
    >
      <div className="flex items-center gap-3">
        <div className="w-4 h-10 rounded-sm flex-shrink-0" style={{ backgroundColor: layer.color }} />
        <div>
          <h3 className="font-display font-light text-loam text-lg">{layer.name}</h3>
          <p className="text-xs text-loam-mid">{layer.material}</p>
        </div>
      </div>
      <p className="text-sm text-loam/80 font-body leading-relaxed">{layer.description}</p>
      <ul className="space-y-1.5">
        {layer.properties.map((prop) => (
          <li key={prop} className="flex items-center gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-resin flex-shrink-0" aria-hidden="true" />
            <span className="text-dark-oak">{prop}</span>
          </li>
        ))}
      </ul>
      {!activeId && (
        <p className="text-xs text-loam-mid italic">Cliquez sur une couche dans la vue 3D pour voir ses détails</p>
      )}
    </motion.div>
  )
}

export default function ProductStack() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)

  return (
    <section id="product" className="py-20 md:py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sage text-sm font-body uppercase tracking-widest mb-3">
            Notre Produit
          </span>
          <h2 className="font-display font-light text-3xl md:text-4xl text-loam">
            Panneau Sandwich Mycélium
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-loam-mid font-body">
            4 couches complémentaires pour une isolation complète. Explorez la composition en 3D.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-14">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[300px] md:h-[420px] bg-[#141910] rounded-sm overflow-hidden shadow-lg"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-resin border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <LayerExploderCanvas onLayerSelect={setActiveLayer} />
            </Suspense>
          </motion.div>

          {/* Layer info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-display font-light text-xl text-loam">Composition du panneau</h3>
            <div className="flex flex-col gap-2">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  className={`flex items-center gap-3 p-3 rounded-sm border transition-all text-left ${
                    activeLayer === layer.id
                      ? 'bg-[#141910] border-resin'
                      : 'bg-parchment border-sage hover:border-resin/50'
                  }`}
                >
                  <div className="w-3 h-6 rounded-sm flex-shrink-0" style={{ backgroundColor: layer.color }} />
                  <span className="text-sm font-medium text-loam">{layer.name}</span>
                  <span className="text-xs text-loam-mid ml-auto">{layer.material}</span>
                </button>
              ))}
            </div>
            <LayerPanel activeId={activeLayer} />
          </motion.div>
        </div>

        {/* Product variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-parchment rounded-sm p-6 border border-sage/40"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-display font-light text-loam text-lg">{product.name}</h3>
                <span className="text-xs bg-resin text-parchment px-2 py-1 rounded-sm">
                  {product.thickness}
                </span>
              </div>
              <p className="text-sm text-loam-mid mb-3 font-body">{product.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-loam">λ = {product.lambda}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <span key={app} className="text-xs bg-lichen text-loam-mid px-2 py-1 rounded-sm">
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
