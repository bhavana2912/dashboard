import { useMemo, useState } from 'react'

// Reusable table: "Show entries", search, pagination, "Showing x to y of z entries"
export default function DataTable({ columns, rows }) {
  const [size, setSize] = useState(10)
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? rows.filter((r) => r.some((v) => String(v).toLowerCase().includes(s))) : rows
  }, [rows, q])

  const pages = Math.max(1, Math.ceil(filtered.length / size))
  const cur = Math.min(page, pages)
  const start = (cur - 1) * size
  const view = filtered.slice(start, start + size)
  const from = filtered.length ? start + 1 : 0
  const to = start + view.length

  return (
    <>
      <div className="dt-top">
        <label>Show entries
          <select value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(1) }}>
            {[10, 25, 50, 100].map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>
        <input className="input" placeholder="Search" value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} />
      </div>
      <div className="dt-wrap">
        <table className="dt">
          <thead><tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr></thead>
          <tbody>
            {view.length === 0 && <tr><td className="dt-empty" colSpan={columns.length}>No matching records found</td></tr>}
            {view.map((r, i) => (
              <tr key={i}>{r.map((v, j) => <td key={j}>{j === 0 && columns[0].label === 'ID' ? <span className="idlink">{v}</span> : v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dt-bottom">
        <span>Showing {from} to {to} of {filtered.length} entries</span>
        <div className="pager">
          <button disabled={cur === 1} onClick={() => setPage(cur - 1)}>Previous</button>
          {Array.from({ length: Math.min(pages, 7) }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === cur ? 'on' : ''} onClick={() => setPage(n)}>{n}</button>
          ))}
          <button disabled={cur === pages} onClick={() => setPage(cur + 1)}>Next</button>
        </div>
      </div>
    </>
  )
}
