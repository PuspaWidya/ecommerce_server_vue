const {Admin, Product} = require('../models/index')


const authorize = async (req,res,next)=>{
    try{
        let product = await Product.findOne({
            where :{
                id : req.params.id
            }
        })
        let admin = await Admin.findOne({
            where :{
                role : 'admin'
            }
        })

        if(product && admin){
            next()
        }else{
            throw({code : 401, message : 'unauthorized'})
        }

    }
    catch(err){
        next(err)
    }
}

module.exports = authorize