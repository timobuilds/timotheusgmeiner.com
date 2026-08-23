import { describe, expect, it } from 'vitest'
import {
  generateLlmsTxt,
  generateSitemap,
  getMarkdownForPath,
  jsonLdGraph,
  notFoundMarkdown,
  pageMarkdown,
  prerenderBody,
  visibleText,
} from './siteIdentity.js'

describe('prerender and trust copy', () => {
  it('homepage prerender has an H1 and at least 500 characters of text', () => {
    const html = prerenderBody('home')
    expect(html).toContain('<h1>Timotheus Gmeiner</h1>')
    expect(visibleText(html).length).toBeGreaterThanOrEqual(500)
  })

  it.each(['about', 'contact', 'privacy'])(
    '%s markdown has at least 500 characters',
    (pageId) => {
      const md = pageMarkdown(pageId)
      expect(md.startsWith('# ')).toBe(true)
      expect(md.length).toBeGreaterThanOrEqual(500)
    },
  )
})

describe('JSON-LD', () => {
  it('includes Person, WebSite, and Organization with required fields and no contactPoint or address', () => {
    const graph = jsonLdGraph()
    const types = graph['@graph'].map((node) => node['@type'])
    expect(types).toEqual(expect.arrayContaining(['Person', 'WebSite', 'Organization']))

    for (const node of graph['@graph']) {
      expect(node.name).toBeTruthy()
      expect(node.url).toMatch(/^https:\/\/www\.timotheusgmeiner\.com/)
      expect(node.contactPoint).toBeUndefined()
      expect(node.address).toBeUndefined()
    }

    const person = graph['@graph'].find((n) => n['@type'] === 'Person')
    expect(person.description).toBeTruthy()
    expect(person.sameAs.length).toBeGreaterThanOrEqual(3)
  })
})

describe('sitemap and 404', () => {
  it('emits a urlset with the four HTML URLs and lastmod', () => {
    const xml = generateSitemap('2026-08-23')
    expect(xml).toContain('<urlset')
    expect(xml).toContain('https://www.timotheusgmeiner.com/</loc>')
    expect(xml).toContain('https://www.timotheusgmeiner.com/about</loc>')
    expect(xml).toContain('https://www.timotheusgmeiner.com/contact</loc>')
    expect(xml).toContain('https://www.timotheusgmeiner.com/privacy</loc>')
    expect(xml).toContain('<lastmod>2026-08-23</lastmod>')
  })

  it('404 body points at sitemap and llms.txt', () => {
    const body = notFoundMarkdown()
    expect(body).toContain('/sitemap.xml')
    expect(body).toContain('/llms.txt')
  })
})

describe('llms.txt', () => {
  it('follows v2 shape and includes When to use this as a file list', () => {
    const txt = generateLlmsTxt()
    expect(txt.startsWith('# Timotheus Gmeiner')).toBe(true)
    expect(txt).toMatch(/^# .+\n> /s)
    expect(txt).toContain('## When to use this')
    const afterWhen = txt.split('## When to use this')[1].split('\n## ')[0]
    const items = afterWhen
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('- '))
    expect(items.length).toBeGreaterThanOrEqual(3)
    for (const item of items) {
      expect(item).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\): /)
    }
  })
})

describe('getMarkdownForPath', () => {
  it('returns homepage markdown for / and /index.md', () => {
    expect(getMarkdownForPath('/')).toContain('# Timotheus Gmeiner')
    expect(getMarkdownForPath('/index.md')).toBe(getMarkdownForPath('/'))
  })

  it('returns null for unknown paths', () => {
    expect(getMarkdownForPath('/nope')).toBe(null)
  })
})
