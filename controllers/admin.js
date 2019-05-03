var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.index = function(req, res) {
    res.render('admin/index', {
        captain : req.captain
    })
}

exports.teams = function(req, res) {

    if(req.method === "DELETE") {
        let teamsID = req.body.ids

        if(teamsID === undefined) {
            teamsID = []
        }

        for(let i = 0; i < teamsID.length; i++) {
            teamsID[i] = parseInt(teamsID[i], 10)
        }

        Request({
            url: API + "/teams",
            method: "DELETE",
            json: true,
            body: teamsID,
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });
        
    } else {
        Request.get(API + "/teams", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let teams = JSON.parse(body)
            res.render('admin/teams', {
                teams : teams,
                captain : req.captain
            })
        });
    }
}
