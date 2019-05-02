var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.createTeam = function(req, res) {

    if(req.method === "POST") {
        // receive data to create team    
        let name = req.body.name;
        let email = req.body.email;
        let captain = req.body.captain;
        let players = req.body.players

        // no players
        if(players === undefined) {
            players = []
        }

        let teamCreate = {
            "name" : name,
            "photo": "www",
            "players": 
                [
                    {
                        "name" : captain		
                    }
                ],
            "captain_email" : email
        }

        for(let i = 0; i < players.length; i++) {
            let p = {}
            p.name = players[i]
            teamCreate.players.push(p)
        }

        Request({
            url: API + "/teams",
            method: "POST",
            json: true,   
            body: teamCreate
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });
    } else {
        // Get, just rend page
        res.render('user/createTeam',{
            admin : req.admin,
            captain : req.captain,
            email : req.email
        })
    }
}

exports.updateTeam = function(req, res) {
    if(req.method === "PUT") {
        let id = req.body.id
        let name = req.body.name
        let photo = req.body.photo
        let players = req.body.players
        let playersDel = req.body.deletedPlayers
        let newPlayers = req.body.newPlayers

        if(newPlayers === undefined) {
            newPlayers = []
        }

        playersDel = parsePlayers(playersDel)
        players = parsePlayers(players)

        let TeamObj = {
            "id" :      parseInt(id, 10),
            "name" :    name,
            "photo":    photo,
            "players":  players
        }

        Request({
            url: API + "/teams",
            method: "PUT",
            json: true,
            body: TeamObj
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                deletePlayers(req, res, playersDel, newPlayers, name)
            }
        });

    } else if(req.method == "DELETE") {
        let id = req.body.id

        Request({
            url: API + "/teams/" + id,
            method: "DELETE",
            json: true
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });


    } else {
        // Get, just rend page
        Request.get(API + "/teams/" + req.team, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let team = JSON.parse(body)
            for(let i = 0; i < team.players.length; i++) {
                let player = team.players[i]
                if(player.name === team.captain){
                    team.captainID = player.id
                    break
                }
            }
            res.render("user/updateTeam", {
                captain : req.captain,
                admin : req.admin,
                team : team
            })
        });
    }
}

function parsePlayers(players) {
    // no players
    if(players === undefined) {
        players = []
    }

    for(let i = 0; i < players.length; i++) {
        players[i].id = parseInt(players[i].id, 10)
    }
    
    return players
}

function deletePlayers(req, res, players, newPlayers, teamName) {

    Request({
        url: API + "/players",
        method: "DELETE",
        json: true,
        body: players
    }, function (error, response, body){
        if(error) {
            res.end('{"status" : "fail"}');
        } else {
            createdPlayers(req, res, newPlayers, teamName)
        }
    });
}

function createdPlayers(req, res, newPlayers, teamName) {

    let playerObj = []

    for(let i = 0; i < newPlayers.length; i++) {
        let p = {}
        p.name = newPlayers[i]
        p.team = teamName
        playerObj.push(p)
    }

    Request({
        url: API + "/players",
        method: "POST",
        json: true,
        body: playerObj
    }, function (error, response, body){
        if(error) {
            res.end('{"status" : "fail"}');
        } else {
            res.end('{"status" : "success"}');
        }
    });
}

exports.schedule = function(req, res) {
    // get user email
    let email = req.email

    Request.get(API + "/captainTeam/" + email, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let teamObj = JSON.parse(body)
        let teamName = teamObj.team
        scheduleTeam(teamName, req, res)
    });
}

function scheduleTeam(teamName, req, res) {
    if(req.method === "PUT") {

        // receive data to update schedule    
        let schedule = req.body.times

        if(schedule === undefined) {
            // schedule is empty nothing to do
            res.end('{"status" : "success"}');
        } else {

            let scheduleObj = JSON.parse('['+schedule.join(',')+']');

            Request({
                url: API + "/schedule/" + teamName,
                method: "PUT",
                json: true,
                body: scheduleObj
            }, function (error, response, body){
                if(error) {
                    res.end('{"status" : "fail"}');
                } else {
                    res.end('{"status" : "success"}');
                }
            });
        }

    } else {
        Request.get(API + "/schedule/" + teamName, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let schedule = JSON.parse(body)
            res.render("user/schedule", {
                schedule: schedule,
                captain : req.captain,
                admin : req.admin
            })
        });
    }
}