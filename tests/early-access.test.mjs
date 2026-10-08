import { test } from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/early-access.js'

function response() { return { headers: {}, setHeader(k,v) {this.headers[k]=v}, status(code) {this.code=code;return this}, json(body){this.body=body;return this} } }
const req = body => ({method:'POST',headers:{'content-type':'application/json','x-vercel-forwarded-for':'192.0.2.1'},body})
test('signup validates requests, protects credentials and handles backend failures', async () => {
 const originalFetch=globalThis.fetch
 const oldUrl=process.env.SUPABASE_URL, oldKey=process.env.SUPABASE_SERVICE_ROLE_KEY
 try {
  let res=response(); await handler({...req({}),method:'GET'},res); assert.equal(res.code,405)
  for(const body of [{email:'bad',consent:true},{email:'test@example.com',consent:false},'{bad']) {
   res=response();await handler(req(body),res);assert.equal(res.code,400)
  }
  delete process.env.SUPABASE_URL;delete process.env.SUPABASE_SERVICE_ROLE_KEY
  res=response();await handler(req({email:'test@example.com',consent:true}),res);assert.equal(res.code,503)
  process.env.SUPABASE_URL='https://example.supabase.co';process.env.SUPABASE_SERVICE_ROLE_KEY='test-server-secret'
  let calls=0
  globalThis.fetch=async(url,options)=>{
   calls++;assert.equal(url,'https://example.supabase.co/rest/v1/rpc/request_early_access')
   const data=JSON.parse(options.body);assert.equal(data.p_email,'test@example.com');assert.match(data.p_fingerprint,/^[a-f0-9]{64}$/)
   assert.ok(!options.body.includes('192.0.2.1'));return {ok:true,json:async()=> 'accepted'}
  }
  for(let i=0;i<2;i++){res=response();await handler(req({email:' Test@Example.com ',consent:true}),res);assert.equal(res.code,200);assert.deepEqual(res.body,{accepted:true})}
  assert.equal(calls,2)
  res=response();await handler(req({website:'bot'}),res);assert.equal(calls,2)
  globalThis.fetch=async()=>({ok:true,json:async()=> 'rate_limited'})
  res=response();await handler(req({email:'test@example.com',consent:true}),res);assert.equal(res.code,429)
  globalThis.fetch=async()=>{throw Error('secret backend error')}
  res=response();await handler(req({email:'test@example.com',consent:true}),res);assert.equal(res.code,503);assert.ok(!JSON.stringify(res.body).includes('secret'))
 } finally {globalThis.fetch=originalFetch;for(const [k,v] of [['SUPABASE_URL',oldUrl],['SUPABASE_SERVICE_ROLE_KEY',oldKey]]){if(v===undefined)delete process.env[k];else process.env[k]=v}}
})

test('database deduplicates and denies public access; rate limit persists across calls', async()=>{
 const { PGlite }=await import('@electric-sql/pglite')
 const {readFile}=await import('node:fs/promises')
 const db=new PGlite()
 try {
  await db.exec('create role anon; create role authenticated; create role service_role;')
  await db.exec(await readFile(new URL('../supabase/early-access.sql', import.meta.url),'utf8'))
  const fingerprint='a'.repeat(64)
  for(let i=0;i<11;i++){
   const r=await db.query('select public.request_early_access($1,$2) as result',[' Test@Example.com ',fingerprint])
   assert.equal(r.rows[0].result,i<10?'accepted':'rate_limited')
  }
  assert.equal((await db.query('select count(*)::int as n from early_access_requests')).rows[0].n,1)
  for(const role of ['anon','authenticated']) {
   const p=await db.query("select has_table_privilege($1,'public.early_access_requests','SELECT') as readable, has_function_privilege($1,'public.request_early_access(text,text)','EXECUTE') as callable",[role])
   assert.equal(p.rows[0].readable,false);assert.equal(p.rows[0].callable,false)
  }
  await db.exec("update early_access_rate_limits set window_start=now()-interval '2 hours'")
  assert.equal((await db.query('select public.request_early_access($1,$2) as result',['new@example.com',fingerprint])).rows[0].result,'accepted')
 } finally {await db.close()}
})
