import SectionHeader from '../components/SectionHeader'
import MiniMetric from '../components/MiniMetric'

const Dashboard = () => (
  <section className="content-section">
    <SectionHeader
      title="National Surge Command Dashboard"
      pill="Live simulation · 1000 hospitals"
      description="AI agents continuously scan festivals, AQI, and weather to predict and balance patient inflow."
    />

    <div className="dashboard-grid">
      <div className="card">
        <div className="card-title">Real-time surge overview</div>
        <div className="mini-metrics">
          <MiniMetric label='Hospitals in "High Alert"' value="87" />
          <MiniMetric label="Beds remaining (network)" value="12,430" />
          <MiniMetric label="Active agent plans (last 5 min)" value="3,214" />
        </div>
        <div className="timeline">
          Last update · 03:14:27 IST · Next recompute in 12s · All regions stable; Mumbai Central on
          surge watch due to AQI 288 &amp; Navratri processions.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Today&apos;s Guinness run snapshot</div>
        <p className="card-subtitle">
          &ldquo;First AI system to autonomously coordinate surge-readiness for 1000+ hospitals in
          under 2 minutes.&rdquo;
        </p>
        <ul className="list">
          <li>Network run: 1,000 hospitals · 20-way concurrency</li>
          <li>End-to-end latency: 94 seconds</li>
          <li>Average agent pipeline latency: 87 ms</li>
          <li>Error rate (prediction drift &gt; 15%): 7.3%</li>
        </ul>
      </div>
    </div>
  </section>
)

export default Dashboard

