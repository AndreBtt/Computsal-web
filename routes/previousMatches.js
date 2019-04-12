var express = require('express')
var router = express.Router()

var controller = require('../controllers/previousMatches')

router.get('/', controller.index)
router.get('/:matchID', controller.match)


module.exports = router