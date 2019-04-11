var express = require('express')
var router = express.Router()

var controller = require('../controllers/teams')

router.get('/', controller.index)
router.post('/', controller.createTeam)

router.get('/:teamName', controller.team)

module.exports = router