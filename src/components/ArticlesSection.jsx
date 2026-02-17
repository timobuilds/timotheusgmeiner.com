export function ArticlesSection({ articles }) {
  if (!articles?.length) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Articles</span>
      <div className="list-column">
        {articles.map((a) => (
          <div key={a} className="list-item">
            {a}
          </div>
        ))}
      </div>
    </section>
  )
}
