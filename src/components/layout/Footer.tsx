import { NAV_LINKS } from '@/constants/content'

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-obsidian text-umber" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-kiln-red font-display font-light italic text-2xl">Mys</span>
              <span className="text-bone font-display font-light italic text-2xl">Therm</span>
            </div>
            <p className="text-sm leading-relaxed text-umber/80">
              L'isolation biosourcée de demain, disponible aujourd'hui. Panneaux sandwich en mycélium pour un habitat plus sain et plus durable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-straw font-body font-normal uppercase tracking-[0.12em] mb-4 text-sm">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm hover:text-bone transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-straw font-body font-normal uppercase tracking-[0.12em] mb-4 text-sm">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@mystherm.fr" className="hover:text-bone transition-colors">
                  contact@mystherm.fr
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="hover:text-bone transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="text-umber/60">Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-straw/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-umber/70 font-body">
          <p>© {new Date().getFullYear()} MysTherm. Tous droits réservés.</p>
          <p>Isolation biosourcée — Fait en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  )
}
