var express = require('express')
var router = express.Router()

var controller = require('../controllers/home')
var user = require('../controllers/user')

router.get('/', isLoggedIn, controller.home)

// user routes
router.use('/criarTime', isLoggedIn, user.createTeam)
router.use('/agendarHorario', isLoggedIn, user.schedule)

// adm routes
router.use('/admin', isLoggedIn, isAdmin, require('./admin'))

// general routes
router.use('/times', require('./teams'))
router.use('/jogosPassados', require('./previousMatches'))
router.use('/proximosJogos', require('./nextMatches'))
router.use('/artilharia', require('./score'))
router.use('/grupos', require('./groups'))

function isLoggedIn(req, res, next) {
    // if (usario nao esta logado) {
    //     res.render('home/index', {
    //         logged : false,
    //         adm : false
    //     })
    //     return
    // }
    req.logged = true
    req.email = "email14"
    req.adm = true
    return next()
}

function isAdmin(req, res, next) {
    if (!req.adm) {
        // user is not a adm
        res.render('home/index', {
            logged : req.logged,
            adm : req.adm
        })
        return
    }
    return next()
}

module.exports = router


