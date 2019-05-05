exports.userAccess = function(req, res, next) {
    if(req.logged) {
        return next()
    }

    // user is not logged in
    res.render('home/index', {
        logged : req.logged,
        admin : req.admin,
        captain : req.captain
    })
}

exports.AdminAccess = function(req, res, next) {
    if (req.admin) {
        return next()
    }

    // user is not an admin
    res.render('home/index', {
        logged : req.logged,
        admin : req.admin,
        captain : req.captain
    })
}

exports.captainAccess = function(req, res, next) {
    if (req.captain === false) {
        res.render('home/index', {
            logged : req.logged,
            admin : req.admin,
            captain : req.captain
        })
        return
    }

    return next()
}

exports.notCaptainAccess = function(req, res, next) {
    if (req.captain === true) {
        res.render('home/index', {
            logged : req.logged,
            admin : req.admin,
            captain : req.captain
        })
        return
    }

    return next()
}