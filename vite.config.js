import { defineConfig } from 'vite'
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

export default defineConfig({
  plugins: [
    legalPageRoutes(),
    react(),
    tailwindcss(),
  ],
})