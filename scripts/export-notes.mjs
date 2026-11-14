import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root = fileURLToPath(new URL('../', import.meta.url));
const context = {window:{}};
vm.runInNewContext(readFileSync(`${root}assets/content.js`,'utf8'), context);
for (const file of ['assets/foundation-scenes.js','assets/transformer-scenes.js','assets/diagrams.js']) vm.runInNewContext(readFileSync(`${root}${file}`,'utf8'), context);
const {slides,sources} = context.window.LLMTalk;
const diagrams = context.window.LLMDiagrams;
const fmt = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
const plain = html => html.replace(/<p class="cue">/g,'<p>Presenter cue: ').replace(/<br\s*\/?\s*>/g,'\n').replace(/<\/p>/g,'\n\n').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();
let seconds=0;
let notes='# Large language models — speaker notes\n\nA 30-minute talk for scientists from varied disciplines. These notes include transitions and animation cues. Timings exclude questions.\n\nThe examples are scripted illustrations. Dated empirical results are attributed separately; none of the illustrative prompts is presented as a recorded model run. Capability milestones are selected historical examples from 2020–2025, with a 2026 evaluation caveat. Sources checked 14 November 2026.\n\n## Running the talk\n\nOpen index.html. Space or Right Arrow advances a reveal before moving to the next slide. N shows notes; P opens a synchronized presenter window; O opens the slide index; F toggles fullscreen. T starts or pauses the elapsed timer. Shift+T resets it. R replays the current slide. Use ? for all controls.\n\n## Timing\n\n| Slide | Topic | Start | End |\n| --- | --- | --- | --- |\n';
for (let i=0;i<slides.length;i++) {
  const s=slides[i]; notes+=`| ${i+1} | ${s.title} | ${fmt(seconds)} | ${fmt(seconds+s.duration)} |\n`; seconds+=s.duration;
}
seconds=0;
for (let i=0;i<slides.length;i++) {
  const s=slides[i];
  notes+=`\n## ${i+1}. ${s.title}\n\n${fmt(seconds)}–${fmt(seconds+s.duration)} (${fmt(s.duration)})\n\n${plain(s.notes)}\n`;
  if (s.scene) notes+=`\nAnimation steps:\n\n${diagrams.scenes[s.scene].label.map((label,n)=>`${n+1}. ${label}`).join('\n')}\n`;
  if (s.sources?.length) notes+=`\nSources: ${s.sources.map(k=>`[${sources[k].label}](${sources[k].url})`).join('; ')}.\n`;
  seconds+=s.duration;
}
writeFileSync(`${root}SPEAKER_NOTES.md`,notes);
let refs='# Sources and interpretation\n\nSources checked 14 November 2026. These are selected historical results, not a current model ranking.\n\n';
for (const [key,s] of Object.entries(sources)) {
  const used=slides.map((slide,i)=>slide.sources?.includes(key)?i+1:null).filter(Boolean);
  refs+=`## ${s.label}\n\n[${s.title}](${s.url})\n\n${s.note}\n\nSlides: ${used.join(', ')}.\n\n`;
}
refs+='## Interpretation\n\nThe main conclusion is a mechanistic inference: useful, repeatable feedback can support rapid iteration, selection, and learning. It is not a universal claim that all superhuman performance occurs only in mathematics or coding. Whether similar progress will occur where verification requires expensive experiments or long-term outcomes remains uncertain.\n\nThe attention values, token splits, toy loss surface, translation prompt, lunar-phase response, arithmetic trace, and coding exercise are constructed teaching material. The political example is grounded in the official historical record; the finite-field answer is a mathematical deduction. AIME and IMO questions are paraphrased and attributed.\n';
writeFileSync(`${root}SOURCES.md`,refs);
console.log(`Exported notes for ${slides.length} slides, ${fmt(seconds)} total, with ${Object.keys(sources).length} sources.`);
