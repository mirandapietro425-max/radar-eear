import { useEffect, useState } from 'react';
import { Bell, Check, ShieldCheck } from 'lucide-react';
import { notificationDefaults, registerNotifications, requestNotificationPermission, showPreviewNotification, type NotificationKind } from '../../lib/notifications';

const items: {kind:NotificationKind; label:string}[] = [
  {kind:'mission',label:'Missão do dia'},
  {kind:'math',label:'Matemática'},
  {kind:'physics',label:'Física'},
  {kind:'portuguese',label:'Português'},
  {kind:'english',label:'Inglês'},
  {kind:'verse',label:'Bíblia / versículo'},
  {kind:'review',label:'Revisão / fechamento'},
];

export default function NotificationsSettingsPage(){
  const [enabled,setEnabled]=useState<boolean>(()=>localStorage.getItem('radar-notifications-enabled')==='1');
  const [permission,setPermission]=useState<string>(typeof Notification!=='undefined'?Notification.permission:'unsupported');
  const [saved,setSaved]=useState(false);
  useEffect(()=>{void registerNotifications()},[]);
  async function enable(){
    const p=await requestNotificationPermission(); setPermission(p); if(p==='granted'){setEnabled(true);localStorage.setItem('radar-notifications-enabled','1'); await registerNotifications();}
  }
  function save(){localStorage.setItem('radar-notification-schedule',JSON.stringify(notificationDefaults));localStorage.setItem('radar-notifications-enabled',enabled?'1':'0');setSaved(true);window.setTimeout(()=>setSaved(false),1500)}
  return <div className="mx-auto max-w-[900px]"><div className="mb-7"><p className="eyebrow">Rotina do Radar</p><h1 className="mt-2 font-display text-4xl font-bold">Notificações</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Escolha quais lembretes aparecem durante o dia. No celular, o envio persistente depende de permissão, HTTPS, service worker e uma assinatura Push.</p></div>
    <section className="panel rounded-3xl overflow-hidden"><div className="p-5 sm:p-7 border-b border-border flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]"><Bell size={19}/></span><div><h2 className="font-display text-xl font-bold">Agenda inicial</h2><p className="text-xs text-muted-foreground">Horários configuráveis no banco; esta tela apresenta a experiência de consentimento.</p></div></div>
      <div className="divide-y divide-border">{items.map(({kind,label})=><div key={kind} className="flex items-center gap-4 p-4 sm:p-5"><div className="min-w-0 flex-1"><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs text-muted-foreground">{notificationDefaults[kind].time} · {notificationDefaults[kind].body}</p></div><button onClick={()=>showPreviewNotification(kind)} disabled={permission!=='granted'} className="rounded-lg border border-border px-3 py-2 text-[10px] font-bold disabled:opacity-40">Testar</button></div>)}</div>
      <div className="bg-secondary/35 p-5 sm:p-7"><div className="flex flex-wrap items-center gap-3"><button onClick={enable} className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary-foreground))]">{permission==='granted'?'Permissão concedida':'Ativar notificações'}</button><button onClick={()=>setEnabled(v=>!v)} className={'rounded-xl border px-4 py-2.5 text-xs font-bold '+(enabled?'border-emerald-300 bg-emerald-50 text-emerald-800':'border-border bg-card')}>{enabled?'Ativas':'Desativadas'}</button><button onClick={save} className="ml-auto rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold">Salvar</button>{saved&&<span className="flex items-center gap-1 text-xs font-bold text-emerald-700"><Check size={14}/>Salvo</span>}</div><div className="mt-4 flex gap-2 text-xs text-muted-foreground"><ShieldCheck size={15}/><span>Sem permissão, o Radar não deve tentar forçar notificações. O usuário escolhe quais lembretes receber.</span></div></div>
    </section>
  </div>
}
