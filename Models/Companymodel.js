const mongoose = require("mongoose");
const companyschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " name is required"],
    unique:true
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo:{
    type:String
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true, 'userId is required']
  }
}, {timestamps:true});


module.exports = mongoose.model('Company', companyschema)
