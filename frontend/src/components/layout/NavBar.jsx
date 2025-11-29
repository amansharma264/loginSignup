import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Hospitals', to: '/hospitals' },
  { label: 'Command Center', to: '/dashboard' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'Agent Logs', to: '/agent-logs' },
  { label: 'Sim History', to: '/simulation-history' },
]

const NavBar = () => (
  <nav className="nav-bar">
    <div className="nav-links">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
    <div className="nav-search">
      <input placeholder="Search hospitals, cities, specialties" />
      <span className="nav-search-icon">🔍</span>
    </div>
  </nav>
)

export default NavBar

