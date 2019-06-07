var Request = require("request");
let firebase = require('firebase')

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:3000"

exports.createTeam = function(req, res) {
    if(req.method === "POST") {
        // receive data to create team    
        let name = req.body.name;
        let email = req.body.email;
        let captain = req.body.captain;
        let players = req.body.players
        // let photo = req.body.photo
        let photo = ""

        // no players
        if(players === undefined) {
            players = []
        }

        let teamCreate = {
            "name" : name,
            "photo": photo,
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
        res.render('user/createTeam',{
            logged : req.logged,
            captain : req.captain,
            admin : req.admin,
            email : req.email
        })
    }
}

exports.updateTeam = function(req, res) {
    if(req.method === "PUT") {
        let id = req.body.id
        let name = req.body.name
        // let photo = req.body.photo
        let photo = ""
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
        Request.get(API + "/teams/" + req.teamID, (error, response, body) => {
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
                logged : req.logged,
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
    let email = req.email

    Request.get(API + "/captainTeam/" + email, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let teamID = JSON.parse(body).team_id
        if(teamID === undefined) {
            res.end('{"status" : "fail"}');
        }
        scheduleTeam(teamID, req, res)
    });
}

function scheduleTeam(teamID, req, res) {
    if(req.method === "PUT") {

        // receive data to update schedule    
        let schedule = req.body.times

        if(schedule === undefined) {
            // schedule is empty nothing to do
            res.end('{"status" : "success"}');
        } else {

            let scheduleObj = JSON.parse('['+schedule.join(',')+']');

            Request({
                url: API + "/schedule/" + teamID,
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
        Request.get(API + "/schedule/" + teamID, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let schedule = JSON.parse(body)
            res.render("user/schedule", {
                schedule: schedule,
                logged : req.logged,
                captain : req.captain,
                admin : req.admin
            })
        });
    }
}

exports.createAccount = function(req, res) {
    let email = req.body.email
    let password = req.body.password

    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        console.log(error)

        if(error.message == "The email address is already in use by another account.") {
            res.end('{"status" : "Email já cadastrado."}');
        }

        res.end('{"status" : "Algo de errado aconteceu, verifique sua conexão e tente novamente mais tarde."}');
        
    }).then(() => {
        res.end('{"status" : "success"}');
    })
}

exports.logIn = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        console.log(error)
        res.end('{"status" : "fail"}');

    }).then(function () {
        res.end('{"status" : "success"}');

    });
}

exports.logOut = function(req, res) {
    firebase.auth().signOut().catch((error) => {
        console.log(error)
        res.end('{"status" : "fail"}');

    }).then(function () {
        res.end('{"status" : "success"}');

    });
}

exports.savePhoto = function(req, res) {
    // var storageRef = firebase.storage();

    // storageRef.put(req.body).then(function(snapshot) {
    //     console.log('Uploaded a blob or file!');
    // });
}

exports.forgetPassword = function(req, res) {
    var auth = firebase.auth();
    let email = req.body.email;

    auth.sendPasswordResetEmail(email).then(function() {
        res.end('{"status" : "success"}');
    }).catch(function(error) {
        res.end('{"status" : "fail"}');
    });
}