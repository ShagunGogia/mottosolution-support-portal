export default function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${tone}`}><Icon size={19} strokeWidth={1.8} /></span>
      <div className="stat-copy"><span>{label}</span><strong>{value}</strong></div>
    </article>
  )
}
