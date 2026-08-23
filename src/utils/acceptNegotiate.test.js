import { describe, expect, it } from 'vitest'
import { negotiate, TYPE_HTML, TYPE_MARKDOWN } from './acceptNegotiate.js'

const produced = [TYPE_MARKDOWN, TYPE_HTML]

describe('negotiate', () => {
  it('serves markdown for Accept: text/markdown', () => {
    expect(negotiate('text/markdown', produced)).toBe(TYPE_MARKDOWN)
  })

  it('serves markdown when markdown is preferred over html', () => {
    expect(negotiate('text/markdown, text/html;q=0.8', produced)).toBe(TYPE_MARKDOWN)
  })

  it('serves html for Accept: text/html', () => {
    expect(negotiate('text/html', produced)).toBe(TYPE_HTML)
  })

  it('serves html when markdown is q=0 and html is listed', () => {
    expect(negotiate('text/markdown;q=0, text/html', produced)).toBe(TYPE_HTML)
  })

  it('returns null (406) when the only match is q=0 and nothing else remains', () => {
    expect(negotiate('text/markdown;q=0', [TYPE_MARKDOWN])).toBe(null)
  })

  it('serves html when Accept is missing', () => {
    expect(negotiate(null, produced)).toBe(TYPE_HTML)
    expect(negotiate('', produced)).toBe(TYPE_HTML)
    expect(negotiate('   ', produced)).toBe(TYPE_HTML)
  })

  it('serves html for */*', () => {
    expect(negotiate('*/*', produced)).toBe(TYPE_HTML)
  })

  it('does not treat a Chrome Accept header as markdown', () => {
    const chrome =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    expect(negotiate(chrome, produced)).toBe(TYPE_HTML)
  })
})
