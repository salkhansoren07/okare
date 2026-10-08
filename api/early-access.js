import { createHmac } from 'node:crypto'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ error: 'JSON required' })
  let body = req.body
  try { if (typeof body === 'string') body = JSON.parse(body) } catch { return res.status(400).json({ error: 'Invalid request' }) }
  if (!body || typeof body !== 'object' || JSON.stringify(body).length > 2048) return res.status(400).json({ error: 'Invalid request' })
  if (body.website) return res.status(200).json({ accepted: true })
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body.consent !== true) return res.status(400).json({ error: 'Valid email and consent required' })

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return res.status(503).json({ error: 'Signup temporarily unavailable' })
  // Vercel supplies this header. Do not trust a client-supplied body IP.
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
  const fingerprint = createHmac('sha256', key).update(ip).digest('hex')
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/request_early_access`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_email: email, p_fingerprint: fingerprint }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return res.status(503).json({ error: 'Signup temporarily unavailable' })
    const outcome = await response.json()
    if (outcome === 'rate_limited') {
      res.setHeader('Retry-After', '3600')
      return res.status(429).json({ error: 'Please try later' })
    }
    if (outcome !== 'accepted') return res.status(503).json({ error: 'Signup temporarily unavailable' })
    // Same response for duplicates: never reveal whether an email is registered.
    return res.status(200).json({ accepted: true })
  } catch {
    return res.status(503).json({ error: 'Signup temporarily unavailable' })
  }
}
