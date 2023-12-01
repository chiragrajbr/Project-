const mongoose = require("mongoose");
const user = require("../user/user");
const Schema = mongoose.Schema;
const tenantSchema = new Schema({
  tenant_Name: {
    type: String,
    required: [true, "tenant name is required"],
  },
  ph_No: {
    type: Number,
    required: [true, "phone number is required"],
  },
  id_Type: {
    type: String,
    required: [true, "id type needed"],
  },
  id_No: {
    type: Number,
    required: [true, "id number is required"],
  },
  image: {
    type: String,
    /*  required:[true,"tenant image is required"]*/
  },
  apartment_Name: {
    type: String,
    required: [true, "apartment name is required"],
  },
  room_No: {
    type: String,
    required: [true, "room number is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id is required"],
  },
  Date: {
    type: Date,
    default: new Date(),
  },
});
const tenant = mongoose.model("tenant", tenantSchema);
module.exports = tenant;
