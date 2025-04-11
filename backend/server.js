require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/create", async (req, res) => {
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
