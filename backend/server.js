require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/user", userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
