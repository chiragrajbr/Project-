const mongoose = require("mongoose");
const isEmail=require("validator/lib/isEmail")
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required:[true,"username is required"]
  },
  email: {
    type: String,
    required:[true,"email is required"],
    unique:true,
    validate:function(value){
      return isEmail(value)
    },
    message:function(){
      return "enter proper email"
    }
  },
  password:{
    type:String,
    required:[true ,"password is required"],
    min:5,
    max:128
  }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
