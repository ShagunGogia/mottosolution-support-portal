import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, SlidersHorizontal, Ticket } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from '../components/Badges'
import { usePortal } from '../context/usePortal.js'

const engineers = ['Unassigned', 'Priya Sharma', 'Arjun Mehta', 'Neha Kapoor']
const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export default function AdminTickets() {
  const { tickets, updateTicket } = usePortal()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('customer') || '')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const filtered = useMemo(() => tickets.filter((ticket) => {
    const query = search.trim().toLowerCase()
    return (!query || `${ticket.id} ${ticket.title} ${ticket.customerName} ${ticket.customerEmail}`.toLowerCase().includes(query))
      && (!status || ticket.status === status)
      && (!priority || ticket.priority === priority)
  }), [tickets, search, status, priority])

  return (
    <div className="page-stack">
      <section className="page-heading-row"><div><div className="page-kicker"><span className="kicker-dot" /> ADMIN WORKSPACE</div><h1>All tickets</h1><p>Review, assign, and update customer support requests.</p></div></section>
      <section className="panel ticket-list-panel">
        <div className="list-toolbar"><div className="list-title"><span className="toolbar-icon"><SlidersHorizontal size={17} /></span><div><h2>Ticket queue</h2><p>{filtered.length} of {tickets.length} tickets</p></div></div><div className="filter-controls">
          <label className="search-control"><Search size={16} /><input aria-label="Search all tickets" placeholder="Search tickets or customers…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option><option>New</option><option>In Progress</option><option>Resolved</option></select>
          <select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}><option value="">All priorities</option><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
        </div></div>
        {filtered.length ? <div className="table-scroll">
          <table className="ticket-table admin-ticket-table">
            <thead><tr><th>Ticket</th><th>Customer</th><th>Issue</th><th>Priority</th><th>Status</th><th>Assigned engineer</th><th>Created</th><th /></tr></thead>
            <tbody>{filtered.map((ticket) => <tr key={ticket.id}>
              <td><Link className="ticket-id" to={`/ticket/${ticket.id}`}>{ticket.id}</Link></td>
              <td><strong className="admin-customer-name">{ticket.customerName || ticket.customerEmail}</strong><span className="table-subtitle">{ticket.customerEmail}</span></td>
              <td><Link className="ticket-title" to={`/ticket/${ticket.id}`}>{ticket.title}</Link><span className="table-subtitle">{ticket.category} · {ticket.module}</span></td>
              <td><label className="sr-only" htmlFor={`priority-${ticket.id}`}>Priority for {ticket.id}</label><select className="inline-select priority-select" id={`priority-${ticket.id}`} value={ticket.priority} onChange={(event) => updateTicket(ticket.id, { priority: event.target.value })}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select><span className="admin-badge-preview"><PriorityBadge priority={ticket.priority} /></span></td>
              <td><label className="sr-only" htmlFor={`status-${ticket.id}`}>Status for {ticket.id}</label><select className="inline-select" id={`status-${ticket.id}`} value={ticket.status} onChange={(event) => updateTicket(ticket.id, { status: event.target.value })}><option>New</option><option>In Progress</option><option>Resolved</option></select><span className="admin-badge-preview"><StatusBadge status={ticket.status} /></span></td>
              <td><label className="sr-only" htmlFor={`engineer-${ticket.id}`}>Assigned engineer for {ticket.id}</label><select className="inline-select engineer-select" id={`engineer-${ticket.id}`} value={engineers.includes(ticket.engineer) ? ticket.engineer : 'Unassigned'} onChange={(event) => updateTicket(ticket.id, { engineer: event.target.value })}>{engineers.map((engineer) => <option key={engineer}>{engineer}</option>)}</select></td>
              <td className="date-cell">{formatDate(ticket.createdAt)}</td>
              <td><Link className="table-open" aria-label={`View ${ticket.id}`} to={`/ticket/${ticket.id}`}><ArrowUpRight size={16} /></Link></td>
            </tr>)}</tbody>
          </table>
        </div> : <div className="empty-state"><span className="empty-icon"><Ticket size={21} /></span><strong>No tickets found</strong><p>Try changing the search or filters.</p></div>}
      </section>
      <p className="list-footnote">Changes to assignment, status, and priority are stored in frontend demo state.</p>
    </div>
  )
}
