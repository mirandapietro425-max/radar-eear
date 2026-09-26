export type NotificationKind = 'mission'|'math'|'physics'|'portuguese'|'english'|'verse'|'review';
export const notificationDefaults = {
  mission: { time:'08:00', title:'Sua missão está pronta', body:'5 questões da EEAR/FAB esperam por você.' },
  math: { time:'10:30', title:'Conta do Radar', body:'Uma questão de Matemática para manter o raciocínio afiado.' },
  physics: { time:'14:00', title:'Física em movimento', body:'Uma questão rápida de Física + explicação.' },
  portuguese: { time:'16:30', title:'Português do dia', body:'Uma questão de Português para manter a leitura e a gramática ativas.' },
  english: { time:'18:00', title:'English minute', body:'Um reading curto ou uma questão de Inglês.' },
  verse: { time:'20:00', title:'Versículo de hoje', body:'Sua leitura bíblica diária está pronta.' },
  review: { time:'21:00', title:'Fechamento do Radar', body:'Veja seus erros e deixe a revisão de amanhã preparada.' },
} as const;

export async function requestNotificationPermission(){
  if(!('Notification' in window)) return 'unsupported' as const;
  if(Notification.permission === 'granted') return 'granted' as const;
  if(Notification.permission === 'denied') return 'denied' as const;
  return await Notification.requestPermission();
}
export async function registerNotifications(){
  if(!('serviceWorker' in navigator)) return false;
  try { await navigator.serviceWorker.register('/radar-day-sw.js'); return true; } catch { return false; }
}
export async function showPreviewNotification(kind:NotificationKind){
  const config=notificationDefaults[kind];
  if(!('serviceWorker' in navigator)) return false;
  const reg=await navigator.serviceWorker.ready;
  await reg.showNotification(config.title,{body:config.body,tag:`radar-${kind}`,data:{url:'/'}});
  return true;
}
