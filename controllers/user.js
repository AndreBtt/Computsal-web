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
        res.render('home/createTeam',{
            admin : req.admin,
            email : req.email
        })
    }
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
            res.render("home/schedule", {
                schedule: schedule,
                admin : req.admin
            })
        });
    }
}