const CACHE_NAME = "stack-support-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/services.html",
  "/detail.html",
  "/about.html",
  "/contact.html",
  "/offline.html",
  "/css/style.css",
  "/js/app.js",
  "/js/api.js",
  "/js/services.js",
  "/js/detail.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(res => {
      return res || caches.match("/offline.html");
    }))
  );
});
