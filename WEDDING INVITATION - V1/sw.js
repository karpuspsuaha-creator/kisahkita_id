const CACHE_NAME = 'wedding-invitation-v7';
const ASSETS_TO_CACHE = [
  './index.html',
  './css/tokens.css',
  './css/base.css',
  './css/ornaments.css',
  './css/signature-transition.css',
  './css/styles.css',
  './js/signature-transition.js',
  './js/script.js',
  './assets/audio/romantic-wedding-piano.mp3',
  './assets/images/couple-story.jpg',
  './assets/images/favicon.svg',
  './assets/images/hero-wedding.jpg',
  './assets/images/wedding-ceremony.jpg',
  './assets/images/wedding-details.jpg',
  './assets/images/wedding-moment.jpg',
  './assets/images/wedding-venue.jpg',
  './assets/ornaments/corner-bloom.svg',
  './assets/ornaments/filigree-frame.svg',
  './assets/ornaments/leaf-pair.svg',
  './assets/ornaments/sprig-divider.svg'
];

const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a'];

function isAudioRequest(request) {
  return AUDIO_EXTENSIONS.some((extension) => request.url.includes(extension));
}

function isRangeRequest(request) {
  return request.headers.has('range');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  if (isAudioRequest(event.request) && isRangeRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        if (!isAudioRequest(event.request) || !isRangeRequest(event.request)) {
          event.waitUntil(
            fetch(event.request).then((networkResponse) => {
              if (networkResponse.ok && !isRangeRequest(event.request)) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
            }).catch(() => {})
          );
        }
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (networkResponse.ok && networkResponse.status !== 206 && !isRangeRequest(event.request)) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        if (isAudioRequest(event.request)) {
          return new Response('', { status: 503, statusText: 'Offline' });
        }
        return undefined;
      });
    })
  );
});
