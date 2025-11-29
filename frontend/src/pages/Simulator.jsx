import SectionHeader from '../components/SectionHeader'

const Simulator = () => (
  <section className="content-section">
    <SectionHeader title="What-if Surge Simulator" pill="For judges & operators" />

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

export default Simulator

