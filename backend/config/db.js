const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection error:", error);
  }
};

module.exports = connectDB;
