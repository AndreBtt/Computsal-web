var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

// show all teams
exports.index = function(req, res) {
    Request.get(API + "/teams", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let teams = JSON.parse(body)
        res.render('teams/index', {teams : teams})
    });
}

// show an specific team
exports.team = function(req, res) {
    let teamName = req.params.teamName

    Request.get(API + "/teams/" + teamName, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let team = JSON.parse(body)
        res.render('teams/team', {team : team})
    });
}

exports.update = function(req, res) {
    let teamName = req.params.teamName

    // want to update
    if (req.method == "POST") {
        deletePlayers = req.body.delete

        return
    }

    // show the current team with fields that can be update
    Request.get(API + "/teams/" + teamName, (error, response, body) => {
        if(error) {
            // invalid connection
            // TODO TEMOS QUE LIDAR COM ISSO
            return console.dir(error);
        }
        let team = JSON.parse(body)
        res.render('teams/update', {
            id : team.id,
            name : team.name,
            photo : team.photo,
            captain : team.captain,
            players : team.players
        })
    });
}