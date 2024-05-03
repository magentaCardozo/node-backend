const mongoose=require('mongoose')
const Schema=mongoose.Schema;

    // id: 2,
    // categorie: 'montre',
    // name: 'Rolex-3',
    // longName: 'china whash',
    // price: 288,
    // pricePromo: 119,
    // slug: '',
    // image: [ png3, png9, png7, png8 ]

const articlesSchema=new Schema(
    {
        name:{type:String,required:true},
        categorie:{type:String,required:true},
        longName:{type:String,required:true},
        slug:{type:String,required:true},

        price:{type:Number,required:true},
        pricePromo:{type:Number,required:true},
        image:{type:[],required:true}
    },
    {timestamps:true}
)
const Article=mongoose.model('Article',articlesSchema)

module.exports=Article