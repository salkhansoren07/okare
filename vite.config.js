import { defineConfig, loadEnv } from 'vite'
import earlyAccessHandler from './api/early-access.js'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Public HTML directory indexes need explicit routing before Vite's SPA fallback.
function legalPageRoutes() {
  const rewrite = (req, _res, next) => {
    const url = new URL(req.url || '/', 'http://localhost')
    const match = url.pathname.match(/^\/(privacy-policy|delete-account)\/?$/)
    if (match && (req.method === 'GET' || req.method === 'HEAD')) {
      req.url = `/${match[1]}/index.html${url.search}`
    }
    next()
  }
  return {
    name: 'okare-legal-page-routes',
    configureServer(server) { server.middlewares.use(rewrite) },
    configurePreviewServer(server) { server.middlewares.use(rewrite) },
  }
}

function earlyAccessApi() {
  return {
    name: 'okare-early-access-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      for (const key of ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']) {
        if (!process.env[key] && env[key]) process.env[key] = env[key]
      }
      server.middlewares.use('/api/early-access', async (req, res) => {
        let body = ''
        for await (const chunk of req) {
          body += chunk
          if (body.length > 2048) { res.statusCode = 413; res.end(); return }
        }
        req.body = body
        res.status = code => { res.statusCode = code; return res }
        res.json = data => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); return res }
        await earlyAccessHandler(req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [
    legalPageRoutes(),
    earlyAccessApi(),
    react(),
    tailwindcss(),
  ],
})