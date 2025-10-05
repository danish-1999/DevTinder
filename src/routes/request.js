const express = require("express");
const router = express.Router();
const { userAuth } = require("../mildlewares/auth");

// Send new connection
router.post("/sendNewConnection", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " " + user.lastName + " sent the connection request");
});

module.exports = router;