import ProductHero from '@/components/products/ProductHero'
import EditorialGrid from '@/components/products/EditorialGrid'
import MaterialStatement from '@/components/products/MaterialStatement'
import PropertiesStrip from '@/components/products/PropertiesStrip'
import ProductCTA from '@/components/products/ProductCTA'

export default function Products() {
  return (
    <main>
      <ProductHero />
      <EditorialGrid />
      <MaterialStatement />
      <PropertiesStrip />
      <ProductCTA />
    </main>
  )
}
