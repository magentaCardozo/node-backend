const express=require('express')
const router=express.Router()
const {adminAuth, userAuth}=require('../middleware/user')

const {getArticles,addArticle,deleteArticle,updateArticle,getArticle}=require('../controllers/article')
const {upload}=require ('../middleware/articles')


// router.route('/').get(getArticles).post(adminAuth,addArticle)
// router.route('/:id').patch(adminAuth,updateArticle).delete(adminAuth,deleteArticle).get(getArticle)
router.route('/').get(getArticles).post(addArticle)
router.route('/:id').patch(updateArticle).delete(deleteArticle).get(getArticle)

module.exports=router