
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MENU } from '../../utils/menu.js'
import satyaLogo from '../../assets/images/satya-logo.png'

const ICONS = {
  Home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-7h6v7"/></>,
  Master: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v5c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 10v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5"/></>,
  Screening: <><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="m9 13 2 2 4-4"/></>,
  Activity: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/></>,
  'Service User': <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.2a4 4 0 0 1 0 7.6"/></>,
  Programs: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a2 2 0 0 1 2 2v7M9 18h6"/></>,
  Intervention: <><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/><path d="M9 14h6"/></>,
  Dashboard: <><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/><path d="M16 6h4v4"/></>,
  Resources: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v1H3z"/><path d="M3 10h18l-2 9H5z"/></>
}

function MenuIcon({ name }) {
  return (
    <svg
      className="sb-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  )
}

export default function Sidebar() {
  const { pathname } = useLocation()

  const [open, setOpen] = useState(() => {
    const selected = MENU.find((m) =>
      m.children?.some((c) => pathname.startsWith(c.path))
    )
    return selected ? selected.label : null
  })

  return (
    <aside className="sidebar">

      <div className="sb-brand">
        <img src={satyaLogo} alt="Satya School" />

        <div className="sb-brand-text">
          <b>Enabling Inclusion</b>
          <span>SATYA SCHOOL</span>
        </div>
      </div>

      <div className="sb-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {MENU.map((m) => {
          const hasChildren = Boolean(m.children?.length)

          if (!hasChildren) {
            return (
              <NavLink
                key={m.label}
                to={m.path}
                className={({ isActive }) =>
                  'sb-item' + (isActive ? ' active' : '')
                }
              >
                <span className="sb-item-left">
                  <MenuIcon name={m.label} />
                  <span>{m.label}</span>
                </span>
                <span className="sb-arrow">▾</span>
              </NavLink>
            )
          }

          const isOpen = open === m.label
          const hasActiveChild = m.children.some((c) =>
            pathname.startsWith(c.path)
          )

          return (
            <div className="sb-menu-group" key={m.label}>
              <button
                type="button"
                className={
                  'sb-item' +
                  (isOpen || hasActiveChild ? ' active' : '')
                }
                aria-expanded={isOpen}
                onClick={() =>
                  setOpen(isOpen ? null : m.label)
                }
              >
                <span className="sb-item-left">
                  <MenuIcon name={m.label} />
                  <span>{m.label}</span>
                </span>

                <span className="sb-arrow">
                  {isOpen ? '▴' : '▾'}
                </span>
              </button>

              {isOpen && (
                <div className="sb-sub">
                  {m.children.map((c) => (
                    <NavLink
                      key={c.path}
                      to={c.path}
                      className={({ isActive }) =>
                        isActive ? 'active' : ''
                      }
                    >
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="sb-footer">
        <div className="sb-school">
          <img src={satyaLogo} alt="Satya School" />
          <span>Satya School</span>
        </div>
      </div>

    </aside>
  )
}
