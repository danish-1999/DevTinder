const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const app = express();

app.post("/signup", async(req, res) => {
  const user = new User({
    firstName: "Adnan",
    lastName: "Feeroz",
    email : "feeroz@adnan.gmail.com",
    password: "adnan_2000",
    age: 24
  })
  try {
    
  user.save();
  res.send("User added succesfully...");
  } catch (error) {
    res.status(400).send("User didn't connect");
  }
})

connectDB()
 .then(() => {
  console.log("Database connection is established...");
  app.listen(8888, () => {
  console.log("I'm listening in port number 8888...");
  });
 })
 .catch((err) => {
  console.error("Database is not connected!!");
 });
