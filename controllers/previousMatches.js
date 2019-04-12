var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

// show previous matches
exports.index = function(req, res) {
    Request.get(API + "/previousMatches", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let matches = JSON.parse(body)
        console.log(matches)
        res.render('previousMatches/index', {matches : matches})
    });
}

// show an specific match
exports.match = function(req, res) {
    let matchID = req.params.matchID

    Request.get(API + "/previousMatches/" + matchID, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let match = JSON.parse(body)
        res.render('previousMatches/match', {match : match})
    });
}