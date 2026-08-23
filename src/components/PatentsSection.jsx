export function PatentsSection({ patents }) {
  if (!patents?.length) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Patents</span>
      <div className="list-column">
        {patents.map((patent) => {
          const numberPart = patent.number
            ? `${patent.number}${patent.kind ? ` ${patent.kind}` : ''}`
            : ''
          const label = numberPart ? `${numberPart}: ${patent.title}` : patent.title
          if (patent.url && numberPart) {
            return (
              <div key={patent.number || patent.title} className="list-item">
                <a
                  href={patent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {numberPart}
                </a>
                : {patent.title}
              </div>
            )
          }
          return (
            <div key={patent.number || patent.title} className="list-item">
              {label}
            </div>
          )
        })}
      </div>
    </section>
  )
}
