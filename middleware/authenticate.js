let jwt = require('jsonwebtoken')
let {Admin} = require('../models/index')

let authenticate = async(req,res,next)=>{
    try{
       let adminObj = jwt.verify(req.headers.access_token,process.env.SECRET_KEY)
        console.log(adminObj,'<<<')

        if(adminObj){
            let admin = await Admin.findOne({
                where :{
                    id: adminObj.id,
                    email : adminObj.email
                }
            })
            if(!admin){
                throw({status : 401, message : 'Not authorized'})
            }
            req.admin = adminObj
            next()
        }else{
            throw({status : 401,message : 'email or password wrong'})
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = authenticate