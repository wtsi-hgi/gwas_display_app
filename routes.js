var express = require('express')
var router = express.Router()
const handler = require('./handler')

router.get('/phenotypes', handler.getPhenotypes);
router.get('/variant/:slug', handler.getVariant);


module.exports = router