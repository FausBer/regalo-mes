const CACHE_NAME = "chuliverso-cache-v5"; // Cambiá este nombre para actualizar cache

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/src/logo-chuliverso.png",
  // agregá acá todos los archivos que usás y querés cachear
];

// Instalación: cacheamos los archivos
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando y cacheando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Cacheando archivos");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // para que tome el control inmediatamente
});

// Activación: eliminamos caches viejos si existen
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activado");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Borrando cache viejo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // toma el control de la página de inmediato
});

// Fetch: respondemos con cache o con la red
self.addEventListener("fetch", (event) => {
  // Solo manejamos peticiones GET
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Si está en cache, devolvemos cache
        return response;
      }
      // Si no está, hacemos fetch y guardamos en cache
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Guardamos la respuesta en cache para la próxima vez
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
