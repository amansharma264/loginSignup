import '../App.css'

const MOCK_HOSPITALS = [
  { id: 'MH-001', name: 'Arogya Care – Mumbai Central', city: 'Mumbai', state: 'MH', alert: 'High', occupancy: 0.87 },
  { id: 'DL-014', name: 'Seva Health – Saket', city: 'Delhi', state: 'DL', alert: 'Medium', occupancy: 0.71 },
  { id: 'KA-032', name: 'Namma Life – Indiranagar', city: 'Bengaluru', state: 'KA', alert: 'Low', occupancy: 0.42 },
  { id: 'WB-009', name: 'Swasthya Clinic – Salt Lake', city: 'Kolkata', state: 'WB', alert: 'High', occupancy: 0.93 },
]

export default function HospitalsPage() {
  return (
    <section className="content-section">
      <div className="section-title-row">
        <h2 className="section-title">Hospital Network</h2>
        <span className="pill">Simulated · 1000 virtual hospitals</span>
      </div>

      <div className="card">
        <div className="card-title">Quick overview</div>
        <p className="card-subtitle">
          Browse a slice of the simulated network. In production, this table would be powered by your MongoDB + API.
        </p>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hospital</th>
                <th>City</th>
                <th>Alert level</th>
                <th>Occupancy</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HOSPITALS.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.name}</td>
                  <td>{h.city}, {h.state}</td>
                  <td>
                    <span className={`badge badge-${h.alert.toLowerCase()}`}>
                      {h.alert}
                    </span>
                  </td>
                  <td>
                    <div className="occupancy-cell">
                      <div className="occupancy-bar">
                        <div
                          className="occupancy-bar-fill"
                          style={{ width: `${Math.round(h.occupancy * 100)}%` }}
                        />
                      </div>
                      <span className="occupancy-value">
                        {Math.round(h.occupancy * 100)}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <a className="table-link" href={`/hospitals/${h.id}`}>
                      View details →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


