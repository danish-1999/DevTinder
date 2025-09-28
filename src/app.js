const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const app = express();
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Make a midleware
app.use(express.json());

app.post("/signup", async(req, res) => {
  try {
    // Validation during sign up
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt user password 
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating user account
    const user = new User({firstName, lastName, emailId, password : passwordHash});

    user.save().then(() => {
      res.send("User added succesfully...");
    }).catch(err =>{
      res.status(404).send("ERROR :  " + err.message);
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
})

// Login to user
app.post("/login", async(req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email Id");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email Id or password is wrong");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      res.send("Login Successfully");
    } else {
      throw new Error("Email Id or password is wrong");
    }
    } catch (error) {
    res.status(400).send("ERROR : " + error.message);
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
app.patch("/updataUser/:Id", async(req, res) => {
  const userId = req?.params?.Id;
  const data = req.body;
  try {
    const allowedUpdates = [
      "firstName",
      "age",
      "password",
      "lastName",
      "photoUrl",
      "gender",
      "about",
      "skills",
    ];
    const isAllowed = Object.keys(data).every(k => 
      allowedUpdates.includes(k)
    );
    if(!isAllowed){
      throw new Error("We try to access unchangable things");
      
    }
    if (data.skills && data.skills.length > 8) {
      throw new Error("We can not add more than eight(8) skills");
    }
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
