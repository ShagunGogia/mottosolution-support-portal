import { useState } from 'react'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand'
import { usePortal } from '../context/usePortal.js'

export default function Login() {
  const { login } = usePortal()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = login(email, password)
    if (!result.success) {
      setError(result.error)
      return
    }
    navigate(result.user.role === 'Admin' ? '/admin/dashboard' : '/dashboard', { replace: true })
  }

  return (
    <main className="auth-page">
      <div className="auth-brand"><Brand /></div>
      <section className="auth-card">
        <div className="auth-eyebrow"><span className="eyebrow-line" /> CUSTOMER SUPPORT <span className="eyebrow-line" /></div>
        <h1>Welcome back</h1>
        <p className="auth-intro">Sign in to manage your support requests.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field-label" htmlFor="email">Business email</label>
          <div className="input-with-icon"><Mail size={17} /><input id="email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></div>
          <div className="label-row"><label className="field-label" htmlFor="password">Password</label><a href="#forgot-password" onClick={(event) => event.preventDefault()}>Forgot password?</a></div>
          <div className="input-with-icon"><LockKeyhole size={17} /><input id="password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></div>
          <label className="checkbox-line remember-line"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Remember me</span></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary auth-submit" type="submit">Sign in <ArrowRight size={17} /></button>
        </form>
        <div className="auth-divider"><span>New to Motto Solution support?</span></div>
        <Link className="button button-secondary auth-register" to="/register">Create an account</Link>
      </section>
      <p className="auth-footnote">Secure customer support, powered by Motto Solution.</p>
    </main>
  )
}
