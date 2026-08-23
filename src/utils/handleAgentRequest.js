import { negotiate, TYPE_HTML, TYPE_MARKDOWN, VARY_ACCEPT } from './acceptNegotiate.js'
import {
  isKnownHtmlPath,
  isMachineFile,
  isMarkdownAlias,
  isStaticAsset,
  normalizePath,
} from './knownPaths.js'
import { getMarkdownForPath, notFoundHtml, notFoundMarkdown } from './siteIdentity.js'

export const VARY_HEADERS = { vary: VARY_ACCEPT }

export function resolveAgentResponse(pathname, acceptHeader) {
  const path = normalizePath(pathname)

  if (isStaticAsset(path) || isMachineFile(path)) {
    return { kind: 'passthrough', headers: VARY_HEADERS }
  }

  const type = negotiate(acceptHeader)

  if (type === null) {
    return {
      kind: 'response',
      status: 406,
      body: 'Not Acceptable',
      headers: { ...VARY_HEADERS, 'content-type': 'text/plain; charset=utf-8' },
    }
  }

  if (type === TYPE_MARKDOWN || isMarkdownAlias(path)) {
    const md = getMarkdownForPath(path)
    if (!md) {
      return {
        kind: 'response',
        status: 404,
        body: notFoundMarkdown(),
        headers: { ...VARY_HEADERS, 'content-type': 'text/markdown; charset=utf-8' },
      }
    }
    return {
      kind: 'response',
      status: 200,
      body: md,
      headers: { ...VARY_HEADERS, 'content-type': 'text/markdown; charset=utf-8' },
    }
  }

  if (type === TYPE_HTML && !isKnownHtmlPath(path)) {
    return {
      kind: 'response',
      status: 404,
      body: notFoundHtml(),
      headers: { ...VARY_HEADERS, 'content-type': 'text/html; charset=utf-8' },
    }
  }

  return { kind: 'passthrough', headers: VARY_HEADERS }
}
