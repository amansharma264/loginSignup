import RightRail from '../components/RightRail'

const Home = () => (
  <div className="main-layout">
    <div className="hero-wrapper">
      <section className="hero">
        <p className="hero-tagline">National-scale surge readiness • Mumbai Hacks 2025</p>
        <h1 className="hero-title">
          Unbeatable <span className="hero-highlight">critical surge-readiness</span> for 1000+
          hospitals.
        </h1>
        <p className="hero-subtitle">
          Arogya AI autonomously coordinates staffing, supplies, and advisories across a simulated
          pan-India network – ready for festivals, pollution spikes, or epidemics.
        </p>

        <div className="hero-ctas">
          <a className="hero-button-primary" href="/dashboard">
            View live command center →
          </a>
          <a className="hero-button-secondary" href="/simulator">
            Run 1000-hospital simulation
          </a>
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

    <RightRail />
  </div>
)

export default Home

