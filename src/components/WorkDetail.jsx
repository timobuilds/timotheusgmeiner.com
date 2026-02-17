import { getProjectImageUrl, formatProjectTitle } from '../utils/imageMap'

function formatYears(years) {
  if (!years) return '—'
  const { start, end } = years
  if (start == null && end == null) return '—'
  if (start != null && end == null) return `${start} to present`
  if (start == null && end != null) return String(end)
  if (start === end) return String(start)
  return `${start} to ${end}`
}

export function WorkDetail({ project, open, onToggle }) {
  const imgUrl = getProjectImageUrl(project)
  const patentLinks = (project.links || []).filter((l) => l.url?.includes('patents.google.com')).slice(0, 3)

  return (
    <details
      className="works-details"
      open={open}
    >
      <summary
        className="works-row"
        onClick={(e) => {
          e.preventDefault()
          onToggle?.(project.id)
        }}
      >
        <span className="works-col">{formatProjectTitle(project.title)}</span>
        <span className="works-col">{project.company || '—'}</span>
        <span className="works-col works-col-industry">{project.industries?.[0] || '—'}</span>
        <span className="works-col works-col-year">{formatYears(project.years)}</span>
      </summary>
      <div className="works-detail-expanded">
        <figure className="project-image-container">
          {imgUrl ? (
            <img
              className="project-image"
              src={imgUrl}
              alt={formatProjectTitle(project.title)}
              loading="lazy"
            />
          ) : (
            <span className="no-image">No image</span>
          )}
        </figure>
        <div className="details-section">
          <div className="detail-row">
            <span className="detail-label">Situation</span>
            <div className="detail-content">
              <span className="work-value">{project.situation}</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Action</span>
            <div className="detail-content">
              <span className="work-value">{project.action}</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Result</span>
            <div className="result-content">
              <p>{project.result}</p>
              {patentLinks.map((l) => {
                const num = l.url.replace(/^.*\/patent\//, '').replace(/\/$/, '')
                return (
                  <a
                    key={num}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="patent-link"
                  >
                    {num}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </details>
  )
}
