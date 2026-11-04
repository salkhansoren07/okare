import { test } from 'node:test'
import assert from 'node:assert/strict'
import { currentSection, readingProgress } from '../src/lib/navigation.js'

test('active navigation follows visible sections and clears outside them', () => {
 const sections = [{id:'#why',top:-200,bottom:100},{id:'#experience',top:120,bottom:700}]
 assert.equal(currentSection(sections,150),'#experience')
 assert.equal(currentSection(sections,110),'')
 assert.equal(currentSection(sections,50),'#why')
 assert.equal(currentSection([],150),'')
})
test('reading progress handles short pages and elastic overscroll', () => {
 assert.equal(readingProgress(250,1500,1000),.5)
 assert.equal(readingProgress(-20,1500,1000),0)
 assert.equal(readingProgress(700,1500,1000),1)
 assert.equal(readingProgress(0,800,1000),0)
})
