import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import HowItWorks from '@/components/sections/HowItWorks'
import ProductStack from '@/components/sections/ProductStack'
import Benefits from '@/components/sections/Benefits'
import Testimonials from '@/components/sections/Testimonials'
import ContactForm from '@/components/sections/ContactForm'

const Products = lazy(() => import('@/pages/Products'))
const SandwichPanel = lazy(() => import('@/pages/SandwichPanel'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-bone flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-kiln-red border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-kiln-red text-bone px-4 py-2 rounded z-[100]"
      >
        Aller au contenu principal
      </a>
      <main id="main-content">
        <Hero />
        <StatsBar />
        <HowItWorks />
        <ProductStack />
        <Benefits />
        <Testimonials />
        <ContactForm />
      </main>
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/panneau-sandwich" element={<SandwichPanel />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

