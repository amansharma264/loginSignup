const SectionHeader = ({ title, pill, description }) => (
  <div className="section-title-row">
    <div>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
    {pill ? <span className="pill">{pill}</span> : null}
  </div>
)

export default SectionHeader

