export function PrinciplesSection({ principles }) {
  if (!principles?.length) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Principles</span>
      <div className="body-text" style={{ whiteSpace: 'pre-line' }}>
        {principles.join('\n')}
      </div>
    </section>
  )
}
