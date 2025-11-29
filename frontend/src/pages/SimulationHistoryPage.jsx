import '../App.css'

const MOCK_RUNS = [
  {
    id: 'sim-2025-03-01-001',
    hospitals: 1000,
    concurrency: 20,
    durationSec: 94,
    avgLatencyMs: 87,
    errorRate: 0.073,
  },
  {
    id: 'sim-2025-02-28-004',
    hospitals: 1000,
    concurrency: 16,
    durationSec: 112,
    avgLatencyMs: 102,
    errorRate: 0.091,
  },
  {
    id: 'sim-2025-02-27-002',
    hospitals: 512,
    concurrency: 12,
    durationSec: 63,
    avgLatencyMs: 79,
    errorRate: 0.064,
  },
]

export default function SimulationHistoryPage() {
  return (
    <section className="content-section">
      <div className="section-title-row">
        <h2 className="section-title">Simulation History</h2>
        <span className="pill">Guinness-style record runs</span>
      </div>

      <div className="card">
        <div className="card-title">National network simulations</div>
        <p className="card-subtitle">
          Each row represents a full multi-hospital run. Later you&apos;ll populate this from MongoDB.
        </p>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Run ID</th>
                <th>Hospitals</th>
                <th>Concurrency</th>
                <th>Total time</th>
                <th>Avg agent latency</th>
                <th>Error rate</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RUNS.map((run) => (
                <tr key={run.id}>
                  <td>{run.id}</td>
                  <td>{run.hospitals.toLocaleString()}</td>
                  <td>{run.concurrency}x</td>
                  <td>{run.durationSec} sec</td>
                  <td>{run.avgLatencyMs} ms</td>
                  <td>{(run.errorRate * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


