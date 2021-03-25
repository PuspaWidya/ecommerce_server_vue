const {Admin, Product} = require('../models/index')


const authorize = async (req,res,next)=>{
    try{
        const idAdmin = req.admin.id
        let admin = await Admin.findByPk(idAdmin)

        if(admin.role === 'admin'){
            console.log('ini admin')
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