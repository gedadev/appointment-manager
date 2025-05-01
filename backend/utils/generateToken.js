const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

module.exports = generateToken;
