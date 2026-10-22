import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
test('App Links verification file survives the build unchanged and grants only URL handling',()=>{
 const source=readFileSync('public/.well-known/assetlinks.json','utf8')
 assert.equal(readFileSync('dist/.well-known/assetlinks.json','utf8'),source)
 const statements=JSON.parse(source)
 assert.equal(statements.length,1)
 const {relation,target}=statements[0]
 assert.deepEqual(relation,['delegate_permission/common.handle_all_urls'])
 assert.equal(target.namespace,'android_app')
 assert.equal(target.package_name,'com.salkhansoren.quickbite')
 assert.equal(new Set(target.sha256_cert_fingerprints).size,3)
 for(const fingerprint of target.sha256_cert_fingerprints)assert.match(fingerprint,/^(?:[A-F0-9]{2}:){31}[A-F0-9]{2}$/)
})
