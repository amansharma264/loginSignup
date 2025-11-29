import '../App.css'
import { useParams } from 'react-router-dom'

const MOCK_DETAIL = {
  id: 'MH-001',
  name: 'Arogya Care – Mumbai Central',
  city: 'Mumbai',
  state: 'MH',
  baselinePatients: 320,
  predictedInflow: 480,
  alertLevel: 'High',
  departments: ['Emergency', 'ICU', 'Cardiology', 'Pulmonology'],
  staffingPlan: {
    doctors: 28,
    nurses: 74,
    support: 41,
  },
  suppliesPlan: {
    oxygen: 210,
    beds: 38,
    commonMeds: 'Paracetamol, broad-spectrum antibiotics, nebulisers',
    specialMeds: 'Antivirals, cardiac emergency kits',
  },
  advisory: 'Advise high‑risk respiratory patients to avoid outdoor activity; enable teleconsults for mild cases.',
}

export default function HospitalDetailPage() {
  const { id } = useParams()
  const hospital = MOCK_DETAIL // in real app, fetch by id

  return (
    <section className="content-section">
      <div className="section-title-row">
        <h2 className="section-title">{hospital.name}</h2>
        <span className="pill">
          ID: {id || hospital.id} · {hospital.city}, {hospital.state}
        </span>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">Surge outlook</div>
          <p className="card-subtitle">
            Baseline vs predicted inflow based on the current festival, AQI, and weather conditions.
          </p>
          <div className="mini-metrics">
            <div className="mini-metric">
              <div className="mini-metric-label">Baseline daily patients</div>
              <div className="mini-metric-value">{hospital.baselinePatients}</div>
            </div>
            <div className="mini-metric">
              <div className="mini-metric-label">Predicted inflow (next 24h)</div>
              <div className="mini-metric-value">{hospital.predictedInflow}</div>
            </div>
            <div className="mini-metric">
              <div className="mini-metric-label">Alert level</div>
              <div className="mini-metric-value">{hospital.alertLevel}</div>
            </div>
          </div>
          <div className="timeline">
            Agents considered last 7 days of admissions, AQI 282, and Navratri processions when computing this surge.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Departments</div>
          <p className="card-subtitle">
            High-impact specialties being prioritised for surge-readiness.
          </p>
          <ul className="pill-list">
            {hospital.departments.map((dep) => (
              <li key={dep} className="pill pill-soft">
                {dep}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-title">Staffing plan</div>
          <p className="card-subtitle">
            Coordinator agent merged Monitor + Planner outputs into this staffing recommendation.
          </p>
          <ul className="key-value-list">
            <li>
              <span>Doctors needed</span>
              <strong>{hospital.staffingPlan.doctors}</strong>
            </li>
            <li>
              <span>Nurses needed</span>
              <strong>{hospital.staffingPlan.nurses}</strong>
            </li>
            <li>
              <span>Support staff</span>
              <strong>{hospital.staffingPlan.support}</strong>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-title">Supplies & advisory</div>
          <p className="card-subtitle">
            Supplies Planner and Advisory Agent outputs for this hospital.
          </p>
          <ul className="key-value-list">
            <li>
              <span>Oxygen cylinders</span>
              <strong>{hospital.suppliesPlan.oxygen}</strong>
            </li>
            <li>
              <span>Additional beds</span>
              <strong>{hospital.suppliesPlan.beds}</strong>
            </li>
            <li>
              <span>Common medicines</span>
              <strong>{hospital.suppliesPlan.commonMeds}</strong>
            </li>
            <li>
              <span>Specialised medicines</span>
              <strong>{hospital.suppliesPlan.specialMeds}</strong>
            </li>
          </ul>
          <div className="advisory-box">
            <div className="advisory-label">Public advisory</div>
            <p>{hospital.advisory}</p>
          </div>
        </div>
      </div>
    </section>
  )
}


