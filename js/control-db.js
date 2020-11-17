document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get("detailData"));
    getDetailKlub(id);

    let isFav = false

    let saveBtn = document.getElementById("save");
    let deleteBtn = document.getElementById("delete");

    cekDataKlub(id).then((msg) => {
        isFav = true
        deleteBtn.style.display = "block"
        saveBtn.style.display = "none"
    }).catch((msg) => {
        isFav = false
        deleteBtn.style.display = "none"
        saveBtn.style.display = "block"
    })
// TOMBOL SAVE FAVORITE
    saveBtn.onclick = function () {
        if (isFav) {
           deleteDBFav(id);
            isFav = false
            deleteBtn.style.display = "none"
            saveBtn.style.display = "block"
        } else {
            team = getIdDetailKlub(id);   
            team.then(function (team) {
               saveDBFav(team);
            });
            isFav = true
            deleteBtn.style.display = "block"
            saveBtn.style.display = "none"
        }
    };
// TOMBOL DELETE FAVORITE
    deleteBtn.onclick = function () {
        if (isFav) {
           deleteDBFav(id);
            isFav = false
            deleteBtn.style.display = "none"
            saveBtn.style.display = "block"
        } else {
            team = getIdDetailKlub(id);   
            team.then(function (team) {
                saveDBFav(team);
            });
            isFav = true
            deleteBtn.style.display = "block"
            saveBtn.style.display = "none"
        }
    };



});