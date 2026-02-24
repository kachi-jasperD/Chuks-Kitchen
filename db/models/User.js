const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    verificationOtp: {
      type: String,
    },

    verificationOtpExpires: {
      type: Date,
    },

    resetOtp: {
      type: String,
    },

    resetOtpExpires: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
