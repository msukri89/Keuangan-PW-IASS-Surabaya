const CACHE_NAME = 'kas-iass-v7';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './', 
                './index.html', 
                './manifest.json',
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                'https://cdn.jsdelivr.net/npm/flatpickr',
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/id.js'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
