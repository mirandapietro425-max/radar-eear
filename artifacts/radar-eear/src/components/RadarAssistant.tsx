import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bot, ChevronDown, MapPin, MessageCircle, Mic2, Navigation, Search, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { askAssistant, getAssistantContext, getAssistantStatus, speakText, type AssistantContext } from '../lib/radar-assistant';

export function RadarAssistant({openSignal=false}:{openSignal?:boolean}){
  const [loc,setLoc]=useLocation();
  const context=useMemo(()=>getAssistantContext(loc),[loc]);
  const [open,setOpen]=useState(openSignal);
  const [input,setInput]=useState('');
  const [busy,setBusy]=useState(false);
  const [autoVoice,setAutoVoice]=useState(false);
  const [listening,setListening]=useState(false);
  const [voiceLang,setVoiceLang]=useState('pt-BR');
  const [aiOnline,setAiOnline]=useState(false);
  const [messages,setMessages]=useState<Array<{role:'user'|'assistant';content:string;action?:{path:string;label?:string}}>>([{role:'assistant',content:'Oi! Eu sou o Assistente RADAR. Posso te levar direto ao conteúdo certo.'}]);
  useEffect(()=>{if(openSignal)setOpen(true)},[openSignal]);
  useEffect(()=>{ if('speechSynthesis' in window) window.speechSynthesis.getVoices(); getAssistantStatus().then(s=>setAiOnline(Boolean(s?.configured))); },[]);
  const suggestions=useMemo(()=>{
    const base=['Onde estudo Física?','Encontrar um livro','Quero questões difíceis'];
    if(context.entity?.placeId) base.unshift('Leva isso para o Atlas');
    else if(context.label==='Descoberta do dia') base.unshift('Leva essa descoberta para o Atlas');
    else if(context.label==='Biblioteca') base.unshift('Continuar leitura');
    else if(context.label==='Praticar') base.unshift('Explica esta questão');
    return [...new Set(base)].slice(0,4);
  },[context]);
  function listen(){
    const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR){setInput(v=>v);return;}
    const recognition=new SR(); recognition.lang='pt-BR'; recognition.interimResults=false; recognition.maxAlternatives=1;
    recognition.onstart=()=>setListening(true); recognition.onend=()=>setListening(false); recognition.onerror=()=>setListening(false);
    recognition.onresult=(event:any)=>{const text=String(event.results?.[0]?.[0]?.transcript||'').trim();if(text){setInput(text);send(text);}};
    recognition.start();
  }
  async function send(text=input){
    const message=text.trim(); if(!message||busy)return;
    setInput(''); setMessages(v=>[...v,{role:'user',content:message}]); setBusy(true);
    const result=await askAssistant(message,context,messages.slice(-8).map(m=>({role:m.role,content:m.content})));
    if(result.source==='ai') setAiOnline(true);
    const action=result.action?.type==='navigate'?result.action:undefined;
    setMessages(v=>[...v,{role:'assistant',content:result.reply,action}]);
    if(action){
      setTimeout(()=>setLoc(action.path),80);
    }
    if(autoVoice)speakText(result.reply,voiceLang);
    setBusy(false);
  }
  return <>
    <button className="radar-assistant-launcher" aria-label="Abrir Assistente RADAR" onClick={()=>setOpen(true)}><span><Sparkles size={17}/></span><b>Assistente</b></button>
    {open&&<div className="radar-assistant-layer" role="dialog" aria-modal="true" aria-label="Assistente RADAR">
      <button className="radar-assistant-backdrop" aria-label="Fechar Assistente" onClick={()=>setOpen(false)}/>
      <section className="radar-assistant-panel">
        <header className="radar-assistant-head"><div className="radar-assistant-title"><span className="radar-assistant-orb"><Bot size={19}/></span><div><strong>RADAR Assistente</strong><small>{context.label}{context.entity?.title?` · ${context.entity.title}`:''}</small></div></div><div className="radar-assistant-head-actions"><button className={autoVoice?'active':''} onClick={()=>setAutoVoice(v=>!v)} title="Falar respostas automaticamente"><Volume2 size={16}/></button><button onClick={()=>setOpen(false)} title="Fechar"><X size={17}/></button></div></header>
        <div className="radar-assistant-context"><Navigation size={13}/><span>Contexto atual</span><b>{context.label}</b><span className={aiOnline?'radar-ai-status online':'radar-ai-status'}>{aiOnline?'IA online':'navegação inteligente'}</span>{context.entity?.placeId&&<span className="radar-context-place"><MapPin size={11}/> ponto no Atlas</span>}</div>
        <div className="radar-assistant-suggestions">{suggestions.map(s=><button key={s} onClick={()=>send(s)}>{s}<ArrowRight size={12}/></button>)}</div>
        <div className="radar-assistant-messages">{messages.map((m,i)=><div key={i} className={`radar-msg ${m.role}`}>{m.role==='assistant'&&<span className="radar-msg-icon"><Sparkles size={12}/></span>}<div><p>{m.content}</p>{m.role==='assistant'&&<div className="radar-msg-tools"><button onClick={()=>speakText(m.content,voiceLang)} title="Ouvir"><Volume2 size={12}/> Ouvir</button>{m.action&&<button onClick={()=>setLoc(m.action?.path||'/')} title="Abrir ação"><Navigation size={12}/> {m.action.label||'Abrir'}</button>}</div>}</div></div>)}{busy&&<div className="radar-msg assistant typing"><span className="radar-msg-icon"><Sparkles size={12}/></span><div><i/><i/><i/></div></div>}</div>
        <div className="radar-assistant-footer"><div className="radar-assistant-input"><Search size={15}/><button className={`radar-assistant-mic ${listening?'active':''}`} onClick={listen} title="Falar com o Assistente"><Mic2 size={14}/></button><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')send()}} placeholder="O que você quer fazer?" aria-label="Mensagem para o Assistente RADAR"/><button onClick={()=>send()} disabled={!input.trim()||busy} title="Enviar"><Send size={15}/></button></div><div className="radar-assistant-meta"><label><input type="checkbox" checked={autoVoice} onChange={e=>setAutoVoice(e.target.checked)}/><span><Volume2 size={12}/> falar respostas</span></label><select value={voiceLang} onChange={e=>setVoiceLang(e.target.value)} aria-label="Idioma da voz"><option value="pt-BR">Português</option><option value="en-US">English</option></select><span className="radar-assistant-status"><Mic2 size={11}/> voz do dispositivo</span></div></div>
      </section>
    </div>}
  </>;
}

export function AssistantPage(){
  const [loc,setLoc]=useLocation();
  const context:AssistantContext=useMemo(()=>getAssistantContext(loc),[loc]);
  const [prompt,setPrompt]=useState(()=>{
    const qs=new URLSearchParams(loc.split('?')[1]||'');
    if(qs.get('question')) return 'Me ajuda a entender esta questão.';
    if(qs.get('curiosity')) return 'Me explica esta curiosidade e me leva ao lugar relacionado.';
    if(qs.get('place')) return 'O que este lugar tem a ver com o conteúdo do RADAR?';
    return 'Me mostra o que eu posso fazer aqui.';
  });
  const [answer,setAnswer]=useState('');
  const [busy,setBusy]=useState(false);
  const [voice,setVoice]=useState(true);
  async function go(){if(!prompt.trim()||busy)return;setBusy(true);const r=await askAssistant(prompt,context,[]);setAnswer(r.reply);if(r.action?.type==='navigate'){const path=r.action.path;setTimeout(()=>setLoc(path),80)}if(voice)speakText(r.reply,'pt-BR');setBusy(false)}
  return <div className="stack-lg"><section className="radar-assistant-page-hero surface"><div><div className="eyebrow accent-text">Navegação inteligente</div><h1>O RADAR com <span>alguém para te levar.</span></h1><p>Pergunte onde está alguma coisa, peça para abrir uma matéria, encontrar um livro, mostrar uma questão ou levar uma descoberta ao Atlas.</p></div><span className="radar-assistant-page-orb"><Sparkles size={28}/></span></section><section className="surface radar-assistant-page"><div className="radar-assistant-context"><Navigation size={13}/><span>Você está em</span><b>{context.label}{context.entity?.title?` · ${context.entity.title}`:''}</b></div><textarea className="field large-textarea" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ex.: leva essa curiosidade para o mapa"/><div className="button-row"><button className="primary-btn" disabled={busy} onClick={go}>{busy?'Consultando...':'Falar com o Assistente'} <Sparkles size={15}/></button><button className={`secondary-btn ${voice?'active':''}`} onClick={()=>setVoice(v=>!v)}>{voice?<Volume2 size={15}/>:<VolumeX size={15}/>} Voz</button></div>{answer&&<div className="radar-assistant-page-answer"><div className="radar-msg-icon"><Bot size={16}/></div><div><b>Resposta do RADAR</b><p>{answer}</p><button className="text-link" onClick={()=>speakText(answer,'pt-BR')}>Ouvir resposta <Volume2 size={12}/></button></div></div>}</section></div>
}
