const express = require("express");
const { userAuth } = require("../mildlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const router = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age skills about";

// Get the connection requests
router.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if(!connectionRequest){
      throw new Error("Connection not found");
    }
    const data = connectionRequest.map(row => row.fromUserId)
    res.json({
      message: "See all penging requests",
      data: data
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
})

// Get user connections
router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);
    
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    })
    res.json({ data });
  } catch (error) {
    res.status(400).send("ERROR: "+ error.message);
  }
})

module.exports = router;