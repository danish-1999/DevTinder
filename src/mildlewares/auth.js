const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Cookie expired please login agian");
    }
    const decodedMessage = jwt.verify(token, "Tinder@clone_2025");
    const {_id} = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Please creat your profile");
    }
    req.user = user;
    next();
  }catch (error) {
    res.status(400).send("ERROR : " + error.message);
    }
}

module.exports = { userAuth };