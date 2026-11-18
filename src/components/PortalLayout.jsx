import { useState } from 'react'
import { Bell, ChevronDown, CircleHelp, LayoutDashboard, LogOut, Menu, Plus, Ticket, Users, UserRound, X } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { usePortal } from '../context/usePortal.js'

function Sidebar({ close }) {
  const { user } = usePortal()
  const location = useLocation()
  const isRaisePage = location.pathname === '/raise-ticket'
  const isAdmin = user?.role === 'Admin'
  const navigation = isAdmin
    ? [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/tickets', label: 'All tickets', icon: Ticket },
      { to: '/admin/customers', label: 'Customers', icon: Users },
    ]
    : [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/my-tickets', label: 'My tickets', icon: Ticket },
      { to: '/profile', label: 'My profile', icon: UserRound },
    ]
  return (
    <aside className="sidebar">
      <div className="sidebar-brand"><strong>Support workspace</strong><button className="icon-button mobile-close" onClick={close} aria-label="Close navigation"><X size={19} /></button></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="side-nav" aria-label="Workspace navigation">
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={close} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
          </NavLink>
        ))}
        {!isAdmin && <NavLink to="/raise-ticket" onClick={close} className={`nav-link${isRaisePage ? ' active' : ''}`}>
          <Plus size={18} strokeWidth={1.8} /><span>Raise a ticket</span>
        </NavLink>}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><span className="help-icon"><CircleHelp size={17} /></span><strong>Need a hand?</strong><p>Our support team is ready to help.</p><a href="mailto:support@mottosolution.com">Contact support <span>↗</span></a></div>
      </div>
    </aside>
  )
}

export default function PortalLayout() {
  const { user, logout } = usePortal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const pageTitle = location.pathname.startsWith('/ticket/') ? 'Ticket details' : ({
    '/dashboard': 'Dashboard',
    '/raise-ticket': 'Raise a ticket',
    '/my-tickets': 'My tickets',
    '/profile': 'My profile',
    '/admin/dashboard': 'Admin dashboard',
    '/admin/tickets': 'All tickets',
    '/admin/customers': 'Customers',
  }[location.pathname] || 'Support portal')
  const initials = (user?.name || 'Customer').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="portal-shell" style={{ '--header-height': '0px' }}>
      <div className="portal-workspace">
        {mobileOpen && <button className="sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Close workspace navigation" />}
        <div className={`sidebar-wrap${mobileOpen ? ' sidebar-wrap-open' : ''}`}><Sidebar close={() => setMobileOpen(false)} /></div>
        <div className="portal-main">
          <header className="topbar">
            <div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open workspace navigation"><Menu size={20} /></button><span className="topbar-title">{pageTitle}</span></div>
            <div className="topbar-actions"><span className="topbar-help">{user?.role} portal · <a href="mailto:support@mottosolution.com">Contact support</a></span><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="topbar-divider" /><span className="user-menu"><span className="avatar">{initials}</span><span className="user-name">{user?.name}</span><ChevronDown size={15} /></span><button className="signout-button" onClick={handleLogout} aria-label="Sign out"><LogOut size={16} /><span>Sign out</span></button></div>
          </header>
          <main className="page-content"><Outlet /></main>
        </div>
      </div>
    </div>
  )
}
