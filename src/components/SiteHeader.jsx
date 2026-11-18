import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from './Brand'

const websiteLinks = [
  { label: 'Home', href: 'https://mottosolution.com/' },
  { label: 'About', href: 'https://mottosolution.com/?page_id=1490' },
  { label: 'Services', href: 'https://mottosolution.com/services/' },
  { label: 'Contact', href: 'https://mottosolution.com/contacttt/' },
]

export default function SiteHeader({ actionLabel, actionTo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Brand />
        <button
          className="site-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close website navigation' : 'Open website navigation'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav id="site-navigation" className={`site-nav${menuOpen ? ' site-nav-open' : ''}`} aria-label="Main website navigation">
          {websiteLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <Link className="site-nav-cta" to={actionTo} onClick={closeMenu}>{actionLabel}</Link>
        </nav>
      </div>
    </header>
  )
}
