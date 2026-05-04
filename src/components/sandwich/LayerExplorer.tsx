import { useState } from 'react'
import LayerDiagram from './LayerDiagram'
import LayerInfoPanel from './LayerInfoPanel'

export default function LayerExplorer() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)
  const [thickness, setThickness] = useState(80)

  const handleLayerClick = (id: string | null) => {
    setActiveLayer((prev) => (prev === id ? null : id))
  }

  const handleBack = () => setActiveLayer(null)

  return (
    <section className="bg-lichen py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-[60%_40%] md:gap-12 items-start gap-8">
          {/* Left — 3D diagram */}
          <div className="w-full md:sticky md:top-20">
            <LayerDiagram
              activeLayer={activeLayer}
              onLayerClick={handleLayerClick}
              thickness={thickness}
            />
            <p className="text-center font-body text-loam-mid text-[11px] uppercase tracking-[0.12em] mt-2">
              Cliquez sur une couche pour explorer
            </p>
          </div>

          {/* Right — info panel */}
          <div className="w-full">
            <LayerInfoPanel
              activeLayer={activeLayer}
              thickness={thickness}
              onThicknessChange={setThickness}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
