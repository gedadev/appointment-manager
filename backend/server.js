require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("ok");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
