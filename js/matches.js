function getResultMatches(data) {
    var tableDataMatches = "";
    var tableMatchesHtml = "";

    var dataMatch = data.matches;
    var matchDays = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    for(let i = 0; i < dataMatch.length; i++) {
        matchDays.push(dataMatch[i].matchday);
    }


   
    let idx = 0;
    for(let i = 0; i < dataMatch.length; i++) {
        if (dataMatch[i].matchday === matchDays.filter(unique)[idx]) {
            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> ${new Date(dataMatch[i].utcDate).toLocaleTimeString()} </td>
                </tr>
            `;
        } else {
            // Tambah tabel
            tableMatchesHtml += `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${convertDate(new Date(dataMatch[i-1].utcDate).toLocaleDateString())}</span>
                        <table class="responsive-table striped centered">
                            <thead>
                                <tr>
                                    <th>Home</th>
                                    <th>Away</th>
                                    <th>Kick Off</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` + tableDataMatches + `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Kosongkan row
            tableDataMatches = "";
            
            // Tambah row
            tableDataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                    <td> ${new Date(dataMatch[i].utcDate).toLocaleTimeString()} </td>
                </tr>
            `;

            idx++;
        }
    }

    // Tambah tabel
    tableMatchesHtml += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${convertDate(new Date(dataMatch[dataMatch.length-1].utcDate).toLocaleDateString())}</span>
                <table class="responsive-table striped centered">
                    <thead>
                        <tr>
                            <th>Home</th
                            <th>Away</th>
                            <th>Kick Off</th>
                        </tr>
                    </thead>
                    <tbody>
                        ` + tableDataMatches + `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("matches").innerHTML = tableMatchesHtml;
}

function getResultMatchFavorite(data) {
    var tableMatchFavoriteHtml = "";
    let number = 1;

    tableMatchFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Match Date</th>
                    <th>Teams</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(match) {
        tableMatchFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td>${convertDate(new Date(match.match.utcDate).toLocaleDateString())}</td>
                <td>${match.match.homeTeam.name} - ${match.match.awayTeam.name}
                </td>
                <td><a href="./detailMatch.html?id=${match.match.id}&saved=true">Detail</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${match.match.id}, 'favorite_match')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableMatchFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite-item").innerHTML = tableMatchFavoriteHtml;
}