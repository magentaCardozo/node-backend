const {createUser, loginUsernUser, loginUser,checkCoockies} = require("../controllers/user")
const {adminAuth, userAuth}=require('../middleware/user')
const userRouter=require("express").Router()


userRouter.route('/').post(createUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/admin/check').get(checkCoockies)
// userRouter.route('/admin').get(adminAuth,(req,res)=>res.send('Admin Router'))
userRouter.route('/basic').get(userAuth,(req,res)=>res.send('basic Router'))
module.exports=userRouter