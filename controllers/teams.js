var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:3000"

// show all teams
exports.index = function(req, res) {
    Request.get(API + "/teams", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let teams = JSON.parse(body)
        res.render('teams/index', {
            teams : teams,
            logged : req.logged,
            captain : req.captain,
            admin : req.admin})
    });
}

// show an specific team
exports.team = function(req, res) {
    let teamID = req.params.teamID

    Request.get(API + "/teams/" + teamID, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let team = JSON.parse(body)
        res.render('teams/team', {
            team : team,
            logged : req.logged,
            captain : req.captain,
            admin : req.admin
        })
    });
}