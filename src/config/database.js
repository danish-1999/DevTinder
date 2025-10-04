const mongoose = require("mongoose");

const connectDB = async() =>{
  await mongoose.connect(
   "mongodb+srv://Danish_Alam:Danish7399@tinder-cluster.ekrkwih.mongodb.net/Tinder-Clone"
  );
}

module.exports = connectDB;
