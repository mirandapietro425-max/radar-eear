import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root=process.cwd(); const files=[];
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){if(['node_modules','.git','dist'].includes(ent.name))continue;const p=path.join(dir,ent.name);if(ent.isDirectory())walk(p);else if(/\.(ts|tsx)$/.test(ent.name))files.push(p)}}
walk(path.join(root,'src'));walk(path.join(root,'scripts'));
const bad=[];
for(const file of files){const text=fs.readFileSync(file,'utf8');const sf=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);const ds=sf.parseDiagnostics||[];if(ds.length)bad.push({file:path.relative(root,file),diagnostics:ds.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' '))});}
console.log(JSON.stringify({files:files.length,parseErrors:bad.length,errors:bad},null,2));process.exit(bad.length?1:0);
