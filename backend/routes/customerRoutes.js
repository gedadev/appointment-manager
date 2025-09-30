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

router.put("/update/:id", authUser, async (req, res) => {
  const { id } = req.params;
  const { phone, email, notes } = req.body;
  const foundCustomer = await Customer.findById(id);

  if (!foundCustomer)
    return res.status(404).json({ message: "Customer not found" });

  try {
    await Customer.findByIdAndUpdate(id, { phone, email, notes });

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Customer update failed" });
  }
});

module.exports = router;
