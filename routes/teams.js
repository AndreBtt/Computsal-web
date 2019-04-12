var express = require('express')
var router = express.Router()

var controller = require('../controllers/teams')

router.get('/', controller.index)
router.post('/', controller.create)
router.get('/update/:teamName', controller.update)
router.post('/update/:teamName', controller.update)

router.get('/:teamName', controller.team)

module.exports = router