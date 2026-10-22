import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import handler, { wantsMarkdown } from '../api/site-content.js'
import { homeSections } from '../shared/site-content.js'
async function response(page, accept, method='GET') {
 const headers={}; let body
 const res={statusCode:200,setHeader:(k,v)=>headers[k]=v,end:v=>{body=v}}
 await handler({method,headers:{accept},query:{page}},res)
 return {status:res.statusCode,headers,body}
}
test('negotiation honors explicit preferences and rejects q=0',()=>{
 assert.equal(wantsMarkdown('text/markdown'),true)
 assert.equal(wantsMarkdown('text/html,application/xhtml+xml,*/*;q=0.8'),false)
 assert.equal(wantsMarkdown('text/markdown;q=0,text/html'),false)
 assert.equal(wantsMarkdown('text/markdown;q=0.5,text/html'),false)
 assert.equal(wantsMarkdown('*/*'),false)
})
for(const page of ['home','pricing'])test(`${page} returns HTML and Markdown with correct headers`,async()=>{
 const html=await response(page,'text/html');const md=await response(page,'text/markdown')
 assert.equal(html.status,200);assert.match(html.body,/<!doctype html>/i)
 assert.equal(md.status,200);assert.ok(md.body.startsWith('# '));assert.ok(md.body.length>500)
 for(const r of [html,md]){assert.equal(r.headers.Vary,'Accept');assert.equal(r.headers['Cache-Control'],'no-store')}
 assert.match(md.headers['Content-Type'],/^text\/markdown/)
 assert.match(html.headers['Content-Type'],/^text\/html/)
})
test('unknown pages retain 404 in both formats and link back to useful pages',async()=>{
 for(const accept of ['text/html','text/markdown']){
  const r=await response('missing',accept);assert.equal(r.status,404);assert.match(r.body,/https:\/\/okare.in\/sitemap.xml/)
  assert.ok(r.headers['Content-Type'].startsWith(accept));assert.ok(r.body.length>20)
 }
})
test('HEAD is bodyless and unsupported methods are rejected',async()=>{
 assert.equal((await response('home','text/markdown','HEAD')).body,undefined)
 const r=await response('home','text/markdown','POST');assert.equal(r.status,405);assert.equal(r.headers.Allow,'GET, HEAD')
})
test('built HTML contains meaningful public information and valid identity data',()=>{
 const html=readFileSync('dist/index.html','utf8')
 for(const s of homeSections)assert.ok(html.includes(s.title))
 const body=html.split('<body>')[1].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ')
 assert.ok(body.length>1000);assert.equal((html.match(/<h1\b/g)||[]).length,1)
 const data=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
 assert.deepEqual(data['@graph'].map(x=>x['@type']),['Organization','SoftwareApplication'])
 assert.equal(data['@graph'][1].aggregateRating,undefined)
 assert.match(readFileSync('dist/sitemap.xml','utf8'),/https:\/\/okare.in\/pricing\//)
 assert.match(readFileSync('dist/llms.txt','utf8'),/Musabani/)
})
test('static files and existing APIs are resolved before the 404 fallback',()=>{
 const c=JSON.parse(readFileSync('vercel.json','utf8'))
 assert.equal(c.routes[0].src,'^/$');assert.equal(c.routes[0].dest,'/api/site-content?page=home')
 assert.equal(c.routes.at(-2).handle,'filesystem');assert.equal(c.routes.at(-1).dest,'/api/site-content?page=missing')
})
