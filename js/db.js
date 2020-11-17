var dbPromised = idb.open('Klub-Bundesliga', 1, upgradeDb => {
    var teamObjectStore = upgradeDb.createObjectStore('favKlub', {
        keyPath: 'id'
    });
    teamObjectStore.createIndex('namaTeam', 'name', { unique: false});
});

// SAVE DATA FAVORITE
function saveDBFav(data) {
    dbPromised.then(function(db) {
        var tx = db.transaction('favKlub', 'readwrite');
        var dataSave = {
            id: data.id,
            crestUrl : data.crestUrl,
            name: data.name,
            venue: data.venue,
            website: data.website,
            founded: data.founded,
        };
        tx.objectStore('favKlub').put(dataSave);
        return tx.complete;
    }).then(function() {
        M.toast({
            html: "Berhasil ditambahkan difavorite",
        });
    }).catch(function(err) {
        console.log(err);
    })
}

//PERIKSA DATA FAVORITE
function cekDataKlub(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction('favKlub', "readonly");
            var store = tx.objectStore('favKlub');
            return store.get(id);
        })
        .then(function (data) {
            if (data != undefined) {
                resolve(true)
            }else {
                reject(false);
            }
        });
    });
}
// DELETE DATA FAVORITE
function deleteDBFav(data) {
    dbPromised.then(function(db) {
        var tx = db.transaction('favKlub', 'readwrite');
        var store = tx.objectStore('favKlub');        
        store.delete(data);
        return tx.complete;
        
    }).then(function() {
        M.toast({
            html: "Berhasil dihapus dari favorite",
        });
    }).catch(function(err) {
        console.log(err);
    })
}
function removeFromFavorites(ID) {
    console.log(ID + " " + storeName);
    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);

            store.delete(ID);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil dihapus dari favorite",
            });
        });

    location.reload();
}


// Data favorite
function getAllDataFavorit() {
    return new Promise(function (resolve) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('favKlub', "readonly");
                var store = tx.objectStore('favKlub');
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}
