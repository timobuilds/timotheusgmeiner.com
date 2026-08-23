import { describe, expect, it } from 'vitest'
import { resolveAgentResponse } from './handleAgentRequest.js'

describe('resolveAgentResponse', () => {
  it('serves markdown with Vary: Accept for the homepage', () => {
    const res = resolveAgentResponse('/', 'text/markdown')
    expect(res.kind).toBe('response')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toBe('text/markdown; charset=utf-8')
    expect(res.headers.vary).toMatch(/Accept/)
    expect(res.body.startsWith('# Timotheus Gmeiner')).toBe(true)
  })

  it('returns a markdown 404 with recovery links for unknown paths', () => {
    const res = resolveAgentResponse('/some-path-that-does-not-exist', 'text/markdown')
    expect(res.status).toBe(404)
    expect(res.body).toContain('/sitemap.xml')
    expect(res.body).toContain('/llms.txt')
  })

  it('returns an HTML 404 for unknown browser paths', () => {
    const res = resolveAgentResponse('/some-path-that-does-not-exist', 'text/html')
    expect(res.status).toBe(404)
    expect(res.headers['content-type']).toContain('text/html')
    expect(res.body).toContain('/sitemap.xml')
  })

  it('passes through known HTML with Vary set', () => {
    const res = resolveAgentResponse('/about', 'text/html')
    expect(res.kind).toBe('passthrough')
    expect(res.headers.vary).toMatch(/Accept/)
  })
})
