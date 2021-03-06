document.addEventListener("DOMContentLoaded", function() {
    //Sidebar Navigation
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200) return;
                    document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                        elm.innerHTML = xhttp.responseText;
                    });
                    document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                        elm.addEventListener("click", function(event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();            
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    var page = window.location.hash.substr(1);
    loadPage(setupPage(page));
// PAGES
    function setupPage(page) {
        if (page === "" || page === "#"|| page === "#") {
            page = "home";
        } else if (page === "tentang") {
            page = "tentang";
        } else if (page === "favKlub") {
            page = "favKlub";
        }
        return page;
    }
    // KELOLA PAGES
    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                if (page === "home") {
                    getStandings();
                } else if (page === "favKlub") {
                    getKlubFavorit();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Maaf Anda tidak akses halaman ini.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});