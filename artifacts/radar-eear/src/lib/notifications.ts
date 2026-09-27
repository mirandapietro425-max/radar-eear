export async function enableStudyNotifications(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof Notification === 'undefined') return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  return Notification.requestPermission();
}

export async function showStudyNotification(title:string, body:string) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false;
  try {
    const registration = await navigator.serviceWorker?.ready;
    if (registration?.showNotification) {
      await registration.showNotification(title,{body,icon:'/favicon.svg',badge:'/favicon.svg',tag:'radar-study',renotify:false,data:{url:'/revisoes'}} as any);
      return true;
    }
  } catch {}
  try { new Notification(title,{body,icon:'/favicon.svg'}); return true; } catch { return false; }
}
