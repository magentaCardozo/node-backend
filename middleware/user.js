const jwt=require('jsonwebtoken')
require("dotenv").config();

const jwtSecret="28d344ad532c7eb15066a7b9ec84be11220274db37e90cfeebc9144d1b32da4608384c"

adminAuth=(req,res,next)=>{
    const token =req.cookies.jwt
    if(token){
        jwt.verify(token, jwtSecret,(err, decodedToken)=>{
            if(err){
                return res.status(400).json({status:'Error',message:err.message})
            }else{
                if(decodedToken.role !=="Admin"){
                    return res.status(401).json({status:'Error',message:"not a administrator"})
                }else{
                    next()
                }
            }
        })
    }else{
        return res.status(401).json({status:'Error',message: "not authorized, no token found"})
    }
}

userAuth=(req,res,next)=>{
    const token =req.cookies.jwt
    if(token){
        jwt.verify(token, jwtSecret,(err, decodedToken)=>{
            if(err){
                return res.status(400).json({status:'Error',message:err.message})
            }else{
                if(decodedToken.role !=="Basic"){
                    return res.status(401).json({staus:'Error',message:"not a basic user"})
                }else{
                    next()
                }
            }
        })
    }else{
        return res.status(401).json({status:'Error',message:"no token found"})
    }
}
module.exports={adminAuth, userAuth,jwtSecret}
