const base_url = "https://api.football-data.org/v2";
const api_token = "24205edc640a4a12a0cbdcfcb2b9311b";
const id_liga = 2014;

const endpoint_standings = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_matches = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
const endpoint_detail_team = `${base_url}/teams/`;
const endpoint_detail_match = `${base_url}/matches/`;
const endpoint_detail_player = `${base_url}/players/`;

const typeTeam = "team";
const typeMatch = "match";
const typePlayer = "player";
const storeNameTeam = "favorite_team";
const storeNameMatch = "favorite_match";
const storeNamePlayer = "favorite_player";

function status(response) {
    if (response.status !== 200) {
        console.log("[API.js][status] Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("[API.js][error] Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

function getStandings() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_standings).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultStandings(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_standings)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultStandings(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_matches).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultMatches(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_matches)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultMatches(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getTeamDetail(teamID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_team + teamID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultTeamInfo(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detail_team + teamID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultTeamInfo(data);
                resolve(data);
            })
        .catch(error);
    });  
}


function getPlayerDetail(playerID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_player + playerID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultPlayerDetail(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_detail_player + playerID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultPlayerDetail(data);
                resolve(data);
            })
        .catch(error);
    });
}

function tabFavorite(type) {
    if (type === typeTeam) {
        getAllFavorites(storeNameTeam).then(function(data) {
            getResultTeamFavorite(data);
        });
    }
    else if(type === typePlayer) {
        getAllFavorites(storeNamePlayer).then(function(data) {
            getResultPlayerFavorite(data); 
        });
    }
}

function getFavoriteById(ID, type) {
    if (type === typeTeam) {
        getById(ID, storeNameTeam).then(function(data) {
            getResultTeamInfo(data);
        });
    }
    else if (type === typePlayer) {
        getById(ID, storeNamePlayer).then(function(data) {
            getResultPlayerDetail(data);
        })
    }
}