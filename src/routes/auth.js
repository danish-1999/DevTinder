const express = require("express");
const router = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


router.post("/signup", async (req, res) => {
 try {
  // Validation during sign up
  validateSignUpData(req);
  const { firstName, lastName, emailId, password } = req.body;
  // Encrypt user password
  const passwordHash = await bcrypt.hash(password, 10);
  // Creating user account
  const user = new User({
   firstName,
   lastName,
   emailId,
   password: passwordHash,
  });
  const token = await user.getToken();
  // Add token to the cookie and send response back to the user
  res.cookie("token", token);

  user
   .save()
   .then(() => {
    res.send("User added succesfully...");
   })
   .catch((err) => {
    res.status(404).send("ERROR :  " + err.message);
   });
 } catch (error) {
  res.status(400).send("ERROR : " + error.message);
 }
});

// Login to user
router.post("/login", async (req, res) => {
 try {
  const { emailId, password } = req.body;
  if (!validator.isEmail(emailId)) {
   throw new Error("Invalid Email Id");
  }
  const user = await User.findOne({ emailId: emailId });
  if (!user) {
   throw new Error("Email Id or password is wrong");
  }
  const isPassword = await user.encryptPassword(password);
  if (isPassword) {
   // Creat JWT token
   const token = await user.getToken();
   // Add token to the cookie and send response back to the user
   res.cookie("token", token);
   res.send("Login Successfully");
  } else {
   throw new Error("Email Id or password is wrong");
  }
 } catch (error) {
  res.status(400).send("ERROR : " + error.message);
 }
});

module.exports = router;