import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bot, BookOpen, Compass, Globe2, MapPin, Mic2, Navigation, Search, Send, Sparkles, Target, X, Volume2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { askAssistant, getAssistantContext, getAssistantStatus, type AssistantContext } from '../lib/radar-assistant';

function createRecognition(setListening:(value:boolean)=>void,setTranscript:(value:string)=>void,onFinal:(value:string)=>void){
  const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
  if(!SR)return null;
  const recognition=new SR();
  recognition.lang='pt-BR'; recognition.interimResults=true; recognition.maxAlternatives=1; recognition.continuous=false;
  recognition.onstart=()=>setListening(true);
  recognition.onend=()=>setListening(false);
  recognition.onerror=()=>setListening(false);
  recognition.onresult=(event:any)=>{
    const result=event.results?.[event.results.length-1];
    const text=String(result?.[0]?.transcript||'').trim();
    if(text)setTranscript(text);
    if(result?.isFinal&&text)onFinal(text);
  };
  return recognition;
}

export function RadarAssistant({openSignal=false}:{openSignal?:boolean}){
  const [loc,setLoc]=useLocation();
  const context=useMemo(()=>getAssistantContext(loc),[loc]);
  const [open,setOpen]=useState(openSignal); const [input,setInput]=useState(''); const [busy,setBusy]=useState(false); const [listening,setListening]=useState(false); const [aiOnline,setAiOnline]=useState(false); const [voiceReply,setVoiceReply]=useState(true);
  const [messages,setMessages]=useState<Array<{role:'user'|'assistant';content:string;action?:{path:string;label?:string}}>>([{role:'assistant',content:'Oi! Diga o que você quer fazer no RADAR.'}]);
  useEffect(()=>{if(openSignal)setOpen(true)},[openSignal]);
  useEffect(()=>{getAssistantStatus().then(s=>setAiOnline(Boolean(s?.configured)));},[]);
  const suggestions=useMemo(()=>{const base=['Onde estudo Física?','Encontrar um livro','Quero questões difíceis'];if(context.entity?.placeId)base.unshift('Leva isso para o Atlas');else if(context.label==='Descoberta do dia')base.unshift('Leva essa descoberta para o Atlas');else if(context.label==='Biblioteca')base.unshift('Continuar leitura');else if(context.label==='Praticar')base.unshift('Explica esta questão');return [...new Set(base)].slice(0,4)},[context]);
  function speak(text:string){if(!voiceReply||typeof window==='undefined'||!('speechSynthesis' in window))return;try{window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='pt-BR';utterance.rate=1.02;utterance.pitch=1;window.speechSynthesis.speak(utterance)}catch{}}
  async function send(text=input,fromVoice=false){const message=text.trim();if(!message||busy)return;setInput('');setMessages(v=>[...v,{role:'user',content:message}]);setBusy(true);const result=await askAssistant(message,context,messages.slice(-8).map(m=>({role:m.role,content:m.content})));if(result.source==='ai')setAiOnline(true);setMessages(v=>[...v,{role:'assistant',content:result.reply,action:result.action?.type==='navigate'?result.action:null}]);if(fromVoice)speak(result.reply);if(result.action?.type==='navigate'){setTimeout(()=>{setLoc(result.action?.path||'/');setOpen(false)},80)}setBusy(false);}
  function listen(){
    if(listening)return;
    const recognition=createRecognition(setListening,setInput,(text)=>send(text,true));
    if(!recognition){setInput('Seu navegador não oferece reconhecimento de voz.');return;}
    try{recognition.start()}catch{setListening(false)}
  }
  return <>
    <button className="radar-assistant-launcher" aria-label="Abrir Assistente RADAR" onClick={()=>setOpen(true)}><span><Sparkles size={17}/></span><b>Assistente</b></button>
    {open&&<div className="radar-assistant-layer" role="dialog" aria-modal="true" aria-label="Assistente RADAR">
      <button className="radar-assistant-backdrop" aria-label="Fechar Assistente" onClick={()=>setOpen(false)}/>
      <section className="radar-assistant-panel">
        <header className="radar-assistant-head"><div className="radar-assistant-title"><span className="radar-assistant-orb"><Bot size={19}/></span><div><strong>RADAR Assistente</strong><small>{context.label}{context.entity?.title?` · ${context.entity.title}`:''}</small></div></div><button onClick={()=>setOpen(false)} title="Fechar"><X size={17}/></button></header>
        <div className="radar-assistant-context"><Navigation size={13}/><span>Contexto atual</span><b>{context.label}</b><span className={aiOnline?'radar-ai-status online':'radar-ai-status'}>{aiOnline?'IA online':'navegação inteligente'}</span>{context.entity?.placeId&&<span className="radar-context-place"><MapPin size={11}/> ponto no Atlas</span>}</div>
        <div className="radar-assistant-voice-stage"><button className={listening?'active':''} onClick={listen} aria-label={listening?'Parar de ouvir':'Falar com o RADAR'}><span><Mic2 size={26}/></span><strong>{listening?'Estou ouvindo…':'Falar com o RADAR'}</strong><small>{listening?'Diga um comando; não precisa digitar.':'Diga “me leva para…”, “quero estudar…”, “continua meu livro…”'}</small></button></div>
        <div className="radar-assistant-navcard"><div className="radar-assistant-navcard-head"><span><Compass size={13}/> Navegação RADAR</span><small>fale para ir direto</small></div><div className="radar-assistant-navgrid"><button onClick={()=>send('abrir Atlas')}><Globe2 size={14}/><span>Atlas</span></button><button onClick={()=>send('continuar leitura')}><BookOpen size={14}/><span>Continuar</span></button><button onClick={()=>send('abrir questões')}><Target size={14}/><span>Questões</span></button><button onClick={()=>send('abrir Física')}><Sparkles size={14}/><span>Física</span></button></div></div>
        <div className="radar-assistant-suggestions">{suggestions.map(s=><button key={s} onClick={()=>send(s)}>{s}<ArrowRight size={12}/></button>)}</div>
        <div className="radar-assistant-messages">{messages.map((m,i)=><div key={i} className={`radar-msg ${m.role}`}>{m.role==='assistant'&&<span className="radar-msg-icon"><Sparkles size={12}/></span>}<div><p>{m.content}</p>{m.role==='assistant'&&m.action&&<div className="radar-msg-tools"><button onClick={()=>setLoc(m.action?.path||'/')} title="Abrir ação"><Navigation size={12}/> {m.action.label||'Abrir'}</button></div>}</div></div>)}{busy&&<div className="radar-msg assistant typing"><span className="radar-msg-icon"><Sparkles size={12}/></span><div><i/><i/><i/></div></div>}</div>
        <div className="radar-assistant-footer"><div className="radar-assistant-input"><Search size={15}/><button className={`radar-assistant-mic ${listening?'active':''}`} onClick={listen} title={listening?'Ouvindo…':'Falar com o Assistente'} aria-label={listening?'Ouvindo…':'Falar com o Assistente'}><Mic2 size={14}/></button><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')send()}} placeholder="Digite ou fale seu pedido…" aria-label="Mensagem para o Assistente RADAR"/><button onClick={()=>send()} disabled={!input.trim()||busy} title="Enviar"><Send size={15}/></button></div><div className="radar-assistant-meta"><span>{listening?'Microfone ativo · fale agora':'Microfone disponível para falar com o RADAR'}</span><button className={voiceReply?'radar-voice-toggle active':'radar-voice-toggle'} onClick={()=>setVoiceReply(v=>!v)}><Volume2 size={11}/> {voiceReply?'Resposta por voz: ligada':'Resposta por voz: desligada'}</button></div></div>
      </section>
    </div>}
  </>;
}

export function AssistantPage(){
  const [loc,setLoc]=useLocation(); const context:AssistantContext=useMemo(()=>getAssistantContext(loc),[loc]);
  const [prompt,setPrompt]=useState(''); const [answer,setAnswer]=useState(''); const [busy,setBusy]=useState(false); const [listening,setListening]=useState(false);
  function listen(){const recognition=createRecognition(setListening,setPrompt,(text)=>setPrompt(text));if(!recognition){setAnswer('Seu navegador não oferece reconhecimento de voz. Você ainda pode digitar a pergunta.');return;}try{recognition.start()}catch{setListening(false)}}
  async function go(){if(!prompt.trim()||busy)return;setBusy(true);const r=await askAssistant(prompt,context,[]);setAnswer(r.reply);if(r.action?.type==='navigate')setTimeout(()=>setLoc(r.action?.path||'/'),80);setBusy(false)}
  return <div className="stack-lg"><section className="radar-assistant-page-hero surface"><div><div className="eyebrow accent-text">Navegação inteligente</div><h1>Fale com o <span>RADAR.</span></h1><p>Digite ou use o microfone. O Assistente entende o pedido e pode abrir matérias, livros, questões, pessoas, lugares e curiosidades.</p></div><span className="radar-assistant-page-orb"><Mic2 size={28}/></span></section><section className="surface radar-assistant-page"><div className="radar-assistant-context"><Navigation size={13}/><span>Você está em</span><b>{context.label}{context.entity?.title?` · ${context.entity.title}`:''}</b></div><div className="radar-assistant-page-input"><textarea className="field large-textarea" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Diga algo como: ‘me leva para Física’"/><button type="button" className={`secondary-btn ${listening?'active':''}`} onClick={listen}><Mic2 size={15}/>{listening?'Ouvindo…':'Falar'}</button></div><div className="button-row"><button className="primary-btn" disabled={busy||!prompt.trim()} onClick={go}>{busy?'Entendendo...':'Executar pedido'} <Sparkles size={15}/></button></div>{answer&&<div className="radar-assistant-page-answer"><div className="radar-msg-icon"><Bot size={16}/></div><div><b>Resposta do RADAR</b><p>{answer}</p></div></div>}</section></div>;
}
