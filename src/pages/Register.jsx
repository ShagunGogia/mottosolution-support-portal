import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { usePortal } from '../context/usePortal.js'

export default function Register() {
  const { registerCustomer } = usePortal()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [values, setValues] = useState({ name: '', email: '', company: '', phone: '', password: '', confirm: '', terms: false })
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (values.password.length < 8) return setError('Use at least 8 characters for your password.')
    if (values.password !== values.confirm) return setError('Your passwords do not match.')
    if (!values.terms) return setError('Please accept the terms to continue.')
    registerCustomer({
      email: values.email,
      name: values.name,
      company: values.company,
      phone: values.phone,
    })
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="auth-page register-page">
      <main className="auth-main">
        <section className="auth-card register-card">
          <Link className="back-link" to="/login"><ArrowLeft size={15} /> Back to sign in</Link>
          <div className="auth-eyebrow"><span className="kicker-dot" /> CUSTOMER SUPPORT</div>
          <h1>Create your account</h1>
          <p className="auth-intro">Get access to your support workspace.</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-grid two-col">
              <div className="form-field"><label htmlFor="name">Full name <b>*</b></label><input id="name" name="name" value={values.name} onChange={update} placeholder="e.g. Alex Morgan" required autoComplete="name" /></div>
              <div className="form-field"><label htmlFor="reg-email">Business email <b>*</b></label><input id="reg-email" name="email" type="email" value={values.email} onChange={update} placeholder="you@company.com" required autoComplete="email" /></div>
              <div className="form-field"><label htmlFor="company">Company name <b>*</b></label><input id="company" name="company" value={values.company} onChange={update} placeholder="Your organization" required autoComplete="organization" /></div>
              <div className="form-field"><label htmlFor="phone">Contact number <b>*</b></label><input id="phone" name="phone" type="tel" value={values.phone} onChange={update} placeholder="+91 98765 43210" required autoComplete="tel" /></div>
              <div className="form-field"><label htmlFor="reg-password">Password <b>*</b></label><input id="reg-password" name="password" type="password" minLength="8" value={values.password} onChange={update} placeholder="At least 8 characters" required autoComplete="new-password" /></div>
              <div className="form-field"><label htmlFor="confirm">Confirm password <b>*</b></label><input id="confirm" name="confirm" type="password" value={values.confirm} onChange={update} placeholder="Re-enter password" required autoComplete="new-password" /></div>
            </div>
            <label className="checkbox-line terms-line"><input type="checkbox" name="terms" checked={values.terms} onChange={update} /><span>I agree to Motto Solution's <a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</span></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" type="submit">Create account <ArrowRight size={17} /></button>
          </form>
          <p className="login-prompt">Already have an account? <Link to="/login">Sign in</Link></p>
        </section>
      </main>
    </div>
  )
}
