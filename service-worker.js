const CACHE_NAME = "POKETEST-v1"; // Update the cache name to manage versions
const urlsToCache = [
    "./index.html",
    "./manifest.json",
    "./bootstrap.css",
    "./bootstrap.js",
    "./justAChillGuyIKnow.png"
];

// Install event
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Serve from cache or fallback to network
            return response || fetch(event.request);
        })
    );
});

// Activate event
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
