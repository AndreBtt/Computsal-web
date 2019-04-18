var express = require('express')
var router = express.Router()

var controller = require('../controllers/index')

router.get('/', controller.index)

router.get('/teste', function(req,res) {
    res.render('teste', {})
})

router.use('/times', require('./teams'))
router.use('/jogosAnteriores', require('./previousMatches'))
router.use('/proximosJogos', require('./nextMatches'))
router.use('/artilharia', require('./score'))

module.exports = router