var express = require('express')
var router = express.Router()

var controller = require('../controllers/user')

router.post('/create', controller.createAccount)
router.post('/logIn', controller.logIn)
router.post('/logOut', controller.logOut)
router.post('/savePhoto', controller.savePhoto)

module.exports = router