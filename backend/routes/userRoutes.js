const express = require("express");
const authUser = require("../middleware/authUser");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", authUser, (req, res) => {
  res.json(req.user);
});

router.put("/profile", authUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new Error();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(404).json({ message: error.message || "User not found" });
  }
});

module.exports = router;
