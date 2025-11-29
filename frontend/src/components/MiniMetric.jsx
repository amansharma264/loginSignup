const MiniMetric = ({ label, value, accent = 'gold' }) => (
  <div className={`mini-metric mini-metric-${accent}`}>
    <div className="mini-metric-label">{label}</div>
    <div className="mini-metric-value">{value}</div>
  </div>
)

export default MiniMetric

