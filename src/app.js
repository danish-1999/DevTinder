const express = require("express");

const app = express();


app.get("/user/:userId/:Name/:Password",(req, res) => {
  console.log(req.params)
  res.send({"firstName" : "Danish", "lastName" : "Alam"});
});

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