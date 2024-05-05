const User = require("../models/user");
const bcrypt=require("bcryptjs")
const jwt =require('jsonwebtoken')

//console.log(require("crypto").randomBytes(35).toString("hex"))
require("dotenv").config();
const jwtSecret="28d344ad532c7eb15066a7b9ec84be11220274db37e90cfeebc9144d1b32da4608384c"


const createUser=(req,res,next)=>{
    const {password,name,role}=req.body  
    User.findOne({name})
    .then(user=>{
        if(user){ return res.status(400).json({message:'user already exist'})}
        bcrypt.hash(password,10)
        .then(hash=>{
            const newUser= new User({name, password:hash,role})
            newUser.save()
            .then(user=>{
                return res.json('new user saved successfully')
            })
            .catch(err=>res.status(400).json('Error + '+err))
            
        })
        
    })
    .catch(err=>{
        return res.status(400).json({message :'fail !',Error:err.message})})
}
const loginUser=(req, res,next)=>{
    
    const {name, password}=req.body
    if (!name || !password){
        console.log('Error some missing fields')
        return res.status(401).json({status:"Error",
            message:'fill out all the fields'
        })
    }
    if(password.length<6){
        console.log('Password must have at least 6 caracters')
        return res.status(401).json({status:"Error",message : 'at least 6 caracters for the password'})
    }
    
    User.findOne({name})
    .then(user=>{
        if(!user){
            return res.status(402).json({
                status:"Error",
                message:'not found'
            })
        }
        bcrypt.compare(password,user.password)
        .then(result=>{
            if (!result){
                return res.status(402).json({
                    status:"Error",
                    message:"worse password"
                })
                
            }
            const maxAge=3*60*60
            const token=jwt.sign({id:user._id,name,role:user.role},
                jwtSecret,
                {
                    expiresIn:maxAge
                }
                )
                
                res.cookie('jwt',token,{
                    withCredentials: true,
                    httpOnly: false,
                    maxAge:maxAge*1000
                })
                return res.status(200).json({
                    message:'success',
                    user
                })
            })
            
        }
        )
        .catch(err=>res.status(400).json({
            status:"Error",
            message:err.message,
            token
        }))
        
        
    }

    const checkCoockies=(req,res,next)=>{
        try{
        const token =req.cookies.jwt
        // console.log(token)
            if(token){
        jwt.verify(token, jwtSecret,(err, decodedToken)=>{
            if(err){
                return res.status(400).json({status:'notAllowed',message:err.message})
            }else{
                if(decodedToken.role !=="Admin"){
                    return res.status(401).json({status:'notAllowed',message:"not a administrator"})
                }else{
                    res.json({status:'allowed'})
                }
            }
        })
    }else{
        // console.log('bonbon')
        return res.status(401).json({status:'Error',message: "not authorized, no token found"})
    }
    }catch(err){
        console.error(err)

    }

}
    module.exports={createUser,loginUser,checkCoockies};
    
    

            