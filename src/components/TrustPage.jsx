import { Nav } from './Nav'
import { getTrustCopy } from '../utils/siteIdentity.js'

export function TrustPage({ pageId, siteData }) {
  const copy = getTrustCopy()[pageId]
  if (!copy) return null

  return (
    <div className="app">
      <Nav contact={siteData.content.contact} />
      <main className="main">
        <section className="section">
          <span className="section-title">{copy.heading}</span>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="body-text">
              {paragraph}
            </p>
          ))}
        </section>
      </main>
    </div>
  )
}
