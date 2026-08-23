import { next } from '@vercel/functions'
import { resolveAgentResponse } from './src/utils/handleAgentRequest.js'
import { notFoundMarkdown } from './src/utils/notFound.js'

export default async function middleware(request) {
  const url = new URL(request.url)
  const resolved = resolveAgentResponse(url.pathname, request.headers.get('accept'))

  if (resolved.kind === 'passthrough') {
    return next({ headers: resolved.headers })
  }

  if (resolved.kind === 'fetch-markdown') {
    const mdUrl = new URL(resolved.path, url.origin)
    const upstream = await fetch(mdUrl)
    const body = upstream.ok ? await upstream.text() : notFoundMarkdown()
    return new Response(body, {
      status: upstream.ok ? 200 : 404,
      headers: resolved.headers,
    })
  }

  return new Response(resolved.body, {
    status: resolved.status,
    headers: resolved.headers,
  })
}

export const config = {
  runtime: 'edge',
  matcher: [
    '/',
    '/about',
    '/about/',
    '/contact',
    '/contact/',
    '/privacy',
    '/privacy/',
    '/((?!assets/|work-images/).*)',
  ],
}
