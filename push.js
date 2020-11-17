var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPEh1gf_wiwiSEMuxw749sUE15Uw22CX8HIT75_NTzEW_HSsIjnJTkJMC1KdcyNDiaBWmkuI1RE4nDeODSJ-H3k",
    "privateKey": "Z8zRtOMLiRW5uic3i-rhILvJUOBR7dJTE-gZs254oqs"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fcEvHmhFVtU:APA91bF3kxJjfl4E6_ffhHkry_AVhtEAHxQSk7xXN7uUoF0lNy3muDg2RgtygJZ3YsF9VE_aH1snQ2PiTsEB54FbXuAfSqN3juQ0B-9YzttIIMdHjaTu5ABZXnAZsEmmCo_Cli5_gD05",
    "keys": {
        "p256dh": "BFOzzbO4Ygqheu/TBsBUptZJd+p+Rl1PcEZgGrVDQzkGSnsYOVv1msDKNdCR4mX+P8G8THIW3V9JaeKKwzQ+nXo=",
        "auth": "bscvbUupL41EtCFrEUckbg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '453844431051',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);