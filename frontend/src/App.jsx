import './App.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

function HomeHero() {
  const navigate = useNavigate()

  return (
    <div className="main-layout">
      <div className="hero-wrapper">
        <section className="hero">
          <p className="hero-tagline">National-scale surge readiness • Mumbai Hacks 2025</p>
          <h1 className="hero-title">
            Unbeatable{' '}
            <span className="hero-highlight">
              critical surge-readiness
            </span>{' '}
            for 1000+ hospitals.
          </h1>
          <p className="hero-subtitle">
            Arogya AI autonomously coordinates staffing, supplies, and advisories across a simulated
            pan-India network – ready for festivals, pollution spikes, or epidemics.
          </p>

          <div className="hero-ctas">
            <button
              className="hero-button-primary"
              onClick={() => navigate('/dashboard')}
            >
              View live command center →
            </button>
            <button
              className="hero-button-secondary"
              onClick={() => navigate('/simulator')}
            >
              Run 1000-hospital simulation
            </button>
          </div>

          <div className="hero-metrics">
            <div>
              <span className="metric-label">Hospitals coordinated</span>
              <span className="metric-value">1,024</span>
            </div>
            <div>
              <span className="metric-label">Network run time (1000 hospitals)</span>
              <span className="metric-value">94 sec</span>
            </div>
            <div>
              <span className="metric-label">Average prediction accuracy</span>
              <span className="metric-value">92.3%</span>
            </div>
          </div>
        </section>
      </div>

      <aside className="right-rail">
        <button className="right-rail-toggle">
          » HIDE
        </button>
        <div className="right-rail-buttons">
          <button className="rail-button" onClick={() => navigate('/simulator')}>
            <div className="rail-icon">▶</div>
            <div>
              <div className="rail-text-main">I&apos;m here to simulate</div>
              <div className="rail-text-sub">Run surge scenarios</div>
            </div>
          </button>
          <button className="rail-button">
            <div className="rail-icon">🏆</div>
            <div>
              <div className="rail-text-main">Arogya Challenge</div>
              <div className="rail-text-sub">Guinness-scale benchmarks</div>
            </div>
          </button>
          <button className="rail-button">
            <div className="rail-icon">❤️</div>
            <div>
              <div className="rail-text-main">Health offers</div>
              <div className="rail-text-sub">Optimised supply bundles</div>
            </div>
          </button>
          <button className="rail-button">
            <div className="rail-icon">➕</div>
            <div>
              <div className="rail-text-main">Refer a hospital</div>
              <div className="rail-text-sub">Add to the network</div>
            </div>
          </button>
          <button className="rail-button" onClick={() => navigate('/dashboard')}>
            <div className="rail-icon">🔐</div>
            <div>
              <div className="rail-text-main">Admin login</div>
              <div className="rail-text-sub">Command console</div>
            </div>
          </button>
        </div>
      </aside>
    </div>
  )
}

function DashboardPage() {
  return (
    <section className="content-section">
      <div className="section-title-row">
        <h2 className="section-title">National Surge Command Dashboard</h2>
        <span className="pill">Live simulation · 1000 hospitals</span>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">Real-time surge overview</div>
          <p className="card-subtitle">
            AI agents continuously scan festivals, AQI, and weather to predict and balance patient inflow.
          </p>
          <div className="mini-metrics">
            <div className="mini-metric">
              <div className="mini-metric-label">Hospitals in &quot;High Alert&quot;</div>
              <div className="mini-metric-value">87</div>
            </div>
            <div className="mini-metric">
              <div className="mini-metric-label">Beds remaining (network)</div>
              <div className="mini-metric-value">12,430</div>
            </div>
            <div className="mini-metric">
              <div className="mini-metric-label">Active agent plans (last 5 min)</div>
              <div className="mini-metric-value">3,214</div>
            </div>
          </div>
          <div className="timeline">
            Last update · 03:14:27 IST · Next recompute in 12s · All regions stable; Mumbai Central on
            surge watch due to AQI 288 &amp; Navratri processions.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Today&apos;s Guinness run snapshot</div>
          <p className="card-subtitle">
            &ldquo;First AI system to autonomously coordinate surge-readiness for 1000+ hospitals in under 2 minutes.&rdquo;
          </p>
          <ul style={{ fontSize: 12, color: '#4b5563', paddingLeft: 18, margin: 0 }}>
            <li>Network run: 1,000 hospitals · 20-way concurrency</li>
            <li>End-to-end latency: 94 seconds</li>
            <li>Average agent pipeline latency: 87 ms</li>
            <li>Error rate (prediction drift &gt; 15%): 7.3%</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function SimulatorPage() {
  return (
    <section className="content-section">
      <div className="section-title-row">
        <h2 className="section-title">What-if Surge Simulator</h2>
        <span className="pill">For judges &amp; operators</span>
      </div>
      <div className="card">
        <div className="card-title">Tune the city and festival context</div>
        <p className="card-subtitle">
          Adjust conditions and re-run the full agent pipeline. The backend will recompute predictions,
          staffing, supplies, and public advisories.
        </p>

        <div className="simulator-controls">
          <div className="control-group">
            <label className="control-label">City / Cluster</label>
            <select className="control-input" defaultValue="Mumbai Metropolitan">
              <option>Mumbai Metropolitan</option>
              <option>Delhi NCR</option>
              <option>Bengaluru Urban</option>
              <option>Kolkata</option>
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">AQI override</label>
            <input className="control-input" type="number" placeholder="e.g. 280" />
          </div>
          <div className="control-group">
            <label className="control-label">Festival mode</label>
            <select className="control-input" defaultValue="Navratri">
              <option>None</option>
              <option>Navratri</option>
              <option>Diwali</option>
              <option>Ganesh Chaturthi</option>
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">Staff shortage %</label>
            <input className="control-input" type="number" placeholder="e.g. 18" />
          </div>
          <button className="control-button">Run 1000-hospital simulation</button>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header>
        <div className="top-strip">
          <div className="top-strip-left">
            <div className="brand-logo">
              <div className="brand-mark" />
              <div>
                <div className="brand-text-main">Arogya AI Network</div>
                <div className="brand-text-sub">health · surge-readiness · life</div>
              </div>
            </div>
            <div className="record-badge">
              Guinness-style claim · 1000+ hospitals coordinated in &lt; 2 minutes
            </div>
          </div>
          <div className="top-strip-right">
            <div className="top-action">
              <span className="icon">⚡</span>
              Surge hotline · 24x7
            </div>
            <div className="top-action">
              <span className="icon">📊</span>
              Live metrics
            </div>
          </div>
        </div>

        <nav className="nav-bar">
          <div className="nav-links">
            <Link className="nav-link" to="/">Hospitals</Link>
            <Link className="nav-link" to="/dashboard">Command Center</Link>
            <Link className="nav-link" to="/simulator">Simulator</Link>
            <span className="nav-link">Agents</span>
            <span className="nav-link">About</span>
          </div>
          <div className="nav-search">
            <input placeholder="Search hospitals, cities, specialities" />
            <span className="nav-search-icon">🔍</span>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomeHero />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
      </Routes>

      <footer className="footer">
        <span>
          Built for <strong>Mumbai Hacks</strong> · Arogya AI Surge Operations Engine
        </span>
        <span>All data is simulated for 1000+ virtual hospitals · Not for clinical use</span>
      </footer>
    </div>
  )
}

export default App
