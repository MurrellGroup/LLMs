// Content and packaging invariants that catch broken slides before deployment.
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../',import.meta.url));
const context={window:{}};
for (const file of ['assets/content.js','assets/diagrams.js']) vm.runInNewContext(readFileSync(root+file,'utf8'),context,{filename:file});
const {slides,sources}=context.window.LLMTalk;
const diagrams=context.window.LLMDiagrams;
assert.equal(slides.reduce((sum,s)=>sum+s.duration,0),1800,'Planned timing must total 30 minutes.');
assert.equal(new Set(slides.map(s=>s.id)).size,slides.length,'Slide IDs must be unique.');
let builds=0;
for (const s of slides) {
  assert(s.title && s.notes && s.duration>0,`Incomplete slide ${s.id}`);
  const max=s.scene?diagrams.scenes[s.scene]?.steps:s.steps||0;
  assert(Number.isInteger(max),`Missing diagram ${s.scene}`);
  if (s.scene) for(let step=0;step<=max;step++) {
    const svg=diagrams.render(s.scene,step);
    assert(svg.includes('viewBox="0 0 1120 480"') && svg.includes('<title') && svg.includes('<desc'),`Incomplete accessible SVG: ${s.id}/${step}`);
    assert(!/NaN|undefined|Infinity/.test(svg),`Invalid SVG numbers: ${s.id}/${step}`);
    const ids=new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
    for(const match of svg.matchAll(/url\(#([^)]+)\)/g)) assert(ids.has(match[1]),`Broken SVG marker: ${match[1]}`);
    builds++;
  }
  for(const match of (s.html||'').matchAll(/data-reveal="(\d+)"/g)) assert(Number(match[1])<=max,`Unreachable reveal: ${s.id}`);
  for(const key of s.sources||[]) assert(sources[key] && new URL(sources[key].url).protocol==='https:',`Missing source: ${key}`);
}
const index=readFileSync(root+'index.html','utf8');
for(const match of index.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) assert(existsSync(root+match[1]),`Missing asset ${match[1]}`);
assert(!/https?:\/\/[^\s"']+\.(?:js|css)(?:["'\s?]|$)/.test(index),'Presentation assets must work offline.');
console.log(`Validated ${slides.length} slides, ${builds} SVG states, source references, local assets, and 30-minute timing.`);
