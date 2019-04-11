var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.index = function(req, res) {
    Request.get(API + "/teams", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let teams = JSON.parse(body)
        res.render('teams/index', {teams : teams})
    });
}

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

exports.createTeam = function(req, res) {
    
    let teamCreate = {
        "name" : "gol++",
        "photo": "www",
        "players": 
            [
                {
                    "name" : "andre"		
                }
            ],
        "captain_email" : "email"
    }

    teamCreate.players.push({
        "name" : "novo jogador"
    })

    console.log(teamCreate)

    // Request({
    //     url: API + "/teams",
    //     method: "POST",
    //     json: true,   
    //     body: teamCreate
    // }, function (error, response, body){
    //     if(error) {
    //         console.log(error)
    //     }
    //     console.log(response.statusCode);
    // });
}