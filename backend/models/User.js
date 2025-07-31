const mongoose = require("mongoose");

const workingHoursSchema = new mongoose.Schema(
  {
    start: { type: String },
    end: { type: String },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String },

    role: { type: String, enum: ["owner"], default: "owner" },

    businessName: { type: String, required: true },
    businessSlug: { type: String, required: true, unique: true },
    logo: { type: String },
    businessDescription: { type: String },
    businessEmail: {
      type: String,
      default: function () {
        return this.email;
      },
    },
    location: { type: String },
    timezone: { type: String, default: "America/Mexico_City" },

    workingHours: {
      monday: workingHoursSchema,
      tuesday: workingHoursSchema,
      wednesday: workingHoursSchema,
      thursday: workingHoursSchema,
      friday: workingHoursSchema,
      saturday: workingHoursSchema,
      sunday: workingHoursSchema,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
