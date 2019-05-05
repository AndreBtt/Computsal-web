var express = require('express')
var router = express.Router()

var controller = require('../controllers/teams')

router.get('/', controller.index)

router.get('/:teamID', controller.team)

module.exports = router