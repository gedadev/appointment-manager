require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/create", async (req, res) => {
  const { name, email, password, businessName } = req.body;

  const passwordHash = password;

  const user = await User.create({
    name,
    email,
    passwordHash,
    businessName,
    businessSlug: businessName.toLowerCase().replace(/\s+/g, "-"),
  });

  res.status(201).send("User created successfully");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
