// Hustle Teacher - Minimal Service Worker
// This service worker is intentionally lightweight.
// It exists to satisfy the PWA manifest registration
// and prevent console errors from a missing sw.js.

const CACHE_NAME = 'hustle-teacher-v1';

self.addEventListener('install', (event) => {
  // Activate immediately without waiting for old tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of all open pages immediately
  event.waitUntil(clients.claim());
});

// Network-first fetch strategy: always try network, fall back gracefully
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Pass through all requests to the network (no caching)
  event.respondWith(fetch(event.request));
});
