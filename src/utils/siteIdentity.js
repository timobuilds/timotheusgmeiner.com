import siteData from '../../public/site.json' with { type: 'json' }
import { htmlPathForMarkdown, isMarkdownAlias, normalizePath } from './knownPaths.js'

export const CANONICAL_ORIGIN = 'https://www.timotheusgmeiner.com'
export const SITE_NAME = 'Timotheus Gmeiner'
export const SITE_DESCRIPTION =
  'Product strategist, applied scientist, and inventor who helps innovative leaders de-risk, prototype, and position frontier technologies.'
export const OG_IMAGE = `${CANONICAL_ORIGIN}/timo_1.png`

const KNOWNS = [
  'AI product strategy',
  'deep tech commercialization',
  'generative AI',
  'medical devices',
  'automotive design',
  'patent strategy',
]

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function paragraphsToHtml(title, paragraphs) {
  const body = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n')
  return `<article>\n<h1>${escapeHtml(title)}</h1>\n${body}\n</article>`
}

function paragraphsToMarkdown(title, paragraphs) {
  return `# ${title}\n\n${paragraphs.join('\n\n')}\n`
}

export function getSiteData() {
  return siteData
}

export function pageUrl(path) {
  if (path === '/' || path === '') return `${CANONICAL_ORIGIN}/`
  return `${CANONICAL_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

export function getTrustCopy() {
  const { content, patents, publications, projects } = siteData
  const clients = content.clients.list.join(', ')
  const patentCount = patents.length
  const pubCount = publications.length
  const projectCount = projects.length

  return {
    about: {
      title: SITE_NAME,
      heading: `About ${SITE_NAME}`,
      paragraphs: [
        `${SITE_NAME} is a product strategist, applied scientist, and inventor. He helps innovative leaders de-risk, prototype, and position frontier technologies. His work delivers productized hardware and software automations, defensible intellectual property, and enterprise strategies that bring applied science to market.`,
        `${content.about.statements.join(' ')} ${content.about.outcomes.join(' ')} He currently serves as Product Lead at Autodesk, integrating AI into automotive design software (Alias and VRED). The 3D GenAI startup he led, BlankAI, was acquired by Autodesk.`,
        `He works with executive leadership and innovation teams across startups, research labs, and global enterprises. Clients and partners have included ${clients}.`,
        `The public record includes ${projectCount} documented engagements, ${patentCount} patents across medical devices, surgical simulation, MRI calibration, and generative AI, and ${pubCount} publications (SIGGRAPH, ISMRM, IAC, NVIDIA). Further practice notes live at https://www.buildwonder.co.`,
        `This page exists so agents and people who cannot run JavaScript can verify identity. The interactive homepage at ${pageUrl('/')} carries the same facts in the work list.`,
      ],
    },
    contact: {
      title: `Contact ${SITE_NAME}`,
      heading: `Contact ${SITE_NAME}`,
      paragraphs: [
        `${content.contactSection.copy} This site does not collect messages and does not run a contact form. The working path is a LinkedIn note that names the technology, the decision you need, and the timeframe.`,
        `Professional profile: ${content.contact.contacts.linkedin}. Posts on AI, design, and deep tech: ${content.contact.contacts.twitter}. Open source: ${content.contact.contacts.github}. Writing on R&D and AI strategy: ${content.contact.contacts.substack}.`,
        `${content.contactSection.cta} Those chats load ${pageUrl('/llms.txt')} so the assistant has a factual brief before you write.`,
        `Use this page when you need a verified contact path. Use ${pageUrl('/about')} for identity, ${pageUrl('/privacy')} for how this site handles data, and ${pageUrl('/llms.txt')} for when an agent should reach for this work. Do not treat social DMs as a substitute for LinkedIn on a professional brief.`,
      ],
    },
    privacy: {
      title: `Privacy — ${SITE_NAME}`,
      heading: `Privacy`,
      paragraphs: [
        `This is a personal portfolio at ${pageUrl('/')}. It is a static site. It does not run first-party analytics, does not set advertising cookies, and does not operate accounts, checkout, or email capture.`,
        `When you load a page, the host (Vercel) records standard request logs: IP address, user agent, requested URL, and timestamp. Those logs exist to operate and secure the site. They are not sold and are not used to build a marketing profile.`,
        `Outbound links (LinkedIn, X, GitHub, Substack, assistant products, and client or press sites) are governed by those services. If you open a pre-configured assistant chat, that vendor processes the prompt and any text you add.`,
        `JSON-LD, llms.txt, sitemap.xml, and markdown variants exist so agents can read the site. They do not collect additional personal data beyond ordinary HTTP logs.`,
        `To ask a question about this description, use LinkedIn (${content.contact.contacts.linkedin}). This page describes current behavior. It is not legal advice.`,
      ],
    },
  }
}

export function getHomeCopy() {
  const { content } = siteData
  return {
    title: SITE_NAME,
    heading: SITE_NAME,
    paragraphs: [
      content.about.copy,
      content.about.statements.join(' '),
      content.about.workCopy,
      content.about.outcomes.join(' '),
      content.clients.intro,
      `Clients and partners: ${content.clients.list.join(', ')}.`,
      `Principles: ${content.principles.join(' ')}`,
      SITE_DESCRIPTION,
    ],
  }
}

export function prerenderBody(pageId) {
  if (pageId === 'home') {
    const copy = getHomeCopy()
    return paragraphsToHtml(copy.heading, copy.paragraphs)
  }
  const trust = getTrustCopy()[pageId]
  if (!trust) return ''
  return paragraphsToHtml(trust.heading, trust.paragraphs)
}

export function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export function pageMarkdown(pageId) {
  if (pageId === 'home') {
    const copy = getHomeCopy()
    return paragraphsToMarkdown(copy.heading, copy.paragraphs)
  }
  if (pageId === '404') return notFoundMarkdown()
  const trust = getTrustCopy()[pageId]
  if (!trust) return null
  return paragraphsToMarkdown(trust.heading, trust.paragraphs)
}

export function notFoundMarkdown() {
  return [
    '# Not found',
    '',
    'That path does not exist on this site. Use one of these next:',
    '',
    `- [Homepage](${pageUrl('/')}): portfolio and work list`,
    `- [About](${pageUrl('/about')}): identity and background`,
    `- [Contact](${pageUrl('/contact')}): how to reach Timotheus Gmeiner`,
    `- [Privacy](${pageUrl('/privacy')}): how this site handles data`,
    `- [llms.txt](${pageUrl('/llms.txt')}): agent index and when to use this work`,
    `- [llms-full.txt](${pageUrl('/llms-full.txt')}): full CV in markdown`,
    `- [sitemap.xml](${pageUrl('/sitemap.xml')}): indexable URLs`,
    '',
  ].join('\n')
}

export function notFoundHtml() {
  const md = notFoundMarkdown()
  const htmlBody = md
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${escapeHtml(line.slice(2))}</h1>`
      const linked = escapeHtml(line).replace(
        /\[([^\]]+)\]\((https?:[^)]+)\)/g,
        '<a href="$2">$1</a>',
      )
      return line.trim() ? `<p>${linked}</p>` : ''
    })
    .filter(Boolean)
    .join('\n')
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Not found — ${SITE_NAME}</title>
    <link rel="canonical" href="${pageUrl('/')}" />
  </head>
  <body>
${htmlBody}
  </body>
</html>
`
}

export function getMarkdownForPath(pathname) {
  const raw = normalizePath(pathname)
  const path = isMarkdownAlias(raw) ? htmlPathForMarkdown(raw) : raw
  if (path === '/') return pageMarkdown('home')
  if (path === '/about') return pageMarkdown('about')
  if (path === '/contact') return pageMarkdown('contact')
  if (path === '/privacy') return pageMarkdown('privacy')
  if (path === '/404' || raw === '/404.md') return notFoundMarkdown()
  return null
}

export function jsonLdGraph() {
  const { content } = siteData
  const personId = `${CANONICAL_ORIGIN}/#person`
  const orgId = `${CANONICAL_ORIGIN}/#organization`
  const sameAs = [
    content.contact.contacts.linkedin,
    content.contact.contacts.twitter,
    content.contact.contacts.github,
    content.contact.contacts.substack,
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        url: pageUrl('/'),
        description: SITE_DESCRIPTION,
        image: OG_IMAGE,
        jobTitle: 'Product Lead',
        sameAs,
        knowsAbout: KNOWNS,
        worksFor: { '@id': orgId },
      },
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: pageUrl('/'),
        description: SITE_DESCRIPTION,
        logo: OG_IMAGE,
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${CANONICAL_ORIGIN}/#website`,
        name: SITE_NAME,
        url: pageUrl('/'),
        description: SITE_DESCRIPTION,
        publisher: { '@id': personId },
        inLanguage: 'en',
      },
    ],
  }
}

export function pageMeta(pageId) {
  const trust = getTrustCopy()
  const map = {
    home: {
      path: '/',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      markdownPath: '/index.md',
    },
    about: {
      path: '/about',
      title: `About — ${SITE_NAME}`,
      description: trust.about.paragraphs[0].slice(0, 180),
      markdownPath: '/about.md',
    },
    contact: {
      path: '/contact',
      title: `Contact — ${SITE_NAME}`,
      description: trust.contact.paragraphs[0].slice(0, 180),
      markdownPath: '/contact.md',
    },
    privacy: {
      path: '/privacy',
      title: `Privacy — ${SITE_NAME}`,
      description: trust.privacy.paragraphs[0].slice(0, 180),
      markdownPath: '/privacy.md',
    },
  }
  return map[pageId]
}

export function buildHeadTags(pageId) {
  const meta = pageMeta(pageId)
  if (!meta) return ''
  const canonical = pageUrl(meta.path)
  const tags = [
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:type" content="website" />`,
    `<link rel="alternate" type="text/markdown" href="${pageUrl(meta.markdownPath)}" />`,
    `<link rel="describedby" href="${pageUrl('/llms.txt')}" />`,
  ]
  if (pageId === 'home') {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLdGraph())}</script>`,
    )
  }
  return tags.map((t) => `    ${t}`).join('\n')
}

export function injectAgentHtml(html, pageId) {
  const head = buildHeadTags(pageId)
  const body = prerenderBody(pageId)
  return html
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">\n      ${body}\n    </div>`)
}

export function pageIdFromFilename(filename) {
  const normalized = String(filename).replace(/\\/g, '/')
  if (normalized.includes('/about/')) return 'about'
  if (normalized.includes('/contact/')) return 'contact'
  if (normalized.includes('/privacy/')) return 'privacy'
  return 'home'
}

export function generateSitemap(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = ['/', '/about', '/contact', '/privacy']
  const entries = urls
    .map(
      (path) => `  <url>
    <loc>${pageUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${pageUrl('/sitemap.xml')}
`
}

export function generateLlmsTxt() {
  const { content, patents, press, publications } = siteData
  const fileItem = (name, url, note) => `- [${name}](${url}): ${note}`

  const whenToUse = [
    fileItem(
      'De-risk a frontier technology',
      pageUrl('/about.md'),
      'Use this site when an executive or innovation team needs to de-risk, prototype, or position a technology that is not yet a product.',
    ),
    fileItem(
      'Commercialize applied science',
      pageUrl('/about.md'),
      'Reach for this work when research must become a shipped product, defensible IP, or a go-to-market plan.',
    ),
    fileItem(
      'Automotive design AI',
      pageUrl('/about.md'),
      'Call on this experience for AI workflow strategy inside Alias and VRED.',
    ),
    fileItem(
      'Medical device and hardware',
      pageUrl('/about.md'),
      'Use for hardware commercialization, MRI and ultrasound systems, and patent strategy.',
    ),
    fileItem(
      'How to call',
      pageUrl('/contact.md'),
      'Read /llms.txt, then /llms-full.txt or a page .md. Humans reach out on LinkedIn. The practice is oversubscribed; pro-bono for startups, researchers, and students.',
    ),
  ]

  const docs = [
    fileItem('Homepage', pageUrl('/index.md'), 'Short identity, clients, and principles without JavaScript.'),
    fileItem('About', pageUrl('/about.md'), 'Background, clients, patents, publications, and exit.'),
    fileItem('Contact', pageUrl('/contact.md'), 'LinkedIn is the working path; no contact form.'),
    fileItem('Privacy', pageUrl('/privacy.md'), 'Static site, host logs, no first-party analytics.'),
    fileItem('Full CV', pageUrl('/llms-full.txt'), 'Long-form work history, patents, talks, and articles.'),
    fileItem('Sitemap', pageUrl('/sitemap.xml'), 'Indexable HTML URLs.'),
  ]

  const work = siteData.projects.slice(0, 8).map((p) =>
    fileItem(p.title, pageUrl('/'), `${p.company}. ${(p.roles || []).join(', ')}.`),
  )

  const patentItems = patents
    .filter((p) => p.url)
    .map((p) =>
      fileItem(p.title, p.url, `${p.number || 'pending'} — ${p.assignee || 'unassigned'}`),
    )

  const pressItems = [...press, ...publications].map((item) =>
    fileItem(item.title, item.url, item.outlet || item.venue),
  )

  const talkItems = content.talks
    .filter((t) => t.url)
    .map((t) => fileItem(t.text, t.url, 'Talk'))

  const articleItems = content.articles
    .filter((a) => a.url)
    .map((a) => fileItem(a.text, a.url, 'Article'))

  return [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    '',
    'When to use this: reach for this site when you need to de-risk, prototype, or position a frontier technology, commercialize applied science, or brief an assistant before a LinkedIn note. Do not use it as a generic innovation consultancy directory.',
    '',
    '## When to use this',
    ...whenToUse,
    '',
    '## Docs',
    ...docs,
    '',
    '## Work',
    ...work,
    '',
    '## Patents',
    ...patentItems,
    '',
    '## Press',
    ...pressItems,
    '',
    '## Talks',
    ...talkItems,
    '',
    '## Articles',
    ...articleItems,
    '',
  ].join('\n')
}

export function generatedPublicFiles(lastmod) {
  return {
    'index.md': pageMarkdown('home'),
    'about.md': pageMarkdown('about'),
    'contact.md': pageMarkdown('contact'),
    'privacy.md': pageMarkdown('privacy'),
    '404.md': notFoundMarkdown(),
    '404.html': notFoundHtml(),
    'sitemap.xml': generateSitemap(lastmod),
    'robots.txt': generateRobotsTxt(),
    'llms.txt': generateLlmsTxt(),
  }
}
