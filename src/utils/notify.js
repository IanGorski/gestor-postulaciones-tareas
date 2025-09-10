// Utilidad para notificaciones push en navegador
export function requestNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      return Notification.requestPermission();
    }
    return Promise.resolve(Notification.permission);
  }
  return Promise.resolve('unsupported');
}

export function showNotification(title, options = {}) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
}
