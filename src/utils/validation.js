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

const validateInputPassword = (req, res) => {
  try {
    const allowedDataForUpdates = [
      "password"
    ];
    const isAllowed = Object.keys(req.body).every((keys) =>
      allowedDataForUpdates.includes(keys)
    );
    return isAllowed;
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
}

const validateInputData = (req, res) => {
  try {
    const allowedDataForUpdates = [
      "firstName",
      "lastName",
      "gender",
      "photoUrl",
      "age",
      "about",
      "skills",
    ];
    const isAllowed = Object.keys(req.body).every((keys) =>
      allowedDataForUpdates.includes(keys)
    );
    if (req.body.skills && req.body.skills.length > 8) {
     throw new Error("We can not add more than eight(8) skills");
    }
    return isAllowed;
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
}

module.exports = {
 validateSignUpData,
 validateInputData,
 validateInputPassword
};