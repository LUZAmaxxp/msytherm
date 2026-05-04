import { motion } from 'framer-motion'

interface GridImage {
  src: string
  alt: string
  caption: string
  className: string
  imgClassName: string
}

const images: GridImage[] = [
  {
    src: '/images/products/product-cubes-stack.jpg',
    alt: 'Three mycelium insulation blocks stacked — fine, medium, and coarse texture grades',
    caption: 'Grades de densité — fin, médium, brut',
    className: 'row-span-2',
    imgClassName: 'aspect-[3/4] h-full',
  },
  {
    src: '/images/products/product-hex-tiles.jpg',
    alt: 'Four hexagonal mycelium tiles arranged in a cross formation showing texture variation',
    caption: 'Tuiles hexagonales — modulaires et emboîtables',
    className: 'col-span-2',
    imgClassName: 'aspect-video w-full',
  },
  {
    src: '/images/products/product-panel-frame.jpg',
    alt: 'Mycelium panels installed in pine wood frames showing honeycomb and solid variants',
    caption: 'Panneaux encadrés — prêts à poser',
    className: '',
    imgClassName: 'aspect-square w-full',
  },
  {
    src: '/images/products/product-mycelium-bag.jpg',
    alt: 'Growing mycelium substrate bag with oyster mushrooms — raw material stage',
    caption: 'Substrat vivant — matière première',
    className: '',
    imgClassName: 'aspect-square w-full',
  },
]

function GridCell({ img, index }: { img: GridImage; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative group overflow-hidden rounded-sm ${img.className}`}
    >
      <div className={`relative overflow-hidden ${img.imgClassName}`}>
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            [filter:saturate(0.85)]
            group-hover:[filter:saturate(1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4"
          style={{ background: 'linear-gradient(to top, rgba(26,31,20,0.65) 0%, transparent 60%)' }}
        >
          <span className="text-[11px] text-bone font-body uppercase tracking-[0.1em]">
            {img.caption}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function EditorialGrid() {
  return (
    <section className="bg-parchment py-16 md:py-24 px-4 sm:px-8 lg:px-16">
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3 max-w-7xl mx-auto">
        {images.map((img, i) => (
          <GridCell key={img.src} img={img} index={i} />
        ))}
      </div>

      {/* Mobile: single column */}
      <div className="md:hidden flex flex-col gap-3">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="relative group overflow-hidden rounded-sm"
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover [filter:saturate(0.85)] group-hover:[filter:saturate(1)] group-hover:scale-[1.03] transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(26,31,20,0.65) 0%, transparent 60%)' }}>
                <span className="text-[11px] text-parchment font-body uppercase tracking-[0.1em]">
                  {img.caption}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
