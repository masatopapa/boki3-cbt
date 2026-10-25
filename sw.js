const CACHE = 'boki3-cbt-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ネット優先・オフライン時はキャッシュ: 起動のたびに最新版を取りに行くので、pushだけで全員に新版が届く。
// GitHub Pages は Cache-Control: max-age=600 を返すので、ブラウザのHTTPキャッシュに10分間古い index.html が残る。
// cache:'no-cache' で毎回サーバーに確認（ETag）させ、公開した直後でも次に開いたときに新版になるようにする（v2・2026-10-25）。
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return; // Google Fonts などは素通し
  e.respondWith(
    fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('./index.html'))
      )
  );
});
