# Agent-readable website

The homepage fallback and React about section use shared/site-content.js. The Vite build emits pricing/index.html, index.md and llms.txt from this copy, and injects Organization/SoftwareApplication JSON-LD into the homepage. Keep the service areas and pricing explanation accurate; do not add sample ratings or invented prices to structured data.

Deploy the repository to Vercel, including api/site-content.js and vercel.json, not only dist. Homepage and pricing requests are handled before static routing so Accept: text/markdown can receive Markdown. Existing static files and API routes are resolved before the missing-page handler. The missing handler returns HTTP 404 in HTML or Markdown. Responses vary by Accept and use no-store to avoid cross-format cache reuse. The explicit filesystem route preserves existing static pages and early-access API; verify this routing on deployment.

Local Vite serves the frontend; negotiation is a production Vercel function. Run npm run build and node --test tests/agent-readiness.test.mjs. Before rescanning, verify deployed / and /pricing/ with both Accept: text/html and Accept: text/markdown. Also verify a nonexistent URL gives HTTP 404 in both formats, /privacy-policy/, /delete-account/, /sitemap.xml, /robots.txt, and the IndexNow key still resolve. Confirm the signup endpoint still rejects GET with 405. Do not submit real signup data just to test routing.

The scan score is not an indexing guarantee. Changes require deployment and a fresh scan; the saved report describes the previous deployment.
