
const CACHE_NAME = 'keqt-cache-v1';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(OFFLINE_URLS);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const networkResponse = await fetch(event.request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, networkResponse.clone());
      return networkResponse;
    } catch (e) {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      // fallback to root for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
      throw e;
    }
  })());
});
