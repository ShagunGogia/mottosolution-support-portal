import { useMemo, useState } from 'react'
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import TicketTable from '../components/TicketTable'
import { usePortal } from '../context/usePortal.js'

export default function MyTickets() {
  const { tickets, user } = usePortal()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const filtered = useMemo(() => tickets.filter((ticket) => ticket.customerEmail === user?.email).filter((ticket) => {
    const query = search.trim().toLowerCase()
    return (!query || ticket.id.toLowerCase().includes(query) || ticket.title.toLowerCase().includes(query))
      && (!category || ticket.category === category)
      && (!status || ticket.status === status)
      && (!priority || ticket.priority === priority)
  }), [tickets, user, search, category, status, priority])
  const hasFilters = search || category || status || priority
  const clearFilters = () => { setSearch(''); setCategory(''); setStatus(''); setPriority('') }

  return (
    <div className="page-stack">
      <section className="page-heading-row tickets-heading"><div><div className="page-kicker"><span className="kicker-dot" /> SUPPORT WORKSPACE</div><h1>My tickets</h1><p>View and follow up on all your support requests.</p></div><Link to="/raise-ticket" className="button button-primary"><Plus size={17} /> Raise a new ticket</Link></section>
      <section className="panel ticket-list-panel">
        <div className="list-toolbar"><div className="list-title"><span className="toolbar-icon"><SlidersHorizontal size={17} /></span><div><h2>All support tickets</h2><p>{filtered.length} {filtered.length === 1 ? 'ticket' : 'tickets'} found</p></div></div><div className="filter-controls">
          <label className="search-control"><Search size={16} /><input aria-label="Search tickets" placeholder="Search tickets…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select aria-label="Filter by support type" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All types</option><option>Technical</option><option>Functional</option></select>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option><option>New</option><option>In Progress</option><option>Resolved</option></select>
          <select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}><option value="">All priorities</option><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
          {hasFilters && <button className="clear-filters" onClick={clearFilters} aria-label="Clear filters"><X size={15} /> Clear</button>}
        </div></div>
        <TicketTable tickets={filtered} />
      </section>
      <p className="list-footnote">Need help with an existing request? <Link to="/raise-ticket">Contact the support team</Link>.</p>
    </div>
  )
}
