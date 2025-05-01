const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN, (error, data) => {
      if (error) throw new Error("Invalid token");
      return data;
    });

    const user = await User.findById(data.userId).select("-passwordHash");

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: error.message || "Session expired" });
  }
};

module.exports = authUser;
