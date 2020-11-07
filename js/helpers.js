function convertDate(dateString) {
    var date = new Date(dateString);

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "December"];

    let day = String(date.getDate()).padStart(2, '0');
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    //return `${day} " " ${month} " " ${year}`;
    
    let result = day + " " + month + " " + year;

    return result
}

function back() {
    window.history.back();
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