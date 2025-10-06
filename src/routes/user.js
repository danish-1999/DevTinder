const express = require("express");
const { userAuth } = require("../mildlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const router = express.Router();

// Get the connection requests
router.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId", "firstName lastName photoUrl age skills about");
    if(!connectionRequest){
      throw new Error("Connection not found");
    }
    res.json({
      message: "See all connections",
      data: connectionRequest
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
})

module.exports = router;