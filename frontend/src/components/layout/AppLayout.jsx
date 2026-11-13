
import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import AppearanceModal from './AppearanceModal.jsx'
import { SETTINGS_MENU } from '../../utils/menu.js'
import { getToken, logout } from '../../services/api.js'

export default function AppLayout() {
  const nav = useNavigate()
  const [pop, setPop] = useState(null)
  const [showAppearance, setShowAppearance] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme =
      localStorage.getItem('satya_theme') || 'ocean'

    document.body.dataset.density =
      localStorage.getItem('satya_density') || 'comfortable'
  }, [])

  if (!getToken()) {
    return <Navigate to="/login" replace />
  }

  const toggle = (name) => {
    setPop(pop === name ? null : name)
  }

  const doLogout = () => {
    logout()
    nav('/login', { replace: true })
  }

  return (
    <div className="shell" onClick={() => pop && setPop(null)}>
      <Sidebar />

      <div className="main">
        <header className="topbar">
          <div>
            <small>ORGANISATION WORKSPACE</small>
            <h3>Satya School</h3>
          </div>

          <div
            className="top-actions"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="icon-btn"
              title="Help"
              onClick={() => nav('/settings/help-center')}
            >
              ◎
            </button>

            <button
              className="icon-btn"
              title="Notifications"
              onClick={() => nav('/notifications')}
            >
              🔔
            </button>

            <button
              className="icon-btn"
              title="Settings"
              onClick={() => toggle('gear')}
            >
              ⚙ ▾
            </button>

            <button
              className="icon-btn"
              title="Account"
              onClick={() => toggle('user')}
            >
              👤 ▾
            </button>

            {pop === 'gear' && (
              <div className="menu-pop">
                {SETTINGS_MENU.map((m) => (
                  <Link
                    key={m.path}
                    to={m.path}
                    onClick={() => setPop(null)}
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            )}

            {pop === 'user' && (
              <div className="menu-pop">
                <Link
                  to="/settings/profile"
                  onClick={() => setPop(null)}
                >
                  User Profile
                </Link>

                <button
                  onClick={() => {
                    setShowAppearance(true)
                    setPop(null)
                  }}
                >
                  Appearance &amp; layout
                </button>

                <Link
                  to="/resources/manuals"
                  onClick={() => setPop(null)}
                >
                  Terms of Service Use
                </Link>

                <Link
                  to="/resources/manuals"
                  onClick={() => setPop(null)}
                >
                  Privacy Policy
                </Link>

                <button onClick={doLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <span>© 2026 Satya School</span>
        </footer>
      </div>

      {showAppearance && (
        <AppearanceModal
          onClose={() => setShowAppearance(false)}
        />
      )}
    </div>
  )
}
