var express = require('express')
var router = express.Router()

var controller = require('../controllers/admin')

router.get('/', controller.index)
router.use('/times',  controller.teams)
// router.use('/jogosPassados', isLoggedIn, require('./previousMatches'))
// router.use('/proximosJogos', isLoggedIn, require('./nextMatches'))
// router.use('/artilharia', isLoggedIn, require('./score'))
// router.use('/grupos', isLoggedIn, require('./groups'))


module.exports = router