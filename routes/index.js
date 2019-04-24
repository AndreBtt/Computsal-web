var express = require('express')
var router = express.Router()

var controller = require('../controllers/home')
var user = require('../controllers/user')

router.get('/', isLoggedIn, controller.home)

// user routes
router.use('/criarTime', isLoggedIn, user.createTeam)
router.use('/agendarHorario', isLoggedIn, user.schedule)

router.use('/times', require('./teams'))
router.use('/jogosPassados', require('./previousMatches'))
router.use('/proximosJogos', require('./nextMatches'))
router.use('/artilharia', require('./score'))
router.use('/grupos', require('./groups'))

function isLoggedIn(req, res, next) {
    // if (req.isAuthenticated()) {
    //    req.isLogged = true
    //    return next();
    // }
    req.logged = true
    req.adm = true
    req.email = "email14"
    return next()
}

module.exports = router


