const express = require('express')
const router = express.Router()
const product = require("../controller/product")
const user = require('../controller/admin')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get('/admin',user.read)
router.post('/register',user.register)
router.post('/login',user.login)


router.get('/products',authenticate,product.show)
router.post('/products',authenticate,product.create)
router.put('/products/:id',authenticate,product.editAll)
router.delete('/products/:id',authenticate,product.delete)

module.exports = router