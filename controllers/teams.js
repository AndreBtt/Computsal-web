var Request = require("request");

let API = "https://floating-reef-49922.herokuapp.com"

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
    console.log(req.params.teamName)
}