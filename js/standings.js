function getResultStandings(data) {
    var tableStandingsHtml = "";

    data.standings.forEach(function (standing) {
        var tableDataStanding = "";

        standing.table.forEach(function (team) {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));  
            
            tableDataStanding += `
                <tr>
                    <td class="center-align">${team.position}</td>
                    <td>
                        <a href="./detailTeam.html?id=${team.team.id}">
                            <p style="display: flex; align-items: center;">
                                <img class="materialboxed" style="float:left; margin-right:15px" width="40" height="40" alt="Logo Klub"src="${team.team.crestUrl}">
                                ${team.team.name}
                            </p>
                        </a>
                    </td>
                    <td class="center-align">${team.playedGames}</td>
                    <td class="center-align">${team.won}</td>
                    <td class="center-align">${team.draw}</td>
                    <td class="center-align">${team.lost}</td>
                    <td class="center-align">${team.goalsFor}</td>
                    <td class="center-align">${team.goalsAgainst}</td>
                    <td class="center-align">${team.goalDifference}</td>
                    <td class="center-align">${team.points}</td>
                </tr>
            `;
        })

        tableStandingsHtml += `
            <div class="card">
                <div class="card-content">
                    <table class="responsive-table striped centered">
                        <thead>
                            <tr>
                                <th class="center-align">Posisi</th>
                                <th class="center-align">Nama Klub</th>
                                <th class="center-align">Main</th>
                                <th class="center-align">Menang</th>
                                <th class="center-align">Seri</th>
                                <th class="center-align">Kalah</th>
                                <th class="center-align">GM</th>
                                <th class="center-align">GA</th>
                                <th class="center-align">SG</th>
                                <th class="center-align">Poin</th>
                            </tr>
                        </thead>

                        <tbody>
                            ` + tableDataStanding + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    document.getElementById("standings").innerHTML = tableStandingsHtml;
}
