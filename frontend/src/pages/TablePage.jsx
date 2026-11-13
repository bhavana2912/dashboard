import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DataTable from '../components/common/DataTable.jsx'
import { TABLES } from '../utils/tableConfig.js'

// One generic page that renders any table screen using utils/tableConfig.js
export default function TablePage({ configKey }) {
  const { pathname } = useLocation()
  const key = configKey || pathname.replace(/^\//, '')
  const cfg = TABLES[key]
  const [msg, setMsg] = useState('')
  if (!cfg) return <div className="card"><div className="placeholder">Page not found</div></div>

  const todo = (what) => setMsg(`${what}: backend API for this screen is not connected yet.`)

  return (
    <div className="card">
      <div className="card-head">
        <span>{cfg.title}</span>
        <div className="acts">
          {cfg.buttons?.map((b) => <button key={b} className="btn" style={{ background: '#1f6fb5' }} onClick={() => todo(b)}>{b}</button>)}
          {!cfg.buttons && !cfg.filters && <button className="sq-btn" title="Add" onClick={() => todo('Add')}>+</button>}
          <button className="sq-btn" title="Refresh" onClick={() => setMsg('')}>⟳</button>
        </div>
      </div>
      <div className="card-body">
        {(cfg.filters === 'block' || cfg.filters === 'fetch') && (
          <div className="filters">
            <div className="f"><label>BLOCK</label><input className="input" placeholder="Search..." /></div>
            {cfg.filters === 'block' && <div className="f"><label>CLASSIFICATION</label><select className="input"><option>Choose your option</option></select></div>}
            <button className="btn" onClick={() => todo('Fetch')}>Fetch</button>
            {cfg.filters === 'block' && <button className="btn" onClick={() => todo('Select All')}>Select All</button>}
          </div>
        )}
        {cfg.filters === 'atp' && (
          <div className="filters">
            <span className="btn btn-outline">Max Records is 200</span><span className="btn btn-outline">Month is current</span>
            <button className="btn" onClick={() => todo('Fetch')}>Fetch</button>
          </div>
        )}
        {cfg.filters === 'feedback' && (
          <>
            <div className="filters">
              <div className="f"><label>TYPE</label><select className="input"><option>Choose your option</option></select></div>
              <div className="f"><label>BLOCKS</label><input className="input" placeholder="Search..." /></div>
            </div>
            <div className="filters">
              <div className="f"><label>START DATE</label><input type="date" className="input" /></div>
              <div className="f"><label>END DATE</label><input type="date" className="input" /></div>
              <div className="f"><label>ASSIGN TO</label><input className="input" /></div>
            </div>
            <button className="btn btn-success" style={{ marginBottom: 16 }} onClick={() => todo('Create Feedback And Assign ATP')}>Create Feedback And Assign ATP</button>
          </>
        )}
        {msg && <div className="auth-notice info">{msg}</div>}
        <DataTable columns={cfg.columns} rows={cfg.rows} />
      </div>
    </div>
  )
}
