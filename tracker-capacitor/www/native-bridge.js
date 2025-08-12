// Optional hooks: if you add a native background geolocation plugin, listen/emit here.
window.addEventListener('bg:location', (e) => {
  // e.detail.coords => { latitude, longitude, accuracy, speed, ... }
  // You could push the point into the app from native here if you extend the app logic.
  console.log('[native] location', e.detail);
});

// If you integrate Transistorsoft plugin, you could call BackgroundGeolocation.start/stop here:
window.addEventListener('app:start', () => { console.log('[native] start requested'); /* BackgroundGeolocation.start(); */ });
window.addEventListener('app:stop', () => { console.log('[native] stop requested'); /* BackgroundGeolocation.stop(); */ });
