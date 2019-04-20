var express = require('express')
var router = express.Router()

var controller = require('../controllers/groups')

router.get('/', controller.index)

module.exports = router