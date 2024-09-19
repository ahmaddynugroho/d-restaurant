self.addEventListener('install', (e) => {
  console.log('sw: installed');
})

self.addEventListener('activate', () => {
  console.log('sw: activated');
})

self.addEventListener('fetch', e => {
  console.log('sw: fetch', e.request);
  e.respondWith(fetch(e.request))
})