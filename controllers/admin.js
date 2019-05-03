var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.index = function(req, res) {
    res.render('admin/index', {
        captain : req.captain
    })
}

exports.groups = function(req, res) {
    Request.get(API + "/groupsDetail", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let groups = JSON.parse(body);

        res.render('admin/groups/groups', {
            groups : groups,
            logged : req.logged,
            captain : req.captain,
            admin : req.admin
        });
    });
}

exports.createGroup = function(req, res) {
    if(req.method == "POST") {
        let teams = req.body.teams

        if(teams === undefined) {
            teams = []
        }

        for(let i = 0; i < teams.length; i++) {
            teams[i] = parseInt(teams[i], 10)
        }

        Request({
            url: API + "/groups",
            method: "POST",
            json: true,   
            body: teams
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
            let teams = JSON.parse(body);
    
            res.render('admin/groups/createGroup', {
                logged : req.logged,
                captain : req.captain,
                admin : req.admin,
                teams : teams
            });
        });        
    }
}

exports.group = function(req, res) {
    if(req.method === "PUT") {
        let teams = req.body.teams
        let groupNumber = req.body.groupNumber

        if(teams === undefined) {
            teams = []
        }
    
        for(let i = 0; i < teams.length; i++) {
            teams[i].id = parseInt(teams[i].id, 10)
            teams[i].action = parseInt(teams[i].action, 10)
        }

        Request({
            url: API + "/groups/" + groupNumber,
            method: "PUT",
            json: true,
            body: teams
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });

    } else if(req.method === "DELETE") {
        
        let groupNumber = req.body.groupNumber

        Request({
            url: API + "/groups/" + groupNumber,
            method: "DELETE",
            json: true,
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });

    } else {
        let groupNumber = req.params.groupNumber

        Request.get(API + "/groups/" + groupNumber, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let group = JSON.parse(body);

            Request.get(API + "/teams", (error, response, body) => {
                if(error) {
                    return console.dir(error);
                }
                let teams = JSON.parse(body);
    
                res.render('admin/groups/group', {
                    group : group,
                    logged : req.logged,
                    captain : req.captain,
                    admin : req.admin,
                    teams : teams
                });
            });
        });
    }
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
