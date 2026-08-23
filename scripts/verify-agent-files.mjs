import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { visibleText } from '../src/utils/siteIdentity.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

function fail(message) {
  console.error(`verify:agent failed: ${message}`)
  process.exit(1)
}

function read(rel) {
  const path = join(dist, rel)
  if (!existsSync(path)) fail(`missing ${rel}`)
  return readFileSync(path, 'utf8')
}

const home = read('index.html')
if (!home.includes('<h1>Timotheus Gmeiner</h1>')) fail('homepage missing H1')
if (visibleText(home).length < 500) fail('homepage raw text under 500 characters')
if (!home.includes('rel="canonical"')) fail('homepage missing canonical')
if (!home.includes('og:image')) fail('homepage missing og:image')
if (!home.includes('og:type')) fail('homepage missing og:type')
if (!home.includes('application/ld+json')) fail('homepage missing JSON-LD')

for (const page of ['about', 'contact', 'privacy']) {
  const html = read(`${page}/index.html`)
  if (visibleText(html).length < 500) fail(`${page} HTML under 500 characters`)
  const md = read(`${page}.md`)
  if (md.length < 500) fail(`${page}.md under 500 characters`)
}

const sitemap = read('sitemap.xml')
for (const path of ['timotheusgmeiner.com/</loc>', '/about</loc>', '/contact</loc>', '/privacy</loc>']) {
  if (!sitemap.includes(path)) fail(`sitemap missing ${path}`)
}
if (!sitemap.includes('<lastmod>')) fail('sitemap missing lastmod')

const llms = read('llms.txt')
if (!llms.startsWith('# Timotheus Gmeiner')) fail('llms.txt missing H1')
if (!llms.includes('## When to use this')) fail('llms.txt missing When to use this')

const notFound = read('404.md')
if (!notFound.includes('/sitemap.xml') || !notFound.includes('/llms.txt')) {
  fail('404.md missing recovery links')
}

if (!existsSync(join(dist, 'llms-full.txt'))) fail('missing llms-full.txt')
if (!existsSync(join(dist, 'robots.txt'))) fail('missing robots.txt')

console.log('verify:agent passed')
