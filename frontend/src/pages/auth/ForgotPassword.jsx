import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthHero } from './Login.jsx'
import { forgotPassword } from '../../services/api.js'

export default function ForgotPassword() {
  const [id, setId] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    if (!id.trim()) { setError('Please enter your user name or email.'); return }
    setLoading(true); setError(''); setMsg('')
    try { const r = await forgotPassword(id.trim()); setMsg(r.message) }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="auth">
      <AuthHero />
      <section className="auth-panel">
        <div className="auth-brand-slot" />
        <div className="auth-form-wrap">
          <div className="auth-eyebrow-dark">ACCOUNT RECOVERY</div>
          <h1 className="auth-title">Forgot password?</h1>
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="f">User name or email</label>
              <input id="f" className="input" value={id} onChange={(e) => setId(e.target.value)} autoFocus />
            </div>
            {msg && <div className="auth-notice ok">{msg}</div>}
            {error && <div className="auth-notice error" role="alert">{error}</div>}
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Sending…' : 'Send reset link'}</button>
          </form>
          <Link className="auth-link" to="/login">← Back to sign in</Link>
        </div>
      </section>
    </div>
  )
}
