const express = require("express");

const app = express();

// Error Handling

app.post("/user/getData", (req, res) => {
  // try {
  //   throw new error ("sndkcfe");
  //   res.send("user data sent");
  // } catch(err) {
  //   res.status(500).send("something is wrong connect to team");
  // }
  throw new error ("sndkcfe");
  res.send("user data sent");
});

app.use("/", (err, req, res, next) => {
 if (err) {
  res.status(500).send("something is wrong connect to team");
 }
});

// Midlewares
// const {adminAuth, userAuth} = require("./mildlewares/auth");
// app.use("/admin", adminAuth);

// app.post("/user/login", (req, res) => {
//   res.send("user data sent");
// })
// app.get("/user/data", userAuth, (req, res) => {
//   res.send("user data sent");
// })

// app.get("/admin/daleteUser", (req, res) => {
//   res.send("Deleted user data!");
// });
// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data sent");
// });


//Route Handlers

// app.use(
//  "/user", 
//  (req, res, next) => {
//   // This is route handler
//   console.log("I'm in Route halndler 1!");
//   next();
//   // res.send("Route Handler 1");
//  },
//  (req, res, next) => {
//   // This is route handler
//   console.log("I'm in Route halndler 2!");
//   // res.send("Route Handler 2");
//   next();
//  },
//  (req, res, next) => {
//   // This is route handler
//   console.log("I'm in Route halndler 3!");
//   // res.send("Route Handler 3");
//   next();
//  },
//  (req, res, next) => {
//   // This is route handler
//   console.log("I'm in Route halndler 4!");
//   // res.send("Route Handler 4");
//   next();
//  },
//  (req, res) => {
//   // This is route handler
//   console.log("I'm in Route halndler 5!");
//   res.send("Route Handler 5");
//  }
// );

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