const CACHE_NAME = 'catalogo-v4';
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

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', e => {
    // No cachear peticiones a la API de Supabase para tener siempre datos frescos
    if (e.request.url.includes('supabase.co')) {
        e.respondWith(fetch(e.request));
        return;
    }

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
