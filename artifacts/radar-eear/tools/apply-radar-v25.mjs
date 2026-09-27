import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const bundleRoot=path.resolve(here,'..');
const repoRoot=path.resolve(process.argv[2]||process.cwd());
const appRoot=path.join(repoRoot,'artifacts','radar-eear');
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const backup=path.join(repoRoot,'.radar-eear-backups',`v25-${stamp}`);
const copy=(src,dst)=>{fs.mkdirSync(path.dirname(dst),{recursive:true});fs.cpSync(src,dst,{recursive:true,force:true});};
for(const required of ['pnpm-workspace.yaml','package.json','artifacts/radar-eear']){if(!fs.existsSync(path.join(repoRoot,required)))throw new Error(`Raiz inválida: ${required} não encontrado.`);}
fs.mkdirSync(backup,{recursive:true});
for(const name of ['src','public','index.html','package.json']){const src=path.join(appRoot,name);if(fs.existsSync(src))copy(src,path.join(backup,name));}
for(const name of ['src','public']){fs.rmSync(path.join(appRoot,name),{recursive:true,force:true});copy(path.join(bundleRoot,name),path.join(appRoot,name));}
fs.copyFileSync(path.join(bundleRoot,'index.html'),path.join(appRoot,'index.html'));
const targetPackage=path.join(appRoot,'package.json');
if(fs.existsSync(targetPackage)){
 const current=JSON.parse(fs.readFileSync(targetPackage,'utf8')); const bundled=JSON.parse(fs.readFileSync(path.join(bundleRoot,'package.json'),'utf8'));
 current.scripts={...(current.scripts||{}),validate:bundled.scripts.validate,'test:runtime':bundled.scripts['test:runtime'],'test:e2e':bundled.scripts['test:e2e'],'test:all':bundled.scripts['test:all']};
 fs.writeFileSync(targetPackage,JSON.stringify(current,null,2)+'\n');
}
if(fs.existsSync(path.join(bundleRoot,'supabase','migrations')))for(const f of fs.readdirSync(path.join(bundleRoot,'supabase','migrations')).filter(x=>x.endsWith('.sql')))copy(path.join(bundleRoot,'supabase','migrations',f),path.join(repoRoot,'supabase','migrations',f));
if(fs.existsSync(path.join(bundleRoot,'supabase','functions')))copy(path.join(bundleRoot,'supabase','functions'),path.join(repoRoot,'supabase','functions'));
for(const name of ['runtime-smoke.mjs','validate-v25.mjs','validate-v24.mjs'])if(fs.existsSync(path.join(bundleRoot,'scripts',name)))copy(path.join(bundleRoot,'scripts',name),path.join(appRoot,'scripts',name));
if(fs.existsSync(path.join(bundleRoot,'playwright.config.ts')))copy(path.join(bundleRoot,'playwright.config.ts'),path.join(appRoot,'playwright.config.ts'));
if(fs.existsSync(path.join(bundleRoot,'tests','e2e')))copy(path.join(bundleRoot,'tests','e2e'),path.join(appRoot,'tests','e2e'));
if(fs.existsSync(path.join(bundleRoot,'docs')))copy(path.join(bundleRoot,'docs'),path.join(appRoot,'docs'));
for(const name of ['V25_VALIDATION.json','README_V25_FINAL.md','V25_STATUS.md','V25_ACCEPTANCE_MATRIX.md','DATA_SOURCES.md','ASSET_CREDITS.md'])if(fs.existsSync(path.join(bundleRoot,name)))copy(path.join(bundleRoot,name),path.join(appRoot,name));
console.log(JSON.stringify({backup,app:'artifacts/radar-eear'},null,2));
