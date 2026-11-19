
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DataTable from '../components/common/DataTable.jsx'
import { TABLES } from '../utils/tableConfig.js'
import '../styles/block-modal.css'

export default function TablePage({ configKey }) {
  const { pathname } = useLocation()
  const key = configKey || pathname.replace(/^\//, '')
  const cfg = TABLES[key]
  const isBlockMaster = key === 'master/block'

  const [msg, setMsg] = useState('')
  const [rows, setRows] = useState(() =>
    cfg ? cfg.rows.map(row => [...row]) : []
  )
  const [modal, setModal] = useState('')
  const [selected, setSelected] = useState(null)
  const [blockName, setBlockName] = useState('')

  if (!cfg) {
    return <div className="card"><div className="placeholder">Page not found</div></div>
  }

  const now = () => new Date().toLocaleString('en-IN')

  const openAdd = () => {
    setBlockName('')
    setSelected(null)
    setMsg('')
    setModal('add')
  }

  const openView = (row) => {
    setSelected(row)
    setBlockName(row[1])
    setMsg('')
    setModal('view')
  }

  const openEdit = () => {
    setBlockName(selected[1])
    setModal('edit')
  }

  const closeModal = () => {
    setModal('')
    setSelected(null)
    setMsg('')
  }

  const saveBlock = () => {
    const name = blockName.trim()

    if (!name) {
      setMsg('Please enter block name.')
      return
    }

    if (modal === 'add') {
      const nextId = Math.max(
        0,
        ...rows.map(row => Number(row[0].replace('BL', '')) || 0)
      ) + 1

      const newRow = [
        `BL${nextId}`,
        name,
        'Admin User',
        now(),
        '',
        ''
      ]

      setRows(prev => [...prev, newRow])
      closeModal()
      return
    }

    if (modal === 'edit' && selected) {
      const updated = [...selected]
      updated[1] = name
      updated[4] = 'Admin User'
      updated[5] = now()

      setRows(prev =>
        prev.map(row => row[0] === updated[0] ? updated : row)
      )

      setSelected(updated)
      setModal('view')
      setMsg('')
    }
  }

  const todo = (what) =>
    setMsg(`${what}: backend API for this screen is not connected yet.`)

  return (
    <>
      <div className="card">
        <div className="card-head">
          <span>{cfg.title}</span>

          <div className="acts">
            {isBlockMaster ? (
              <button className="sq-btn" title="Add" onClick={openAdd}>+</button>
            ) : (
              cfg.buttons?.map(b => (
                <button key={b} className="btn"
                  style={{ background: '#1f6fb5' }}
                  onClick={() => todo(b)}>{b}</button>
              ))
            )}

            <button className="sq-btn" title="Refresh"
              onClick={() => {
                setMsg('')
                if (isBlockMaster) {
                  setRows(cfg.rows.map(row => [...row]))
                }
              }}>⟳</button>
          </div>
        </div>

        <div className="card-body">
          {msg && !modal && <div className="auth-notice info">{msg}</div>}

          <DataTable
            columns={cfg.columns}
            rows={isBlockMaster ? rows : cfg.rows}
            onIdClick={isBlockMaster ? openView : undefined}
          />
        </div>
      </div>

      {isBlockMaster && modal && (
        <div className="block-modal-overlay" onMouseDown={e => {
          if (e.target === e.currentTarget) closeModal()
        }}>
          <div className="block-modal">

            <div className="block-modal-header">
              <strong>Block Master</strong>
              <button className="block-modal-x" onClick={closeModal}>×</button>
            </div>

            <div className="block-modal-body">
              <div className="block-field">
                <label>BLOCK</label>
                <input
                  value={blockName}
                  onChange={e => setBlockName(e.target.value)}
                  readOnly={modal === 'view'}
                  autoFocus={modal !== 'view'}
                />
              </div>

              {modal !== 'add' && (
                <>
                  <div className="block-system-info">
                    <span className="block-info-icon">▪</span>
                    System Information
                  </div>

                  <div className="block-info-grid">
                    <div className="block-field">
                      <label>CREATED BY</label>
                      <input value={`${selected?.[2] || ''}  ${selected?.[3] || ''}`} readOnly />
                    </div>

                    <div className="block-field">
                      <label>MODIFIED BY</label>
                      <input
                        value={selected?.[4]
                          ? `${selected[4]}  ${selected[5]}`
                          : ''}
                        readOnly
                      />
                    </div>
                  </div>
                </>
              )}

              {msg && <div className="block-validation">{msg}</div>}
            </div>

            <div className="block-modal-footer">
              <button className="block-btn block-btn-close"
                onClick={closeModal}>Close</button>

              {modal === 'view' ? (
                <button className="block-btn block-btn-edit"
                  onClick={openEdit}>Edit</button>
              ) : (
                <button className="block-btn block-btn-save"
                  onClick={saveBlock}>Save</button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
