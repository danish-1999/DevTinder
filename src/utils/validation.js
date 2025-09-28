const validator = require('validator');
const validateSignUpData = (req) => {
 const { firstName, lastName, emailId, password } = req.body;
 if (!firstName || !lastName) {
  throw new Error("Please enter a valid name");
 } else if (!validator.isEmail(emailId)) {
  throw new Error("Please enter a valid email id");
 } else if (!validator.isStrongPassword(password)) {
  throw new Error("Please Enter a strong password");
 }
};

module.exports = {
 validateSignUpData,
};