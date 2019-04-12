var express = require('express')
var router = express.Router()

var controller = require('../controllers/index')

router.get('/', controller.index)

router.use('/times', require('./teams'))
router.use('/jogosAnteriores', require('./previousMatches'))

module.exports = router