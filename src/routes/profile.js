const express = require("express");
const router = express.Router();
const { userAuth } = require("../mildlewares/auth");
const {validateInputData, validateInputPassword} = require("../utils/validation");
const bcrypt = require("bcrypt");

// Get the user profile
router.get("/profile/view", userAuth, async (req, res) => {
 try {
  const user = req.user;

  res.send(user);
 } catch (error) {
  res.status(400).send("ERROR : " + error.message);
 }
});

// Uodate user
router.patch("/profile/edit", userAuth, async(req,res) => {
  try {
    if(!validateInputData(req, res)){
      throw new Error("Updating Invalid Credentials");
    }
    const userForUpdate = req.user;
    Object.keys(req.body).forEach(keys => userForUpdate[keys] = req.body[keys]);
    await userForUpdate.save();
    res.send(`${userForUpdate.firstName} your profile is updated`);
  } catch (error) {
   res.status(400).send("ERROR : " + error.message);
  }
});

// Forgot password
router.patch("/profile/password", userAuth, async(req, res) => {
  try {
    if (!validateInputPassword(req, res)) {
      throw new Error("Updating Invalid Credentials");
    }
    const userForUpdate = req.user;
    const newPasswordHash = await bcrypt.hash(req.body.password, 10);
    userForUpdate.password = newPasswordHash;
    await userForUpdate.save();
    res.send(`${userForUpdate.firstName} your password is updated`);
    } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
})

module.exports = router;