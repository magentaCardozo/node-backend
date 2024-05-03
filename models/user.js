
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{type:String,required:true, unique:true},
    password:{type:String, minlength:6, required:true},
    role:{type:String,required:true, default:'Basic'}
},{
    timestamps:true
})
const User=mongoose.model('user',userSchema)
module.exports=User