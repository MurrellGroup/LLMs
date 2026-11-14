// Package only the public presentation files. No compilation or dependencies.
import {cpSync, mkdirSync, rmSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = `${root}dist`;
rmSync(output, {recursive:true, force:true});
mkdirSync(output, {recursive:true});
for (const name of ['index.html','assets','SPEAKER_NOTES.md','SOURCES.md']) {
  cpSync(`${root}${name}`, `${output}/${name}`, {recursive:true});
}
console.log('Static presentation packaged in dist/.');
