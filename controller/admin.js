let { Admin, Cart , Product } = require('../models/index')
const { checkPass } = require('../helper/password')
const jwt = require('jsonwebtoken')

class AdminCont{
    static read = async (req,res,next)=>{
        try{
            let readAdmin = await Admin.findAll()
            res.status(200).json(readAdmin)
        }
        catch(err){
            next(err)
        }
    }

    static register = async (req,res,next)=> {
        let {email,password,role} = req.body
        let obj = {email,password,role}
        // console.log(obj)

        try{
            let newAdmin = await Admin.create(obj)
            res.status(201).json({message : 'new user has been created'})
            // res.status(201).json(newAdmin)1
        }
        catch(err){
            next(err)
        }
    }

    static login = async(req,res,next) =>{
        let {email,password} = req.body
        // console.log(req.body.email)
        // console.log(req.body.password)
        // console.log(req.body)
        try{
           let loginAdmin = await Admin.findOne({
               where : {
                   email : email
               }
           })
        //    console.log(loginAdmin)
           let check = checkPass(password,loginAdmin.password)
        //    console.log(check,'<<<<<<<<<<<<<')
           if(check){
                let access_token = jwt.sign({
                    id:loginAdmin.id,
                    email : loginAdmin.email,
                    role: loginAdmin.role
                },process.env.SECRET_KEY)
                console.log(access_token,'<<<<')
                res.status(200).json({access_token: access_token})
           }
           else{
               throw ({code : 401, message : 'invalid password or email'})
           }
        }
        catch(err){
            next(err)
        }
    }

    static addCart = async(req,res,next)=>{
        try{
            // console.log('<<<<<<<<<<')
            // console.log(req.body)
            // console.log(req.params)
            let AdminId = req.admin.id
            let ProductId = +req.body.id
            let amount = 1
            let obj = {AdminId,ProductId,amount}
            
            //update product stock
            let product = await Product.findOne({
                where:{
                    id:ProductId
                }
            })

            if(product.stock >= amount){
                product.stock = product.stock - amount
                await product.save()
            }else{
              
                next({message : 'stock is not enough'})
            }
            
            let cart = await Cart.findOne({
                where:{
                    AdminId : AdminId,
                    ProductId:ProductId
                }
            })
            if(!cart){
                //new cart
                let newCart = await Cart.create(obj)
                console.log('newcart')
                res.status(201).json(newCart)
            }else{
                // already have cart
                cart.amount = cart.amount + +amount
                await cart.save()
                res.status(201).json({message:'the product that you chose already in the cart'})
            }
        }
        catch(err){
            next(err)
        }
    }

    static showCart = async(req,res,next)=>{
        try{
            let adminId = req.admin.id

            let user = await Cart.findAll({
                include:[Admin, Product],
                order:[['id','ASC']],
                where:{
                    AdminId:adminId
                }
            })
            res.status(200).json(user)
        }
        catch(err){
            next(err)
        }

    }

    static removeCart = async(req,res,next)=>{
        try{
            const {id, ProductId} = req.body //id cart & productId
            //cek cart
            let removeCart = await Cart.findOne({
                where:{
                    id : id
                }
            })
            if(!removeCart){
                next({message:`You don't have the cart`})
            }else{
                // cek product
                let updateProduct = await Product.findByPk(ProductId)
                updateProduct.stock = updateProduct.stock + removeCart.amount

                await updateProduct.save()
                await removeCart.destroy()
                res.status(202).json({message:'Cart has been deleted'})
            }
        }
        catch(err){
            next(err)
        }

    }

    static updateCart = async(req,res,next)=>{
        try{
            const {amount, ProductId, id} = req.body
            // const id = +req.params.id //id cart
            
            //cek product
            let product = await Product.findOne({
                where:{
                    id:+ProductId
                }
            })
            //cek stock product
            if(product.stock < +amount && product.stock <= 0){
                console.log('stock kurang')
                next({status:507, message: 'insufficient Stock'})
            }else{
                // update product
                product.stock = product.stock - amount
                await product.save()
                //update cart
                let cart = await Cart.findOne({
                    where:{
                        id:id
                    }
                })
                console.log(cart)
                cart.amount = cart.amount + +amount
                await cart.save()
                
                res.status(200).json({message:'cart has been updated'})
            }

        }
        catch(err){
            next(err)
        }

    }
}

module.exports = AdminCont