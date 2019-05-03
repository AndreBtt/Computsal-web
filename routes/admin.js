var express = require('express')
var router = express.Router()

var controller = require('../controllers/admin')

router.get('/', controller.index)
router.use('/times',  controller.teams)
router.use('/grupos',  controller.groups)
router.use('/grupo/:groupNumber', controller.group)
router.use('/criarGrupo', controller.createGroup)

module.exports = router