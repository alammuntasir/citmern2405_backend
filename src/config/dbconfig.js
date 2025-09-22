const { default: mongoose } = require("mongoose");

const dbconnection = ()=>{
   mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vpmsi1i.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log(`database connection successfully..`)
   }).catch((err)=>{
    console.log(err.message || " database connection failed")
   })
}

module.exports = dbconnection;