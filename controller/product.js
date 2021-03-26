let {Product} = require('../models/index')

class ProductCont{
    static create = async(req,res,next)=>{
        let newProduct = {
            name : req.body.name,
            imageUrl : req.body.imageUrl,
            price : req.body.price,
            stock : req.body.stock
        }
        try {
            let newDataProduct = await Product.create(newProduct)
            res.status(201).json(newDataProduct)
        }
        catch(err){
            // console.log(err)
            next(err)
        }

    }

    static show = async (req,res,next)=>{
        try{
            let showProduct = await Product.findAll()
            res.status(200).json(showProduct)
        }
        catch(err){
            next(err)
        }
    }

    static showOne = async (req,res,next) => {
        try{
            const id = req.params.id

            let product = await Product.findByPk(id)
            res.status(200).json(product)

        }
        catch(err){
            next(err)
        }
    }

    static editAll = async(req,res,next)=>{
        let id = +req.params.id
        let newBody = {
            name : req.body.name,
            imageUrl :req.body.imageUrl,
            price : req.body.price,
            stock : req.body.stock
        }
        try{
            let editData = await Product.findByPk(id)
            // console.log(editData)
            let newData = await editData.update(newBody)
            res.status(200).json(newData)
        }
        catch(err){
            // res.send(err)
            next(err)
        }
    }
    
    static destroy = async (req,res,next)=>{
        try{
            let id = req.params.id
            let data = await Product.findByPk(id)
            await data.destroy()
            console.log(id)
            res.status(200).json({message : 'data has been deleted'})
        }
        catch(err){
            console.log(err)
            next(err)
        }
    }
}

module.exports = ProductCont