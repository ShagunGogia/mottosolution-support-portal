import { ArrowRight, CheckCircle2, Clock3, Plus, Ticket, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import TicketTable from '../components/TicketTable'
import { usePortal } from '../context/usePortal.js'

export default function Dashboard() {
  const { tickets, user } = usePortal()
  const customerTickets = tickets.filter((ticket) => ticket.customerEmail === user?.email)
  const counts = {
    total: customerTickets.length,
    new: customerTickets.filter((ticket) => ticket.status === 'New').length,
    progress: customerTickets.filter((ticket) => ticket.status === 'In Progress').length,
    resolved: customerTickets.filter((ticket) => ticket.status === 'Resolved').length,
  }
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there'
  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div><div className="page-kicker"><span className="kicker-dot" /> CUSTOMER WORKSPACE</div><h1>Good morning, {firstName}</h1><p>Here’s an overview of your support activity.</p></div>
        <Link to="/raise-ticket" className="button button-primary"><Plus size={17} /> Raise a new ticket</Link>
      </section>
      <section className="stats-grid">
        <StatCard label="Total tickets" value={counts.total} icon={Ticket} tone="blue" />
        <StatCard label="New tickets" value={counts.new} icon={Plus} tone="violet" />
        <StatCard label="In progress" value={counts.progress} icon={Clock3} tone="amber" />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} tone="green" />
      </section>
      <section className="panel recent-panel">
        <div className="panel-heading"><div><div className="panel-eyebrow">YOUR SUPPORT ACTIVITY</div><h2>Recent tickets</h2><p>Keep track of your latest support requests.</p></div><Link className="text-link" to="/my-tickets">View all tickets <ArrowRight size={15} /></Link></div>
        <TicketTable tickets={customerTickets.slice(0, 4)} compact />
      </section>
      <section className="dashboard-tip"><span className="tip-icon"><TrendingUp size={18} /></span><div><strong>Get faster support</strong><p>Include your D365 F&amp;O environment and steps to reproduce when raising a ticket.</p></div><Link to="/raise-ticket">Learn more <ArrowRight size={14} /></Link></section>
    </div>
  )
}
