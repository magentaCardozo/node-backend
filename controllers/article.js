const Article=require ('../models/articles')
const fs=require('fs')
const path =require('path')


    // id: 2,
    // categorie: 'montre',
    // name: 'Rolex-3',
    // longName: 'china whash',
    // price: 288,
    // pricePromo: 119,
    // slug: '',
    // image: [ png3, png9, png7, png8 ]

const getArticles=(req,res)=>{
    Article.find()
    .then(articles=>{
        const newArticles=articles.map(article=>{
            return {
                id:article._id,
                name: article.name,
                categorie:article.categorie,
                longName:article.longName,
                price:article.price,
                pricePromo: article.pricePromo,
                slug:article.slug,
                // image:article.image && [path.basename(article.image[0])]
                image:article.image && [(article.image[0])]
            }
        })
        res.json(newArticles)})
    .catch(err=>res.status(404).json({status:"Error",message:err}))
}
const getArticle=(req,res)=>{
    Article.findById(req.params.id,)
    .then(article=>{
        if (!article){
            return res.status(402).json({status:"Error", message:"Aucun article correspondant !"})
        }
        const newArticles={
                id:article._id,
                name: article.name,
                categorie:article.categorie,
                longName:article.longName,
                price:article.price,
                pricePromo: article.pricePromo,
                slug:article.slug,
                image:article.image
            }

        return res.json(newArticles)
    })
    .catch(err=>res.status(400).json({status:"Error",message: err.message})) 
}

// function addArticle(req, res) {
//     console.log(req.body)
//     console.log(req.query)
//     console.log(req.files)
//     if (!req.files || req.files.length===0) {
//         console.log('no file received')
//         return res.status(402).send({
//             status:"Error",message:"aucune image trouvée" 
//         })
//     }
//     else {
//         let { categorie,name,longName,price,pricePromo,slug} = req.body
//         let image = req.files.map(file => file.path); 
//          const newArticle = new Article({ categorie,name,longName,price,pricePromo,slug,image});
//     console.log('files received');
//         newArticle.save()
//             .then(() => res.json('article added'))
//             .catch(err => res.status(401).json({status:"Error", message:"Enregistrement a échouer"}))
//         console.log("file uploaded ...")
//     }
// }
function addArticle(req, res) {
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.files)
    if (/*!req.files || req.files.length===0*/ false) {
        console.log('no file received')
        return res.status(402).send({
            status:"Error",message:"aucune image trouvée" 
        })
    }
    else {
        let { categorie,name,longName,price,pricePromo,slug, image} = req.body
         const newArticle = new Article({ categorie,name,longName,price,pricePromo,slug,image});
    console.log('files received');
        newArticle.save()
            .then(() => res.json('article added'))
            .catch(err => {res.status(401).json({status:"Error", message:err})
        console.error(err)
        })
    }
}
const updateArticle=(req, res)=>{
    let { categorie,name,longName,price,pricePromo,slug, image} = req.body
    Article.findById(req.params.id)
    .then(article=>{

        if (!article){
            return res.status(402).json({status:"Error", message:"Aucun article correspondant !"})
        }

        if(image.length===0){

            article.name=name
            article.categorie=categorie
            article.longName=longName
            article.price=price
            article.pricePromo=pricePromo
            article.slug=slug
            // article.image=(req.files && req.files.map(file=>file.path))||article.image
            article.image=article.image
        }else{

            article.name=name
            article.categorie=categorie
            article.longName=longName
            article.price=price
            article.pricePromo=pricePromo
            article.slug=slug
            // article.image=(req.files && req.files.map(file=>file.path))||article.image
            article.image=image
        }
        // ____________
        article.save()
        .then(()=>res.json({status:"Success", message:"not aploaded"}))
        .catch(err=>res.status(401).send({status:"Error", message:"not aploaded"}))
    })
    .catch(err=>res.status(400).json({status:"Error", message:err.message}))

}
const deleteArticle=(req,res)=>{
    Article.findByIdAndDelete(req.params.id)
    .then(res=>{
        // (article)=>{
        // article.image.map(image=>{
        //     return  fs.unlinkSync(`${image}`)
        // })

       console.log("deleted")
        return res.json({status:"Success"})
    })
    .catch(err=>{
        console.error(err)
        res.json({status:"Error", message:err.message})})
}



module.exports={getArticles,addArticle,updateArticle,deleteArticle,getArticle}