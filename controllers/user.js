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

        console.log(name)
        console.log(email)
        console.log(captain)
        console.log(players)
        
        // descobrir como retornar success

        // // no players
        // if(players[0] === "") {
        //     players = []
        // }

        // let teamCreate = {
        //     "name" : name,
        //     "photo": "www",
        //     "players": 
        //         [
        //             {
        //                 "name" : captain		
        //             }
        //         ],
        //     "captain_email" : email
        // }

        // for(let i = 0; i < players.length; i++) {
        //     let p = {}
        //     p.name = players[i]
        //     teamCreate.players.push(p)
        // }

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
        //     require('./home').home(req, res)
        // });
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
    if(req.method === "POST") {
        // receive data to update schedule    
        let schedule = JSON.parse("[" + req.body.scheduleDiff + "]")
        let teamName = req.body.teamName
        
        if(schedule.length === 0) {
            // schedule is empty nothing to do
            require('./home').home(req, res)
        } else {
            Request({
                url: API + "/schedule/" + teamName,
                method: "PUT",
                json: true,   
                body: schedule
            }, function (error, response, body){
                if(error) {
                    console.log(error)
                }
                require('./home').home(req, res)
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
                admin : req.admin,
                teamName : teamName
            })
        });
    }
}