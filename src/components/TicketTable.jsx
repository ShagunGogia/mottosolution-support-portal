import { ArrowUpRight, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from './Badges'

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export default function TicketTable({ tickets, compact = false }) {
  if (!tickets.length) {
    return <div className="empty-state"><span className="empty-icon"><Ticket size={21} /></span><strong>No tickets found</strong><p>Try adjusting your filters or create a new support ticket.</p></div>
  }
  return (
    <div className="table-scroll">
      <table className="ticket-table">
        <thead><tr>
          <th>Ticket</th><th>Issue title</th><th>Category</th><th>Priority</th>
          {!compact && <th>Assigned engineer</th>}
          <th>Created</th><th>Status</th><th><span className="sr-only">Open</span></th>
        </tr></thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td><Link className="ticket-id" to={`/ticket/${ticket.id}`}>{ticket.id}</Link></td>
              <td><Link className="ticket-title" to={`/ticket/${ticket.id}`}>{ticket.title}</Link><span className="table-subtitle">{ticket.module}</span></td>
              <td><span className="category-label">{ticket.category}</span></td>
              <td><PriorityBadge priority={ticket.priority} /></td>
              {!compact && <td>{ticket.engineer}</td>}
              <td className="date-cell">{formatDate(ticket.createdAt)}</td>
              <td><StatusBadge status={ticket.status} /></td>
              <td><Link className="table-open" aria-label={`View ${ticket.id}`} to={`/ticket/${ticket.id}`}><ArrowUpRight size={16} /></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
