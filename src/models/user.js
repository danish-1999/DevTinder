const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 15,
      trim: true,
    },
      lastName: {
      type: String,
      minLength: 3,
      maxLength: 10,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is not valid "+ value);
          
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Give some strong password " + value);
        }
      }
    },
    photoUrl: {
        type: String,
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("The URL is not valide " + value);
            
          }
        },
        default:
          "https://images.unsplash.com/photo-1497316730643-415fac54a2af?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value))
        res.status(400).send("Gender data is not correct");
      },
    },
    about: {
      type: String,
      default: "Give some descriptin about yuorself.",
      maxLength: 100,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);