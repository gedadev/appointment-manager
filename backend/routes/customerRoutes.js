const express = require("express");
const authUser = require("../middleware/authUser");
const Customer = require("../models/Customer");
const User = require("../models/User");

const router = express.Router();

router.get("/all", authUser, async (req, res) => {
  const id = req.user._id;

  const customers = await Customer.find({
    business: id,
  });

  if (!customers)
    return res.status(404).json({ message: "Customers not found" });

  res.status(200).json(customers);
});

module.exports = router;
