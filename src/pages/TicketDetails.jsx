import { useState } from 'react'
import { ArrowLeft, CalendarDays, Check, Clock3, FileText, MessageCircle, Paperclip, Send, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from '../components/Badges'
import { usePortal } from '../context/usePortal.js'

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
const formatDateTime = (date) => new Date(date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function TicketDetails() {
  const { ticketId } = useParams()
  const { tickets, addComment, updateTicket, user } = usePortal()
  const ticket = tickets.find((item) => item.id === ticketId)
  const isAdmin = user?.role === 'Admin'
  const ticketAccessible = isAdmin || ticket?.customerEmail === user?.email
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  if (!ticket || !ticketAccessible) {
    const ticketList = isAdmin ? '/admin/tickets' : '/my-tickets'
    return <div className="panel not-found"><span className="empty-icon"><FileText size={22} /></span><h1>Ticket not found</h1><p>This ticket may have been removed or the link is incorrect.</p><Link className="button button-primary" to={ticketList}>{isAdmin ? 'Back to all tickets' : 'Back to my tickets'}</Link></div>
  }

  const handleComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) {
      setError('Enter a comment before posting.')
      return
    }
    addComment(ticket.id, comment.trim())
    setComment('')
    setError('')
  }

  return (
    <div className="page-stack">
      <div className="details-back"><Link className="back-link" to={isAdmin ? '/admin/tickets' : '/my-tickets'}><ArrowLeft size={15} /> {isAdmin ? 'Back to all tickets' : 'Back to my tickets'}</Link></div>
      <section className="details-hero panel">
        <div className="details-hero-top"><div><div className="ticket-ref"><span className="ref-dot" /> {ticket.id}</div><h1>{ticket.title}</h1><p>Created on {formatDate(ticket.createdAt)} · {ticket.category} support</p></div>{isAdmin ? <span className="admin-detail-customer">Customer: {ticket.customerName || ticket.customerEmail}</span> : <Link className="button button-secondary small-button" to="/raise-ticket">Raise another ticket</Link>}</div>
        <div className="details-hero-meta"><StatusBadge status={ticket.status} /><PriorityBadge priority={ticket.priority} /><span className="detail-meta"><span className="meta-icon"><UserRound size={14} /></span>{ticket.engineer}</span><span className="detail-meta"><span className="meta-icon"><CalendarDays size={14} /></span>{formatDate(ticket.createdAt)}</span></div>
      </section>
      <div className="details-grid">
        <div className="details-main-column">
          <section className="panel detail-section">
            <div className="detail-section-title"><span className="section-icon"><FileText size={17} /></span><div><h2>Issue description</h2><p>Details submitted with this support request.</p></div></div>
            <div className="description-copy">{ticket.description}</div>
            <div className="detail-attributes">
              <div><span>Support type</span><strong>{ticket.category}</strong></div><div><span>D365 F&amp;O module</span><strong>{ticket.module}</strong></div><div><span>Environment</span><strong>{ticket.environment}</strong></div><div><span>Company / entity</span><strong>{ticket.company}</strong></div>
            </div>
            {ticket.steps && <div className="detail-text-block"><h3>Steps to reproduce</h3><p>{ticket.steps}</p></div>}
            {(ticket.expected || ticket.actual) && <div className="expect-actual">{ticket.expected && <div><h3><Check size={14} /> Expected result</h3><p>{ticket.expected}</p></div>}{ticket.actual && <div><h3><Clock3 size={14} /> Actual result</h3><p>{ticket.actual}</p></div>}</div>}
            {ticket.error && <div className="error-message"><strong>Error message</strong><p>{ticket.error}</p></div>}
          </section>
          <section className="panel communication-panel">
            <div className="detail-section-title"><span className="section-icon"><MessageCircle size={17} /></span><div><h2>Communication</h2><p>Comments and updates on your request.</p></div><span className="comment-count">{ticket.comments.length}</span></div>
            {ticket.comments.length ? <div className="comment-list">{ticket.comments.map((item, index) => <article className="comment-item" key={`${item.createdAt}-${index}`}><span className="comment-avatar">{item.author.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</span><div className="comment-body"><div className="comment-heading"><strong>{item.author}</strong><time>{formatDateTime(item.createdAt)}</time></div><p>{item.text}</p></div></article>)}</div> : <div className="no-comments">No comments yet. Add a message below to start the conversation.</div>}
            <form className="comment-form" onSubmit={handleComment}><label htmlFor="comment">Add a comment</label><textarea id="comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write an update or reply…" rows="3" />{error && <span className="form-error">{error}</span>}<div className="comment-submit-row"><span>Posting as {user?.name}</span><button className="button button-primary" type="submit"><Send size={15} /> Post comment</button></div></form>
          </section>
        </div>
        <aside className="details-side-column">
          {isAdmin && <section className="panel side-detail-card admin-controls-card">
            <div className="side-card-heading"><span className="section-icon"><UserRound size={16} /></span><h2>Manage ticket</h2></div>
            <div className="admin-detail-controls">
              <label htmlFor="detail-engineer">Assigned engineer</label><select id="detail-engineer" value={ticket.engineer} onChange={(event) => updateTicket(ticket.id, { engineer: event.target.value })}><option>Unassigned</option><option>Priya Sharma</option><option>Arjun Mehta</option><option>Neha Kapoor</option></select>
              <label htmlFor="detail-status">Status</label><select id="detail-status" value={ticket.status} onChange={(event) => updateTicket(ticket.id, { status: event.target.value })}><option>New</option><option>In Progress</option><option>Resolved</option></select>
              <label htmlFor="detail-priority">Priority</label><select id="detail-priority" value={ticket.priority} onChange={(event) => updateTicket(ticket.id, { priority: event.target.value })}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
            </div>
          </section>}
          <section className="panel side-detail-card"><div className="side-card-heading"><span className="section-icon"><FileText size={16} /></span><h2>Ticket details</h2></div><dl className="side-detail-list"><div><dt>Ticket number</dt><dd>{ticket.id}</dd></div><div><dt>Status</dt><dd><StatusBadge status={ticket.status} /></dd></div><div><dt>Priority</dt><dd><PriorityBadge priority={ticket.priority} /></dd></div><div><dt>Assigned engineer</dt><dd>{ticket.engineer}</dd></div><div><dt>Preferred contact</dt><dd>{ticket.contact || 'Email'}</dd></div><div><dt>Reproducible</dt><dd>{ticket.reproducible || 'Not specified'}</dd></div></dl></section>
          <section className="panel side-detail-card"><div className="side-card-heading"><span className="section-icon"><Paperclip size={16} /></span><h2>Attachments <span className="side-count">{ticket.attachments?.length || 0}</span></h2></div>{ticket.attachments?.length ? <ul className="attachment-list">{ticket.attachments.map((file) => <li key={file}><span className="attachment-file"><FileText size={15} /></span><span>{file}</span></li>)}</ul> : <p className="no-attachments">No files attached to this ticket.</p>}</section>
          <div className="support-help-card"><strong>Need more help?</strong><p>Our support team is available to assist you.</p><a href="mailto:support@mottosolution.com">Email support <span>↗</span></a></div>
        </aside>
      </div>
    </div>
  )
}
