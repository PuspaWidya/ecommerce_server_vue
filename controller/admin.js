let { Admin } = require('../models/index')
const {checkPass } = require('../helper/password')
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

        let{email, password} = req.body
        let obj = {email,password}

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

        try{
           let loginAdmin = await Admin.findOne({
               where : {
                   email : email
               }
           })
           let check = checkPass(password,loginAdmin.password)
           if(check){
                let objAdmin = jwt.sign({
                    id:loginAdmin.id,
                    email : loginAdmin.email
                },process.env.SECRET_KEY)
                res.status(200).json(objAdmin)
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