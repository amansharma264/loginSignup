import SectionHeader from '../components/SectionHeader'
import { simulationRuns } from '../data/mockHospitals'

const SimulationHistory = () => (
  <section className="content-section">
    <SectionHeader
      title="Simulation history"
      pill="Guinness-scale network runs"
      description="Track how our 1000-hospital stress tests are trending. All numbers come from the simulated backend."
    />

    <div className="sim-grid">
      {simulationRuns.map((run) => (
        <article key={run.id} className="card sim-card">
          <header className="sim-header">
            <div>
              <div className="sim-id">{run.id}</div>
              <div className="sim-time">{run.startedAt}</div>
            </div>
            <span className="pill">{run.hospitals} hospitals</span>
          </header>
          <div className="sim-stats">
            <div>
              <div className="sim-label">Duration</div>
              <div className="sim-value">{run.durationSeconds} sec</div>
            </div>
            <div>
              <div className="sim-label">Avg latency</div>
              <div className="sim-value">{run.avgLatencyMs} ms</div>
            </div>
            <div>
              <div className="sim-label">Max latency</div>
              <div className="sim-value">{run.maxLatencyMs} ms</div>
            </div>
            <div>
              <div className="sim-label">Accuracy</div>
              <div className="sim-value">{run.accuracy}%</div>
            </div>
            <div>
              <div className="sim-label">Errors</div>
              <div className="sim-value">{run.errors}</div>
            </div>
          </div>
          <div className="timeline">
            Concurrency {run.concurrency} · Throughput {Math.round(run.hospitals / run.durationSeconds)} hospitals/second
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default SimulationHistory

