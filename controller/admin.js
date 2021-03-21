let { Admin } = require('../models/index')
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

        let obj = {email,password,role}

        try{
            let newAdmin = await Admin.create(obj)
            res.status(201).json({message : 'new admin has been created'})
            // res.status(201).json(newAdmin)
        }
        catch(err){
            next(err)
        }
    }

    static login = async(req,res,next) =>{
        let {email,password} = req.body
        // console.log(req.body.email)
        // console.log(req.body.password)
        try{
           let loginAdmin = await Admin.findOne({
               where : {
                   email : email
               }
           })
           let check = checkPass(password,loginAdmin.password)
           if(check){
                let access_token = jwt.sign({
                    id:loginAdmin.id,
                    email : loginAdmin.email
                },process.env.SECRET_KEY)
                // console.log(access_token,'<<<<')
                res.status(200).json({access_token: access_token})
           }
           else{
               throw ({code : 401, message : 'invalid password or email'})
           }
        }
        catch(err){
            res.send(err)
        }

    }
}

module.exports = AdminCont