import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { hospitals } from '../data/mockHospitals'

const Hospitals = () => {
  const [search, setSearch] = useState('')
  const [alertFilter, setAlertFilter] = useState('all')
  const navigate = useNavigate()

  const filteredHospitals = useMemo(() => {
    const query = search.toLowerCase()
    return hospitals.filter((hospital) => {
      const matchesSearch =
        hospital.name.toLowerCase().includes(query) ||
        hospital.city.toLowerCase().includes(query) ||
        hospital.id.toLowerCase().includes(query)

      const matchesAlert =
        alertFilter === 'all' ? true : hospital.alertLevel.toLowerCase() === alertFilter

      return matchesSearch && matchesAlert
    })
  }, [search, alertFilter])

  return (
    <section className="content-section">
      <SectionHeader
        title="Network hospitals"
        pill="Simulated dataset · 1,024 nodes"
        description="Filter virtual hospitals by alert level, search by city or code, and open a detail view to see agent recommendations."
      />

      <div className="filters">
        <input
          className="control-input"
          placeholder="Search by name, city, or code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="control-input"
          value={alertFilter}
          onChange={(e) => setAlertFilter(e.target.value)}
        >
          <option value="all">All alert levels</option>
          <option value="severe">Severe</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="elevated">Elevated</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>City</th>
              <th>Status</th>
              <th>Predicted inflow</th>
              <th>Beds available</th>
              <th>Staff readiness</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td>
                  <div className="table-main">{hospital.name}</div>
                  <div className="table-sub">{hospital.id}</div>
                </td>
                <td>{hospital.city}</td>
                <td>
                  <span className={`status-chip status-${hospital.status.toLowerCase().replace(' ', '-')}`}>
                    {hospital.status}
                  </span>
                </td>
                <td>{hospital.predictedInflow}</td>
                <td>{hospital.bedsAvailable}</td>
                <td>{Math.round(hospital.staffReadiness * 100)}%</td>
                <td>
                  <button
                    className="table-link"
                    onClick={() => navigate(`/hospitals/${hospital.id}`)}
                  >
                    Open →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Hospitals

