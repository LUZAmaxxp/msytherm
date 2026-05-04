import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { NavLink } from '@/types'

interface MobileMenuProps {
  links: NavLink[]
  onNavigate: (href: string, isRoute?: boolean) => void
}

export default function MobileMenu({ links, onNavigate }: MobileMenuProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="md:hidden bg-humus border-t border-loam/50"
      aria-label="Menu mobile"
    >
      <div className="px-4 py-4 flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => onNavigate(link.href, link.isRoute)}
            className="text-parchment/80 hover:text-parchment text-left py-3 px-2 text-base font-body border-b border-loam/30 last:border-0 transition-colors"
          >
            {link.label}
          </button>
        ))}
        <Button
          className="mt-2 w-full"
          onClick={() => onNavigate('#contact')}
        >
          Devis Gratuit
        </Button>
      </div>
    </motion.nav>
  )
}
