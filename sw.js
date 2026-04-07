const CACHE_NAME = 'catalogo-v7';
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
    self.skipWaiting();
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
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    // 1. No cachear peticiones a la API de Supabase o Storage para tener siempre datos frescos
    if (e.request.url.includes('supabase.co')) {
        e.respondWith(fetch(e.request));
        return;
    }

    // 2. Estrategia Network First para los assets principales (index, app.js, css)
    // Esto asegura que si hay conexión, se baje la versión más nueva.
    e.respondWith(
        fetch(e.request)
        .then(response => {
            // Si la respuesta es válida, actualizamos el caché en segundo plano
            if (response && response.status === 200) {
                const resClone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
            }
            return response;
        })
        .catch(() => {
            // Si falla la red (offline), tiramos del caché
            return caches.match(e.request).then(res => {
                return res || (e.request.destination === 'document' ? caches.match('./index.html') : null);
            });
        })
    );
});
