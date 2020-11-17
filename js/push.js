var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BFfVVFZ9YMm_ZL6JHYdkW5IgjzbRlUgMWAMJV1kHSWw-M-wl3A4K7OzXSUobANDbd7OV5njsQJQ6T2PlKxNGrt4",
    "privateKey": "afzZKRMsAglFXjuYxBFw4GNzlAgLg6rzTZRDN3vzZbg"
};

webPush.setVapidDetails(
    "mailto:agungkristanto15@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cJoGyEhMsno:APA91bFRrsv-qqQ9dzxMBGCWH9MXMCtqNF9Bx25B0arI3pTR4_RWgGVZq1yiY-wJmYgzurFrgqFk2WVPqLZwtW2UNpaZ2Iv95kUQUW4uaZUk1V8SDhtpZn3nUc14UW-mgHJAB_T0wiHu",
    "keys": {
        "p256dh": "BBXgZanbpPxzDi1iiO1b0U0pJHcxVhihbFQ3E3quNGYICopl4EoxZXN2k6r+reAiV5AZ+SwpiH/m8zIqguo4HRA=",
        "auth": "cjkQtqgaS+eT9MY2vk8lMA=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "472235424730",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);