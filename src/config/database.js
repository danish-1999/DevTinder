const mongoose = require("mongoose");

const connectDB = async() =>{
  await mongoose.connect(
 "mongodb+srv://Danish_Alam:Danish%407399@cluster-1.msohu3i.mongodb.net/Tinder-Clone"
);
}

module.exports = connectDB;
