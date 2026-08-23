import { describe, expect, it } from 'vitest'
import {
  isKnownHtmlPath,
  isMachineFile,
  isStaticAsset,
  markdownPathFor,
  normalizePath,
} from './knownPaths.js'

describe('knownPaths', () => {
  it('treats home and trust pages as known HTML', () => {
    expect(isKnownHtmlPath('/')).toBe(true)
    expect(isKnownHtmlPath('/about')).toBe(true)
    expect(isKnownHtmlPath('/about/')).toBe(true)
    expect(isKnownHtmlPath('/contact')).toBe(true)
    expect(isKnownHtmlPath('/privacy')).toBe(true)
  })

  it('treats unknown paths as not known HTML', () => {
    expect(isKnownHtmlPath('/nope')).toBe(false)
    expect(isKnownHtmlPath('/some-path-that-does-not-exist')).toBe(false)
  })

  it('ignores hashed assets and work images', () => {
    expect(isStaticAsset('/assets/index-K3lKK8Sp.js')).toBe(true)
    expect(isStaticAsset('/work-images/vox.png')).toBe(true)
    expect(isStaticAsset('/timo_1.png')).toBe(true)
    expect(isStaticAsset('/about')).toBe(false)
  })

  it('maps HTML paths to markdown aliases', () => {
    expect(markdownPathFor('/')).toBe('/index.md')
    expect(markdownPathFor('/about/')).toBe('/about.md')
  })

  it('recognizes machine files', () => {
    expect(isMachineFile('/llms.txt')).toBe(true)
    expect(isMachineFile('/sitemap.xml')).toBe(true)
    expect(normalizePath('/llms.txt/')).toBe('/llms.txt')
  })
})
