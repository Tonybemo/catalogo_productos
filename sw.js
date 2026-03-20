const CACHE_NAME = 'catalogo-v1';
const ASSETS = [
    './',
    './index.html',
    './index.css',
    './app.js',
    './manifest.json',
    './icon.svg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ASSETS))
        .catch(err => console.error('Error al cachear assets:', err))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request).catch(() => {
                // Return fallback if offline and not in cache
                if (e.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
