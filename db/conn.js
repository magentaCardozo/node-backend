const mongoose=require("mongoose")

require("dotenv").config();
const uri =process.env.MONGO_ATLAS
const database = 'school'; 

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};
class Database {
  constructor() {
    this._connect();
  }
  _connect() {

  mongoose.connect(uri)
  .then(() => {
    return mongoose.connection.db.admin().command({ ping: 1 });
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  })
  }
  _disconnect(){
        return mongoose.disconnect();

  }
}
module.exports=Database

