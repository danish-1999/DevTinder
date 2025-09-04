const express = require("express");

const app = express();


//Route Handlers
app.use(
 "/user", 
 (req, res, next) => {
  // This is route handler
  console.log("I'm in Route halndler 1!");
  next();
  // res.send("Route Handler 1");
 },
 (req, res, next) => {
  // This is route handler
  console.log("I'm in Route halndler 2!");
  // res.send("Route Handler 2");
  next();
 },
 (req, res, next) => {
  // This is route handler
  console.log("I'm in Route halndler 3!");
  // res.send("Route Handler 3");
  next();
 },
 (req, res, next) => {
  // This is route handler
  console.log("I'm in Route halndler 4!");
  // res.send("Route Handler 4");
  next();
 },
 (req, res) => {
  // This is route handler
  console.log("I'm in Route halndler 5!");
  res.send("Route Handler 5");
 }
);

// app.get("/user/:userId/:Name/:Password",(req, res) => {
//   console.log(req.params)
//   res.send({"firstName" : "Danish", "lastName" : "Alam"});
// });

// app.post("/user",(req, res) => {
//   res.send("Data is saved to the server.");
// });

// app.delete("/user",(req, res) => {
//   res.send("Profile deleted successfully");
// });

// app.patch("/user",(req, res) => {
//   res.send("Profile updated successfully");
// });


app.listen(8888, () =>{
  console.log("I'm listening in port number 8888...");
});