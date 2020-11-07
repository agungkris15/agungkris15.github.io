importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '2' },
        { url: '/manifest.json', revision: '4' },
        { url: '/index.html', revision: '4' },
        { url: '/nav.html', revision: '4' },
        { url: '/detailPlayer.html', revision: '4' },
        { url: '/pages/favorites.html', revision: '4' },
        { url: '/pages/home.html', revision: '4' },
        { url: '/pages/matches.html', revision: '4' },
        { url: '/pages/tentang.html', revision: '4' },
        { url: '/css/materialize.min.css', revision: '4' },
        { url: '/css/style.css', revision: '4' },
        { url: '/js/api.js', revision: '4' },
        { url: '/js/db.js', revision: '4' },
        { url: '/js/helpers.js', revision: '4' },
        { url: '/js/idb.js', revision: '4' },
        { url: '/js/matches.js', revision: '4' },
        { url: '/js/materialize.min.js', revision: '4' },
        { url: '/js/myScript.js', revision: '4' },
        { url: '/js/nav.js', revision: '4' },
        { url: '/js/standings.js', revision: '4' },
        { url: '/js/teams.js', revision: '4' },
        { url: '/images/icons/laliga64.png', revision: '4' },
        { url: '/images/icons/laliga96.png', revision: '4' },
        { url: '/images/icons/facebook64.png', revision: '4' },
        { url: '/images/icons/twitter64.png', revision: '4' },
        { url: '/images/icons/instagram64.png', revision: '4' },
        ]);

    workbox.routing.registerRoute(
        /.*(?:png|svg|)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 80,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
        )


workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}

// Response Push Notifikasi
self.addEventListener("push", function(event) {
    var body;
    
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: "images/icons/laliga512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});