const mongoose = require("mongoose");
require('dotenv').config()

const ConnectToDb = () => {
  // mongoose.connect('mongodb://127.0.0.1:27017/FinalJobportal')
  mongoose
    .connect( `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@mernjobportal.3g6zcbt.mongodb.net/?retryWrites=true&w=majority&appName=MernJobPortal`)
    .then(() =>
      console.log('mongodb connected successfully'
       
      )
    )
    .catch(() => console.log("error in connecting mongoose"));
};

module.exports = ConnectToDb;
