const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const authUser = require("../middleware/authUser");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, email, password, businessName } = req.body;
  const foundUser = await User.findOne({ email });
  const foundBusiness = await User.findOne({ businessName });

  if (foundUser)
    return res.status(400).json({ message: "Email already registered" });
  if (foundBusiness)
    return res.status(400).json({ message: "Business already registered" });

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      businessName,
      businessSlug: businessName.toLowerCase().replace(/\s+/g, "-"),
    });

    const { accessToken, refreshToken } = generateToken(user._id);

    res.status(201).json({
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch {
    res.status(500).json({ message: "User creation failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser)
    return res
      .status(400)
      .json({ message: "User not found, create your account" });

  try {
    const isMatch = await bcrypt.compare(password, foundUser.passwordHash);

    if (!isMatch) throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = generateToken(foundUser._id);

    res.status(200).json({
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Login Failed" });
  }
});

router.get("/profile", authUser, (req, res) => {
  res.json(req.user);
});

module.exports = router;
