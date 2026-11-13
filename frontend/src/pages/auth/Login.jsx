
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../../services/api.js'

export function AuthHero() {
  return (
    <section className="auth-hero">
      <div className="auth-hero-text">
        <div className="auth-eyebrow">ENABLING INCLUSION</div>

        <div className="auth-school">Satya School</div>

        <p>
          Secure access to your organisation’s early intervention programmes.
        </p>
      </div>
    </section>
  )
}

export default function Login() {
  const nav = useNavigate()
  const [params] = useSearchParams()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()

    if (!username.trim() || !password) {
      setError('Please enter user name and password.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(username.trim(), password)

      // Replace login history after successful authentication
      nav('/home', { replace: true })

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      {/* Left side - School image and description */}
      <AuthHero />

      {/* Right side - Login form */}
      <section className="auth-panel">
        <div className="auth-form-wrap">

          <h1 className="auth-title">Welcome back</h1>

          <form onSubmit={onSubmit} noValidate>

            <div className="field">
              <label htmlFor="u">User name</label>

              <input
                id="u"
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                autoComplete="username"
              />
            </div>

            <div className="field">
              <label htmlFor="p">Password</label>

              <input
                id="p"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {params.get('expired') && (
              <div className="auth-notice info">
                You were signed out after a period of inactivity.
              </div>
            )}

            {error && (
              <div className="auth-notice error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

          </form>

          <Link className="auth-link" to="/forgot-password">
            Forgot password?
          </Link>

          <div className="secure-box">
            <div className="tick">✓</div>

            <div>
              <b>Secure organisation access</b>
              <span>
                Your session and tenant context are protected.
              </span>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
