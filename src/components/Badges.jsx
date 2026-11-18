export function StatusBadge({ status }) {
  const className = status.toLowerCase().replaceAll(' ', '-')
  return <span className={`badge status-${className}`}><i />{status}</span>
}

export function PriorityBadge({ priority }) {
  return <span className={`priority priority-${priority.toLowerCase()}`}><i />{priority}</span>
}
