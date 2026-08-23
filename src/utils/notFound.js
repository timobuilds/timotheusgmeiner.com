const ORIGIN = 'https://www.timotheusgmeiner.com'

function pageUrl(path) {
  if (path === '/' || path === '') return `${ORIGIN}/`
  return `${ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
  const htmlBody = notFoundMarkdown()
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
    <title>Not found — Timotheus Gmeiner</title>
    <link rel="canonical" href="${pageUrl('/')}" />
  </head>
  <body>
${htmlBody}
  </body>
</html>
`
}
