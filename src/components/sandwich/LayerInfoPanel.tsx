import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PropertyBadge from './PropertyBadge'
import ThicknessSelector from './ThicknessSelector'

interface LayerInfoPanelProps {
  activeLayer: string | null
  thickness: number
  onThicknessChange: (v: number) => void
  onBack: () => void
}

// ── tiny inline icons ──────────────────────────────────────────────
function Icon({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}
const icons = {
  thermo: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
  sound:  'M2 12h2M6 8v8M10 5v14M14 8v8M18 10v4M22 12h-2',
  leaf:   'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
  recycle:'M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15',
  flame:  'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
}

const panelVariants = {
  enter:  { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -24 },
}

function Divider() {
  return <div className="w-full h-px" style={{ backgroundColor: '#C4B49A' }} />
}

function TechRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-2">
      <span className="font-body text-umber text-[11px] uppercase tracking-[0.1em]">{label}</span>
      <span className="font-body text-dark-oak text-sm">{value}</span>
    </div>
  )
}

// ── Overview panel ─────────────────────────────────────────────────
function OverviewPanel({ thickness, onThicknessChange }: { thickness: number; onThicknessChange: (v: number) => void }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display font-light italic text-obsidian leading-snug" style={{ fontSize: '1.6rem' }}>
          Panneau Sandwich Isolant
        </h2>
        <p className="font-body text-umber uppercase tracking-[0.15em] text-[11px] mt-1">en mycélium</p>
      </div>
      <p className="font-body text-umber text-[13px] leading-relaxed">
        Sélectionnez une couche du diagramme pour explorer sa composition, ses matériaux et ses propriétés techniques.
      </p>
      <div className="grid grid-cols-2 gap-y-3 gap-x-2">
        <PropertyBadge icon={<Icon d={icons.thermo} />} label="Isolation thermique" />
        <PropertyBadge icon={<Icon d={icons.sound} />} label="Isolation acoustique" />
        <PropertyBadge icon={<Icon d={icons.leaf} />} label="Biosourcé 100%" />
        <PropertyBadge icon={<Icon d={icons.recycle} />} label="CO₂ négatif" />
        <PropertyBadge icon={<Icon d={icons.flame} />} label="Euroclasse E" />
      </div>
      <Divider />
      <ThicknessSelector value={thickness} onChange={onThicknessChange} />
      <Divider />
      <button
        onClick={() => navigate('/#contact')}
        className="w-full bg-kiln-red text-bone font-body text-sm py-3 rounded-sm hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-1 focus-visible:outline-kiln-red"
      >
        Demander un échantillon
      </button>
    </div>
  )
}

// ── Exterior panel ─────────────────────────────────────────────────
function ExteriorPanel({ onBack }: { onBack: () => void }) {
  const finishes = [
    { name: 'Bois massif',     note: 'Chêne, pin ou hêtre — 18 mm' },
    { name: 'OSB',             note: 'Orienté structurel — 15 mm' },
    { name: 'Fermacell',       note: 'Fibre-ciment — 12.5 mm' },
    { name: 'Plâtre BA13',     note: 'Classique peignable — 13 mm' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#C9955C' }} />
        <span className="font-body text-umber uppercase tracking-[0.12em] text-[10px]">Finition extérieure</span>
      </div>
      <h3 className="font-display font-light italic text-obsidian" style={{ fontSize: '1.3rem' }}>
        Surface de protection
      </h3>
      <p className="font-body text-umber text-[13px] leading-relaxed">
        La face extérieure est disponible en plusieurs finitions pour répondre aux exigences architecturales et climatiques.
      </p>
      <div className="flex flex-col">
        {finishes.map((f, i) => (
          <div key={f.name}>
            {i > 0 && <Divider />}
            <div className="py-2.5">
              <p className="font-body font-normal text-dark-oak text-sm">{f.name}</p>
              <p className="font-body font-light italic text-umber text-[12px] mt-0.5">{f.note}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <TechRow label="Épaisseur" value="12–18 mm" />
      <TechRow label="Fixation" value="Collage + vissage" />
      <TechRow label="Résistance" value="IPX3 (pluie battante)" />
      <Divider />
      <button onClick={onBack} className="font-body text-umber text-[13px] text-left hover:text-dark-oak transition-colors mt-1">
        ← Retour vue ensemble
      </button>
    </div>
  )
}

// ── Mycelium panel ─────────────────────────────────────────────────
function MyceliumPanel({ thickness, onThicknessChange, onBack }: { thickness: number; onThicknessChange: (v: number) => void; onBack: () => void }) {
  const steps = [
    { n: '01', label: 'Inoculation',   detail: 'Le substrat agricole est ensemencé' },
    { n: '02', label: 'Croissance',    detail: '5–7 jours en chambre à 25°C' },
    { n: '03', label: 'Démoulage',     detail: 'Mise en forme finale' },
    { n: '04', label: 'Pasteurisation',detail: 'Arrêt de la croissance — produit stable' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#E8D5B0' }} />
        <span className="font-body text-umber uppercase tracking-[0.12em] text-[10px]">Âme isolante en mycélium</span>
      </div>
      <h3 className="font-display font-light italic text-obsidian" style={{ fontSize: '1.3rem' }}>
        Le cœur vivant du panneau
      </h3>
      <div className="relative flex flex-col gap-0 pl-5">
        {/* Connecting line */}
        <div className="absolute left-1.5 top-3 bottom-3 w-px" style={{ backgroundColor: '#C4B49A' }} aria-hidden="true" />
        {steps.map((s) => (
          <div key={s.n} className="flex gap-3 items-start py-2">
            <span className="font-display font-light italic text-kiln-red text-sm shrink-0 relative z-10 bg-bone pr-1">{s.n}</span>
            <div>
              <p className="font-body font-normal text-dark-oak text-sm">{s.label}</p>
              <p className="font-body text-umber text-[12px]">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <ThicknessSelector value={thickness} onChange={onThicknessChange} />
      <Divider />
      <TechRow label="Conductivité λ" value="0.038–0.042 W/m·K" />
      <TechRow label="Compression" value="≥ 150 kPa" />
      <TechRow label="Feu" value="Euroclasse E" />
      <TechRow label="Acoustique αw" value="0.65–0.80" />
      <TechRow label="Densité" value="80–120 kg/m³" />
      <TechRow label="Bilan carbone" value="CO₂ négatif" />
      <Divider />
      <button onClick={onBack} className="font-body text-umber text-[13px] text-left hover:text-dark-oak transition-colors mt-1">
        ← Retour vue ensemble
      </button>
    </div>
  )
}

// ── Interior panel ─────────────────────────────────────────────────
function InteriorPanel({ onBack }: { onBack: () => void }) {
  const finishes = [
    { name: 'Plaque de plâtre BA13', note: 'Peignable, coupe-feu' },
    { name: 'Bois contreplaqué',     note: 'Naturel, découpable' },
    { name: 'MDF hydrofuge',         note: 'Zones humides' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: '#D4B896' }} />
        <span className="font-body text-umber uppercase tracking-[0.12em] text-[10px]">Finition intérieure</span>
      </div>
      <h3 className="font-display font-light italic text-obsidian" style={{ fontSize: '1.3rem' }}>
        Surface intérieure habitable
      </h3>
      <div className="flex flex-col">
        {finishes.map((f, i) => (
          <div key={f.name}>
            {i > 0 && <Divider />}
            <div className="py-2.5">
              <p className="font-body font-normal text-dark-oak text-sm">{f.name}</p>
              <p className="font-body font-light italic text-umber text-[12px] mt-0.5">{f.note}</p>
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <TechRow label="Épaisseur" value="10–18 mm" />
      <TechRow label="Surface" value="Peignable" />
      <TechRow label="Fixation" value="Collage" />
      <Divider />
      <button onClick={onBack} className="font-body text-umber text-[13px] text-left hover:text-dark-oak transition-colors mt-1">
        ← Retour vue ensemble
      </button>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function LayerInfoPanel({ activeLayer, thickness, onThicknessChange, onBack }: LayerInfoPanelProps) {
  return (
    <div
      className="bg-bone border rounded-sm p-8 overflow-y-auto max-h-[600px] md:max-h-none"
      style={{ borderColor: '#C4B49A', borderWidth: '0.5px', width: '100%' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer ?? 'overview'}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {activeLayer === 'exterior' ? (
            <ExteriorPanel onBack={onBack} />
          ) : activeLayer === 'mycelium' ? (
            <MyceliumPanel thickness={thickness} onThicknessChange={onThicknessChange} onBack={onBack} />
          ) : activeLayer === 'interior' ? (
            <InteriorPanel onBack={onBack} />
          ) : (
            <OverviewPanel thickness={thickness} onThicknessChange={onThicknessChange} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
