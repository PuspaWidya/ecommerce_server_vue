let jwt = require('jsonwebtoken')
let {Admin} = require('../models/index')

let authenticate = async(req,res,next)=>{
    try{
       let adminObj = jwt.verify(req.headers.access_token,process.env.SECRET_KEY)
       if(adminObj){
            let admin = await Admin.findOne({
                where :{
                    id: adminObj.id,
                    email : adminObj.email,
                    role: adminObj.role
                }
            })
            if(!admin){
                throw({status : 401, message : 'Not authorized'})
            }else{
                console.log('authenticate masuk')
                req.admin = adminObj
                next()
            }
        }else{
            
            throw({status : 401,message : 'email or password wrong'})
        }
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = authenticate