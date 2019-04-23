var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.createTeam = function(req, res) {
    // if user is not logged
    if(!req.logged) {
        res.render('home/index', {
            logged : false,
            adm : false
        })
    }

    // receive data to create team    
    if(req.method === "POST") {
        var name = req.body.name;
        var captain = req.body.captain;
        var players = req.body.players.split(",")
        
        // no players
        if(players[0] === "") {
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
            "captain_email" : "email"
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
                console.log(error)
            }
            console.log(response.statusCode);
            require('./home').home(req, res)
        });
    } else {
        // Get, just rend page
        res.render('home/createTeam')
    }

}



    