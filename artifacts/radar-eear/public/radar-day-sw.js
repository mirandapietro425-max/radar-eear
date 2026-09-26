self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',(event)=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',(event)=>{
  let data={title:'RADAR EEAR',body:'Sua missão de hoje está pronta.',url:'/'};
  try{data=event.data?.json()||data}catch{}
  event.waitUntil(self.registration.showNotification(data.title,{body:data.body,tag:data.tag||'radar',data:{url:data.url||'/'}}));
});
self.addEventListener('notificationclick',(event)=>{event.notification.close(); event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list){if('focus'in client)return client.focus()} return clients.openWindow(event.notification.data?.url||'/')}))});
