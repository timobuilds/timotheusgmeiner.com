export const TYPE_MARKDOWN = 'text/markdown'
export const TYPE_HTML = 'text/html'
export const VARY_ACCEPT = 'Accept, Accept-Encoding'

function parseAccept(header) {
  return String(header)
    .split(',')
    .map((part) => {
      const segs = part.trim().split(';').map((s) => s.trim()).filter(Boolean)
      if (!segs.length) return null
      const type = segs[0].toLowerCase()
      let q = 1
      for (const param of segs.slice(1)) {
        const eq = param.indexOf('=')
        if (eq === -1) continue
        const key = param.slice(0, eq).trim().toLowerCase()
        const value = param.slice(eq + 1).trim()
        if (key === 'q') {
          const n = Number(value)
          q = Number.isFinite(n) ? n : 0
        }
      }
      return { type, q }
    })
    .filter(Boolean)
}

function specificity(produced, acceptType) {
  if (acceptType === produced) return 3
  const [pMain] = produced.split('/')
  const [aMain, aSub] = acceptType.split('/')
  if (aMain === pMain && aSub === '*') return 2
  if (acceptType === '*/*') return 1
  return 0
}

function scoreProduced(produced, entries) {
  let bestSpec = 0
  let bestQ = 0
  let matched = false
  for (const entry of entries) {
    const spec = specificity(produced, entry.type)
    if (spec === 0) continue
    if (!matched || spec > bestSpec || (spec === bestSpec && entry.q > bestQ)) {
      matched = true
      bestSpec = spec
      bestQ = entry.q
    }
  }
  return matched ? bestQ : 0
}

export function negotiate(
  acceptHeader,
  produced = [TYPE_MARKDOWN, TYPE_HTML],
  defaultType = TYPE_HTML,
) {
  if (acceptHeader == null || String(acceptHeader).trim() === '') {
    return defaultType
  }

  const entries = parseAccept(acceptHeader)
  const scored = produced.map((type) => ({
    type,
    q: scoreProduced(type, entries),
  }))
  const max = Math.max(...scored.map((s) => s.q))
  if (max === 0) return null

  const winners = scored.filter((s) => s.q === max)
  if (winners.length === 1) return winners[0].type
  if (winners.some((w) => w.type === defaultType)) return defaultType
  return winners[0].type
}
