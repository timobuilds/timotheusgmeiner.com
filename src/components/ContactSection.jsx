export function ContactSection({ contactSection }) {
  if (!contactSection) return null
  return (
    <section className="section section-muted">
      <span className="section-title-muted">Let's Connect</span>
      <div className="contact-cta">
        <p className="body-text" style={{ margin: 0, marginBottom: 20 }}>
          {contactSection.cta}
        </p>
        <div className="assistant-logos">
          {contactSection.assistants?.map((a) => (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="assistant-logo-link"
              title={a.name}
            >
              <img
                src={a.icon}
                alt={a.name}
                className={`assistant-logo ${a.name === 'ChatGPT' ? 'assistant-logo--openai' : ''}`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
