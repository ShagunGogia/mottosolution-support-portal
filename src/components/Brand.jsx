import mottoLogo from '../assets/motto-logo-white.svg'

export default function Brand({ compact = false }) {
  return (
    <a className={`brand${compact ? ' brand-compact' : ''}`} href="https://mottosolution.com/" aria-label="Motto Solution home">
      <img className="brand-logo" src={mottoLogo} alt="Motto Solution" />
      <span className="brand-copy">
        {!compact && <small>SUPPORT PORTAL</small>}
      </span>
    </a>
  )
}
