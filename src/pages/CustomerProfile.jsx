import { useState } from 'react'
import { CheckCircle2, UserRound } from 'lucide-react'
import { usePortal } from '../context/usePortal.js'

export default function CustomerProfile() {
  const { user, updateProfile } = usePortal()
  const [values, setValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
  })
  const [saved, setSaved] = useState(false)
  const handleChange = (event) => {
    setSaved(false)
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    updateProfile({ name: values.name.trim(), company: values.company.trim(), phone: values.phone.trim() })
    setSaved(true)
  }

  return (
    <div className="page-stack">
      <section className="page-heading-row"><div><div className="page-kicker"><span className="kicker-dot" /> CUSTOMER WORKSPACE</div><h1>My profile</h1><p>Manage your contact details for support requests.</p></div></section>
      <section className="panel profile-panel">
        <div className="profile-header"><span className="profile-avatar"><UserRound size={22} /></span><div><h2>Contact information</h2><p>These details help our team respond to your requests.</p></div><span className="role-tag">Customer</span></div>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-grid two-col">
            <div className="form-field"><label htmlFor="profile-name">Full name <b>*</b></label><input id="profile-name" name="name" value={values.name} onChange={handleChange} required /></div>
            <div className="form-field"><label htmlFor="profile-email">Business email</label><input id="profile-email" type="email" value={values.email} disabled /></div>
            <div className="form-field"><label htmlFor="profile-company">Company name</label><input id="profile-company" name="company" value={values.company} onChange={handleChange} /></div>
            <div className="form-field"><label htmlFor="profile-phone">Contact number</label><input id="profile-phone" name="phone" type="tel" value={values.phone} onChange={handleChange} /></div>
          </div>
          {saved && <p className="profile-saved" role="status"><CheckCircle2 size={15} /> Profile updated in this demo session.</p>}
          <div className="form-actions"><span>Profile updates are stored in local browser state.</span><button className="button button-primary" type="submit">Save changes</button></div>
        </form>
      </section>
    </div>
  )
}
