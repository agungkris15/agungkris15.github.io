if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Pendaftaran Service Worker berhasil");
            requestPermission();
        })
        .catch(function() {
            console.log("Pendaftaran Service Worker gagal");
        });
    });
} else {
    console.log("Maaf browser anda tidak mendukung Service Worker.");
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function (reg) {
                        reg.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BFfVVFZ9YMm_ZL6JHYdkW5IgjzbRlUgMWAMJV1kHSWw-M-wl3A4K7OzXSUobANDbd7OV5njsQJQ6T2PlKxNGrt4")
                        }).then(function (sub) {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('auth')))));
                        }).catch(function (e) {
                            console.error('Gagal melakukan subscribe ', e);
                        });
                    });
                }
            })
          

        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

