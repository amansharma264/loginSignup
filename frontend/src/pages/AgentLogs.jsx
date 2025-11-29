import SectionHeader from '../components/SectionHeader'
import { agentLogs } from '../data/mockHospitals'

const AgentLogs = () => (
  <section className="content-section">
    <SectionHeader
      title="Agent trace logs"
      pill="Monitor → Planner → Advisor → Coordinator"
      description="Deep-dive into the reasoning trail for each surge request. All data below is simulated to mimic a national-scale run."
    />

    <div className="logs-grid">
      {agentLogs.map((log) => (
        <article key={log.id} className="card log-card">
          <header className="log-header">
            <div>
              <div className="log-label">{log.id}</div>
              <div className="log-title">Hospital {log.hospitalId}</div>
            </div>
            <span className="pill">{log.timestamp}</span>
          </header>

          <div className="log-section">
            <h4>Monitor agent</h4>
            <p>
              <strong>Alert:</strong> {log.monitor.alertLevel} ·{' '}
              <strong>Urgency:</strong> {log.monitor.recommendedUrgency}
            </p>
            <ul className="list">
              {log.monitor.riskFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </div>

          <div className="log-columns">
            <div>
              <h4>Staffing planner</h4>
              <p>
                Doctors: <strong>{log.staffing.doctorsNeeded}</strong>
              </p>
              <p>
                Nurses: <strong>{log.staffing.nursesNeeded}</strong>
              </p>
              <p>
                Support staff: <strong>{log.staffing.supportStaffNeeded}</strong>
              </p>
            </div>
            <div>
              <h4>Supplies planner</h4>
              <p>Oxygen cylinders: {log.supplies.oxygenCylinders}</p>
              <p>Beds: {log.supplies.beds}</p>
              <p>Common meds: {log.supplies.commonMedicines}</p>
              <p>Special meds: {log.supplies.specialMedicines}</p>
            </div>
          </div>

          <div className="log-section">
            <h4>Advisory agent</h4>
            <ul className="list">
              <li>{log.advisory.publicAdvisory}</li>
              <li>{log.advisory.triageRules}</li>
              <li>{log.advisory.teleconsultation}</li>
              <li>{log.advisory.pollutionGuidelines}</li>
            </ul>
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default AgentLogs

