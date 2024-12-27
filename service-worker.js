const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/index.html",
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap",
  "/colors.html",
  "/colors.json",
  "/syllable.html",
  "/words.json",
  "/figures.html",
  "/figures.json",
  "/common.css",
  "/confetti.js",
  "/favicon.ico",
  "/audio/again.json",
  "/audio/cheers.json",
  "/audio/tips.json",
  "/audio/again.m4a",
  "/audio/cheers/cheers-1.m4a",
  "/audio/cheers/cheers-2.m4a",
  "/audio/cheers/cheers-3.m4a",
  "/audio/cheers/cheers-4.m4a",
  "/audio/cheers/cheers-5.m4a",
  "/audio/tips/tip-1.m4a",
  "/audio/tips/tip-2.m4a",
  "/audio/tips/tip-3.m4a",
  "/audio/colors/en-black.m4a",
  "/audio/colors/en-blue.m4a",
  "/audio/colors/en-green.m4a",
  "/audio/colors/en-grey.m4a",
  "/audio/colors/en-orange.m4a",
  "/audio/colors/en-pink.m4a",
  "/audio/colors/en-purple.m4a",
  "/audio/colors/en-red.m4a",
  "/audio/colors/en-white.m4a",
  "/audio/colors/en-yellow.m4a",
  "/audio/colors/ru-black.m4a",
  "/audio/colors/ru-blue.m4a",
  "/audio/colors/ru-green.m4a",
  "/audio/colors/ru-grey.m4a",
  "/audio/colors/ru-orange.m4a",
  "/audio/colors/ru-pink.m4a",
  "/audio/colors/ru-purple.m4a",
  "/audio/colors/ru-red.m4a",
  "/audio/colors/ru-white.m4a",
  "/audio/colors/ru-yellow.m4a",
  "/audio/syllables/БАБА.m4a",
  "/audio/syllables/ВАНЯ.m4a",
  "/audio/syllables/ДАША.m4a",
  "/audio/syllables/ДЕДА.m4a",
  "/audio/syllables/ДИМА.m4a",
  "/audio/syllables/КАША.m4a",
  "/audio/syllables/МАМА.m4a",
  "/audio/syllables/МАША.m4a",
  "/audio/syllables/НАТАША.m4a",
  "/audio/syllables/ПАПА.m4a",
  "/audio/syllables/ПАША.m4a",
  "/audio/syllables/САША.m4a",
  "/audio/syllables/СВЕТА.m4a",
  "/audio/syllables/ТАНЯ.m4a"
];

// Install event: cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached content
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: clean old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
