import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generatedPublicFiles } from '../src/utils/siteIdentity.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const lastmod = new Date().toISOString().slice(0, 10)
const files = generatedPublicFiles(lastmod)

for (const [name, contents] of Object.entries(files)) {
  writeFileSync(join(publicDir, name), contents)
}

console.log(`Wrote ${Object.keys(files).length} agent files to public/`)
