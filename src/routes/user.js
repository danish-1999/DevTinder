const express = require("express");
const { userAuth } = require("../mildlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const router = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age skills about gender";

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

router.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    let limit = parseInt(req?.query?.limit) || 10;
    limit = limit>30 ? 30 : limit;
    const skip = (page-1) * limit;
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id}
      ]
    }).select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    })
    
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    res.send(users);
  } catch (error) {
    res.status(400).send("ERROR: "+ error.message);
  }

})

module.exports = router;