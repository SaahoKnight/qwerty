const CACHE_NAME = 'qwerty-cache-version-1.0.0';
const STATIC_FILES = [
  '/qwerty/',
  '/qwerty/styles.css',
  '/qwerty/composeApp.js',
  '/qwerty/2eaba8643e2ccdf352b4.wasm',
  '/qwerty/61fd663c2937b477bfdf.wasm',
  '/qwerty/composeResources/tracksbin.composeapp.generated.resources/drawable/compose-multiplatform.xml'
];

// Install the service worker and cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Intercept network requests and serve cached files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve cached files if available, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});

// Clean up old caches during activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
