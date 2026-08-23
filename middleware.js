import { next } from '@vercel/functions'
import { resolveAgentResponse } from './src/utils/handleAgentRequest.js'

export default function middleware(request) {
  const url = new URL(request.url)
  const resolved = resolveAgentResponse(url.pathname, request.headers.get('accept'))

  if (resolved.kind === 'passthrough') {
    return next({ headers: resolved.headers })
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
