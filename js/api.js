const base_url ="https://api.football-data.org/";
const api_token = "24205edc640a4a12a0cbdcfcb2b9311b";
const id_liga = 2002;

const endpoint_klasemen = `${base_url}v2/competitions/${id_liga}/standings`;
const endpoint_klub = `${base_url}v2/teams/`;

let fetchApi = url => {
    return fetch(url, {
     method: "get",
        //mode: "no-cors",
        headers: {
            'X-Auth-Token': api_token,
        }
    });
}


function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getStandings() {
    return new Promise(function(resolve, reject) {
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    dStandings(data);
                    resolve(data);
                });
            }
        });
    }

    fetchApi(endpoint_klasemen)
        .then(status)
        .then(json)
        .then(function(data) {
            dStandings(data)   
        })
    .catch(error);
});
}



function getDetailKlub(idKlub) {
    if ('caches' in window) {
        caches.match(endpoint_klub + idKlub).then(function (response) {
        if (response) {
            response.json().then(function (data) {
                detailKlub(data);
            });
        }
        });
    }
    fetchApi(endpoint_klub + idKlub)
        .then(status)
        .then(json)
        .then(function(data) {
            detailKlub(data);
        })
    .catch(error);
}

function getIdDetailKlub(idKlub) {
    return new Promise(function (resolve, reject) {
        if ('caches' in window) {
            caches.match(endpoint_klub + idKlub).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resolve(data);
                    });
                }
            });
        }
        fetchApi(endpoint_klub + idKlub)
            .then(status)
            .then(json)
            .then(function(data) {
                resolve(data);
            })
            .catch(error);
    });
}

// Daftar klub favorit
function getKlubFavorit() {
    var dataIndexDb = getAllDataFavorit();
    dataIndexDb.then(function (data) {    
        var klubFavorit = '';
        data.forEach(function(dataTeam) {
            klubFavorit +=`
                        <div class="col s12">
                        <div class="card-content row valign-wrapper">
                            <div style="text-align: center;">
                              <a href="./detailKlub.html?detailData=${dataTeam.id}"><img style="width: 100px;" class="responsive-img center-align" width="80%" alt= "${dataTeam.name}" src="${dataTeam.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                            </div>
                            <div class="card-content">
                                <span style="text-align: center; font-weight: 180;" class="card-title truncate"><h4>${dataTeam.name}</h4></span></a>
                                <table>
                                    <tr>
                                        <td style="text-align: left" width="150px"><b>Tahun Berdiri</b> : ${dataTeam.founded}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: left" width="150px"><b>Stadion</b> : ${dataTeam.venue}</td>
                                    </tr>
                                    <tr>
                                    <td style="text-align: left;">
                                    <a href="${dataTeam.website}" target="_blank" class="website-action white-text btn green accent-3">WEBSITE</a>
                                    </td>
                                   
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </div>
                    `;
        });
        
        if(data.length == 0) klubFavorit += '<h6 class="center-align">Tidak ada data Klub Favorite Anda!</6>'
        document.getElementById('progress').style.display = 'none'
        document.getElementById("klubFavorit").innerHTML = klubFavorit; 
    });
}


// Detail Informasi Klub
function detailKlub(data){
    let detailHTML = '';
    let tableSquadHtml = '';
    detailHTML=`
                <div class="card">
                    <div style="text-align: center; padding-top: 5px;">
                        <a href="#"><img style="width: 100px; height: 100px;" alt= "${data.name}" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" /></a>
                    </div>
                    <div class="">
                        <span style="text-align: center; font-weight: 500;" class="card-title truncate"><h4>${data.name}</h4></span>                  
                        <table>
                            <tr>
                            <td style="text-align: left;" width="60px">Tahun Berdiri : ${data.founded}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Stadion : ${data.venue}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Alamat : ${data.address}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Telpon : ${data.phone}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Website : <a href="${data.website}" target="_blank">${data.website}</a>
                            </tr>
                            <tr>
                                <td style="text-align: left;">Email : <a href="mailto:${data.email}">${data.email}</a></td>
                            </tr>
                            
                            <tr>
                                <td style="text-align: left;">Warna Tim : ${data.clubColors}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                `;

                let number = 1;
            data.squad.forEach(function (squad) {
            tableSquadHtml += `
            <tr>
                <td class="center-align">${number}</td>
                <td class="center-align">${squad.name}</td>
                <td class="center-align">${squad.position}</td>
            </tr>
        `;
        number++;
    });
                document.getElementById('progress').style.display = 'none'
                document.getElementById("detailHTML").innerHTML = detailHTML;
                document.getElementById("squad").innerHTML = tableSquadHtml;
}

// Daftar klasemen klub
function  dStandings(data){
    let klasemenHTML = '';
    data.standings[0].table.forEach(function(dataKlub) {
    klasemenHTML += `
                <tr>
                    <td>${dataKlub.position}</td>
                    <td>
                        <a href="./detailKlub.html?detailData=${dataKlub.team.id}">
                            <p style="display: flex; align-items: center;">
                                <img class="materialboxed" style="float:left; margin-right:15px" width="40" alt= "${dataKlub.name}" src="${dataKlub.team.crestUrl}">
                                ${dataKlub.team.name}
                            </p>
                        </a>
                    </td>
                    <td>${dataKlub.playedGames}</td>
                    <td>${dataKlub.won}</td>
                    <td>${dataKlub.draw}</td>
                    <td>${dataKlub.lost}</td>
                    <td>${dataKlub.goalsFor}</td>
                    <td>${dataKlub.goalsAgainst}</td>
                    <td>${dataKlub.goalDifference}</td>
                    <td>${dataKlub.points}</td>
                </tr>
                `;
    });
    document.getElementById('progress').style.display = 'none'
    document.getElementById("standings").innerHTML = klasemenHTML;
}

