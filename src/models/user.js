const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { 
    type: String,
    required: true,
    minLength: 4,
    maxLength: 15,
    trim: true
  },
  lastName: {
    type: String, 
    minLength: 3,
    maxLength: 10,
    trim: true
  },
  emailId: {
    type :  String, 
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type :  String, 
    required: true
  },
  age: {
    type: Number, 
    min: 18 
  },
  gender: {
    type :  String, 
    validate(value){
      if(!["male","female","others"].includes(value))
        res.status(400).send("Gender data is not correct"); 
    }
  },
  about: {
    type: String,
    default: "Give some descriptin about yuorself."
  },
  skills: {type :  [String], },
},
{ 
  timestamps: true 
}
);

module.exports = mongoose.model("User", userSchema);