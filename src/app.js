const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

// Make a midleware
app.use(
 cors({
  origin: "http://localhost:5173",
  credentials: true
 })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


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

// ---------------Extra APIs---------------
//  // Get user account using his/her emailId
// app.get("/userByEmail", async(req, res) => {
//   try{
//     const user = await User.findOne({emailId : req.body.emailId});
//     if(!user)
//       res.status(404).send("User not found");
//     else 
//       res.send(user);
//   }catch(err){
//     res.status(400).send("something went wrong");
//   }
// })

// // Get all users account
// app.get("/allUser", async(req, res) => {
//   try{
//     const users = await User.find();
//     if(!users)
//         res.status(404).send("No user is there!");
//     else
//       res.send(users);
//   }catch(err){
//     res.status(400).send("something went wrong");
//   }
// })

// // Get user acount using their Ids
// app.get("/userById", async(req, res) => {
//   try {
//     const user = await User.findById(req.body._id);
//     if (!user) 
//       res.status(404).send("User not found");
//     else 
//       res.send(user);
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// })

// // Delete a user account
// app.delete("/deleteUser", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.body.userId);
//     res.send("User deleted succefully!!");
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// })

// // Update details of user
// app.patch("/updataUser/:Id", async(req, res) => {
//   const userId = req?.params?.Id;
//   const data = req.body;
//   try {
//     const allowedUpdates = [
//       "firstName",
//       "age",
//       "password",
//       "lastName",
//       "photoUrl",
//       "gender",
//       "about",
//       "skills",
//     ];
//     const isAllowed = Object.keys(data).every(k => 
//       allowedUpdates.includes(k)
//     );
//     if(!isAllowed){
//       throw new Error("We try to access unchangable things");
      
//     }
//     if (data.skills && data.skills.length > 8) {
//       throw new Error("We can not add more than eight(8) skills");
//     }
//     const user = await User.findByIdAndUpdate(
//       userId,
//       data,
//       {runValidators : true}
//     );
//     if(!user)
//       res.status(404).send("User not found");
//     else {
//       res.send("user update succefully!!");
//     }
//   } catch (error) {
//     res.status(400).send("User id not updated " + error.message);
//   }
// })

// // update using emnailId
// app.patch("/updateByEmail", async(req, res) => {
//   try {
//     const user = await User.findOneAndUpdate({emailId : req.body.emailId}, req.body);
//     if(!user)
//       res.status(404).send("User not found");
//     else {
//       console.log(user);
//       res.send("User updated succefully!!")
//     }
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// })
