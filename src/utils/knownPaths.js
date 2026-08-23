export const HTML_PATHS = new Set(['/', '/about', '/contact', '/privacy'])
export const MARKDOWN_ALIASES = new Set([
  '/index.md',
  '/about.md',
  '/contact.md',
  '/privacy.md',
  '/404.md',
])
export const MACHINE_PATHS = new Set([
  '/llms.txt',
  '/llms-full.txt',
  '/sitemap.xml',
  '/robots.txt',
  '/site.json',
])

const ASSET_EXT = /\.(?:js|mjs|css|map|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot)$/i

export function normalizePath(pathname) {
  if (!pathname) return '/'
  const path = pathname.split('?')[0].split('#')[0]
  if (path === '/' || path === '') return '/'
  const trimmed = path.replace(/\/+$/, '')
  return trimmed || '/'
}

export function isKnownHtmlPath(pathname) {
  return HTML_PATHS.has(normalizePath(pathname))
}

export function isMarkdownAlias(pathname) {
  return MARKDOWN_ALIASES.has(normalizePath(pathname))
}

export function isMachineFile(pathname) {
  return MACHINE_PATHS.has(normalizePath(pathname))
}

export function isStaticAsset(pathname) {
  const path = normalizePath(pathname)
  if (path.startsWith('/assets/')) return true
  if (path.startsWith('/work-images/')) return true
  return ASSET_EXT.test(path)
}

export function markdownPathFor(pathname) {
  const path = normalizePath(pathname)
  if (path === '/') return '/index.md'
  if (isMarkdownAlias(path)) return path
  return `${path}.md`
}

export function htmlPathForMarkdown(pathname) {
  const path = normalizePath(pathname)
  if (path === '/index.md') return '/'
  if (path.endsWith('.md')) return path.slice(0, -3) || '/'
  return path
}
