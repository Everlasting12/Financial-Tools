const CACHE_NAME = "fin-calc-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./tailwindcss.min.js",
  "./equity-and-mutual-fund.calculator.js",
  "./loan-and-credit.calculators.js",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Helper: stale-while-revalidate for static assets
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => {});
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Navigation requests: network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          // put a copy in cache
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() => caches.match("./offline.html"))
    );
    return;
  }

  // For same-origin static assets (scripts, styles, images), use stale-while-revalidate
  if (url.origin === location.origin) {
    if (
      request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "image"
    ) {
      event.respondWith(staleWhileRevalidate(request));
      return;
    }
  }

  // Default: try cache, then network
  event.respondWith(
    caches
      .match(request)
      .then((cached) => cached || fetch(request).catch(() => {}))
  );
});
