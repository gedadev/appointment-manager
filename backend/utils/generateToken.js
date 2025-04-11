const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
