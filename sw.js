/* 오프라인용: 앱 파일은 미리 저장, 자료 이미지는 한 번 본 것부터 저장 */
const V = "barista-v3";
const CORE = ["./","./index.html","./app.js","./data.js","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const isCode = /\.(html|js|json)$|\/$/.test(new URL(req.url).pathname);
  if (isCode){ // 앱 코드: 인터넷 되면 최신, 안 되면 저장본
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(V).then(c => c.put(req, cp)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
  } else { // 이미지: 저장본 먼저
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { if (res.ok){ const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); } return res; })));
  }
});
