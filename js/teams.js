function getResultTeamInfo(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-family:verdana;">Nama</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Nama Panggilan</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Didirikan</td>
            <td>${data.founded}</td>
        </tr>
            <td style="font-family:verdana;">Alamat</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Telepon</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Warna Klub</td>
            <td>${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-family:verdana;">Stadion</td>
            <td>${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
            <tr>
                <td class="center-align">${number}</td>
                <td>${squad.name}</td>
                <td class="center-align">${squad.position}</td>
                <td class="center-align"><a href="./detailPlayer.html?id=${squad.id}">Detail</a></td>
            </tr>
        `;
        number++;
    });

    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
}

function getResultPlayerDetail(data) {
    var tablePlayerDetailHtml = "";

    tablePlayerDetailHtml += `
        <table class="striped">
            <thead></thead>
            <tbody>
                <tr>
                    <td style="font-family:verdana;">Nama</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td style="font-family:verdana;">Nama Depan</td>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <td style="font-family:verdana;">Nama Belakang</td>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <td style="font-family:verdana;">Negara Kelahiran</td>
                    <td>${data.countryOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-family:verdana;">Tanggal Lahir</td>
                    <td>${data.dateOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-family:verdana;">Kewarganegaraan</td>
                    <td>${data.nationality}</td>
                </tr>
                <tr>
                    <td style="font-family:verdana;">Posisi</td>
                    <td>${data.position}</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tablePlayerDetail").innerHTML = tablePlayerDetailHtml;
}

function getResultTeamFavorite(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableTeamFavoriteHtml = "";
    let number = 1;

    tableTeamFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Klub</th>
                    <th>Tindakan</th>
                </tr>
            </thead>
            <tbody>
    `;
// Favorite team
    data.forEach(function(team) {
        tableTeamFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./detailTeam.html?id=${team.id}&saved=true">${team.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small orange accent-4" onclick="removeFromFavorites(${team.id}, 'favorite_team')">
                    <i>Hapus</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableTeamFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableTeamFavoriteHtml;
}

function getResultPlayerFavorite(data) {
    var tablePlayerFavoriteHtml = "";
    let number = 1;

    tablePlayerFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pemain</th>
                    <th>Tindakan</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(player) {
        tablePlayerFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./detailPlayer.html?id=${player.id}&saved=true">${player.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small orange accent-4" onclick="removeFromFavorites(${player.id}, 'favorite_player')">
                        <i>Hapus</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tablePlayerFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tablePlayerFavoriteHtml;   
}