var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.index = function(req, res) {
    res.render('admin/index')
}

exports.teams = function(req, res) {

    if(req.method === "DELETE") {
        console.log("eita")
    } else {
        Request.get(API + "/teams", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let teams = JSON.parse(body)
            res.render('admin/teams', {
                teams : teams
            })
        });
    }
}
