export function TalksSection({ talks }) {
  if (!talks?.length) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Talks</span>
      <div className="list-column">
        {talks.map((talk) => (
          <div
            key={talk.text}
            className={`list-item ${talk.active ? 'list-item-active' : ''}`}
          >
            {talk.url ? (
              <a href={talk.url} target="_blank" rel="noopener noreferrer">
                {talk.text}
              </a>
            ) : (
              talk.text
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
