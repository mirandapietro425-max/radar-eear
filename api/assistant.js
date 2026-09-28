function safeJson(value) {
  try { return JSON.parse(value); } catch { return null; }
}

const ALLOWED_PREFIXES = [
  '/', '/estudar/', '/experiencia/', '/questoes', '/revisoes', '/simulados', '/ciclo',
  '/curiosidades', '/biblioteca', '/livros/', '/atlas', '/biblia', '/apocrifos', '/jogos',
  '/pensadores', '/pessoas/', '/conceitos/', '/explorar', '/hardware', '/dia', '/ciencia',
  '/prehistoria', '/cultura', '/trilhas', '/linha-do-tempo', '/diario', '/salvos', '/comparar',
  '/mapa-do-edital', '/tutor', '/progresso', '/conquistas', '/perfil', '/cronometro', '/edital'
];

function safePath(value) {
  const path = String(value || '').trim();
  if (!path.startsWith('/') || path.startsWith('//') || /^https?:/i.test(path)) return undefined;
  return ALLOWED_PREFIXES.some(prefix => prefix === '/' ? path === '/' : path === prefix || path.startsWith(prefix));
}

function normalizeAction(action) {
  if (!action || typeof action !== 'object') return undefined;
  if (action.type !== 'navigate' || !safePath(action.path)) return undefined;
  return {
    type: 'navigate',
    path: String(action.path),
    label: typeof action.label === 'string' ? action.label.slice(0, 80) : 'Abrir'
  };
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      configured: Boolean(process.env.OPENAI_API_KEY),
      provider: 'openai-compatible',
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
    });
  }
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido.' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ message: 'OPENAI_API_KEY não configurada no servidor.' });

  const body = req.body || {};
  const message = String(body.message || '').trim();
  const context = body.context && typeof body.context === 'object' ? body.context : {};
  const hints = Array.isArray(body.hints) ? body.hints.slice(0, 12) : [];
  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
  if (!message) return res.status(400).json({ message: 'Mensagem vazia.' });

  const baseUrl = String(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = String(process.env.OPENAI_MODEL || 'gpt-4o-mini');
  const system = [
    'Você é o RADAR Assistente, uma camada inteligente de navegação e ajuda do site RADAR EEAR.',
    'Responda em português do Brasil, de forma curta, natural e prática.',
    'Prioridade: ajudar o usuário a encontrar, entender e abrir recursos que já existem no RADAR.',
    'Nunca invente uma rota, entidade, ID, livro, questão, lugar ou funcionalidade.',
    'Quando existir uma ação de navegação confirmada no contexto/hints, você pode retornar:',
    '{"reply":"texto curto","action":{"type":"navigate","path":"/rota","label":"texto do botão"}}',
    'Quando não houver uma ação confirmada, retorne apenas {"reply":"..."}.',
    'A ação deve usar SOMENTE caminhos internos do RADAR e apenas entidades/rotas realmente presentes no contexto ou hints.',
    'Se a pergunta for sobre como usar o site, prefira orientar para uma área existente.',
    'Não mencione APIs, chaves ou detalhes técnicos ao usuário final.',
    `Contexto atual: ${JSON.stringify(context)}`,
    `Possíveis correspondências encontradas localmente: ${JSON.stringify(hints)}`
  ].join('\n');

  const messages = [
    { role: 'system', content: system },
    ...history.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '') })),
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 220 })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return res.status(response.status).json({ message: payload?.error?.message || 'Falha no provedor de IA.' });

    const raw = String(payload?.choices?.[0]?.message?.content || '').trim();
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    const parsed = safeJson(cleaned);
    if (parsed && typeof parsed.reply === 'string') {
      return res.status(200).json({ reply: parsed.reply.slice(0, 1800), action: normalizeAction(parsed.action), source: 'ai' });
    }
    return res.status(200).json({ reply: cleaned.slice(0, 1800) || 'Não consegui formular uma resposta agora.', source: 'ai' });
  } catch {
    return res.status(502).json({ message: 'Não foi possível falar com o provedor de IA agora.' });
  }
}
