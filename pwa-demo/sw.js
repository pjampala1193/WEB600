const cacheName = 'hello-pwa-v1';

const filesToCache = [
  '/pwa-demo/',
  '/pwa-demo/index.html',
  '/pwa-demo/css/style.css',
  '/pwa-demo/js/main.js',
  '/pwa-demo/manifest.json',
  '/pwa-demo/favicon.ico',
  '/pwa-demo/images/hello-icon-128.png',
  '/pwa-demo/images/hello-icon-144.png',
  '/pwa-demo/images/hello-icon-152.png',
  '/pwa-demo/images/hello-icon-192.png',
  '/pwa-demo/images/hello-icon-256.png',
  '/pwa-demo/images/hello-icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== cacheName).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
