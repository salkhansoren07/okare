import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

test('marketing page renders all sections, linked anchors and accessible controls', async () => {
 const server = await createServer({server:{middlewareMode:true}, appType:'custom'})
 try {
  const {default:App}=await server.ssrLoadModule('/src/App.jsx')
  const html=renderToStaticMarkup(React.createElement(App))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  for(const id of ['top','why','experience','how','partners','faq','early-access']) assert.ok(html.includes(`id="${id}"`),id)
  for(const [,id] of html.matchAll(/href="#([^" ]+)"/g)) assert.ok(html.includes(`id="${id}"`),`missing anchor ${id}`)
  for(const route of ['/about/','/contact/','/pricing/','/privacy/','/delete-account/']) assert.ok(html.includes(`href="${route}"`),route)
  assert.match(html,/aria-expanded="false" aria-controls="mobile-menu"/)
  for(let i=0;i<4;i++) {
   assert.ok(html.includes(`aria-controls="faq-answer-${i}"`))
   assert.ok(html.includes(`aria-labelledby="faq-question-${i}"`))
  }
  assert.match(html,/ILLUSTRATIVE APP PREVIEW/)
  assert.match(html,/fetchPriority="high"|fetchpriority="high"/)
  assert.match(html,/loading="lazy"/)
  assert.ok(!html.includes('added to your preview bag'))
  assert.match(html,/Your Google Play email/)
 } finally { await server.close() }
})
test('local typography and imagery exist, with reduced-motion support',()=>{
 for(const asset of ['public/fonts/manrope-latin.ttf','public/fonts/dm-sans-latin.ttf','public/fonts/Manrope-OFL.txt','public/fonts/DM-Sans-OFL.txt','src/assets/biryani-640.jpg','src/assets/biryani-1200.jpg','src/assets/okare-brand.png']) assert.ok(existsSync(asset),asset)
 assert.match(readFileSync('src/index.css','utf8'),/prefers-reduced-motion/)
 assert.ok(!readFileSync('src/index.css','utf8').includes('fonts.googleapis.com'))
})
