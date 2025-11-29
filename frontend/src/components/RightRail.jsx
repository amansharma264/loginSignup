import { useNavigate } from 'react-router-dom'

const CTA_BUTTONS = [
  {
    label: "I'm here to simulate",
    sublabel: 'Run surge scenarios',
    icon: '▶',
    action: '/simulator',
  },
  { label: 'Arogya Challenge', sublabel: 'Guinness-scale benchmarks', icon: '🏆' },
  { label: 'Health offers', sublabel: 'Optimised supply bundles', icon: '❤️' },
  { label: 'Refer a hospital', sublabel: 'Add to the network', icon: '➕' },
  {
    label: 'Admin login',
    sublabel: 'Command console',
    icon: '🔐',
    action: '/dashboard',
  },
]

const RightRail = () => {
  const navigate = useNavigate()

  return (
    <aside className="right-rail">
      <button className="right-rail-toggle">» HIDE</button>
      <div className="right-rail-buttons">
        {CTA_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            className="rail-button"
            onClick={() => btn.action && navigate(btn.action)}
          >
            <div className="rail-icon">{btn.icon}</div>
            <div>
              <div className="rail-text-main">{btn.label}</div>
              <div className="rail-text-sub">{btn.sublabel}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default RightRail

