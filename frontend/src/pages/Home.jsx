
import { useState } from 'react'
import { getUser } from '../services/api.js'

const DOW = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']


function Calendar() {
  const today = new Date()

  const [m, setM] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  )

  const first = (m.getDay() + 6) % 7
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate()
  const prevDays = new Date(m.getFullYear(), m.getMonth(), 0).getDate()
  const cells = []

  for (let i = first - 1; i >= 0; i--) {
    cells.push({ d: prevDays - i, out: true })
  }

  for (let d = 1; d <= days; d++) {
    cells.push({ d, out: false })
  }

  let nextDay = 1
  while (cells.length % 7) {
    cells.push({ d: nextDay++, out: true })
  }

  const isSameDate = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()

  return (
    <div className="cal">
      <div className="cal-head">
        <button
          type="button"
          onClick={() => setM(new Date(m.getFullYear(), m.getMonth() - 1, 1))}
        >
          ‹
        </button>

        {m.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric'
        })}

        <button
          type="button"
          onClick={() => setM(new Date(m.getFullYear(), m.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>

      <div className="cal-grid">
        {DOW.map(d => (
          <div key={d} className="dow">{d}</div>
        ))}

        {cells.map((c, i) => {
          const cellDate = c.out
            ? null
            : new Date(m.getFullYear(), m.getMonth(), c.d)

          const isToday = cellDate && isSameDate(cellDate, today)
          const isSelected = cellDate && isSameDate(cellDate, selectedDate)

          return (
            <button
              key={i}
              type="button"
              disabled={c.out}
              onClick={() => setSelectedDate(cellDate)}
              className={
                'day' +
                (c.out ? ' out' : '') +
                (isToday ? ' today' : '') +
                (isSelected ? ' selected' : '')
              }
            >
              {c.d}
            </button>
          )
        })}
      </div>
    </div>
  )
}


const initialForm = () => ({
  date: new Date().toISOString().slice(0, 10),
  subject: '',
  objective: '',
  activity: '',
  subActivity: '',
  owner: 'amarnath .',
  patient: '',
  block: 'Test Block',
  panchayat: '',
  village: '',
  remarks: '',
  comment: ''
})

function SearchField({ label, value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="task-field">
      <label>{label}</label>
      <div className="task-search-control">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          title={`Search ${label}`}
          onClick={() => {
            if (!value.trim()) return
            alert(`${label} search: ${value}`)
          }}
        >
          <span className="task-search-icon">⌕</span>
        </button>
      </div>
    </div>
  )
}

function TaskModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm)

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!form.subject.trim()) {
      alert('Please enter the Subject.')
      return
    }

    onSave(form)
  }

  return (
    <div className="task-modal-overlay" onMouseDown={e => {
      if (e.target === e.currentTarget) onClose()
    }}>
      <form className="task-modal" onSubmit={handleSubmit}>
        <div className="task-modal-header">
          <strong>Task</strong>
          <button type="button" className="task-modal-x" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="task-modal-body">
          <div className="task-field task-date-field">
            <label>DATE</label>
            <input
              type="date"
              value={form.date}
              onChange={e => update('date', e.target.value)}
            />
          </div>

          <div className="task-field">
            <label>SUBJECT</label>
            <input
              value={form.subject}
              onChange={e => update('subject', e.target.value)}
            />
          </div>

          <SearchField
            label="OBJECTIVE"
            value={form.objective}
            onChange={v => update('objective', v)}
          />

          <div className="task-field">
            <label>ACTIVITY</label>
            <select
              value={form.activity}
              onChange={e => update('activity', e.target.value)}
            >
              <option value="">Choose your option</option>
              <option>Assessment</option>
              <option>Training</option>
              <option>Home Visit</option>
              <option>Follow Up</option>
            </select>
          </div>

          <div className="task-field">
            <label>SUB ACTIVITY</label>
            <select
              value={form.subActivity}
              onChange={e => update('subActivity', e.target.value)}
            >
              <option value="">Choose your option</option>
              <option>Individual Activity</option>
              <option>Group Activity</option>
              <option>Review</option>
              <option>Other</option>
            </select>
          </div>

          <div className="task-form-grid">
            <SearchField
              label="OWNER"
              value={form.owner}
              onChange={v => update('owner', v)}
            />
            <SearchField
              label="PATIENT"
              value={form.patient}
              onChange={v => update('patient', v)}
            />
            <SearchField
              label="BLOCK"
              value={form.block}
              onChange={v => update('block', v)}
            />
            <SearchField
              label="PANCHAYAT"
              value={form.panchayat}
              onChange={v => update('panchayat', v)}
            />
            <SearchField
              label="VILLAGE"
              value={form.village}
              onChange={v => update('village', v)}
            />
            <div className="task-field">
              <label>REMARKS</label>
              <input
                value={form.remarks}
                onChange={e => update('remarks', e.target.value)}
              />
            </div>
            <SearchField
              label="COMMENT"
              value={form.comment}
              onChange={v => update('comment', v)}
            />
          </div>
        </div>

        <div className="task-modal-footer">
          <button type="button" className="task-close-btn" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="task-save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

function TasksPanel({ tasks, onAdd }) {
  const today = new Date()
  const taskDate = [
    today.toLocaleDateString('en-US', { weekday: 'short' }),
    today.toLocaleDateString('en-US', { month: 'short' }),
    String(today.getDate()).padStart(2, '0'),
    today.getFullYear()
  ].join(' ')

  return (
    <section className="home-task-panel">
      <div className="home-task-header">
        <strong>{taskDate} Tasks</strong>
        <button
          type="button"
          className="home-task-add"
          title="Add task"
          aria-label="Add task"
          onClick={onAdd}
        >
          +
        </button>
      </div>

      <div className="home-task-table">
        <div className="home-task-columns">
          <strong>Subject</strong>
          <strong>Status</strong>
        </div>

        {tasks.length === 0 ? (
          <div className="home-task-empty" />
        ) : (
          tasks.map(task => (
            <div className="home-task-row" key={task.id}>
              <span>{task.subject}</span>
              <span className="home-task-status">Open</span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}


export default function Home() {
  const user = getUser()

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [tasks, setTasks] = useState([])

  const date = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })

  const addTask = form => {
    setTasks(prev => [
      ...prev,
      { ...form, id: Date.now() }
    ])
    setShowTaskModal(false)
  }

  return (
    <div className="card home-page">

      <div className="hero">
        <small>HOME</small>

        <h1>
          Hi, {user?.full_name || user?.username || 'user'} .
        </h1>

        <div>
          Welcome to Enabling Inclusion — Satya School
        </div>

        <div className="home-school-badge">
          Satya School
        </div>
      </div>

      <div className="stat-row">

        <div className="stat">
          <div className="ico">✓</div>
          <div>
            <small>DUE TODAY</small>
            <div className="num">{tasks.length}</div>
            <div className="sub">
              Open tasks scheduled today
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="ico">↗</div>
          <div>
            <small>OPEN WORKLOAD</small>
            <div className="num">{tasks.length}</div>
            <div className="sub">
              Tasks requiring attention
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="ico">◷</div>
          <div>
            <small>WORKING DATE</small>
            <div className="num" style={{ fontSize: 18 }}>
              {date}
            </div>
            <div className="sub">
              Your live workspace
            </div>
          </div>
        </div>

      </div>

      <div className="home-grid">

        <div>
          <h4 style={{ letterSpacing: '.1em' }}>
            TODAY’S PENDING TASKS
          </h4>

          {tasks.length === 0 ? (
            <div style={{
              border: '1px dashed var(--color-border)',
              borderRadius: 10,
              padding: 18,
              color: 'var(--color-text-muted)'
            }}>
              No open tasks for today. Use the calendar to review
              other dates or add a task.
            </div>
          ) : (
            <div className="home-pending-list">
              {tasks.map(task => (
                <div className="home-pending-item" key={task.id}>
                  <strong>{task.subject}</strong>
                  <span>Open</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="home-right-column">
          <Calendar />

          <TasksPanel
            tasks={tasks}
            onAdd={() => setShowTaskModal(true)}
          />
        </div>

      </div>

      {showTaskModal && (
        <TaskModal
          onClose={() => setShowTaskModal(false)}
          onSave={addTask}
        />
      )}

    </div>
  )
}
