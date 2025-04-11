const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = await User.findById(data.userId).select("-passwordHash");
    next();
  } catch {
    res.status(403).send("Session expired");
  }
};

module.exports = authUser;
