const express = require("express");

const app = express();

app.use("/test",(req, res) => {
  res.send("I'm from the server!");
});
app.use("/hello",(req, res) => {
  res.send("Hello hello hello");
});
app.use("/",(req, res) => {
  res.send("hi to dashboard");
});

app.listen(8888, () =>{
  console.log("I'm listening in port number 8888...");
});