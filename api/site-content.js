import { readFile } from 'node:fs/promises'
import { homeMarkdown, pricingMarkdown, missingMarkdown, missingHtml } from '../shared/site-content.js'

// Respect explicit media preferences, including q=0 and browser HTML preference.
export function wantsMarkdown(accept = '') {
  const types = String(accept).toLowerCase().split(',').map(part => {
    const [type, ...params] = part.trim().split(';')
    const quality = params.find(p=>p.trim().startsWith('q='))
    const q = quality ? Number(quality.trim().slice(2)) : 1
    return { type, q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 }
  })
  const md = types.find(t=>t.type==='text/markdown')?.q ?? 0
  const html = types.find(t=>t.type==='text/html')?.q ?? 0
  return md > 0 && md >= html
}
export default async function handler(req, res) {
  res.setHeader('Vary','Accept')
  // Do not allow a CDN to reuse an HTML representation for a Markdown request.
  res.setHeader('Cache-Control','no-store')
  res.setHeader('X-Content-Type-Options','nosniff')
  if (!['GET','HEAD'].includes(req.method)) {
    res.setHeader('Allow','GET, HEAD'); res.statusCode=405; return res.end('Method not allowed')
  }
  const page = req.query?.page
  const known = page === 'home' || page === 'pricing'
  const md = wantsMarkdown(req.headers.accept)
  res.statusCode = known ? 200 : 404
  res.setHeader('Content-Type',md?'text/markdown; charset=utf-8':'text/html; charset=utf-8')
  if (req.method === 'HEAD') return res.end()
  if (!known) return res.end(md ? missingMarkdown : missingHtml)
  if (md) return res.end(page==='home'?homeMarkdown:pricingMarkdown)
  try {
    const file = page==='home'?'dist/index.html':'dist/pricing/index.html'
    return res.end(await readFile(file,'utf8'))
  } catch {
    res.statusCode=503; return res.end('Website temporarily unavailable. Please try again later.')
  }
}
