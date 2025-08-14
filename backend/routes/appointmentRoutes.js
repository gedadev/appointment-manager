const express = require("express");
const authUser = require("../middleware/authUser");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const User = require("../models/User");

const router = express.Router();

router.post("/new", authUser, async (req, res) => {
  const { businessName, customerName, date, cost, notes = "" } = req.body;
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
        cost,
        notes,
      });

      return res
        .status(201)
        .json({ message: "Appointment and customer created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Appointment creation failed" });
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
    res.status(500).json({ message: "Appointment creation failed" });
  }
});

router.get("/list", authUser, async (req, res) => {
  const { businessName } = req.body;
  const foundBusinessId = await User.findOne({ businessName }, { _id: 1 });
  const appointments = await Appointment.find({
    business: foundBusinessId._id,
  });

  if (!appointments)
    return res.status(404).json({ message: "Appointments not found" });

  const getCustomer = async (id) => {
    return await Customer.findById(id);
  };

  const appointmentsWithCustomersPromises = appointments.map(
    async (appointment) => {
      const customer = await getCustomer(appointment.customer);
      return { ...appointment.toObject(), customerName: customer.customerName };
    }
  );

  const appointmentsWithCustomers = await Promise.all(
    appointmentsWithCustomersPromises
  );

  res.status(200).json(appointmentsWithCustomers);
});

router.get("/customers", authUser, async (req, res) => {
  const { businessName } = req.body;
  const foundBusinessId = await User.findOne({ businessName }, { _id: 1 });
  const customers = await Customer.find({
    business: foundBusinessId._id,
  });

  if (!customers)
    return res.status(404).json({ message: "Customers not found" });

  res.status(200).json(customers);
});

module.exports = router;
