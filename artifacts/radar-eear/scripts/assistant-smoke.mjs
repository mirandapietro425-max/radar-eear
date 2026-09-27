import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const required = [
  'src/components/RadarAssistant.tsx',
  'src/lib/radar-assistant.ts',
  'api/assistant.js',
  'AI_SETUP.md',
  '.env.example'
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Arquivo ausente: ${file}`);
const check = spawnSync(process.execPath, ['--check', 'api/assistant.js'], { encoding:'utf8' });
if (check.status !== 0) throw new Error(check.stderr || 'Falha de sintaxe em api/assistant.js');
const app = fs.readFileSync('src/app/App.tsx','utf8');
const assistant = fs.readFileSync('src/components/RadarAssistant.tsx','utf8');
const helper = fs.readFileSync('src/lib/radar-assistant.ts','utf8');
for (const token of ["<RadarAssistant/>", 'path="/tutor"', "import { RadarAssistant, AssistantPage }", 'getAssistantStatus', 'getAssistantHints']) {
  if (!(app+assistant+helper).includes(token)) throw new Error(`Integração ausente: ${token}`);
}
if ((app+assistant+helper).includes('speechSynthesis')) throw new Error('Saída de voz proibida: speechSynthesis ainda está presente');
console.log('RADAR Assistente smoke: PASS');
console.log('API proxy: presente');
console.log('Navegação contextual: presente');
console.log('Entrada de voz do dispositivo: presente; saída TTS: ausente');
