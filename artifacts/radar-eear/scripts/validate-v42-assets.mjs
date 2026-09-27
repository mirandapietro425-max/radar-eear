import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const app=read('src/app/App.tsx');
const exp=read('src/experience-data.ts');
const curiosities=JSON.parse(read('src/data/curiosities-v26.json'));
const coverManifest=JSON.parse(read('public/assets/library/covers/manifest.json'));
const atlasManifest=JSON.parse(read('public/assets/atlas/photos/manifest.json'));
const assetManifest=JSON.parse(read('public/assets/asset-manifest-v41.json'));

const expectedCovers={
  'machado-dom-casmurro':'/assets/library/covers/book-machado-dom-casmurro-cover.jpg',
  'machado-memorias':'/assets/library/covers/book-machado-memorias-cover.jpg',
  'iracema':'/assets/library/covers/book-iracema-cover.png',
  'o-guarani':'/assets/library/covers/book-o-guarani-cover.jpg',
  'camões-lusiadas':'/assets/library/covers/book-camões-lusiadas-cover.jpg',
  'newton-principia':'/assets/library/covers/book-newton-principia-cover.jpg'
};
const checks=[]; const failures=[];
const ok=(name,value,detail='')=>{checks.push({name,ok:Boolean(value),detail});if(!value)failures.push(`${name}${detail?`: ${detail}`:''}`)};

ok('real-cover-map-present',/const REAL_BOOK_COVERS/.test(app));
for(const [id,asset] of Object.entries(expectedCovers)){
  ok(`cover-file:${id}`,exists(`public${asset.replace('/assets','/assets')}`),asset);
  ok(`cover-wired:${id}`,app.includes(`'${id}':'${asset}'`),asset);
}
ok('covers-in-library-pipeline',/cover:coverFor\(b\.id,b\.cover\)/.test(app)&&/cover:coverFor\(id,`\/assets\/library\/catalog/.test(app)&&/cover:coverFor\(b\.id,b\.cover\)/.test(app));
ok('curiosity-count',Array.isArray(curiosities)&&curiosities.length===75,`found ${curiosities.length}`);
ok('curiosity-individual-images',curiosities.every((c)=>typeof c.image==='string'&&/^\/assets\/curiosities\//.test(c.image)&&c.image_license==='original'));
ok('atlas-photo-count',atlasManifest.length===15,`found ${atlasManifest.length}`);
ok('atlas-paths-in-places',atlasManifest.every((x)=>exp.includes(`id: '${x.placeId}'`) && exp.includes(x.path)));
ok('google-maps-preserved',/Google Maps · Atlas principal/.test(app)&&/output=embed/.test(app));
ok('apocrypha-open-routing',/setLoc\(`\/apocrifos\?work=\$\{id\}`\)/.test(app));
ok('v42-manifest',assetManifest.version==='V42-integrated-assets');
ok('cover-manifest-six',coverManifest.length===6,`found ${coverManifest.length}`);
ok('curiosity-wall-uses-item-image',/const visual=c\.image \|\| placeInfo\?\.image/.test(app));

const result={version:'V42',summary:{passed:checks.filter(x=>x.ok).length,total:checks.length,failed:failures.length},failures,checks,counts:{curiosities:curiosities.length,bookCovers:coverManifest.length,atlasPhotos:atlasManifest.length}};
fs.writeFileSync(path.join(root,'V42_ASSET_INTEGRATION_VALIDATION.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.summary));
if(failures.length)process.exit(1);
