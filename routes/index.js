var express = require('express')
var router = express.Router()

var controller = require('../controllers/home')
var user = require('../controllers/user')

router.get('/', isLoggedIn, controller.home)

// user routes
router.use('/criarTime', isLoggedIn, userAccess, user.createTeam)
router.use('/agendarHorario', isLoggedIn, userAccess, user.schedule)

// admin routes
router.use('/admin', isLoggedIn, AdminAccess, require('./admin'))

// general routes
router.use('/times', isLoggedIn, require('./teams'))
router.use('/jogosPassados', isLoggedIn, require('./previousMatches'))
router.use('/proximosJogos', isLoggedIn, require('./nextMatches'))
router.use('/artilharia', isLoggedIn, require('./score'))
router.use('/grupos', isLoggedIn, require('./groups'))

function isLoggedIn(req, res, next) {
    if (/*usario nao esta logado*/ false) {
        req.logged = false
        req.email = ""
        req.admin = false
        return next()
    }

    // user is logged in
    req.logged = true
    req.email = "email14"
    req.admin = false
    if (/* verificar email admin */ true){
        req.admin = true
    }
    return next()
}

function userAccess(req, res, next) {
    if(req.logged) {
        return next()
    }

    // user is not logged in
    res.render('home/index', {
        logged : req.logged,
        admin : req.admin
    })
}

function AdminAccess(req, res, next) {
    if (req.admin) {
        return next()
    }

    // user is not an admin
    res.render('home/index', {
        logged : req.logged,
        admin : req.admin
    })
}

module.exports = router


