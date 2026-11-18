import { ArrowRight, CheckCircle2, Clock3, Plus, Ticket, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import TicketTable from '../components/TicketTable'
import { usePortal } from '../context/usePortal.js'

export default function AdminDashboard() {
  const { tickets, user } = usePortal()
  const counts = {
    total: tickets.length,
    new: tickets.filter((ticket) => ticket.status === 'New').length,
    progress: tickets.filter((ticket) => ticket.status === 'In Progress').length,
    resolved: tickets.filter((ticket) => ticket.status === 'Resolved').length,
  }
  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div><div className="page-kicker"><span className="kicker-dot" /> ADMIN WORKSPACE</div><h1>Welcome, {user?.name?.split(/\s+/)[0] || 'Admin'}</h1><p>Monitor customer support and manage D365 F&amp;O requests.</p></div>
        <Link to="/admin/tickets" className="button button-primary"><Ticket size={16} /> Manage all tickets</Link>
      </section>
      <section className="stats-grid">
        <StatCard label="Total tickets" value={counts.total} icon={Ticket} tone="blue" />
        <StatCard label="New tickets" value={counts.new} icon={Plus} tone="violet" />
        <StatCard label="In progress" value={counts.progress} icon={Clock3} tone="amber" />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} tone="green" />
      </section>
      <section className="panel recent-panel">
        <div className="panel-heading"><div><div className="panel-eyebrow">CUSTOMER SUPPORT ACTIVITY</div><h2>Latest tickets</h2><p>Recently submitted customer requests.</p></div><Link className="text-link" to="/admin/tickets">All tickets <ArrowRight size={15} /></Link></div>
        <TicketTable tickets={tickets.slice(0, 5)} />
      </section>
      <section className="dashboard-tip"><span className="tip-icon"><Users size={18} /></span><div><strong>Customer directory</strong><p>Review customer contact details and the support history on their account.</p></div><Link to="/admin/customers">View customers <ArrowRight size={14} /></Link></section>
    </div>
  )
}
