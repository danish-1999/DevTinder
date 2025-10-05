const express = require("express");
const router = express.Router();
const { userAuth } = require("../mildlewares/auth");

// Get the user cookie
router.get("/profile", userAuth, async (req, res) => {
 try {
  const user = req.user;

  res.send(user);
 } catch (error) {
  res.status(400).send("ERROR : " + error.message);
 }
});

module.exports = router;