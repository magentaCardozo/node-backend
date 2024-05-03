const express=require("express")
const cookieParser=require('cookie-parser')
const methodOverride = require('method-override');

const db=require('./db/conn')


//400 logique error
//401 not found error

const routeArticle=require('./routes/article')
const userRouter=require('./routes/user')
require("dotenv").config();

const app=express()


const port =process.env.PORT || 5000;

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json({ limit: '30mb',extended:true }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use('/articles',routeArticle)
app.use('/users',userRouter)
app.use(express.static('./public'))




new db()

app.listen(port,()=>{
    console.log(`server is runing on the port ${port}...`)
})
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})