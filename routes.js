var express = require('express')
var router = express.Router()
const handler = require('./handler')

router.get('/phenotypes', handler.getPhenotypes);
router.get('/variant/:slug', handler.getVariant);
router.post('/upload/:datatype', handler.uploadFile);
router.get('/drop/:datatype', handler.dropCollection);


module.exports = router