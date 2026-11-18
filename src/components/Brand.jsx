import agrsoftLogo from '../assets/agrsoft-logo.png'

export default function Brand({ compact = false }) {
  return (
    <a className={`brand${compact ? ' brand-compact' : ''}`} href="https://mottosolution.com/" aria-label="AGRSoft home">
      <img className="brand-logo" src={agrsoftLogo} alt="Motto Solution" />
      <span className="brand-copy">
        {!compact && <small>SUPPORT PORTAL</small>}
      </span>
    </a>
  )
}
