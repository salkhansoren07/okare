import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
const read=p=>readFileSync(p,'utf8')
const visible=html=>html.split('<body>')[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()
test('brand plus product appears in title, OG title, raw and React H1',()=>{
 const html=read('dist/index.html')
 assert.match(html,/<title>Okare Food Delivery \| East Singhbhum/)
 assert.match(html,/<meta property="og:title" content="Okare Food Delivery/)
 assert.match(html,/<h1>Okare food delivery,/)
 assert.match(read('src/App.jsx'),/<h1>Okare food delivery,/)
 assert.match(html,/rel="canonical" href="https:\/\/www.okare.in\/"/)
 assert.match(html,/rel="describedby" href="\/llms.txt"/)
 assert.match(html,/rel="alternate" type="text\/markdown" href="\/index.md"/)
})
test('llms format has project H1, summary, and only linked file lists under H2 headings',()=>{
 const text=read('dist/llms.txt')
 assert.ok(text.startsWith('# Okare\n\n> '))
 assert.equal((text.match(/^# /gm)||[]).length,1)
 assert.match(text,/## When to use Okare/)
 for(const section of text.split(/^## .+$/m).slice(1)){
  for(const line of section.trim().split('\n').filter(Boolean))assert.match(line,/^- \[[^\]]+\]\(https:\/\/www.okare.in\/[^)]*\): .+/)
 }
 for(const [,path] of text.matchAll(/\]\(https:\/\/www.okare.in\/([^)]*)\)/g)){
  const file=path.endsWith('/')?`${path}index.html`:path
  assert.ok(existsSync(`dist/${file}`),`missing guide target: ${path}`)
 }
 const guide=read('dist/agent-instructions.md')
 assert.match(guide,/## When to use Okare/)
 assert.match(guide,/## How to access the service/)
 assert.match(guide,/no documented public ordering API/)
 assert.match(guide,/Musabani, Jadugoda, Ghatshila, Karandih and Jamshedpur/)
})
test('Organization contact and address remain present in generated JSON-LD',()=>{
 const html=read('dist/index.html')
 const data=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
 const org=data['@graph'].find(x=>x['@type']==='Organization')
 assert.equal(org.contactPoint['@type'],'ContactPoint')
 assert.equal(org.contactPoint.email,'support@okare.in')
 assert.equal(org.contactPoint.telephone,'+919942304436')
 assert.equal(org.contactPoint.contactType,'customer support')
 assert.equal(org.address['@type'],'PostalAddress')
 for(const key of ['streetAddress','addressLocality','addressRegion','postalCode','addressCountry'])assert.ok(org.address[key])
})
test('trust pages have substantive raw HTML, routes and homepage navigation',()=>{
 const routes=JSON.parse(read('vercel.json')).routes
 for(const page of ['about','contact','privacy']){
  const html=read(`dist/${page}/index.html`)
  assert.ok(visible(html).length>=500,page)
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(routes.some(r=>r.src===`^/${page}/?$`&&r.dest===`/${page}/index.html`))
  assert.ok(read('dist/index.html').includes(`href="/${page}/"`))
  assert.ok(read('src/App.jsx').includes(`href="/${page}/"`))
 }
 assert.equal(read('dist/privacy/index.html'),read('public/privacy-policy/index.html'))
 assert.match(read('dist/contact/index.html'),/href="tel:\+919942304436"/)
 assert.match(read('dist/about/index.html'),/Okare Enterprise/)
})

test('public identity signals consistently target the final www host',()=>{
 for(const file of ['dist/index.html','dist/about/index.html','dist/contact/index.html','dist/privacy/index.html','dist/privacy-policy/index.html','dist/delete-account/index.html','dist/pricing/index.html','dist/llms.txt','dist/index.md','dist/agent-instructions.md','dist/sitemap.xml','dist/robots.txt']){
  assert.ok(!read(file).includes('https://okare.in'),file)
 }
 const submission=JSON.parse(read('docs/indexnow-submit.json'))
 assert.equal(submission.host,'www.okare.in')
 for(const url of [...submission.urlList,submission.keyLocation])assert.equal(new URL(url).host,submission.host)
})
