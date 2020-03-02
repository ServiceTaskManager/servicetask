importScripts('./firebase-messaging-sw.js');

if (workbox) {
  workbox.precaching.precache(self.__precacheManifest)

  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request)
      })
    )
  })
}