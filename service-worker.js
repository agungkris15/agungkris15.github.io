importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    ///Precaching App Shell
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '4' },
        { url: '/nav.html', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/detailKlub.html', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/tentang.html', revision: '1' },
        { url: '/pages/favKlub.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/materialize.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/materialize.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/control-db.js', revision: '1' },
        { url: '/js/register.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/img/maskable_icon.png', revision: '1' },
        { url: '/img/icon1-512.png', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '3' },
        { url: 'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '3' },
        { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '3' },
    ], {
    ignoreUrlParametersMatching: [/.*/]
});
// Database offline workbox data info klub
workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
   workbox.strategies.staleWhileRevalidate({
        cacheName: "Bundesliga",
    })
)
// Database offline workbox untuk gambar
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 70,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

   // Menyimpan file js dan css
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
          cacheName: 'static-resources',
        })
      );

    // Menyimpan cache dari CSS Google Fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // Menyimpan cache untuk file font
    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
          cacheName: 'google-fonts-stylesheets',
        })
      );
    // Menyimpan pages
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages',
        })
        
    );
// notif workbox gagal digunakan
} else {
    console.log(`Workbox gagal dimuat`);
}
// push notifikasi 
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});