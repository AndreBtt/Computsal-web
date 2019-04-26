var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.isLoggedIn = function(req, res, next) {
    if (/*usario nao esta logado*/ false) {
        req.logged = false
        req.email = ""
        req.admin = false
        req.captain = false
        req.team = ""
        return next()
    }

    // user is logged in
    req.logged = true
    req.email = "email14"
    req.admin = false
    req.team = ""
    req.captain = false
    if (/* verificar email admin */ true){
        req.admin = true
    }

    
    Request.get(API + "/captainTeam/" + req.email, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let team = JSON.parse(body).team
        if(!(team === undefined)) {
            req.captain = true
            req.team = team
        }
        
        return next()
    });
}