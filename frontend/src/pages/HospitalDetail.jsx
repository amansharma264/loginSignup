import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { getHospitalById } from '../data/mockHospitals'

const detailMetrics = (hospital) => [
  { label: 'Baseline patients', value: hospital.baselinePatients },
  { label: 'Predicted inflow (24h)', value: hospital.predictedInflow },
  { label: 'Beds available', value: hospital.bedsAvailable },
  { label: 'Staff readiness', value: `${Math.round(hospital.staffReadiness * 100)}%` },
]

const HospitalDetail = () => {
  const { hospitalId } = useParams()
  const navigate = useNavigate()
  const hospital = useMemo(() => getHospitalById(hospitalId ?? ''), [hospitalId])

  if (!hospital) {
    return (
      <section className="content-section">
        <SectionHeader title="Hospital not found" />
        <button className="control-button" onClick={() => navigate('/hospitals')}>
          Back to hospital directory
        </button>
      </section>
    )
  }

  return (
    <section className="content-section">
      <SectionHeader
        title={hospital.name}
        pill={`${hospital.status} · ${hospital.city}`}
        description={`Hospital ID ${hospital.id} · ${hospital.departments.join(', ')}`}
      />

      <div className="card detail-card">
        <div className="detail-header">
          <div>
            <div className="detail-label">Alert level</div>
            <div className="detail-value">{hospital.alertLevel}</div>
          </div>
          <div>
            <div className="detail-label">Festival signal</div>
            <div className="detail-value">{hospital.festival || 'None'}</div>
          </div>
          <div>
            <div className="detail-label">AQI</div>
            <div className="detail-value">{hospital.aqi}</div>
          </div>
          <div>
            <div className="detail-label">Supply status</div>
            <div className="detail-value">{hospital.supplyStatus}</div>
          </div>
        </div>

        <div className="mini-metrics detail-metrics">
          {detailMetrics(hospital).map((metric) => (
            <div key={metric.label} className="mini-metric mini-metric-gold">
              <div className="mini-metric-label">{metric.label}</div>
              <div className="mini-metric-value">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="detail-panels">
          <div>
            <h3>Staffing directives</h3>
            <p>
              Staffing planner recommends rapid mobilization of intensivists, respiratory therapists,
              and community volunteers to reach <strong>+{Math.round(hospital.staffReadiness * 100)}%</strong> readiness.
            </p>
            <ul className="list">
              <li>Activate backup roster for emergency + pulmonology</li>
              <li>Shift tele-triage operators to extended hours for remote screening</li>
              <li>Notify state surge corps for 4-hour readiness</li>
            </ul>
          </div>

          <div>
            <h3>Public advisory</h3>
            <p>{hospital.advisorySummary}</p>
            <ul className="list">
              <li>Issue targeted WhatsApp advisories to local pin codes</li>
              <li>Broadcast pollution-care guidelines on hospital FM channel</li>
              <li>Enable priority teleconsultation for chronic respiratory patients</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HospitalDetail

