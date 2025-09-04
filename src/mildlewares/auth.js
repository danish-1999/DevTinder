const adminAuth = (req, res, next) => {
 const token = "xyz";
 const isAdmin = token === "xyz";
 if (isAdmin) next();
 else res.status(401).send("Unauthurized admin");
};

const userAuth = (req, res, next) => {
  console.log("user auth function call");
  const token = "abc";
  const isUser = token === "abc";
  if(isUser) next();
  else res.status(401).send("Unauthurized user");
}

module.exports = { adminAuth, userAuth };