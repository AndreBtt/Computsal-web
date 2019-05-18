var express = require('express')
var router = express.Router()

var authMd = require('../middlewares/auth')
var userMd = require('../middlewares/user')

var controller = require('../controllers/home')
var user = require('../controllers/user')


/* --- user routes --- */
// captain routes
router.use('/agendarHorario', authMd.isLoggedIn, userMd.userAccess, userMd.captainAccess, user.schedule)
router.use('/atualizarTime', authMd.isLoggedIn, userMd.userAccess, userMd.captainAccess, user.updateTeam)

// not captain routes
router.use('/criarTime', authMd.isLoggedIn, userMd.userAccess, userMd.notCaptainAccess, user.createTeam)

/* --- admin routes --- */
router.use('/admin', authMd.isLoggedIn, userMd.AdminAccess, require('./admin'))

/* --- general routes --- */
router.get('/', authMd.isLoggedIn, controller.home)
router.use('/times', authMd.isLoggedIn, require('./teams'))
router.use('/jogosPassados', authMd.isLoggedIn, require('./previousMatches'))
router.use('/proximosJogos', authMd.isLoggedIn, require('./nextMatches'))
router.use('/artilharia', authMd.isLoggedIn, require('./score'))
router.use('/grupos', authMd.isLoggedIn, require('./groups'))

/* --- user control routes --- */ 
router.use('/user', authMd.isLoggedIn, require('./user'))

module.exports = router