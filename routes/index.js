const express = require('express')
const router = express.Router()
const product = require("../controller/product")
const user = require('../controller/admin')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get('/admin',user.read)
router.post('/register',user.register)
router.post('/login',user.login)
router.use(authenticate)

router.get('/server',user.showCart)
router.post('/server/:id',user.addCart)
router.patch('/server',user.updateCart)
router.delete('/server',user.removeCart)


router.get('/products',product.show)
router.post('/products',product.create)
router.get('/products/:id',product.showOne)
router.put('/products/:id',product.editAll)
router.use(authorize)
router.delete('/products/:id',product.destroy)

module.exports = router