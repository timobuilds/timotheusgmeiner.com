export function PressSection({ press }) {
  if (!press?.length) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Press & Publication</span>
      <div className="list-column">
        {press.map((item) =>
          item.url ? (
            <a
              key={item.url + item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="list-item link"
            >
              {item.title}
            </a>
          ) : (
            <div key={item.title} className="list-item">
              {item.title}
            </div>
          )
        )}
      </div>
    </section>
  )
}
