const express = require("express");
const authUser = require("../middleware/authUser");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const User = require("../models/User");

const router = express.Router();

router.post("/new", authUser, async (req, res) => {
  const { businessName, customerName, date, notes = "" } = req.body;
  const foundBusinessId = await User.findOne({ businessName }, { _id: 1 });
  const foundCustomerId = await Customer.findOne({ customerName }, { _id: 1 });

  if (!foundBusinessId)
    return res.status(400).json({ message: "Business not found" });

  if (!foundCustomerId) {
    try {
      const newCustomer = await Customer.create({
        business: foundBusinessId._id,
        customerName,
      });

      await Appointment.create({
        business: foundBusinessId._id,
        customer: newCustomer._id,
        date,
        notes,
      });

      return res
        .status(201)
        .json({ message: "Appointment and customer created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Customer creation failed" });
    }
  }

  try {
    await Appointment.create({
      business: foundBusinessId._id,
      customer: foundCustomerId._id,
      date,
      notes,
    });

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Customer creation failed" });
  }
});

module.exports = router;
