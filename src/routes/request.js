const express = require("express");
const router = express.Router();
const { userAuth } = require("../mildlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// Send new connection
router.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req?.params?.userId;
    const status = req?.params?.status;
    const userTo = await User.findById(toUserId);
    if(!userTo){
      throw new Error("User is not found");
    }
    const isAllowedStatus = ["ignored", "interested"]
    if(!isAllowedStatus.includes(status)){
      throw new Error("You try to send an incorrect status type");
      
    }
    const existingConnection = await ConnectionRequest.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    })
    if(existingConnection){
      throw new Error("Connection already exist");
    }
    const connectionReq = new ConnectionRequest({
      fromUserId,
      toUserId,
      status: status
    });
    await connectionReq.save();
    if (status === "interested")
      res.send(req.user.firstName + " is " + status + " to "+userTo.firstName);
    else
      res.send("");
  }catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = router;