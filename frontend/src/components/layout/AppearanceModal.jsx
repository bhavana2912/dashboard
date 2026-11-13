import { useState } from 'react'

const THEMES = [['ocean', 'Ocean Navy'], ['forest', 'Forest'], ['teal', 'Coastal Teal'], ['graphite', 'Graphite'], ['sunrise', 'Sunrise'], ['sky', 'Sky Blue']]

export default function AppearanceModal({ onClose }) {
  const [theme, setTheme] = useState(localStorage.getItem('satya_theme') || 'ocean')
  const [density, setDensity] = useState(localStorage.getItem('satya_density') || 'comfortable')

  const pickTheme = (t) => { setTheme(t); localStorage.setItem('satya_theme', t); document.documentElement.dataset.theme = t }
  const pickDensity = (d) => { setDensity(d); localStorage.setItem('satya_density', d); document.body.dataset.density = d }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Appearance</b><button className="icon-btn" onClick={onClose}>✕</button></div>
        <small>Personalise your workspace</small>
        <p><b>Colour theme</b></p>
        <div className="theme-grid">
          {THEMES.map(([k, n]) => <button key={k} className={'theme-opt' + (theme === k ? ' on' : '')} onClick={() => pickTheme(k)}>{n}</button>)}
        </div>
        <p><b>Display density</b></p>
        <div className="theme-grid">
          <button className={'theme-opt' + (density === 'comfortable' ? ' on' : '')} onClick={() => pickDensity('comfortable')}>Comfortable</button>
          <button className={'theme-opt' + (density === 'compact' ? ' on' : '')} onClick={() => pickDensity('compact')}>Compact</button>
        </div>
      </div>
    </div>
  )
}
