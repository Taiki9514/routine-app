 const CACHE_NAME = 'routine-app-v2';

  self.addEventListener('install', () => {
    self.skipWaiting();
  });

  self.addEventListener('activate', (e) =>
  {
    e.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k
  !== CACHE_NAME).map((k) =>
  caches.delete(k)))
      )
    );
    self.clients.claim();
  });

  self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;

    const url = new URL(e.request.url);

    if (url.origin !== location.origin)
  return;

    if (e.request.mode === 'navigate') {
      e.respondWith(
        fetch(e.request)
          .then((res) => {
            const clone = res.clone();

  caches.open(CACHE_NAME).then((c) =>
  c.put(e.request, clone));
            return res;
          })
          .catch(() =>

  caches.match(e.request).then((r) => r ||
  caches.match('/routine-app/'))
          )
      );
      return;
    }

    e.respondWith(
      caches.match(e.request).then((cached)
  => {
        const networkFetch =
  fetch(e.request).then((res) => {
          if (res && res.status === 200) {

  caches.open(CACHE_NAME).then((c) =>
  c.put(e.request, res.clone()));
          }
          return res;
        });
        return cached || networkFetch;
      })
    );
  });
