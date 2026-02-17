const socialLinks = (contact) => [
  { key: 'SS', href: contact?.contacts?.substack },
  { key: 'GH', href: contact?.contacts?.github },
  { key: 'CV', href: contact?.contacts?.cv || contact?.contacts?.linkedin },
  { key: 'X', href: contact?.contacts?.twitter },
]

export function Nav({ contact }) {
  const links = socialLinks(contact)
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-top">
          <a href="#" className="nav-photo">
            <img src="/timo_1.png" alt="" width="35" height="35" />
          </a>
        </div>
        <div className="nav-spacer" />
        <div className="nav-links">
          {links.map(({ key, href }) =>
            href ? (
              <a
                key={key}
                href={href}
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {key}
              </a>
            ) : (
              <span key={key} className="nav-link nav-link-disabled">
                {key}
              </span>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
