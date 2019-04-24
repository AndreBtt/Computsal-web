exports.home = function(req, res) {
    res.render('home/index', {
        logged : req.logged,
        admin : req.admin
    })
}