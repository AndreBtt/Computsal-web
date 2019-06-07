var Request = require("request");

// let API = "https://floating-reef-49922.herokuapp.com"
let API = "http://localhost:3000"

exports.index = function(req, res) {
    Request.get(API + "/scores", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let scores = JSON.parse(body)
        res.render('score/index', {
            scores : scores,
            logged : req.logged,
            captain : req.captain,
            admin : req.admin})
    });
}