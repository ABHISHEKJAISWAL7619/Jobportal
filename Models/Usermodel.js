const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: [true, "phone number is required"],
  },
  password:{
    type:String,
    required:[true,"password is required"],
    minlength:3
  },
  role:{
    type:String,
    enum:['Student','Recruiter']
  },
  
    bio:{type:String},
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{type:mongoose.Schema.ObjectId , ref:'Company'},
   
   profilePhoto:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2021/09/20/03/24/skeleton-6639547_1280.png"
}

} , {timestamps:true});

module.exports  =  mongoose.model('User', userschema)
