const mongoose=require("mongoose")
const dbconnection=()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/login1")
    .then(()=>{
        console.log("connected to database")
    })
    .catch((e)=>{
        console.log( "not connected")
    })
}
module.exports=dbconnection