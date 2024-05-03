
const mongoose=require('mongoose')
const Schema=mongoose.Schema
//    category: 'cosmetiques',
//         slug:`Découvrez

const userSchema=new Schema({
    category:{type:String,required:true, unique:true},
    sous_category:{type:Array,required:true},
    slug:{type:String,required:true, unique:true},
},{
    timestamps:true
})
const Category=mongoose.model('category',userSchema)
module.exports=Category