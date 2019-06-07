var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:3000"

exports.index = function(req, res) {
    Request.get(API + "/groupsDetail", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let groups = JSON.parse(body);

        res.render('groups/index', {
            groups : groups,
            logged : req.logged,
            captain : req.captain,
            admin : req.admin
        });
    });
}