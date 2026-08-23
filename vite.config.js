import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { injectAgentHtml, pageIdFromFilename } from './src/utils/siteIdentity.js'

const root = dirname(fileURLToPath(import.meta.url))

function agentHtmlPlugin() {
  return {
    name: 'agent-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return injectAgentHtml(html, pageIdFromFilename(ctx.filename || ctx.path || ''))
      },
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), agentHtmlPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'about/index.html'),
        contact: resolve(root, 'contact/index.html'),
        privacy: resolve(root, 'privacy/index.html'),
      },
    },
  },
})
