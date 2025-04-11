const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, email, password, businessName } = req.body;
  const foundUser = await User.findOne({ email });
  const foundBusiness = await User.findOne({ businessName });

  if (foundUser) return res.status(400).send("User already registered");
  if (foundBusiness) return res.status(400).send("Business already registered");

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      businessName,
      businessSlug: businessName.toLowerCase().replace(/\s+/g, "-"),
    });

    res.status(201).send("User created successfully");
  } catch {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser) return res.status(400).send("Login Failed");

  try {
    const isMatch = await bcrypt.compare(password, foundUser.passwordHash);

    if (!isMatch) return res.status(400).send("Login Failed");

    res.send("Login success");
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
