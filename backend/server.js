require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/customer", customerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
