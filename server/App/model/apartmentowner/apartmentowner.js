const mongoose=require("mongoose")
const Schema=mongoose.Schema
const apartmentSchema=new Schema({
    building_name:{
        type:String,
        required:[true,"building name is required"]
    },
    rooms:{
        type:String,
        required:[true,"room number is required"]
    },
    building_address:{
        type:String,
        required:[true,"building address are required"]
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    }
})
const apartment=mongoose.model("apartment",apartmentSchema)
module.exports=apartment