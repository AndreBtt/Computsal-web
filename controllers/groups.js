var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:8080"

exports.index = function(req, res) {
    Request.get(API + "/groupsDetail", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let groups = JSON.parse(body);
        groupSize = groups.length;

        res.render('groups/index', {
            groupSize : groupSize,
            groups : groups,
            logged : req.logged,
            admin : req.admin
        });
    });
}

