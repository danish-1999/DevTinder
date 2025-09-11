const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const app = express();

// Make a midleware
app.use(express.json());

app.post("/signup", async(req, res) => {
  // Creating user account
  const user = new User(req.body);
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
