
import { useState } from 'react'
import { getUser } from '../services/api.js'

const DOW = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

function Calendar() {
  const today = new Date()

  const [m, setM] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const first = (m.getDay() + 6) % 7
  const days = new Date(
    m.getFullYear(),
    m.getMonth() + 1,
    0
  ).getDate()

  const prevDays = new Date(
    m.getFullYear(),
    m.getMonth(),
    0
  ).getDate()

  const cells = []

  for (let i = first - 1; i >= 0; i--) {
    cells.push({ d: prevDays - i, out: true })
  }

  for (let d = 1; d <= days; d++) {
    cells.push({
      d,
      today:
        d === today.getDate() &&
        m.getMonth() === today.getMonth() &&
        m.getFullYear() === today.getFullYear()
    })
  }

  let nextDay = 1

  while (cells.length % 7) {
    cells.push({ d: nextDay++, out: true })
  }

  return (
    <div className="cal">
      <div className="cal-head">
        <button
          type="button"
          onClick={() =>
            setM(new Date(m.getFullYear(), m.getMonth() - 1, 1))
          }
        >
          ‹
        </button>

        {m.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric'
        })}

        <button
          type="button"
          onClick={() =>
            setM(new Date(m.getFullYear(), m.getMonth() + 1, 1))
          }
        >
          ›
        </button>
      </div>

      <div className="cal-grid">
        {DOW.map((d) => (
          <div key={d} className="dow">
            {d}
          </div>
        ))}

        {cells.map((c, i) => (
          <div
            key={i}
            className={
              'day' +
              (c.out ? ' out' : '') +
              (c.today ? ' today' : '')
            }
          >
            {c.d}
          </div>
        ))}
      </div>
    </div>
  )
}

function TasksPanel() {
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
        >
          +
        </button>
      </div>

      <div className="home-task-table">
        <div className="home-task-columns">
          <strong>Subject</strong>
          <strong>Status</strong>
        </div>

        <div className="home-task-empty" />
      </div>
    </section>
  )
}

export default function Home() {
  const user = getUser()

  const date = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })

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
            <div className="num">0</div>
            <div className="sub">
              Open tasks scheduled today
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="ico">↗</div>
          <div>
            <small>OPEN WORKLOAD</small>
            <div className="num">0</div>
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

          <div
            style={{
              border: '1px dashed var(--color-border)',
              borderRadius: 10,
              padding: 18,
              color: 'var(--color-text-muted)'
            }}
          >
            No open tasks for today. Use the calendar to review
            other dates or add a task.
          </div>
        </div>

        <div className="home-right-column">
          <Calendar />
          <TasksPanel />
        </div>

      </div>
    </div>
  )
}
