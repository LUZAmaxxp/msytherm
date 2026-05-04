import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/constants/content'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string, isRoute?: boolean) => {
    setMenuOpen(false)
    if (isRoute) {
      navigate(href)
    } else {
      // If not on home page, navigate home first then scroll
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-humus shadow-lg' : 'bg-humus/95'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resin rounded"
          >
            <span className="text-resin font-display font-light italic text-xl tracking-tight">Mys</span>
            <span className="text-parchment font-display font-light italic text-xl tracking-tight">Therm</span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.isRoute)}
                className="text-parchment/60 hover:text-parchment text-sm font-body transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resin rounded px-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => handleNav('#contact')}
              aria-label="Demander un devis gratuit"
            >
              Devis Gratuit
            </Button>
            <button
              className="md:hidden text-parchment p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resin"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Ouvrir le menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu links={NAV_LINKS} onNavigate={handleNav} />
        )}
      </AnimatePresence>
    </motion.header>
  )
}

