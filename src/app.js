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
    user.save().then(() => {
      res.send("User added succesfully...");
    }).catch(err =>{
      res.status(404).send("User didn't connect " + err.message);
    });
  } catch (error) {
    res.status(400).send("User didn't connect" + error.message);
  }
})

// Get user account using his/her emailId

app.get("/userByEmail", async(req, res) => {
  try{
    const user = await User.findOne({emailId : req.body.emailId});
    if(!user)
      res.status(404).send("User not found");
    else 
      res.send(user);
  }catch(err){
    res.status(400).send("something went wrong");
  }
})

// Get all users account
app.get("/allUser", async(req, res) => {
  try{
    const users = await User.find();
    if(!users)
        res.status(404).send("No user is there!");
    else
      res.send(users);
  }catch(err){
    res.status(400).send("something went wrong");
  }
})

// Get user acount using their Ids
app.get("/userById", async(req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) 
      res.status(404).send("User not found");
    else 
      res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
})

// Delete a user account
app.delete("/deleteUser", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted succefully!!");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
})

// Update details of user
app.patch("/updataUser/:userId", async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
  try {
    if (data?.skills.length > 8) throw new Error("You can add skills upto 7");
    const user = await User.findByIdAndUpdate(
      userId,
      data,
      {runValidators : true}
    );
    if(!user)
      res.status(404).send("User not found");
    else {
      res.send("user update succefully!!");
    }
  } catch (error) {
    res.status(400).send("User id not updated " + error.message);
  }
})

// update using emnailId
app.patch("/updateByEmail", async(req, res) => {
  try {
    const user = await User.findOneAndUpdate({emailId : req.body.emailId}, req.body);
    if(!user)
      res.status(404).send("User not found");
    else {
      console.log(user);
      res.send("User updated succefully!!")
    }
  } catch (error) {
    res.status(400).send("something went wrong");
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
