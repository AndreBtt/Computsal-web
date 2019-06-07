var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:3000"

exports.index = function(req, res) {
    res.render('admin/index', {
        logged : req.logged,
        captain : req.captain,
        admin : req.admin
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
                logged : req.logged,
                captain : req.captain,
                admin : req.admin
            })
        });
    }
}

exports.time = function(req, res) {
    if(req.method == "PUT") {
        let upTimes = req.body.times

        if(upTimes === undefined) {
            upTimes = []
        }

        for(let i = 0; i < upTimes.length; i++) {
            upTimes[i].id = parseInt(upTimes[i].id, 10)
            upTimes[i].action = parseInt(upTimes[i].action, 10)
        }

        Request({
            url: API + "/times",
            method: "PUT",
            json: true,
            body: upTimes
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });

    } else if(req.method == "POST") {
        let newTimes = req.body.newTimes

        if(newTimes === undefined) {
            newTimes = []
        }

        Request({
            url: API + "/times",
            method: "POST",
            json: true,
            body: newTimes
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });

    } else {
        Request.get(API + "/times", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let times = JSON.parse(body)

            res.render("admin/time", {
                times: times,
                logged : req.logged,
                captain : req.captain,
                admin : req.admin,
            })
        });
    }
}

exports.matches = function(req, res) {
    Request.get(API + "/nextMatches", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }

        let nextMatches = JSON.parse(body)

        Request.get(API + "/previousMatches", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }

            let prevMatches = JSON.parse(body)
    
            res.render('admin/matches/index', {
                nextMatches : nextMatches,
                prevMatches : prevMatches,
                logged : req.logged,
                captain : req.captain,
                admin : req.admin})
        });
    });
}

exports.previousMatch = function(req, res) {
    if(req.method == "PUT") {
        let matchID = req.body.id
        let players = req.body.players

        if(players === undefined) {
            players = []
        }

        for(let i = 0; i < players.length; i++) {
            players[i].player_id = parseInt(players[i].player_id,10)
            players[i].score = parseInt(players[i].score,10)
            players[i].yellowCard = parseInt(players[i].yellowCard,10)
            players[i].redCard = parseInt(players[i].redCard,10)
        }

        Request({
            url: API + "/previousMatches/" + matchID,
            method: "PUT",
            json: true,   
            body: players
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });
        
    } else if(req.method == "GET") {
        let id = req.params.id

        Request.get(API + "/previousMatches/" + id, (error, response, body) => {
            if(error) {
                return console.dir(error)
            }
            let match = JSON.parse(body)

            Request.get(API + "/teams/" + match.team1_id, (error, response, body) => {
                if(error) {
                    return console.dir(error);
                }
                let t1 = JSON.parse(body);

                Request.get(API + "/teams/" + match.team2_id, (error, response, body) => {
                    if(error) {
                        return console.dir(error);
                    }
                    let t2 = JSON.parse(body);

                    res.render("admin/matches/update", {
                        t1: t1,
                        t2: t2,
                        match: match,
                        logged : req.logged,
                        captain : req.captain,
                        admin : req.admin,
                    })
                });
                
            });
        });

    }
}

exports.match = function(req, res) {
    if(req.method == "POST") {
        let obj = {}
        obj.next_match_id = parseInt(req.body.next_match_id,10)
        obj.players = req.body.players

        if(obj.players === undefined) {
            obj.players = []
        }

        for(let i = 0; i < obj.players.length; i++) {
            obj.players[i].player_id = parseInt(obj.players[i].player_id,10)
            obj.players[i].score = parseInt(obj.players[i].score,10)
            obj.players[i].yellowCard = parseInt(obj.players[i].yellowCard,10)
            obj.players[i].redCard = parseInt(obj.players[i].redCard,10)
        }

        Request({
            url: API + "/previousMatches",
            method: "POST",
            json: true,   
            body: obj
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });

    } else if(req.method == "GET") { 
        let id = req.params.id

        Request.get(API + "/nextMatches", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let matches = JSON.parse(body)


            if(matches == undefined) {
                matches = []
            }

            let match

            for(let i = 0 ; i < matches.length; i++) {
                if(matches[i].id == id) {
                    match = matches[i]
                    break
                }
            }

            if(match == undefined) {
                res.render('home/index', {
                    logged : req.logged,
                    admin : req.admin,
                    captain : req.captain
                })
                return
            }

            Request.get(API + "/teams/" + match.team1_id, (error, response, body) => {
                if(error) {
                    return console.dir(error);
                }
                let t1 = JSON.parse(body);

                Request.get(API + "/teams/" + match.team2_id, (error, response, body) => {
                    if(error) {
                        return console.dir(error);
                    }
                    let t2 = JSON.parse(body);

                    res.render("admin/matches/match", {
                        t1: t1,
                        t2: t2,
                        match: match,
                        logged : req.logged,
                        captain : req.captain,
                        admin : req.admin,
                    })
                });
                
            });
        });
    }
}

exports.nextMatch = function(req, res) {
    if(req.method == "GET") {
        res.render('admin/nextMatches/index', {
            logged : req.logged,
            captain : req.captain,
            admin : req.admin})
    } else if(req.method == "POST") {
        // it can create or generate
        let type = req.body.type
        
        if(type == "create") {
            // create next matches

        } else {
            // generate next matches
            Request({
                url: API + "/generateNextMatches",
                method: "POST",
                json: true
            }, function (error, response, body){
                if(error) {
                    res.end('{"status" : "fail"}');
                } else {
                    res.end('{"status" : "success"}');
                }
            });
        }
    }
}

exports.nextMatchesUpdate = function(req, res) {
    if(req.method == "GET") {
        Request.get(API + "/nextMatches", (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            let matches = JSON.parse(body)

            Request.get(API + "/teams", (error, response, body) => {
                if(error) {
                    return console.dir(error);
                }
                let teams = JSON.parse(body)

                Request.get(API + "/times", (error, response, body) => {
                    if(error) {
                        return console.dir(error);
                    }
                    let times = JSON.parse(body)

                    for(let i = 0; i < times.length; i++) {
                        times[i].time = times[i].time.substring(0, times[i].time.length - 3)
                    }

                    for(let i = 0; i < matches.length; i++) {
                        matches[i].time = matches[i].time.substring(0, matches[i].time.length - 3)
                        for(let j = 0; j < times.length; j++) {
                            if(times[j].time == matches[i].time) {
                                matches[i]["time_id"] = times[j].id
                            }
                        }
                    }
                    if(matches.length == 0 || matches[0].type == 0) {
                        res.render('admin/nextMatches/updatePhase', {
                            times : times,
                            teams : teams,
                            matches : matches,
                            logged : req.logged,
                            captain : req.captain,
                            admin : req.admin})
                    } else {
                        res.render('admin/nextMatches/updateElimination', {
                            times : times,
                            teams : teams,
                            matches : matches,
                            logged : req.logged,
                            captain : req.captain,
                            admin : req.admin})
                    }
                    
                });
            });
        });
    } else if(req.method == "PUT") {
        let matches = req.body.matches

        if(matches == undefined) {
            matches = []
        }
        
        for(let i = 0; i < matches.length; i++) {
            matches[i].id = parseInt(matches[i].id, 10)
            matches[i].type = parseInt(matches[i].type, 10)
            matches[i].time = parseInt(matches[i].time, 10)
        }

        Request({
            url: API + "/nextMatches",
            method: "PUT",
            json: true,   
            body: matches
        }, function (error, response, body){
            if(error) {
                res.end('{"status" : "fail"}');
            } else {
                res.end('{"status" : "success"}');
            }
        });
    }
}