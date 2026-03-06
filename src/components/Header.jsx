import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { APARTMENTS } from '../data/mock'
import './Header.css'

export default function Header() {
  const { pathname } = useLocation()
  const match = pathname.match(/^\/apt\/([^/]+)/)
  const aptId = match ? match[1] : 'doosan'
  const currentApt = APARTMENTS.find((a) => a.id === aptId) || APARTMENTS[0]
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <header className="hitel-header">
      <div className="retro-header-inner">
        <Link to={`/apt/${aptId}`} className="retro-logo">
          🏘 정자일로 55 빌리지피플
        </Link>
        <div className="apt-dropdown" ref={ref}>
          <button
            type="button"
            className="apt-dropdown-trigger"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span className="apt-name">{currentApt.name}</span>
            <span className="apt-arrow">{open ? '▲' : '▼'}</span>
          </button>
          {open && (
            <ul className="apt-dropdown-menu">
              {APARTMENTS.map((apt) => (
                <li key={apt.id}>
                  <Link
                    to={`/apt/${apt.id}`}
                    className={apt.id === currentApt.id ? 'current' : ''}
                    onClick={() => setOpen(false)}
                  >
                    {apt.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}
