const express = require('express')
const router = express.Router()
const product = require("../controller/product")
const user = require('../controller/admin')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

// router.get('/admin',user.read)
router.post('/register',user.register)
router.post('/login',user.login)

router.use(authenticate)

router.get('/server',user.showCart)
router.post('/server/:id',user.addCart)
router.delete('/server/:id',user.removeCart)
router.patch('/server/:id',user.updateCart)


router.get('/products',product.show)
router.post('/products',product.create)
router.put('/products/:id',product.editAll)
router.delete('/products/:id',product.delete)

module.exports = router