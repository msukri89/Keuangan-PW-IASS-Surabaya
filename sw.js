const CACHE_NAME = 'kas-iass-v1'; // Anda cukup ubah angka 'v1' ke 'v2', 'v3' dst. saat ingin update besar

self.addEventListener('install', (event) => {
    // Memaksa service worker baru untuk aktif segera
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['./', './index.html', './manifest.json']);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Menghapus cache lama saat versi baru aktif
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
            // Selalu ambil dari network jika ada, tapi simpan di cache
            return response || fetch(event.request);
        })
    );
});
