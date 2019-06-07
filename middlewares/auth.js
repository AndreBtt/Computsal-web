var Request = require("request");
var firebase = require('firebase');

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:3000"

exports.isLoggedIn = function(req, res, next) {

    req.logged = true
    req.email = "email"
    req.admin = false
    req.captain = false
    req.admin = true

    Request.get(API + "/captainTeam/" + req.email, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let teamID = JSON.parse(body).team_id
        if(!(teamID === undefined)) {
            req.captain = true
            req.teamID = teamID
        }
        
        return next()
    });

    // let user = firebase.auth().currentUser;

    // if(user) {
    //     req.logged = true
    //     req.email = user.email
    //     req.admin = false
    //     req.captain = false
        
    //     if (req.email.trim() == "bittencourtandre@hotmail.com"){
    //         req.admin = true
    //     }
    
    //     Request.get(API + "/captainTeam/" + req.email, (error, response, body) => {
    //         if(error) {
    //             return console.dir(error);
    //         }
    //         let teamID = JSON.parse(body).team_id
    //         if(!(teamID === undefined)) {
    //             req.captain = true
    //             req.teamID = teamID
    //         }
            
    //         return next()
    //     });

    // } else {
    //     req.logged = false
    //     req.email = ""
    //     req.admin = false
    //     req.captain = false
    //     req.teamID = ""
    //     return next()
    // }
}