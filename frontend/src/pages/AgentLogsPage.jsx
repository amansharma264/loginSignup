import '../App.css'

const MOCK_LOGS = [
  {
    id: 'req-001',
    hospitalId: 'MH-001',
    time: '03:14:12 IST',
    steps: [
      'Monitor Agent: AQI 288 · festival_score 0.82 · weather_risk 0.31 → alertLevel=HIGH',
      'Staffing Planner: predictedInflow 1.5x → +6 ED doctors, +14 nurses, +8 support staff',
      'Supplies Planner: +40 oxygen cylinders, +12 monitored beds, replenish antivirals',
      'Advisory Agent: enable teleconsults for mild respiratory cases; triage by SpO₂ & comorbidities',
      'Coordinator Agent: final plan pushed to 4 linked hospitals for load balancing',
    ],
  },
  {
    id: 'req-002',
    hospitalId: 'DL-014',
    time: '03:16:44 IST',
    steps: [
      'Monitor Agent: AQI 192 · festival_score 0.20 → alertLevel=MEDIUM',
      'Staffing Planner: predictedInflow 1.1x → +2 ED doctors, +5 nurses',
      'Coordinator Agent: no inter-hospital diversions recommended',
    ],
  },
]

export default function AgentLogsPage() {
  return (
    <section className="content-section">
      <div className="section-title-row">
        <h2 className="section-title">Agent Trace Console</h2>
        <span className="pill">Monitor · Planner · Advisory · Coordinator</span>
      </div>

      <div className="card">
        <div className="card-title">Recent agent runs</div>
        <p className="card-subtitle">
          This page is designed for observability – you&apos;ll later stream real traces from your backend.
        </p>

        <div className="timeline-list">
          {MOCK_LOGS.map((log) => (
            <div key={log.id} className="timeline-item">
              <div className="timeline-header">
                <div>
                  <div className="timeline-title">
                    Request {log.id} · {log.hospitalId}
                  </div>
                  <div className="timeline-meta">{log.time}</div>
                </div>
                <span className="badge badge-soft">Success</span>
              </div>
              <ol className="timeline-steps">
                {log.steps.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


