import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Paperclip, Send } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { usePortal } from '../context/usePortal.js'

const modules = ['Accounts payable', 'Accounts receivable', 'Cash and bank management', 'General ledger', 'Inventory management', 'Procurement and sourcing', 'Production control', 'Project management and accounting', 'Sales and marketing', 'System administration', 'Other']

function Field({ label, name, required = false, hint, children }) {
  return <div className="form-field"><label htmlFor={name}>{label}{required && <b> *</b>}</label>{children}{hint && <small className="field-hint">{hint}</small>}</div>
}

export default function RaiseTicket() {
  const { createTicket } = usePortal()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [files, setFiles] = useState([])
  const [values, setValues] = useState({
    title: '', category: '', module: '', company: '', environment: '', version: '',
    description: '', steps: '', expected: '', actual: '', error: '', tried: 'No',
    fixes: '', result: '', reproducible: '', priority: 'Medium', contact: 'Email',
  })

  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleFiles = (event) => setFiles(Array.from(event.target.files || []).map((file) => file.name))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (values.tried === 'Yes' && !values.fixes.trim()) {
      setError('Please describe the fixes you have already tried.')
      return
    }
    const ticket = createTicket({
      ...values,
      triedFixes: values.fixes,
      attachments: files,
    })
    setSubmitted(true)
    window.setTimeout(() => navigate(`/ticket/${ticket.id}`), 1200)
  }

  return (
    <div className="page-stack form-page">
      <div className="page-heading-row"><div><Link className="back-link" to="/dashboard"><ArrowLeft size={15} /> Back to dashboard</Link><div className="page-kicker"><span className="kicker-dot" /> CUSTOMER SUPPORT</div><h1>Raise a support ticket</h1><p>Tell us what’s happening and our D365 F&amp;O team will be in touch.</p></div><div className="form-required-note"><b>*</b> Required fields</div></div>
      {submitted ? <div className="success-banner"><CheckCircle2 size={20} /><div><strong>Your ticket has been created.</strong><p>Taking you to the ticket details…</p></div></div> : null}
      <form className="ticket-form panel" onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-section-heading"><span className="section-number">01</span><div><h2>General information</h2><p>A few details to help us route your request.</p></div></div>
          <div className="form-grid two-col">
            <Field label="Issue title" name="title" required><input id="title" name="title" value={values.title} onChange={update} placeholder="Summarize your issue in a few words" required maxLength="120" /></Field>
            <Field label="Support type" name="category" required><select id="category" name="category" value={values.category} onChange={update} required><option value="">Select support type</option><option>Technical</option><option>Functional</option></select></Field>
            <Field label="D365 F&O module" name="module" required><select id="module" name="module" value={values.module} onChange={update} required><option value="">Select a module</option>{modules.map((module) => <option key={module}>{module}</option>)}</select></Field>
            <Field label="Company / legal entity" name="company" required><input id="company" name="company" value={values.company} onChange={update} placeholder="Company or legal entity name" required /></Field>
            <Field label="Environment" name="environment" required><select id="environment" name="environment" value={values.environment} onChange={update} required><option value="">Select environment</option><option>Development</option><option>UAT</option><option>Production</option><option>Sandbox</option></select></Field>
            <Field label="D365 F&O version" name="version"><input id="version" name="version" value={values.version} onChange={update} placeholder="e.g. 10.0.40" /></Field>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-heading"><span className="section-number">02</span><div><h2>Issue description</h2><p>Share enough context for our team to understand the issue.</p></div></div>
          <div className="form-grid">
            <Field label="Detailed issue description" name="description" required><textarea id="description" name="description" value={values.description} onChange={update} placeholder="Describe the issue, when it started, and who is affected…" rows="4" required /></Field>
            <Field label="Steps to reproduce" name="steps"><textarea id="steps" name="steps" value={values.steps} onChange={update} placeholder="1. Go to…  2. Select…  3. Observe…" rows="3" /></Field>
            <div className="form-grid two-col">
              <Field label="Expected result" name="expected"><textarea id="expected" name="expected" value={values.expected} onChange={update} placeholder="What should happen?" rows="3" /></Field>
              <Field label="Actual result" name="actual"><textarea id="actual" name="actual" value={values.actual} onChange={update} placeholder="What happens instead?" rows="3" /></Field>
            </div>
            <Field label="Error message" name="error"><textarea id="error" name="error" value={values.error} onChange={update} placeholder="Paste any error message or code" rows="2" /></Field>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-heading"><span className="section-number">03</span><div><h2>Troubleshooting</h2><p>Let us know what you’ve already tried.</p></div></div>
          <div className="form-grid two-col">
            <Field label="Have you already tried any fixes?" name="tried" required><select id="tried" name="tried" value={values.tried} onChange={update} required><option>No</option><option>Yes</option></select></Field>
            {values.tried === 'Yes' && <Field label="Describe the fixes attempted" name="fixes" required><textarea id="fixes" name="fixes" value={values.fixes} onChange={update} placeholder="What have you tried so far?" rows="3" required /></Field>}
            <Field label="What was the result?" name="result"><input id="result" name="result" value={values.result} onChange={update} placeholder="Did it help? What happened?" /></Field>
            <Field label="Is the issue reproducible?" name="reproducible" required><select id="reproducible" name="reproducible" value={values.reproducible} onChange={update} required><option value="">Select an option</option><option>Yes</option><option>No</option><option>Intermittent</option></select></Field>
          </div>
        </section>
        <section className="form-section">
          <div className="form-section-heading"><span className="section-number">04</span><div><h2>Additional information</h2><p>Set the urgency and let us know how to reach you.</p></div></div>
          <div className="form-grid two-col">
            <Field label="Priority" name="priority" required><select id="priority" name="priority" value={values.priority} onChange={update} required><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></Field>
            <Field label="Preferred contact method" name="contact" required><select id="contact" name="contact" value={values.contact} onChange={update} required><option>Email</option><option>Phone</option><option>Microsoft Teams</option></select></Field>
            <div className="form-field file-field"><label htmlFor="attachments">Screenshots and documents</label><label className="upload-zone" htmlFor="attachments"><Paperclip size={18} /><span><strong>Choose files</strong> or drag them here</span><small>PNG, JPG, PDF, DOCX (up to 10 MB each)</small><input id="attachments" type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.xlsx,.txt" onChange={handleFiles} /></label>{files.length > 0 && <span className="selected-files">{files.join(', ')}</span>}</div>
          </div>
        </section>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions"><span>Your information is only used to support your request.</span><button type="submit" className="button button-primary"><Send size={16} /> Submit ticket</button></div>
      </form>
      <div className="form-footer-note"><span className="secure-dot" /> Your request will be reviewed by the Motto Solution D365 F&amp;O support team. <ArrowRight size={14} /></div>
    </div>
  )
}
