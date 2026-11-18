import { useMemo, useState } from 'react'
import { Search, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mockCustomers } from '../data/mockUsers'
import { usePortal } from '../context/usePortal.js'

export default function AdminCustomers() {
  const { tickets } = usePortal()
  const [search, setSearch] = useState('')
  const customers = useMemo(() => {
    const customerMap = new Map(mockCustomers.map((customer) => [customer.email, customer]))
    tickets.forEach((ticket) => {
      const email = ticket.customerEmail
      if (email && !customerMap.has(email)) {
        customerMap.set(email, {
          name: ticket.customerName || email.split('@')[0],
          email,
          company: ticket.company || '—',
          phone: '—',
        })
      }
    })
    return Array.from(customerMap.values()).filter((customer) => (
      `${customer.name} ${customer.email} ${customer.company}`.toLowerCase().includes(search.trim().toLowerCase())
    ))
  }, [tickets, search])

  return (
    <div className="page-stack">
      <section className="page-heading-row"><div><div className="page-kicker"><span className="kicker-dot" /> ADMIN WORKSPACE</div><h1>Customers</h1><p>Customer directory and support activity.</p></div></section>
      <section className="panel ticket-list-panel">
        <div className="list-toolbar"><div className="list-title"><span className="toolbar-icon"><Users size={17} /></span><div><h2>Customer directory</h2><p>{customers.length} customers</p></div></div><label className="search-control"><Search size={16} /><input aria-label="Search customers" placeholder="Search customers…" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
        {customers.length ? <div className="table-scroll"><table className="ticket-table customer-table">
          <thead><tr><th>Customer</th><th>Company</th><th>Contact number</th><th>Support tickets</th><th>Open tickets</th></tr></thead>
          <tbody>{customers.map((customer) => {
            const customerTickets = tickets.filter((ticket) => ticket.customerEmail === customer.email)
            const openTickets = customerTickets.filter((ticket) => ticket.status !== 'Resolved').length
            return <tr key={customer.email}>
              <td><strong className="admin-customer-name">{customer.name}</strong><span className="table-subtitle">{customer.email}</span></td>
              <td>{customer.company}</td><td>{customer.phone}</td>
              <td><Link className="customer-ticket-count" to={`/admin/tickets?customer=${encodeURIComponent(customer.email)}`}>{customerTickets.length} tickets</Link></td>
              <td><span className="open-ticket-count">{openTickets}</span></td>
            </tr>
          })}</tbody>
        </table></div> : <div className="empty-state"><span className="empty-icon"><Users size={21} /></span><strong>No customers found</strong><p>Try a different search term.</p></div>}
      </section>
    </div>
  )
}
