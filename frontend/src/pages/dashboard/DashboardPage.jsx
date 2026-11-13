import { useLocation } from 'react-router-dom'
import { DASHBOARDS } from '../../utils/tableConfig.js'
import DataTable from '../../components/common/DataTable.jsx'

export default function DashboardPage() {
  const key = useLocation().pathname.split('/').pop()
  const d = DASHBOARDS[key]
  if (!d) return <div className="card"><div className="placeholder">Dashboard not found</div></div>
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <>
      <div className="card">
        <div className="hero" style={{ paddingBottom: d.cards.length ? 70 : 30 }}>
          <small>{d.eyebrow}</small>
          <h1>{d.title}</h1>
          <div>{d.sub}</div>
          <div style={{ marginTop: 10, fontSize: 12, opacity: .85 }}>● Live · {today}</div>
        </div>
        {d.cards.length > 0 && (
          <div className="stat-row" style={{ marginBottom: 24 }}>
            {d.cards.map(([label, n]) => (
              <div className="stat" key={label}><div><small>{label.toUpperCase()}</small><div className="num">{n}</div></div></div>
            ))}
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>

      {d.table === 'intervention-performance' && (
        <div className="card"><div className="card-body">
          <DataTable rows={[]} columns={['Patient', 'Service User', 'Sex', 'Age', 'Disability', 'Classification', 'Current Score', 'Previous Score', 'Block'].map((l) => ({ key: l, label: l }))} />
        </div></div>
      )}

      <div className="dash-grid">
        {d.groups.map((g) => {
          const max = Math.max(1, ...g.bars.map((b) => b[1]))
          return (
            <div className="card" key={g.title}>
              <div className="card-body">
                <b>{g.title}</b>
                {g.bars.length === 0 && <div className="placeholder">No data yet<br /><small>Will appear once records exist.</small></div>}
                {g.bars.map(([n, v]) => (
                  <div className="bar-row" key={n}><span className="name">{n}</span><div className="bar"><i style={{ width: `${(v / max) * 100}%` }} /></div><b>{v}</b></div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {key === 'manager-console' && <div className="card"><div className="placeholder">Team map (needs a map service key; will be added with the backend).</div></div>}
    </>
  )
}
