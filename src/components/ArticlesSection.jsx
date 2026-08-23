export function ArticlesSection({ articles }) {
  if (!articles?.length) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Articles</span>
      <div className="list-column">
        {articles.map((a) => {
          const text = typeof a === 'string' ? a : a.text
          const url = typeof a === 'string' ? null : a.url
          return (
            <div key={text} className="list-item">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              ) : (
                text
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
