export function AboutSection({ content }) {
  if (!content?.about) return null
  const { copy, statements, workCopy, outcomes } = content.about
  const aboutBlock = [statements?.join('\n'), workCopy, outcomes?.join('\n')].filter(Boolean).join('\n\n')
  return (
    <div className="about-section">
      <section className="section">
        <span className="section-title">About</span>
        <p className="body-text">
          {copy}{' '}
          <a
            href="https://www.buildwonder.co"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Learn more.
          </a>
        </p>
        <p className="body-text" style={{ whiteSpace: 'pre-line' }}>
          {aboutBlock}
        </p>
      </section>
    </div>
  )
}
