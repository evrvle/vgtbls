// Service Worker for VGTBLS Podcast - Electronic Music & DJ Sets

const CACHE_NAME = 'vgtbls-cache-v2';
const AUDIO_CACHE_NAME = 'vgtbls-audio-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/tomato.png',
  '/images/pepper.png',
  '/images/cucumber.png',
  '/images/carrot.png',
  '/images/broccoli.png',
  '/images/owl.png',
  '/favicon.ico',
  'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap',
  'https://fonts.googleapis.com/css2?family=Neucha&display=swap',
  // Music-related pages
  '/mixes/'
];

// Audio files to prioritize for caching - add your actual audio files here
const AUDIO_FILES_TO_CACHE = [
  '/audio/sample-mix.mp3',
  '/audio/latest-dj-set.mp3'
];

// Install event - cache assets
self.addEventListener('install', event => {
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  // Cache regular assets
  const cacheAssets = caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Caching app shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    });
    
  // Separately cache audio files with different strategy
  const cacheAudio = caches.open(AUDIO_CACHE_NAME)
    .then(cache => {
      console.log('Caching audio files for offline playback');
      return cache.addAll(AUDIO_FILES_TO_CACHE);
    });
  
  event.waitUntil(Promise.all([cacheAssets, cacheAudio]));
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== AUDIO_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Ensure the service worker takes control immediately
  return self.clients.claim();
});

// Helper function to determine if a request is for an audio file
function isAudioFile(url) {
  return url.match(/\.(mp3|wav|ogg|flac|m4a)$/i);
}

// Fetch event - serve from cache or fetch from network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests except for fonts
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.includes('fonts.googleapis.com') && 
      !event.request.url.includes('fonts.gstatic.com')) {
    return;
  }
  
  // Special handling for audio files
  if (isAudioFile(event.request.url)) {
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          // Return cached audio if found
          if (response) {
            // Refresh the cache in the background (cache-then-network strategy)
            fetch(event.request).then(networkResponse => {
              cache.put(event.request, networkResponse);
            }).catch(error => {
              console.log('Failed to refresh audio cache:', error);
            });
            return response;
          }
          
          // If not in cache, fetch from network and cache for future
          return fetch(event.request).then(networkResponse => {
            // Clone response to store in cache
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
            return networkResponse;
          }).catch(error => {
            console.log('Failed to fetch audio file:', error);
            return new Response('Audio file unavailable offline', {
              status: 503,
              headers: {'Content-Type': 'text/plain'}
            });
          });
        });
      })
    );
    return;
  }
  
  // Standard cache strategy for non-audio content
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // Fallback for navigation requests - serve index.html
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        
        // No internet and not in cache
        return new Response('You are offline and this resource is not available in cache.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});

// Background sync for queued audio playback requests
self.addEventListener('sync', event => {
  if (event.tag === 'sync-audio-history') {
    event.waitUntil(syncAudioPlaybackHistory());
  }
});

// Function to sync audio playback history when online
async function syncAudioPlaybackHistory() {
  try {
    // Implementation would depend on your backend API
    console.log('Syncing audio playback history');
    // Example: fetch('/api/sync-audio-history', {...})
  } catch (error) {
    console.error('Error syncing audio playback history:', error);
  }
} 